<template>
    <div>
        <collapse-button v-bind:collapsed="collapsed" @collapse="collapse"/>
        <h2>Tags:</h2>
        <span>//Don't like a tag? Uncheck it here & reshuffle!</span>
        <ol id="tag-list" v-if="!collapsed">
            <li class="tag" v-for='tag in tags' v-bind:key='tag' v-bind:tag='tag'>
                <input type="checkbox" v-model="tag_meta[tag].shown"/>
                <div>
                    <a v-bind:href="tag_meta[tag].url">{{ tag }}</a>:
                    <taggings-list class="artist-list" v-bind:taggings="taggings[tag]"/>
                </div>
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
            TaggingsList,
        },
        props: ['tags','taggings','tag_meta'],
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

<style scoped>
    h2 { display:inline; }

    span { 
        margin: 0 0 0 1vw; 
        color:var(--highlight-colour); 
    }
    @media(orientation:portrait) {
        span {
            margin: 0 0 0 2vw;
        }
    }

    #tag-list {
        list-style:none;
        flex-basis:100%;        
        margin: 0.5vw 0 0 0;
        padding: 1vw 1vw 1vw 2vw;
        border-width:1px;
        border-style:solid;
        border-color:var(--list-border-colour);
        background-color:var(--list-colour);
    }
    @media (orientation:portrait) {
        #tag-list {
            padding: 1vw 2vw 1vw 2vw;
        }
    }
    
    .tag {
        display:flex;
        align-items:start;
    }
    input {
        margin: 0 0.5vw 0 0;
    }
</style>