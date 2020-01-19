<template>
    <div class="section-container">
        <div class="option">
            <span>Last.fm Username:</span>
            <input v-model="username" ref="username-input"
                   v-on:keyup="(e) => 
                   e.key == 'Enter' 
                   ? this.$emit('generate') 
                   : this.$emit('update:username',e.target.value)"/>
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

        <div id="generate-button-container" class="option">
            <button id="generate-button" 
                    v-bind:disabled="state != undefined"
                    v-on:click="$emit('generate')">
                    Load Data
            </button>
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
    .section-container {
        display: flex;
        flex-wrap:nowrap;
        align-items:center;
    }
    @media (orientation: portrait) {
        .section-container { 
            flex-wrap:wrap;
        }
    }

    .option{
        display:inline;
        padding: 0 2vw 0 0;
    }
    @media (orientation: portrait) {
        .option { 
            flex-basis:60%;
            flex-grow:1;
            margin:0.5vw 0 0.5vw 0;
        }
    }

    @media (orientation:portrait) {
        #generate-button-container {
            flex-grow:1;
            flex-basis:30%;
            display:flex;
            justify-content:flex-end;
            align-self:flex-end;
        }
    }
    @media (orientation:landscape) {
        #generate-button-container:before {
            content:"| ";
            padding:0 2.5vw 0 1vw;
        }
    }
    >>> span { 
        margin: 0 1vw 0 0;
    }
</style>