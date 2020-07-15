<template>
    <div>
        <collapse-button :collapsed="collapsed" @collapse="collapse"/>
        <h2>Artists:</h2>
        <ol id="artist-list" v-if="!collapsed">
            <li v-for='artist in artists' :key='artist' :artist='artist'>
                <span class="artist">
                    <a :href="'https://www.last.fm/music/'+artist.replace(/ /g,'+')">
                        {{ artist }}
                    </a>
                </span>
                ({{ listens[artist] }} {{ listens[artist]>1 ? 'listens' : 'listen' }})
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