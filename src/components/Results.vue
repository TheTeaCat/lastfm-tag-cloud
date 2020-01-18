<template>
    <div class="section-container">
        <h2 v-if="result != undefined && state == undefined && result.artists.length > 0">
            {{ result.username + (result.username[result.username.length-1].toLowerCase() == "s" ? "'" : "'s") }}
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
            <a v-show="cloudState=='generated'" ref="download-link" download="tag-cloud.png">
                <button v-on:click="downloadTagCloud">Download Image</button>
            </a>
        </div>

        <artists-list id="artists-list" 
                      v-if="result != undefined && result.artists.length > 0" 
                      v-bind:artists="result.artists" 
                      v-bind:listens="result.listens"/>

        <tags-list id="tags-list" 
                   v-if="result != undefined && result.artists.length > 0" 
                   v-bind:tags="result.tags" 
                   v-bind:taggings="result.taggings"/>
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
            }
        },
        methods: {
            clear(){
                this.cloudState = undefined
            },
            async createTagCloud(words) {
                this.cloudState = "generating"

                this.$refs["tag-cloud-canvas"].addEventListener(
                    "wordcloudstop",
                    function(){
                        this.cloudState="generated"
                    }.bind(this)
                )

                var style = getComputedStyle(this.$refs["tag-cloud-canvas"]);
                WordCloud(this.$refs["tag-cloud-canvas"],{
                    list:words,
                    fontFamily:"Courier",
                    shrinkToFit:true,
                    color:style['color'],
                    backgroundColor:style['background-color'],
                })
            },
            downloadTagCloud() {
                this.$refs["download-link"].href = this.$refs["tag-cloud-canvas"].toDataURL()
            }
        }
    }
</script>

<style scoped>
    #cloud-container {
        width:100%;
        overflow: auto;
    }

    #canvas-container {
        width:100%;
    }
    canvas {
        display: block;
        margin:1vw auto 1vw auto;
        max-width:100%;
        max-height:90vh;

        background-color:var(--background-colour);
        color:var(--cloud-text-colour);

        border-width:1px;
        border-style:solid;
        border-color:var(--border-colour);
        box-sizing:border-box;
    }

    #cloud-container a { 
        float:right;
    }

    #artists-list, #tags-list {
        border-width:1px 0px 1px 0px;
        border-style:solid;
        border-color:var(--border-colour);
        margin:1vw;
        padding:1vw;
    }
    #tags-list { margin: 1vw 1vw 0 1vw; }
</style>