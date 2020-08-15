<template>
    <div class="artists-list">
        <button @click="collapse" class="collapse-button">{{ collapsed ? '+' : '-' }}</button>
        <h2>Artists:</h2>
        <span>//Don't like an artist? Uncheck them here!</span>

        <ol v-if="!collapsed">
            <li v-for='(artist, i) of artists' :key='i' :artist='artist'>
                <label class="button">
                    <input class="checkbox"
                        type="checkbox" 
                        v-model="artists_shown[artist]"
                        @change="$emit('applyArtistChanges')"/>
                    <span class="checkmark"></span>
                </label>
                <div class="artist-info">
                    <span class="artist-name">{{ i+1 }} - 
                        <a :href="'https://www.last.fm/music/'+artist.replace(/ /g,'+')">{{ artist }}</a>
                    </span>
                    ({{ listens[artist] }} {{ listens[artist]>1 ? 'listens' : 'listen' }})
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: ['artists','listens','artists_shown'],
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
    >span {
        color: var(--text-alt-colour);
        font-weight: $bold;
        margin-left: $spacer*2;
    }
    ol {
        flex-basis:100%;
        border: 1px solid var(--border-colour);
        padding: $spacer*2;
        background: var(--list-red);
        :first-child {
            margin-top: 0;
        }
        li {
            list-style: decimal;
            margin-top: $spacer;
            display:flex;
            align-items: center;
            .artist-info {
                margin-left: $spacer;
                display:inline;
                .artist-name {
                    font-weight:$bold;
                }
            }
        }
    }
}
</style>