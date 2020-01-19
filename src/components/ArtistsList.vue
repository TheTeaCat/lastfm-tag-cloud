<template>
    <div>
        <collapse-button v-bind:collapsed="collapsed" @collapse="collapse"/>
        <h2>Artists:</h2>
        <ol id="artist-list" v-if="!collapsed">
            <li v-for='artist in artists' v-bind:key='artist' v-bind:artist='artist'>
                <span class="artist">
                    <a v-bind:href="'https://www.last.fm/music/'+artist.replace(/ /g,'+')">
                    {{ artist }}
                    </a></span>
                ({{ listens[artist] }} <span v-if="listens[artist]>1">listens</span> <span v-else>listen</span>)
            </li>
        </ol>
    </div>
</template>

<script>
    import CollapseButton from "./CollapseButton.vue"

    export default {
        components: {
            CollapseButton
        },
        props: ['artists','listens'],
        data: function(){
            return {
                collapsed:true,
            }
        },
        methods: {
            collapse: function(){
                this.collapsed = !this.collapsed
            }
        }
    }
</script>

<style scoped>
    h2 { display:inline; }

    #artist-list {
        flex-basis:100%;
        margin: 0.5vw 0 0 0;
        padding: 1vw 0 1vw 2vw;
        border-width:1px;
        border-style:solid;
        border-color:var(--list-border-colour);
        background-color:var(--list-colour);        
    }

    .artist { font-weight:bold; }
</style>