<template>
    <div id="spinner"></div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    @keyframes spinner {
        0%,100%{content:"|"}
        25%{content:"/"}
        50%{content:"-"}
        75%{content:"\\"}
    }
    #spinner {
        display:inline-block;
    }
    #spinner::after {
        content:"";
        animation: spinner 1s steps(4,end) infinite;
    }
</style>