<template>
    <div>
        <h2>
            {{ result.username + (result.username[result.username.length-1].toLowerCase() == "s" ? "'" : "'s") }}
            tag cloud based upon their top 
            {{ result.artists.length }} 
            artists
            {{ {'7day':'over the last 7 days',
                '1month':'over the last month',
                '3month':'over the last 3 months',
                '6month':'over the last 6 months',
                '12month':'over the last year',
                'overall':'overall'}[result.period] }}:
        </h2>

        <artists-list id="artists-list" v-bind:artists="result.artists" v-bind:listens="result.listens"/>

        <tags-list id="tags-list" v-bind:tags="result.tags" v-bind:taggings="result.taggings"></tags-list>
    </div>
</template>

<script>
import ArtistsList from "./ArtistsList.vue"
import TagsList from "./TagsList.vue"

export default {
    components: {
        ArtistsList,
        TagsList,
    },
    props: ['result']
}
</script>

<style scoped>
h2 {
    margin:1vw;
}

#artists-list, #tags-list {
    border-width:1px 0px 1px 0px;
    border-style:solid;
    margin:1vw;
    padding:1vw;
}
</style>