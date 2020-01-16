<template>
    <ol id="artists-list">
        <li v-for='artist in artists' v-bind:key='artist' v-bind:artist='artist'>
            <span class="artist">{{ artist }}</span> ({{ listens[artist] }} <span v-if="listens[artist]>1">listens</span> <span v-else>listen</span>)
        </li>
    </ol>
</template>

<script>
    export default {
        props: ['artists','listens']
    }
</script>

<style scoped>
.artist {
    font-weight:bold;
}
</style>