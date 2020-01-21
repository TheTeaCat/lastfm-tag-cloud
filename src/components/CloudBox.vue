<template>
    <main>
        <Cloud ref="cloud" 
               :result="result" 
               @generating="generating=$event"/>

        <ul>
            <li id="share-link-container">
                <button id="share-link" class="cloud-button" 
                        v-on:click="copyShareLink">
                    <span id="copy-share-link-title">Copy Link:</span>
                    <input ref="share-link" v-bind:value="share_link" readonly="readonly"/>
                </button>
            </li>

            <li>
                <button class="cloud-button"
                        v-bind:disabled="generating"
                        v-on:click="reshuffle">Reshuffle</button>
            </li>

            <li>
                <a ref="download-link" class="cloud-button"
                download="tag-cloud.png">
                    <button v-on:click="downloadTagCloud"
                            v-bind:disabled="generating">
                            Download Image
                    </button>
                </a>
            </li>
        </ul>
    </main>
</template>

<script>
    import Cloud from "./Cloud.vue"

    export default {
        components:{
            Cloud,
        },
        props:["result"],
        data:function(){return{
            generating:true,
        }},
        methods: {
            reshuffle(){this.$refs['cloud'].generateTagCloud()},
            downloadTagCloud() {
                this.$refs["download-link"].href = this.$refs["cloud"].getDataURL()
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
            },
        }
    }
</script>

<style scoped>
    main {
        margin:0 0 3vw 0;
    }

    ul {
        display:flex;
        justify-content:center;
        align-items:center;
        flex-wrap:nowrap;
    }

    li { 
        margin:0 0 0 1vw; 
        display:inline-block;
        flex-shrink:1;
    }
    ul li:first-child { margin:0; }

    #share-link-container { flex-basis:40%; }
    #copy-share-link-title { flex-shrink:0; }
    #share-link {
        width:100%;
        display:flex;
        align-items:center;
    }
    #share-link input { 
        width:100%;
        border:none;
        padding:0;
        margin:0 0 0 1vw;
    }
    @media(orientation: portrait) {
        button {
            background:var(--end-sections-colour);
        }
    }
</style>