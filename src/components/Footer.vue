<template>
    <footer>
        <ul>
            <li><a href="https://www.last.fm/user/theteacat">My Last.Fml</a></li>
            <li><a href="https://github.com/PedantiCat/tag-cloud">Github</a> -  Star This!</li>
            <li><a href="https://github.com/TheTeaCat/lastfm-tag-cloud#how-are-the-tags-chosen--scaled">How Are The Tags Chosen & Scaled?</a></li>
             <li><a href="https://github.com/TheTeaCat/lastfm-tag-cloud#what-does-the-tag-filter-do">What Does The Tag Filter Do?</a></li>
       </ul>
    </footer>
</template>

<script>
    export default {
        props: ['collapsed'],
    }
</script>

<style scoped>
    footer { margin:5vw 10vw 3vw 10vw; }
    @media (orientation: portrait) {
        footer {
            margin: 2vw 1vw 1vw 1vw;
            padding:1vw 1.5vw 1vw 1.5vw;
        }
    }

    ul li { display: inline-block; list-style:none; }
    li::before { content:"|"; padding:0 1vw 0 1vw; }
    ul li:first-child:before { content:""; padding:0; }
    @media (orientation:portrait) {
        li::before {
            content: "~ " !important;
            padding: 0 0.5vw 0 0.5vw !important;
        }
        ul li { display: block; }
    }
</style>