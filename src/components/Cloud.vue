<template>
    <div>
        <canvas ref="canvas"
                width="1920"
                height="1200"/>
    </div>
</template>

<script>
    import WordCloud from "wordcloud"

    export default {
        props: ['result'],
        mounted: function(){            
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
        methods: {
            generateTagCloud(){
                this.$emit("generating",true)
                var shownTags = []
                for (var tag of this.cloudWords) {
                    if (this.result.tag_meta[tag[0]].shown) {
                        shownTags.push(tag)
                    }
                }

                this.$refs["canvas"].addEventListener(
                    "wordcloudstop",
                    function(){
                        this.$emit("generating",false)
                        // eslint-disable-next-line no-console
                        console.log("Bruh")
                    }.bind(this)
                )

                var style = getComputedStyle(this.$refs["canvas"]);
                WordCloud(this.$refs["canvas"],{
                    list:shownTags,
                    fontFamily:"Courier",
                    shrinkToFit:true,
                    color:style['color'],
                    backgroundColor:style['background-color'],
                    shuffle:true,
                })
            },
            getDataURL(){
                return this.$refs["canvas"].toDataURL()
            }
        }
    }
</script>

<style scoped>
    div {
        width:100%;
        margin:0 0 3vw 0;
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
</style>