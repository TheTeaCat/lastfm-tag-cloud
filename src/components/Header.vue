<template>
    <header>
        <h1>tag cloud generator</h1>
        <button @click="$emit('toggleTheme')">
            {{ theme == "dark" ? "Light Mode" : "Dark Mode" }}
        </button>
    </header>
</template>

<script>
    export default {
        props:['theme'],
    }
</script>

<style scoped>
    header {
        background:var(--header-background);
        margin:0 0 1vw 0;
    }
    @media (orientation: landscape) {
        header { padding:1vw 10vw 1vw 10vw; }
    }

    h1 {
        margin: 0.5vw 0 0.5vw 2.5vw;
        display:inline-block;
        font-family: 'Varela Round', sans-serif;
    }
    @media (orientation: portrait) {
        h1 { margin: 3vw 0 2vw 5vw; }
    }

    button { position:absolute; right:1vw; padding:0.5vw; }
    @media (orientation: portrait) {
        button {
            margin:1vw 1vw 0 0;
        }
    }
</style>