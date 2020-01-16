/**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Components ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
Vue.component(
    "tags-list", {
        props: ['tags','taggings','scores'],
        template: 
        `<p>Tags on your artists:
            <ol><li v-for='tag in tags' v-bind:tag='tag'>{{ tag }} (score: {{ scores[tag] }}):
                <ol><li v-for='tagging in taggings[tag]'>
                    {{ tagging.artist }} ({{ tagging.count }})
        </li></ol></li></ol></p>`
    }
)

Vue.component(
    "artists-list", {
        props: ['artists','listens'],
        template:
        `<p>Artists you've listened to:
            <ol><li v-for='artist in artists' v-bind:artist='artist'>
                {{ artist }} ({{ listens[artist] }} <span v-if="listens[artist]>1">listens</span> <span v-else>listen</span>)
        </li></ol></li></ol></p>`

    }
)

/**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ App ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
var app = new Vue ({
    el: "#generator",

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Data ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    data: {
        API_Key:'97773975bd1d3fdf89b362a27d2b6313',
        username:'TheTeaCat',
        period:{selected:'7day',
                options:[
                    {text:'7 Days',value:'7day'},
                    {text:'Month',value:'1month'},
                    {text:'3 Months',value:'3month'},
                    {text:'6 Months',value:'6month'},
                    {text:'Year',value:'12month'},
                    {text:'Overall',value:'overall'}]
                },
        max_artists:{selected:10,
                     options:[
                         {text:'10',value:10},
                         {text:'25',value:25},
                         {text:'50',value:50},
                         {text:'100',value:100}]
                     },
        result:undefined
    },
        
    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Methods ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    methods:{
        async generate() {
            this.result = {
                username:this.username,
                period:this.period.selected,
                max_artists:this.max_artists.selected,
                artists:[],
                listens:{},
                tags:[],
                taggings:{},
                tag_meta:{},
                scores:{}
            }
            console.log("Getting data about your library's artists from last.fm...")
            await this.get_artist_data()

            console.log("Pruning the tags used on your library's artists...")
            await this.prune_tags()

            console.log("Getting data about the tags used on your library's artists from last.fm...")
            await this.get_tag_data()

            console.log("Scoring each tag...")
            await this.score_tags()

            console.log("Sorting data...")
            await this.sort_data()

            console.log("Done!")
        },

        async get_artist_data() {
            await axios.get(
                "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists"+
                "&api_key="+this.API_Key+
                "&user="+this.result.username+
                "&period="+this.result.period+
                "&limit="+this.result.max_artists+
                "&format=json").then(
                    async function(response){
                        var artist_promises = []
                        for (artist of response.data.topartists.artist) {
                            artist_promises.push( new Promise(
                                async function(resolve,reject) {
                                    /**Sanitising data */
                                    var artist_name = artist.name.toLowerCase()
                                    /**Adding the artist to the artists list... */
                                    this.result.artists.push(artist_name)
                                    this.result.listens[artist_name] = artist.playcount
                                    /**Getting their tags... */
                                    await axios.get("http://ws.audioscrobbler.com/2.0/?method=artist.getTopTags"+
                                            "&api_key="+this.API_Key+
                                            "&artist="+artist_name.replace("&","%26")+
                                            "&format=json").then( function(response){                                                    
                                                    /**If the response doesn't have the data we need, we just return and declare the request as failed. */
                                                    if (response.data.toptags == undefined) { console.log("Request failed: ", response); return }                                                        
                                                    for (tag of response.data.toptags.tag) {
                                                        /**Tag "counts" cap out at 100.
                                                         * I am assuming that they are a confidence % given by last.fm as to how accurate the tag is.
                                                         */
                                                        /**Sanitising data */
                                                        tag.name = tag.name.toLowerCase()
                                                        if (response.data.toptags["@attr"].artist.toLowerCase() == "handhabits") {
                                                            console.log(response)
                                                        }
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
            )
        },

        async prune_tags(){
            this.result.tags.sort(function(a,b){return this.result.tag_meta[b].library_total - this.result.tag_meta[a].library_total}.bind(this))
            this.result.tags = this.result.tags.slice(0,100)
        },

        async get_tag_data(){
            var tag_promises = []
            for (tag of this.result.tags) {
                tag_promises.push(new Promise(
                    async function(resolve,reject){
                        await axios.get("http://ws.audioscrobbler.com/2.0/?method=tag.getinfo"+
                        "&api_key="+this.API_Key+
                        "&tag="+tag+
                        "&format=json").then(
                            function(response){
                                if (response.data.tag == undefined) { console.log("Request failed: ", response); return }
                                this.result.tag_meta[response.data.tag.name].reach = response.data.tag.reach
                                this.result.tag_meta[response.data.tag.name].total = response.data.tag.total
                            }.bind(this)
                        )
                        resolve(true)
                    }.bind(this)
                ))
            }
            await Promise.all(tag_promises)
        },

        score_tags(){
            for (tag of this.result.tags) {
                this.result.scores[tag] = 0
                /**First, each tagging is weighted by the product of how many times the user has listened to the artist on which the tag was used and the confidence of that tag on the artist. */
                for (tagging of this.result.taggings[tag]) {
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
        },

        sort_data(){
            for (tag of this.result.tags) {
                /**Sorting the tags' artists based upon how many times each artist has been tagged that tag */
                this.result.taggings[tag].sort(function(a,b){return b.count-a.count})
            }
            /**Sorting the tags based upon their scores */
            this.result.tags.sort(function(a,b){return this.result.scores[b]-this.result.scores[a]}.bind(this))
        }
    },

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Computed ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    computed:{
        possessive_result_username: function () {
            if (this.result.username[this.result.username.length-1].toLowerCase() == 's') {
                return this.result.username+"'"
            } else {
                return this.result.username+"'s"
            }
        },
        displayable_result_period: function () {
            return {'7day':'the last 7 days',
                    '1month':'the last month',
                    '3month':'the last 3 months',
                    '6month':'the last 6 months',
                    '12month':'the last year',
                    'overall':'overall'}[this.result.period]
        }
    },
})
