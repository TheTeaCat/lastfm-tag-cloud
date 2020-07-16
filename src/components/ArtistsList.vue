<template>
    <div class="artists-list">
        <button @click="collapse" class="collapse-button">{{ collapsed ? '+' : '-' }}</button>
        <h2>Artists:</h2>
        <ol v-if="!collapsed">
            <li v-for='artist in artists' :key='artist' :artist='artist'>
                <span class="artist-name">
                    <a :href="'https://www.last.fm/music/'+artist.replace(/ /g,'+')">
                        {{ artist }}</a>
                </span>
                ({{ listens[artist] }} {{ listens[artist]>1 ? 'listens' : 'listen' }})
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: ['artists','listens'],
    data:function(){return{
        collapsed:true,
    }},
    methods: {
        collapse: function(){
            this.collapsed = !this.collapsed
        },
    },
}
</script>

<style lang="scss" scoped>
.artists-list {
    display:flex;
    flex-wrap:wrap;
    align-items: center;
    padding: 0 $spacer*2;
    .collapse-button {
        margin: $spacer*2;
    }
    ol {
        flex-basis:100%;
        border: 1px solid $black;
        padding: $spacer*2;
        background: $red-ll;
        li {
            list-style: decimal;
            margin-left: 2em;
            margin-top: $spacer;
            .artist-name {
                font-weight:$bold;
            }
        }
    }
}
</style>