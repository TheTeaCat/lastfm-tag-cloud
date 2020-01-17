<template>
    <div>
        <span>{{ name }}: </span>
        <select v-model="selected">
            <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['name','options','selected']
    }
</script>

<style scoped>
    span { 
        font-weight:bold;
        margin:0 0.5vw 0 0.5vw;
    }

    div { display:inline; }
    @media (orientation: portrait) {
        div { 
            flex-basis:60%;
            flex-grow:1;
            margin:0.5vw 0 0.5vw 0;
        }
    }
</style>