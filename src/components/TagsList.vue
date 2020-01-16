<template>
    <div>
        <button v-on:click="collapse" class="collapse-button">{{ collapsed ? '>' : 'V' }}</button>
        <h2>Tags:</h2>
        <div v-if="!collapsed">
            <li v-for='tag in tags' v-bind:key='tag' v-bind:tag='tag'><span class="tag">{{ tag }}</span>:
                <ol class="artist-list">
                    <li v-for='tagging in taggings[tag]' v-bind:key='tagging.artist'>{{ tagging.artist }}</li>
                </ol>
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['tags','taggings'],
        data: function(){
            return {
                collapsed:true
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
h2 {
    display:inline
}

.tag {
    font-weight:bold;
}

.artist-list {
    display:inline;
}
.artist-list li {
    display:inline;
}

.artist-list li:before {
    content:", "
}
.artist-list li:first-child:before {
    content:""
}
</style>