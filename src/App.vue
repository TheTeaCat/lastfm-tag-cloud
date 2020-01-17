/* eslint-disable vue/require-v-for-key */
<template>
    <div>
        <h1 id="page-title">Tag Cloud Generator!</h1>

        <control-panel v-bind:username="username" 
                       v-bind:period="period" 
                       v-bind:max_artists="max_artists"
                       v-bind:state="generator.state"
                       v-on:update:username="username=$event"
                       v-on:update:period="period.selected=$event"
                       v-on:update:max_artists="max_artists.selected=$event"
                       @generate="generate"/>

        <results ref="results"
                  v-bind:state="generator.state"
                  v-bind:result="generator.result"
                  v-bind:error="generator.error"/>

        <Footer/>
    </div>
</template>

<script>
  import ControlPanel from "./components/ControlPanel.vue"
  import Results from "./components/Results.vue"
  import Footer from "./components/Footer.vue"
  import Generator from "./assets/js/Generator.js"

  export default {
      /**~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Components ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
      components: {
          Results,
          ControlPanel,
          Footer,
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
          tags:undefined,
      };
    },

    methods: {
      async generate() {
        this.$refs["results"].reset()
        await this.generator.generate(this.username,this.period.selected,this.max_artists.selected)
        if (this.generator.result.artists.length > 0) {
          this.$refs["results"].createTagCloud(this.generator)
        }
      }
    }
  }
</script>

<style scoped>
  @import './assets/css/reset.css';
  @import './assets/css/styles.css';

  #page-title {
    margin: 1.5vw 0 1vw 2.5vw;
    border-style: solid;
    border-width: 0 0 2px 0;
    border-color:#f33;
    display:inline-block;
  }
  @media (orientation: portrait) {
    #page-title { margin: 3vw 0 2vw 5vw; }
  }

  .section-container {
    border-width:1px;
    border-style:solid;    
    margin:1vw 0 1vw 0;
    padding:1vw 2vw 1vw 1.5vw;
  }
  @media (orientation: portrait) {
      .section-container { padding:2vw; }
  }
</style>