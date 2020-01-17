<template>
    <footer>
        <a href="https://www.last.fm/user/theteacat">My last.fml</a>
        | <a href="https://github.com/PedantiCat/tag-cloud">Github repo</a>
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
        padding:0.6vw 1vw 0.5vw 0.5vw;
    }
</style>