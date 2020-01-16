<template>
    <ol id="tag-list">
        <li v-for='tag in tags' v-bind:key='tag' v-bind:tag='tag'><span class="tag">{{ tag }}</span>:
            <ol class="artist-list">
                <li v-for='tagging in taggings[tag]' v-bind:key='tagging.artist'>{{ tagging.artist }}</li>
            </ol>
        </li>
    </ol>
</template>

<script>
    export default {
        props: ['tags','taggings']
    }
</script>

<style scoped>
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