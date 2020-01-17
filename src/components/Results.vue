<template>
    <div>
        <h2 v-if="result != undefined && state == undefined">
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
        <h2 v-else-if="state != undefined">
            <spinner/> {{ state }}
        </h2>
        <h2 v-else>
            Click "Load Data"!
        </h2>

        <div v-show="generatingCloud"
             id="canvas-container">
            <canvas id="tag-cloud-canvas" ref="tag-cloud-canvas"
                    width="1920" height="1200"/>
        </div>

        <artists-list v-if="result != undefined" id="artists-list" v-bind:artists="result.artists" v-bind:listens="result.listens"/>

        <tags-list v-if="result != undefined" id="tags-list" v-bind:tags="result.tags" v-bind:taggings="result.taggings"/>
    </div>
</template>

<script>
    import ArtistsList from "./ArtistsList.vue"
    import TagsList from "./TagsList.vue"
    import Spinner from "./Spinner.vue"

    export default {
        components: {
            ArtistsList,
            TagsList,
            Spinner,
        },
        props: ['state','result'],
        data: function(){
            return {
                generatingCloud:false,
            }
        },
        methods: {
            createTagCloud(generator) {
                this.generatingCloud = true;
                generator.generate_tag_cloud(this.$refs["tag-cloud-canvas"])
            },
        }
    }
</script>

<style scoped>
    h2 { margin:0 0 1.2vw 0; }
    @media (orientation: portrait) {
        h2 { margin:1vw 1vw 1vw 0; }
    }

    #canvas-container {
        width:100%;
        display: flex;
        justify-content: center;        
    }
    canvas {
        max-height:90vh;
        max-width:100%;
    }

    #artists-list, #tags-list {
        border-width:1px 0px 1px 0px;
        border-style:solid;
        margin:1vw;
        padding:1vw;
    }
</style>