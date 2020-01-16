<template>
    <div id="container">
        <div class="option">
            <span>Last.fm Username:</span>
            <input v-model="username"/>
        </div>

        <div class="option">
            <span>Time Period:</span>
            <select v-model="period.selected">
                <option v-for="option in period.options" v-bind:key="option.value" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>

        <div class="option">
            <span>Max Artists:</span>
            <select v-model="max_artists.selected">
                <option v-for="option in max_artists.options" v-bind:key="option.value" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>

        <div class="option" id="button-container">
            <button v-on:click="$emit('generate')">Load Data</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['username','period','max_artists']
    }
</script>

<style scoped>
    #container {
        border-width:1px;
        border-style:solid;
        margin:1vw 0 1vw 0;
        padding:0.6vw 1vw 0.5vw 0.5vw;

        display: flex;
        flex-wrap:wrap;
    }
    @media (orientation: portrait) {
        #container { 
            padding:1vw 1.5vw 1vw 1vw;
            flex-direction:row;
        }
    }

    .option { display:inline; }
    @media (orientation: portrait) {
        .option { 
            flex-basis:60%;
            flex-grow:1;
            margin:0.5vw 0 0.5vw 0;
        }
    }

    button { margin:0 0 0 1vw; }
    @media (orientation: portrait) {
        #button-container { 
            flex-basis:30%;
            align-self:flex-end;

            display:flex;
            justify-content:flex-end;
        }
    }

    span { margin:0 0.5vw 0 1vw; }
    span:first-child { margin:0 0.5vw 0 0.5vw; }
</style>