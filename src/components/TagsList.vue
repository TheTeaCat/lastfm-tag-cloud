<template>
    <div>
        <collapse-button v-bind:collapsed="collapsed" @collapse="collapse"/>
        <h2>Tags:</h2>
        <ol id="tag-list" v-if="!collapsed">
            <li v-for='tag in tags' v-bind:key='tag' v-bind:tag='tag'>
                <span class="tag"><a v-bind:href="tag_meta[tag].url">
                    {{ tag }}</a></span>:
                <taggings-list class="artist-list" v-bind:taggings="taggings[tag]"/>
            </li>
        </ol>
    </div>
</template>

<script>
    import CollapseButton from "./CollapseButton.vue"
    import TaggingsList from "./TaggingsList.vue"

    export default {
        components: {
            CollapseButton,
            TaggingsList
        },
        props: ['tags','taggings','tag_meta'],
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

    #tag-list {
        flex-basis:100%;        
        margin: 0.5vw 0 0 0;
        padding: 1vw 0 1vw 2vw;
        border-width:1px;
        border-style:solid;
        border-color:var(--list-border-colour);
        background-color:var(--list-colour);
    }
    .tag { font-weight:bold; }
</style>