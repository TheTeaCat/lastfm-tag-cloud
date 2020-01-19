/* eslint-disable vue/require-v-for-key */
<template>
    <div id="app" v-bind:theme="theme">
      <header>
        <h1 id="page-title">tag cloud generator</h1>
        <button id="theme-button" v-on:click="toggleTheme">
          {{ theme == "dark" ? "Light Mode" : "Dark Mode" }}
        </button>
      </header>

        <control-panel :username="username"
                       :period="period" 
                       :max_artists="max_artists"
                       :state="generator.state"
                       @update:username="username=$event"
                       @update:period="period.selected=$event"
                       @update:max_artists="max_artists.selected=$event"
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

      if (this.period.options.some(
          function(option){return option.value==this.$route.query.period}.bind(this))
      ) { this.period.selected = this.$route.query.period }

      if (this.max_artists.options.some(
          function(option){return option.value==this.$route.query.max_artists}.bind(this))
      ) { this.max_artists.selected = this.$route.query.max_artists }

      if (this.$route.query.username != undefined) { 
        this.username = this.$route.query.username 
        this.generate()
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

  header {
    background:var(--header-background);
    margin:0;
  }
  @media (orientation: landscape) {
    header {
      padding:1vw 10vw 1vw 10vw;
    }
  }

  #page-title {
    margin: 0.5vw 0 0.5vw 2.5vw;
    display:inline-block;
    font-family: 'Varela Round', sans-serif;
  }
  @media (orientation: portrait) {
    #page-title { margin: 3vw 0 2vw 5vw; }
  }

  #theme-button {
    float:right;
  }
  @media (orientation: portrait) {
    #theme-button { margin:1vw 1vw 0 0; font-size:75%; }
  }

  .section-container {
    background:var(--section-background-colour);
    margin:1vw 10vw 1vw 10vw;
    padding:1vw 2vw 1vw 1.5vw;
    border-radius:2vw;
  }
  @media (orientation: portrait) {
      .section-container { 
        padding:2vw;
        margin: 1vw;
      }
  }
</style>