<template>
    <div>
        <span>{{ name }}:</span>
        <select v-model="selected"
                v-on:change="$emit('update',$event.target.value)">
            <option v-for="option in options" 
                    v-bind:key="option.value" 
                    v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['name','options','selected'],
    }
</script>

<style scoped>
    span { margin: 0 1vw 0 0; }
</style>