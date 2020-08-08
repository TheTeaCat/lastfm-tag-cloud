<template>
    <div class="cloud-box">
        <ul class="options-above">
            <li>Show me:</li>
            <li><button :disabled="mode=='tags' || building"
                        @click="generateTagCloud('tags')">
                    Tags
            </button></li>
            <li><button :disabled="mode=='artists' || building"
                        @click="generateTagCloud('artists')">
                    Artists
            </button></li>
        </ul>
        
        <canvas ref="canvas"
                width="1920"
                height="1200"/>

        <ul class="options-below">
            <li><input ref="fg-colour" type="color" v-model="fg_colour"/></li>
            <li><input ref="bg-colour" type="color" v-model="bg_colour"/></li>
            <li><button :disabled="building" @click="generateTagCloud()">Reshuffle</button></li>
            <li><a download="cloud.png" ref="download-link"><button @click="downloadTagCloud" :disabled="building">Download</button></a></li>
            <li class="share-button"><button @click="copyShareLink">
                    <span>Copy Link:</span>
                    <input ref="share-link" :value="share_link" readonly="readonly"/>
            </button></li>
        </ul>
    </div>
</template>

<script>
import WordCloud from "wordcloud"
import Utils from "../assets/js/Utils.js"

export default {
    props:["result","building"],
    mounted: function(){            
        var minScore = Infinity
        var maxScore = -Infinity
        for (var tag of this.result.tags) {
            var score = this.result.scores[tag]
            if (score < minScore) { minScore = score }
            if (score > maxScore) { maxScore = score }
        }

        this.cloudTags = []
        for (tag of this.result.tags) {
            /**Biggest should be 200, smallest should be 25.
            * Logarithmic scaling is pretty arbritrary, just what I found looks decent.
            */
            this.cloudTags.push([tag,Math.log10((this.result.scores[tag]-minScore)*99/maxScore+1)/2*175+25])
            /**By default, every tag is shown. */
            this.result.tag_meta[tag].shown = true;
        }

        var maxListens = -Infinity
        for (var artist of this.result.artists) {
            var listens = this.result.listens[artist] 
            if (listens > maxListens) {maxListens = listens}
        }

        this.cloudArtists = []
        for (artist of this.result.artists) {
            this.cloudArtists.push([artist,((this.result.listens[artist])/maxListens)*175+25])
        }

        this.bg_colour = Utils.rgb2hex(getComputedStyle(this.$refs["canvas"])['background-color'])
        this.fg_colour = Utils.rgb2hex(getComputedStyle(this.$refs["canvas"])['color'])

        this.generateTagCloud("tags")
    },
    data(){return{
        mode:"tags",
        bg_colour:"#000000",
        fg_colour:"#ffffff",
    }},
    methods: {
        async generateTagCloud(mode){
            if (mode != undefined) { this.mode = mode }

            this.$emit("building",true)

            this.retheme()

            var cloudWords = []
            if (this.mode == "tags") {
                for (var tag of this.cloudTags) {
                    if (this.result.tag_meta[tag[0]].shown) {
                        cloudWords.push(tag)
                    }
                }
            } else {
                cloudWords = this.cloudArtists
            }

            this.$refs["canvas"].addEventListener(
                "wordcloudstop",
                function(){
                    this.$emit("building",false)
                }.bind(this)
            )

            WordCloud(this.$refs["canvas"],{
                list:cloudWords,
                fontFamily:"Roboto",
                shrinkToFit:true,
                color:this.fg_colour,
                backgroundColor:this.bg_colour,
                shuffle:true,
            })
        },
        retheme() {
            this.bg_colour = Utils.rgb2hex(getComputedStyle(this.$refs["canvas"])['background-color'])
            this.fg_colour = Utils.rgb2hex(getComputedStyle(this.$refs["canvas"])['color'])
        },
        downloadTagCloud() {
            this.$refs["download-link"].href = this.$refs["canvas"].toDataURL()
        },
        copyShareLink() {
            this.$refs["share-link"].select()
            this.$refs["share-link"].setSelectionRange(0,99999)
            document.execCommand("Copy")
        },
    },
    computed: {
        share_link:function() {
            if (this.result != undefined) {
                return window.location.origin + window.location.pathname
                    + "?username=" + this.result.username 
                    + "&period=" + this.result.period 
                    + "&filtered=" + this.result.filtered 
                    + "&max_artists=" + this.result.max_artists 
            }
            return ""
        },
    },
}
</script>

<style lang="scss" scoped>
.cloud-box {
    display:flex;
    flex-direction: column;
    .options-above {
        justify-content: flex-end;
    }
    .options-below {
        justify-content: center;
        @media(orientation:portrait) {
            justify-content: flex-start;
        }
    }
    .options-above, .options-below {
        display:flex;
        flex-direction:row;
        align-items: center;
        overflow-x: auto;
        >* {
            padding-left: $spacer*2;
        }
        .share-button {
            flex-basis:40%;
            display:flex;
            flex-direction: column;
            align-items: stretch;
            button {
                display:flex;
                align-items: center;
                span {
                    height:fit-content;
                    white-space: pre;
                }
                input {
                    width:0;
                    flex-basis:0;
                    flex-grow:1;
                    border: none;
                    padding: 0;
                    margin-left: 0.5em;
                }
            }
        }
    }
    canvas {
        width:100%;
        color:var(--text-colour);
        background-color:var(--background-colour);
        margin: $spacer*2 0;
    }
}
</style>