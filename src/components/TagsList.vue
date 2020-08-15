<template>
    <div class="tags-list">
        <button @click="collapse" class="collapse-button">{{ collapsed ? '+' : '-' }}</button>
        <h2>Tags:</h2>
        <span>//Don't like a tag? Uncheck it here!</span>

        <ol v-if="!collapsed">
            <li v-for='tag in tags' :key='tag' :tag='tag'>
                <label class="button">
                    <input class="checkbox"
                        type="checkbox" 
                        v-model="tag_meta[tag].shown"
                        @change="$emit('applyTagChanges')"/>
                    <span class="checkmark"></span>
                </label>
                <div class="tag-info">
                    <a class="tag-name" :href="tag_meta[tag].url">{{ tag }}</a> ({{ tag_meta[tag].tot_scrobbles }} {{ tag_meta[tag].tot_scrobbles>1 ? 'listens' : 'listen' }}):
                    <taggings-list :taggings="taggings[tag]"/>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
import TaggingsList from "./TaggingsList.vue"

export default {
    components: {
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

<style lang="scss" scoped>
.tags-list {
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
    >ol {
        flex-basis:100%;
        border: 1px solid var(--border-colour);
        padding: $spacer*2;
        background: var(--list-red);
        :first-child {
            margin-top: 0;
        }
        >li {
            list-style: decimal;
            margin-top: $spacer;
            display:flex;
            align-items: flex-start;
            .tag-info {
                margin-left: $spacer;
                display:inline;
                .tag-name {
                    font-weight:$bold;
                }
            }
        }
    }
}
</style>