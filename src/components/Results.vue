<template>
    <div class="section-container">
        <h2 v-if="result != undefined && state == undefined && result.artists.length > 0">
            <a v-bind:href="'https://www.last.fm/user/'+result.username">
                {{ result.username }}</a>{{ (result.username[result.username.length-1].toLowerCase() == "s" ? "'" : "'s") }}
            tag cloud based upon their top 
            {{ result.artists.length }} 
            artists
            {{ {'7day':'over the last 7 days',
                '1month':'over the last month',
                '3month':'over the last 3 months',
                '6month':'over the last 6 months',
                '12month':'over the last year',
                'overall':'overall'}[result.period] }}:
        </h2>
        <h2 v-else-if="result != undefined && state == undefined && error == undefined && result.artists.length == 0">
            {{ result.username }} 
            hasn't listened to anything
            {{ {'7day':'in the past week',
                '1month':'in the past month',
                '3month':'in the past 3 months',
                '6month':'in the past 6 months',
                '12month':'in the past year',
                'overall':'at all'}[result.period] }}!
        </h2>
        <h2 v-else-if="result != undefined && state == undefined && error != undefined">
            An error occured :'(
            <br><br>
            {{ error }}
        </h2>
        <h2 v-else-if="state != undefined">
            <spinner/> {{ state }}
        </h2>
        <h2 v-else>
            Click "Load Data"!
        </h2>

        <div v-show="cloudState != undefined"
             id="cloud-container">

            <div id="canvas-container">
                <canvas id="tag-cloud-canvas" ref="tag-cloud-canvas"
                        width="1920" height="1200"/>
            </div>

            <div id="cloud-buttons">
                <button id="share-link" class="cloud-button"
                        v-on:click="copyShareLink">
                    <span id="copy-share-link-title">Copy Link:</span> 
                    <input ref="share-link" v-bind:value="share_link" readonly="readonly"/>
                </button>

                <button class="cloud-button"
                        v-bind:disabled="cloudState!='generated'"
                        v-on:click="generateTagCloud">Reshuffle</button>

                <a ref="download-link" class="cloud-button"
                download="tag-cloud.png">
                    <button v-on:click="downloadTagCloud"
                            v-bind:disabled="cloudState!='generated'">
                            Download Image
                    </button>
                </a>
            </div>
        </div>

        <artists-list id="artists-list" 
                      v-if="result != undefined && result.artists.length > 0" 
                      v-bind:artists="result.artists" 
                      v-bind:listens="result.listens"/>

        <tags-list id="tags-list" 
                   v-if="result != undefined && result.artists.length > 0" 
                   v-bind:tags="result.tags" 
                   v-bind:taggings="result.taggings"
                   v-bind:tag_meta="result.tag_meta"/>
    </div>
</template>

<script>
    import ArtistsList from "./ArtistsList.vue"
    import TagsList from "./TagsList.vue"
    import Spinner from "./Spinner.vue"
    import WordCloud from "wordcloud"

    export default {
        components: {
            ArtistsList,
            TagsList,
            Spinner,
        },
        props: ['state','result','error'],
        data: function(){
            return {
                cloudState:undefined,
                cloudWords:undefined,
            }
        },
        methods: {
            clear(){
                this.cloudState = undefined
            },

            async createTagCloud(newResult) {
                this.result = newResult
                // eslint-disable-next-line no-console
                console.log(this)
                // eslint-disable-next-line no-console
                console.log(this.result)
                
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

                this.cloudWords = []

                for (tag of this.result.tags) {
                    /**Biggest should be 200, smallest should be 25.
                    * Logarithmic scaling is pretty arbritrary, just what I found looks decent.
                    */
                    this.cloudWords.push([tag,Math.log10((this.result.scores[tag]-minScore)*99/maxScore+1)/2*175+25])
                    /**By default, every tag is shown. */
                    this.result.tag_meta[tag].shown = true;
                }

                this.generateTagCloud()
            },

            generateTagCloud(){
                this.cloudState = "generating"

                var shownTags = []
                for (var tag of this.cloudWords) {
                    if (this.result.tag_meta[tag[0]].shown) {
                        shownTags.push(tag)
                    }
                }

                this.$refs["tag-cloud-canvas"].addEventListener(
                    "wordcloudstop",
                    function(){
                        this.cloudState="generated"
                    }.bind(this)
                )

                var style = getComputedStyle(this.$refs["tag-cloud-canvas"]);
                WordCloud(this.$refs["tag-cloud-canvas"],{
                    list:shownTags,
                    fontFamily:"Courier",
                    shrinkToFit:true,
                    color:style['color'],
                    backgroundColor:style['background-color'],
                    shuffle:true,
                })
            },

            downloadTagCloud() {
                this.$refs["download-link"].href = this.$refs["tag-cloud-canvas"].toDataURL()
            },

            copyShareLink() {
                this.$refs["share-link"].select()
                this.$refs["share-link"].setSelectionRange(0,99999)
                document.execCommand("Copy")
            }
        },
        computed: {
            share_link:function() {
                if (this.result != undefined) {
                    return window.location.origin + window.location.pathname
                     + "?username=" + this.result.username 
                     + "&period=" + this.result.period 
                     + "&max_artists=" + this.result.max_artists 
                }
                return ""
            }
        }
    }
</script>

<style scoped>
    h2 {
        margin: 0 0 1.5vw 0;
    }
    #cloud-container {
        width:100%;
        overflow: auto;
        margin:0 0 4vw 0;
    }
    @media (orientation:landscape){ #cloud-container { margin-top: 1vw; } }

    #canvas-container {
        width:100%;
    }
    canvas {
        display: block;
        margin:1vw auto 1vw auto;
        max-width:100%;
        max-height:70vh;

        background-color:var(--cloud-background-colour);
        color:var(--cloud-text-colour);

        border-width:1px;
        border-style:solid;
        border-color:var(--cloud-border-colour);
        box-sizing:border-box;
        border-radius:3px;
    }

    #cloud-buttons {
        display:flex;
        justify-content:center;
        align-items:center;
        flex-wrap:nowrap;
    }
    .cloud-button { 
        margin:0 0 0 1vw; 
        display:inline-block;
        flex-shrink:1;
        flex-grow:0;
    }
    #cloud-buttons .cloud-button:first-child { 
        margin:0; 
    }
    #copy-share-link-title {
        flex-shrink:0;
    }
    #share-link {
        display:flex;
        align-items:center;
        overflow:hidden;
        flex-basis:40%;
    }
    #share-link input { 
        border:none;
        padding:0;
        flex-grow:1;
        margin:0 0 0 1vw;
    }

    #artists-list, #tags-list {
        margin:1vw;
        padding:1vw;
        display:flex;
        flex-wrap:wrap;
        align-items:center;
    }
    @media(orientation:landscape) {
        #artists-list, #tags-list {
            border-width:1px 0px 1px 0px;
            border-style:solid;
            border-color:var(--list-border-colour);
        }
    }
</style>