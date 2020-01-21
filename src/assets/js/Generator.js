import axios from "axios"

const API_KEY = '97773975bd1d3fdf89b362a27d2b6313'

class Generator {
    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Constructor ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    constructor() {
        this.state = undefined
    }

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Generation func ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    async generate(username,period,max_artists) {
        var result = {
            username:username,
            period:period,
            max_artists:max_artists,
            artists:[],
            listens:{},
            tags:[],
            taggings:{},
            tag_meta:{},
            scores:{},
        }
        var error = undefined
        this.state = "Getting artists' data..."
        await this.get_artist_data(result).then(
            e => error = e
        )
        
        if (error == undefined) {
            this.state = "Pruning tags..."
            await this.prune_tags(result)
            this.state = "Getting tags' data..."
            await this.get_tag_data(result)
            this.state = "Scoring tags..."
            await this.score_tags(result)
            this.state = "Sorting tags..."
            await this.sort_data(result)
        }
        this.state = undefined;
        return {'result':error == undefined ? result : undefined, 'error':error}
    }

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Generation sub-funcs ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    async get_artist_data(result) {
        return await axios.get(
            "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists"+
            "&api_key="+API_KEY+
            "&user="+result.username+
            "&period="+result.period+
            "&limit="+result.max_artists+
            "&format=json").then(
                async function(response){
                    var artist_promises = []
                    for (var artist of response.data.topartists.artist) {
                        artist_promises.push( new Promise(
                            async function(resolve) {
                                /**Sanitising result */
                                var artist_name = artist.name.toLowerCase()
                                /**Adding the artist to the artists list... */
                                result.artists.push(artist_name)
                                result.listens[artist_name] = artist.playcount
                                /**Getting their tags... */
                                await axios.get("https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags"+
                                        "&api_key="+API_KEY+
                                        "&artist="+artist_name.replace("&","%26")+
                                        "&format=json").then( function(response){                                                    
                                                /**If the response doesn't have the data we need, we just return and declare the request as failed. */
                                                if (response.data.toptags == undefined) { return }                                                        
                                                for (var tag of response.data.toptags.tag) {
                                                    /**I'm currently ignoring tags that contain ampersands because the last.fm API is broken for them. */
                                                    if (tag.name.includes("&")) { continue }
                                                    /**Sanitising data */
                                                    tag.name = tag.name.toLowerCase()
                                                    /**Adding the tag to the tags list if it's not already present... */
                                                    if (result.taggings[tag.name] == undefined) {
                                                        result.tags.push(tag.name)
                                                        /**Initialising the taggings of the tag on the artist to the tag's list in the taggings object... */
                                                        result.taggings[tag.name] = [{artist:artist_name,count:tag.count}]
                                                        /**Initialising the count of taggings on the artist to the tag's library_total & saving the tag's URL... */
                                                        result.tag_meta[tag.name] = {library_total:tag.count/100,
                                                                                     url:tag.url}
                                                    } else {
                                                        /**Adding the taggings of the tag on the artist to the tag's list in the taggings object... */
                                                        result.taggings[tag.name].push({artist:artist_name,count:tag.count})
                                                        /**Adding the count of taggings on the artist to the tag's library_total... */
                                                        result.tag_meta[tag.name].library_total += tag.count/100
                                                    }
                                                }
                                            }.bind(this))
                                resolve(true)
                            }.bind(this)
                            )
                        )
                    }
                    await Promise.all(artist_promises)
                }.bind(this)
        ).catch(
            function(error) {
                return error
            }.bind(this)
        )
    }

    prune_tags(result){
        /**First, we remove duplicate tags.
         * The tag data is not merged, the one that is used less in the user's library is simply ignored.
         * Tags are considered the same if:
         *  - One is identical to the other, except it ends in an "s".
         *  - One is identical to the other, except it has a hyphen, space, or no space where the other has any of those three in lieu.
         */
        for (var i in result.tags) {
            for (var j in result.tags) {
                if (i != j) {
                    var tagA = result.tags[i]
                    var tagB = result.tags[j]
                    if (tagB[tagB.length-1] == "s" && tagB.slice(0,tagB.length-1) == tagA
                        ||tagB.replace(" ","").replace("-","") == tagA.replace(" ","").replace("-","")) {
                            if (result.tag_meta[tagA].library_total >= result.tag_meta[tagB].library_total) {
                                //if tagA is bigger, we get rid of tagA.
                                result.tags.splice(j,1)
                                } else {
                                //if tagB is bigger, we get rid of tagA.
                                result.tags.splice(i,1)
                            }
                        }
                }
            }
        }

        result.tags.sort(function(a,b){return result.tag_meta[b].library_total - result.tag_meta[a].library_total}.bind(this))
        result.tags = result.tags.slice(0,100)
    }

    async get_tag_data(result){
        var tag_promises = []
        for (var tag of result.tags) {
            tag_promises.push(new Promise(
                function(tag_name){
                    return async function (resolve){
                        await axios.get("https://ws.audioscrobbler.com/2.0/?method=tag.getinfo"+
                        "&api_key="+API_KEY+
                        "&tag="+tag_name+
                        "&format=json").then(
                            async function(response){
                                if (response.data.tag == undefined ) { return }
                                result.tag_meta[tag_name].reach = response.data.tag.reach
                                result.tag_meta[tag_name].total = response.data.tag.total
                            }.bind(this)
                        )
                        resolve(true)
                    }.bind(this)
                }.bind(this)(tag)
            ))
        }
        await Promise.all(tag_promises)
    }

    score_tags(result){
        for (var tag of result.tags) {
            result.scores[tag] = 0
            /**First, each tagging is weighted by the product of:
             *  - How many times the user has listened to the artist on which the tag was used,
             * and...
             *  - The "count" of that tag on the artist.
             *    I am assuming that this "count" is a confidence % given by last.fm as to the accuracy of the tag on that artist.
             *    I can't find any doccumentation, but this would make sense, as they cap out at 100.
             */
            for (var tagging of result.taggings[tag]) {
                result.scores[tag] += tagging.count/100 * result.listens[tagging.artist]
            }
            /**The sum of all these weighted taggings is then scaled by:
             * 1. How many of the uses of that tag overall fall within the user's library sample (its "uniqueness" to the sample).
             * 
             * 2. How many artists within the sample are tagged with that tag (its "spread" over the sample).
             * 
             * 3. The base 10 logarithm of how many people have used that tag overall (its "reach"; see last.fm API docs).
             *    Base 10 is used so 100 people using the tag makes it twice as significant as 10 people using the tag; a nice balance.
             *    It's also conveniently provided as a function by Math.
             */
            result.scores[tag] = result.scores[tag] 
                                        * (result.tag_meta[tag].library_total / result.tag_meta[tag].total) 
                                        * result.taggings[tag].length * result.taggings[tag].length
                                        * Math.log10(result.tag_meta[tag].reach)
        }
    }

    sort_data(result){
        for (var tag of result.tags) {
            /**Sorting the tags' artists based upon how many times each artist has been tagged that tag */
            result.taggings[tag].sort(function(a,b){return b.count-a.count})
        }
        /**Sorting the tags based upon their scores */
        result.tags.sort(function(a,b){return result.scores[b]-result.scores[a]}.bind(this))
    }
}

export default Generator;