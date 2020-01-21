<template>
    <div id="control-panel">
        <div class="option" id="username-option">
            <span>Last.fm Username:</span>
            <input :value="username"
                   @keyup="(e) => e.key == 'Enter' 
                            ? this.submit()
                            : this.$emit('update:username',e.target.value)"/>
        </div>

        <control-panel-option class="option" id="period-option"
                              :name="'Period'"
                              :options="period.options"
                              :selected="period.selected"
                              @update="$emit('update:period',$event)"/>

        <control-panel-option class="option" id="max-artists-option"
                              :name="'Max Artists'"
                              :options="max_artists.options"
                              :selected="max_artists.selected"
                              @update="$emit('update:max_artists',$event)"/>

        <div class="option" id="filter-option">
            <span>Generic/Obscene Tag Filter:</span>
            <input type="checkbox" :checked="filtered"
                   @change="$emit('update:filtered',$event.target.checked)"/>
        </div>

        <div class="option" id="generate-button-container">
            <button id="generate-button"
                    :disabled="state != undefined"
                    @click="submit">
                    Load Data
            </button>
        </div>
    </div>
</template>

<script>
    import ControlPanelOption from "./ControlPanelOption.vue"

    export default {
        props: ['username','period','max_artists','filtered','state'],
        components: {
            ControlPanelOption,
        },
        methods:{
            submit(){
                this.$emit('update:username',this.username.replace(/&/g,''))
                this.$emit('generate')
            },
        },
    }
</script>

<style scoped>
    #control-panel {
        margin: 0 0 4vw 0;
        display: flex;
        flex-wrap:nowrap;
        align-items:center;
        justify-content:flex-start;
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
        padding: 0 1.5vw 0 0;
        flex-shrink:1;
    }
    @media (orientation: portrait) {
        .option { 
            flex-basis:60% !important;
            flex-grow:1;
            margin:0.5vw 0 0.5vw 0;
        }
    }
    span { margin: 0 1vw 0 0; }

    #username-option { 
        flex-basis: 25%;
        display:flex;
        align-items:center;
        justify-content:flex-start;

    }
    #filter-option {flex-basis: 15%; }
    
    @media (orientation:portrait) {
        #generate-button-container {
            padding: 0;
            margin:0;
            flex-grow:1;
            flex-basis:30% !important;
            display:flex;
            justify-content:flex-end;
            align-self:flex-end;
        }
    }
    @media (orientation:landscape) {
        #generate-button-container:before {
            content:"| ";
            padding:0 2vw 0 0vw;
        }
    }
</style>