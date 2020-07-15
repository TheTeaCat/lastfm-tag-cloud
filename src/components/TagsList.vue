<template>
    <div>
        <collapse-button :collapsed="collapsed" @collapse="collapse"/>
        <h2>Tags:</h2>
        <span>//Don't like a tag? Uncheck it here!</span>
        <ol id="tag-list" v-if="!collapsed">
            <button id="apply-changes-button" 
                    @click="$emit('applyTagChanges')"
                    :disabled="generating">Apply Changes</button> 
            <li class="tag" v-for='tag in tags' :key='tag' :tag='tag'>
                <input type="checkbox" v-model="tag_meta[tag].shown"/>
                <div>
                    <a :href="tag_meta[tag].url">{{ tag }}</a> ({{ tag_meta[tag].tot_scrobbles }} {{ tag_meta[tag].tot_scrobbles>1 ? 'listens' : 'listen' }}):
                    <taggings-list class="artist-list" :taggings="taggings[tag]"/>
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
        props: ['tags','taggings','tag_meta','generating'],
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
    
    #apply-changes-button {
        float:right;
        height:4ex;
        margin:0 0 1vw 1vw;
        background:var(--background-colour);
    }

    .tag {
        display:flex;
        align-items:flex-start
    }
    input {
        margin: 0 0.5vw 0 0;
    }
</style>