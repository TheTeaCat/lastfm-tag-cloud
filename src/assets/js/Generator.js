import axios from "axios"
import WordCloud from "wordcloud"

const API_KEY = '97773975bd1d3fdf89b362a27d2b6313'

class Generator {
    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Constructor ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    constructor() {
        this.result = undefined
        this.state = undefined
        this.error = undefined
    }

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Generation func ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    async generate(username,period,max_artists) {
        this.result = {
            username:username,
            period:period,
            max_artists:max_artists,
            artists:[],
            listens:{},
            tags:[],
            taggings:{},
            tag_meta:{},
            scores:{}
        }
        this.state = "Getting artists' data..."
        await this.get_artist_data()
        if (!this.error) {
            this.state = "Pruning tags..."
            await this.prune_tags()
            this.state = "Getting tags' data..."
            await this.get_tag_data()
            this.state = "Scoring tags..."
            await this.score_tags()
            this.state = "Sorting tags..."
            await this.sort_data()
        }
        this.state = undefined;    
    }

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Generation sub-funcs ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    async get_artist_data() {
        await axios.get(
            "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists"+
            "&api_key="+API_KEY+
            "&user="+this.result.username+
            "&period="+this.result.period+
            "&limit="+this.result.max_artists+
            "&format=json").then(
                async function(response){
                    var artist_promises = []
                    for (var artist of response.data.topartists.artist) {
                        artist_promises.push( new Promise(
                            async function(resolve) {
                                /**Sanitising data */
                                var artist_name = artist.name.toLowerCase()
                                /**Adding the artist to the artists list... */
                                this.result.artists.push(artist_name)
                                this.result.listens[artist_name] = artist.playcount
                                /**Getting their tags... */
                                await axios.get("https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags"+
                                        "&api_key="+API_KEY+
                                        "&artist="+artist_name.replace("&","%26")+
                                        "&format=json").then( function(response){                                                    
                                                /**If the response doesn't have the data we need, we just return and declare the request as failed. */
                                                if (response.data.toptags == undefined) { return }                                                        
                                                for (var tag of response.data.toptags.tag) {
                                                    /**Tag "counts" cap out at 100.
                                                     * I am assuming that they are a confidence % given by last.fm as to how accurate the tag is.
                                                     */
                                                    /**Sanitising data */
                                                    tag.name = tag.name.toLowerCase()
                                                    /**Adding the tag to the tags list if it's not already present... */
                                                    if (this.result.taggings[tag.name] == undefined) {
                                                        this.result.tags.push(tag.name)
                                                        /**Initialising the taggings of the tag on the artist to the tag's list in the taggings object... */
                                                        this.result.taggings[tag.name] = [{artist:artist_name,count:tag.count}]
                                                        /**Initialising the count of taggings on the artist to the tag's library_total... */
                                                        this.result.tag_meta[tag.name] = {library_total:tag.count/100}
                                                    } else {
                                                        /**Adding the taggings of the tag on the artist to the tag's list in the taggings object... */
                                                        this.result.taggings[tag.name].push({artist:artist_name,count:tag.count})
                                                        /**Adding the count of taggings on the artist to the tag's library_total... */
                                                        this.result.tag_meta[tag.name].library_total += tag.count/100
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
                this.error = error
            }.bind(this)
        )
    }

    async prune_tags(){
        this.result.tags.sort(function(a,b){return this.result.tag_meta[b].library_total - this.result.tag_meta[a].library_total}.bind(this))
        this.result.tags = this.result.tags.slice(0,100)
    }

    async get_tag_data(){
        var tag_promises = []
        for (var tag of this.result.tags) {
            tag_promises.push(new Promise(
                async function(resolve){
                    await axios.get("https://ws.audioscrobbler.com/2.0/?method=tag.getinfo"+
                    "&api_key="+API_KEY+
                    "&tag="+tag+
                    "&format=json").then(
                        function(response){
                            if (response.data.tag == undefined) { return }
                            this.result.tag_meta[response.data.tag.name].reach = response.data.tag.reach
                            this.result.tag_meta[response.data.tag.name].total = response.data.tag.total
                        }.bind(this)
                    )
                    resolve(true)
                }.bind(this)
            ))
        }
        await Promise.all(tag_promises)
    }

    score_tags(){
        for (var tag of this.result.tags) {
            this.result.scores[tag] = 0
            /**First, each tagging is weighted by the product of how many times the user has listened to the artist on which the tag was used and the confidence of that tag on the artist. */
            for (var tagging of this.result.taggings[tag]) {
                this.result.scores[tag] += tagging.count/100 * this.result.listens[tagging.artist]
            }
            /**The sum of all these weighted taggings is then scaled by:
             * 1. How many of the uses of that tag overall fall within the user's library sample (its "uniqueness" to the sample).
             * 2. How many artists within the sample are tagged with that tag (its "spread" over the sample).
             * 3. The base 10 logarithm of how many people have used that tag overall (its "reach"; see last.fm API docs).
             *    Base 10 is used so 100 people using the tag makes it twice as significant as 10 people using the tag; a nice balance.
             *    It's also conveniently provided as a function by Math.
             */
            this.result.scores[tag] = this.result.scores[tag] 
                                        * (this.result.tag_meta[tag].library_total / this.result.tag_meta[tag].total) 
                                        * this.result.taggings[tag].length * this.result.taggings[tag].length
                                        * Math.log10(this.result.tag_meta[tag].reach)
        }
    }

    sort_data(){
        for (var tag of this.result.tags) {
            /**Sorting the tags' artists based upon how many times each artist has been tagged that tag */
            this.result.taggings[tag].sort(function(a,b){return b.count-a.count})
        }
        /**Sorting the tags based upon their scores */
        this.result.tags.sort(function(a,b){return this.result.scores[b]-this.result.scores[a]}.bind(this))
    }

    generate_tag_cloud(canvas) {
        this.cloud_tags = []
        var minScore = Infinity
        var maxScore = -Infinity
        for (var tag of this.result.tags) {
            if (this.result.scores[tag] < minScore) {
                minScore = this.result.scores[tag]
            }
            if (this.result.scores[tag] > maxScore) {
                maxScore = this.result.scores[tag]
            }
        }
        for (tag of this.result.tags) {
            /**Biggest should be 200, smallest should be 25.
             * Logarithmic scaling is pretty arbritrary, just what I found looks decent.
             */
            this.cloud_tags.push([tag,Math.log10((this.result.scores[tag]-minScore)*99/maxScore+1)/2*175+25])
        }
        WordCloud(canvas,{
            list:this.cloud_tags,
            fontFamily:"Courier",
            color:"#000",
            shrinkToFit:true
        })
    }
}

export default Generator;