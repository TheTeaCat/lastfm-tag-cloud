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
        display: inline-block;
        list-style:none;
    }
    @media (orientation: landscape) {
        li::before { content:"|"; padding:0 1vw 0 1vw;}
        ul li:first-child:before { content:""; padding:0;}
    }
    @media (orientation:portrait) {
        li::before { content:"~ "; padding:0 0.5vw 0 0.5vw;}
        ul li {
            display: block;
        }
    }
</style>