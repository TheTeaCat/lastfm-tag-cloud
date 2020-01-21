<template>
    <button v-on:click="$emit('collapse')" class="collapse-button">{{ collapsed ? '+' : '-' }}</button>
</template>

<script>
    export default {
        props: ['collapsed'],
    }
</script>

<style scoped>
    button {
        margin:0.5vw 1.5vw 0.5vw 0.5vw;
        padding:0;
        width:1.5em;
        height:1.5em;
    }
    @media(orientation: portrait) {
        button {
            background:var(--end-sections-colour);
        }
    }
</style>