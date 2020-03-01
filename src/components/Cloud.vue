<template>
    <div>
        <ul id="cloud-mode-options">
            <li>Show me:</li>
            <li>
                <button :disabled="mode=='tags' || generating"
                        @click="generateTagCloud('tags')">
                    Tags
                </button>
            </li>
            <li>
                <button :disabled="mode=='artists' || generating"
                        @click="generateTagCloud('artists')">
                    Artists
                </button>
            </li>
        </ul>
        <canvas ref="canvas"
                width="1920"
                height="1200"/>
    </div>
</template>

<script>
    import WordCloud from "wordcloud"

    export default {
        props: ['result','generating'],
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

            this.generateTagCloud("tags")
        },
        data(){return{
            mode:"tags"
        }},
        methods: {
            async generateTagCloud(mode){
                if (mode != undefined) { this.mode = mode }

                this.$emit("generating",true)

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
                        this.$emit("generating",false)
                    }.bind(this)
                )

                var style = getComputedStyle(this.$refs["canvas"]);
                WordCloud(this.$refs["canvas"],{
                    list:cloudWords,
                    fontFamily:"Roboto",
                    shrinkToFit:true,
                    color:style['color'],
                    backgroundColor:style['background-color'],
                    shuffle:true,
                })
            },
            getDataURL(){ return this.$refs["canvas"].toDataURL() },
        }
    }
</script>

<style scoped>
    div {
        margin:0 0 3vw 0;
        display:inline-block;
        margin-left:auto;
        margin-right:auto;
    }
    
    ul {
        display:flex;
        justify-content:flex-end;
        align-items:center;
        flex-wrap:nowrap;
    }
    li { 
        margin:0 0 0 1vw; 
        display:inline-block;
        flex-shrink:1;
    }
    ul li:first-child { margin:0; }

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
</style>