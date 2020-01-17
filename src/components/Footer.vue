<template>
    <footer class="section-container">
        <ul>
            <li><a href="https://www.last.fm/user/theteacat">My Last.Fml</a></li>
            <li><a href="https://github.com/PedantiCat/tag-cloud">Github</a></li>
            <li><a href="https://github.com/TheTeaCat/lastfm-tag-cloud#how-are-the-tags-chosen--scaled">How Are The Tags Chosen?</a></li>
        </ul>
    </footer>
</template>

<script>
    export default {
        props: ['collapsed'],
    }
</script>

<style scoped>
    ul li {
        display: inline;
        list-style:none;
    }
    li::before { content:" | " }
    ul li:first-child:before { content:"" }
</style>