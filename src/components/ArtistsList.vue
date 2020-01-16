<template>
    <p>Artists you've listened to:
        <br><br>
        <ol id="artists-list">
            <li v-for='artist in artists' v-bind:artist='artist'>
                {{ artist }} ({{ listens[artist] }} <span v-if="listens[artist]>1">listens</span> <span v-else>listen</span>)
            </li>
        </ol>
    </p>
</template>

<script>
    export default {
        props: ['artists','listens']
    }
</script>