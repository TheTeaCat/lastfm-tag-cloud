<template>
    <footer class="section-container">
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
    ul li {
        display: inline;
        list-style:none;
    }
    li::before { content:" | " }
    ul li:first-child:before { content:"" }
</style>