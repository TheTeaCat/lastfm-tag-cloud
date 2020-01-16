<template>
    <div>
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

        <tags-list v-bind:tags="result.tags" v-bind:taggings="result.taggings"></tags-list>
        <artists-list v-bind:artists="result.artists" v-bind:listens="result.listens"/>
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