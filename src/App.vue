/* eslint-disable vue/require-v-for-key */
<template>
    <div id="app" v-bind:theme="theme">
        <h1 id="page-title">Tag Cloud Generator!</h1>

      <button id="theme-button" v-on:click="toggleTheme">
        {{ theme == "dark" ? "Light Mode" : "Dark Mode" }}
      </button>

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
                 v-bind:result="result"
                 v-bind:error="error"/>

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
          theme:"light",
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
          result:undefined,
          error:undefined,
          cloudWords:undefined,
      };
    },

    mounted: function(){
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.theme="dark"
      }
    },

    methods: {
      toggleTheme() {
        this.theme = this.theme ==  "dark" ? "light" : "dark"
      },
      async generate() {
        this.$refs["results"].clear()
          this.result=undefined
          this.error=undefined

        var response = await this.generator.generate(this.username,
                                                     this.period.selected,
                                                     this.max_artists.selected)
        this.result = response.result
        this.error = response.error

        if (this.result.artists.length > 0) {
          var minScore = Infinity
          var maxScore = -Infinity
          for (var tag of this.result.tags) {
              if (this.result.scores[tag] < minScore) {
                  minScore = this.result.scores[tag]
              }
              if (this.result.scores[tag] > maxScore) {
                  maxScore = this.result.scores[tag]
              }
          }

          this.cloudWords = []
          for (tag of this.result.tags) {
              /**Biggest should be 200, smallest should be 25.
               * Logarithmic scaling is pretty arbritrary, just what I found looks decent.
               */
              this.cloudWords.push([tag,Math.log10((this.result.scores[tag]-minScore)*99/maxScore+1)/2*175+25])
          }

          this.$refs["results"].createTagCloud(this.cloudWords)
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
    border-color:var(--highlight-colour);
    display:inline-block;
  }
  @media (orientation: portrait) {
    #page-title { margin: 3vw 0 2vw 5vw; }
  }

  #theme-button {
    float:right;
    margin:1vw 1vw 0 0;
  }

  .section-container {
    border-width:1px;
    border-style:solid;    
    border-color:var(--border-colour);
    background:var(--section-colour);
    margin:1vw 0 1vw 0;
    padding:1vw 2vw 1vw 1.5vw;
  }
  @media (orientation: portrait) {
      .section-container { padding:2vw; }
  }
</style>