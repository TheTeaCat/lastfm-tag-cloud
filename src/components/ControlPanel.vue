<template>
    <div id="container">
        <div class="option">
            <span>Last.fm Username:</span>
            <input v-model="username" ref="username-input"
                   v-on:keyup="(e) => e.key == 'Enter' ? this.$emit('generate') : this.$emit('update:username',e.target.value)"/>
        </div>

        <control-panel-option class="option"
                              v-bind:name="'Period'"
                              v-bind:options="period.options"
                              v-bind:selected="period.selected"
                              v-on:update="$emit('update:period',$event)"/>

        <control-panel-option class="option"
                              v-bind:name="'Max Artists'"
                              v-bind:options="max_artists.options"
                              v-bind:selected="max_artists.selected"
                              v-on:update="$emit('update:max_artists',$event)"/>

        <div id="button-container">
            <button :loading="state != undefined ? 'true' : 'false'" v-on:click="$emit('generate')">Load Data</button>
        </div>
    </div>
</template>

<script>
    import ControlPanelOption from "./ControlPanelOption.vue"

    export default {
        components: {
            ControlPanelOption
        },
        props: ['username','period','max_artists','state'],
    }
</script>

<style scoped>
    #container {
        border-width:1px;
        border-style:solid;

        margin:1vw 0 1vw 0;
        padding:0.6vw 1vw 0.5vw 0.5vw;

        display: flex;
        flex-wrap:nowrap;
        align-items:center;
    }
    @media (orientation: portrait) {
        #container { 
            padding:1vw 1.5vw 1vw 1vw;
            flex-wrap:wrap;
        }
    }

    .option{
        display:inline;
        margin:0.5vw 0 0.5vw 0;
        padding: 0 2vw 0 0;
    }
    @media (orientation: portrait) {
        .option { 
            flex-basis:60%;
            margin:0.5vw 0 0.5vw 0;
        }
    }

    #button-container {
        flex-grow:1;
        display:flex;
        justify-content:flex-end;
    }
    button {
        border-width:3px;
        box-sizing:border-box;
    }

    @keyframes loading {
        0% {border-color:#f33}
        50% {border-color:#000}
    }
    button[loading = "false"] { border-color:#f33 }
    button[loading = "true"] { animation: loading 0.5s steps(1,end) infinite; }

    span { 
        font-weight:bold;
        margin:0 0.5vw 0 0.5vw;
    }
</style>