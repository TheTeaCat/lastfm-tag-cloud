/* eslint-disable vue/require-v-for-key */
<template>
    <div>
        <h1 id="page-title">Tag Cloud Generator!</h1>

        <control-panel v-bind:username="username" 
                       v-bind:period="period" 
                       v-bind:max_artists="max_artists"
                       @generate="generator.generate(username,period.selected,max_artists.selected)"/>

        <div id="results-container">
            <results v-bind:state="generator.state"
                     v-bind:result="generator.result"/>
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
          period:{selected:'3month',
                  options:[
                      {text:'7 Days',value:'7day'},
                      {text:'Month',value:'1month'},
                      {text:'3 Months',value:'3month'},
                      {text:'6 Months',value:'6month'},
                      {text:'Year',value:'12month'},
                      {text:'Overall',value:'overall'}]
                  },
          max_artists:{selected:25,
                      options:[
                          {text:'10',value:10},
                          {text:'25',value:25},
                          {text:'50',value:50},
                          {text:'100',value:100}]
                      },
          generator:new Generator(),
      };
    },
  }
</script>

<style scoped>
  @import './assets/css/reset.css';
  @import './assets/css/styles.css';

  #page-title {
    margin: 1.5vw 0 1vw 2.5vw;
    border-style: solid;
    border-width: 0 0 1px 0;
    display:inline-block;
  }
  @media (orientation: portrait) {
    #page-title { margin: 3vw 0 2vw 5vw; }
  }

  #results-container {
    border-width:1px;
    border-style:solid;
    margin:1vw 0 1vw 0;
    padding:2vw 1vw 0.5vw 2vw;
  }
  @media (orientation: portrait) {
      #results-container { 
          padding:1.5vw 1.5vw 1.5vw 1.5vw;
      }
  }

</style>