<template>
    <div id="control-panel">
        <div class="option">
            <span>Last.fm Username:</span>
            <input ref="username-input"
                   v-model="username"
                   v-on:keyup="
                    (e) => e.key == 'Enter' 
                    ? this.submit()
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

        <div class="option"
             id="generate-button-container">
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
        props: ['username','period','max_artists','state'],
        components: {
            ControlPanelOption,
        },
        methods:{
            submit(){
                this.$emit('update:username',this.username.replace(/&/g,''))
                this.$emit('generate')
            },
        },
        mounted:function() {
            if (this.$cookies.isKey("username")){this.$emit("update:username",this.$cookies.get("username"))}
            if (this.$cookies.isKey("period")){this.$emit("update:period",this.$cookies.get("period"))}
            if (this.$cookies.isKey("max_artists")){this.$emit("update:max_artists",this.$cookies.get("max_artists"))}
        },
    }
</script>

<style scoped>
    #control-panel {
        margin: 0 0 4vw 0;
        display: flex;
        flex-wrap:nowrap;
        align-items:center;
    }
    @media (orientation: portrait) {
        #control-panel { 
            padding:1vw;
            flex-wrap:wrap;
            border-style:solid;
            border-color:var(--section-border-colour);
            border-width:1px;
            border-radius:3px;
            background:var(--end-sections-colour);
        }
    }

    .option{
        display:flex;
        align-items:center;
        padding: 0 2vw 0 0;
    }
    @media (orientation: portrait) {
        .option { 
            flex-basis:60%;
            flex-grow:1;
            margin:0.5vw 0 0.5vw 0;
        }
    }
    span { margin: 0 1vw 0 0; }

    @media (orientation:portrait) {
        #generate-button-container {
            padding: 0;
            margin:0;
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
</style>