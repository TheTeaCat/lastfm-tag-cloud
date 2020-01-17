<template>
    <div id="container">
        <div id="username-entry">
            <span>Last.fm Username:</span>
            <input v-model="username"
                   v-on:change="$emit('update:username',$event.target.value)"/>
        </div>

        <control-panel-option v-bind:name="'Period'"
                              v-bind:options="period.options"
                              v-bind:selected="period.selected"
                              v-on:update="$emit('update:period',$event)"/>

        <control-panel-option v-bind:name="'Max Artists'"
                              v-bind:options="max_artists.options"
                              v-bind:selected="max_artists.selected"
                              v-on:update="$emit('update:max_artists',$event)"/>

        <div class="option" id="button-container">
            <button id="generate-button" :loading="state != undefined ? 'true' : 'false'" v-on:click="$emit('generate')">Load Data</button>
        </div>
    </div>
</template>

<script>
    import ControlPanelOption from "./ControlPanelOption.vue"

    export default {
        components: {
            ControlPanelOption
        },
        props: ['username','period','max_artists','state']
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
        align-items:center;
    }
    @media (orientation: portrait) {
        #container { 
            padding:1vw 1.5vw 1vw 1vw;
        }
    }

    #username-entry{ display:inline; }
    @media (orientation: portrait) {
        #username-entry { 
            flex-basis:60%;
            flex-grow:1;
            margin:0.5vw 0 0.5vw 0;
        }
    }

    #button-container {
        flex-grow:1;
        display:flex;
        justify-content:flex-end;
    }
    @media (orientation: portrait) {
        #button-container { 
            flex-basis:30%;
        }
    }

    #generate-button {
        margin:0 0 0 1vw;
        font-weight:bold;
        background:#fff;
        border-style:dashed;
        border-width:3px;
        box-sizing:border-box;
    }

    @keyframes rainbow {
        100%,0% {border-color:rgb(255,255,0)}
        33% {border-color:rgb(255,0,255)}
        66% {border-color:rgb(0,255,255)}
    }
    @keyframes loading {
        0% {border-color:rgb(255,0,0)}
        50% {border-color:rgb(0,255,0)}
    }
    #generate-button[loading = "false"] { animation:rainbow 2s linear infinite; }
    #generate-button[loading = "true"] { animation: loading 0.5s steps(1,end) infinite; }

    span { 
        font-weight:bold;
        margin:0 0.5vw 0 0.5vw;
    }
</style>