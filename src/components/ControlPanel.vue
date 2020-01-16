<template>
    <div>
        Last.fm Username:
        <input v-model="username"/>

        <button v-on:click="$emit('generate')">Load Data</button>

        Time Period:
        <select v-model="period.selected">
            <option v-for="option in period.options" v-bind:key="option.value" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>

        Max Artists:
        <select v-model="max_artists.selected">
            <option v-for="option in max_artists.options" v-bind:key="option.value" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['username','period','max_artists']
    }
</script>