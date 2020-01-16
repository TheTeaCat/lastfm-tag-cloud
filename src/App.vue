/* eslint-disable vue/require-v-for-key */
<template>
    <div id="container">
        <control-panel v-bind:username="username" 
                       v-bind:period="period" 
                       v-bind:max_artists="max_artists"
                       @generate="generator.generate(username,period.selected,max_artists.selected)"/>

        <div id="results-container">
            <results v-if="generator.result != undefined && generator.state == undefined" 
                     v-bind:result="generator.result"/>
            <div v-else-if="generator.state != undefined">
              {{ generator.state }}
            </div>
            <div v-else>
                Click "Load Data"!
            </div>
        </div>
    </div>
</template>

<script>
import ControlPanel from "./components/ControlPanel.vue"
import Results from "./components/Results.vue"
import Generator from "./assets/js/Generator.js"

export default {
    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Components ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    components: {
        Results,
        ControlPanel,
    },
    
    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Data ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    data: function() {
      return {
        username:'TheTeaCat',
        period:{selected:'7day',
                options:[
                    {text:'7 Days',value:'7day'},
                    {text:'Month',value:'1month'},
                    {text:'3 Months',value:'3month'},
                    {text:'6 Months',value:'6month'},
                    {text:'Year',value:'12month'},
                    {text:'Overall',value:'overall'}]
                },
        max_artists:{selected:10,
                     options:[
                         {text:'10',value:10},
                         {text:'25',value:25},
                         {text:'50',value:50},
                         {text:'100',value:100}]
                     },
        generator:new Generator(),
    };
},

    /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Computed ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
    computed:{
        possessive_result_username: function () {
            if (this.generator.result.username[this.generator.result.username.length-1].toLowerCase() == 's') {
                return this.generator.result.username+"'"
            } else {
                return this.generator.result.username+"'s"
            }
        },
        displayable_result_period: function () {
            return {'7day':'the last 7 days',
                    '1month':'the last month',
                    '3month':'the last 3 months',
                    '6month':'the last 6 months',
                    '12month':'the last year',
                    'overall':'overall'}[this.generator.result.period]
        }
    }
}
</script>