<template>
    <footer>
        <ul>
            <li><a href="https://www.last.fm/user/theteacat">My last.fml</a></li>
            <li><a href="https://github.com/PedantiCat/tag-cloud">Github repo</a></li>
        </ul>
    </footer>
</template>

<script>
    export default {
        props: ['collapsed'],
    }
</script>

<style scoped>
    footer {
        border-width:1px;
        border-style:solid;
        margin:1vw 0 1vw 0;
        padding:1vw 1vw 0.9vw 1vw;
    }

    ul li {
        display: inline;
        list-style:none;
    }
    li::before { content:" | " }
    ul li:first-child:before { content:"" }
</style>