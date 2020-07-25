<template>
  <div id="app">
    <header>
      <h1>tag cloud generator</h1>
    </header>

    <main>
      <ControlPanel class="control-panel"
                    :username="username"
                    :period="period" 
                    :max_artists="max_artists"
                    :filtered="filtered"
                    :state="generator.state"
                    @update:username="username=$event;updateCookie()"
                    @update:period="period.selected=$event;updateCookie()"
                    @update:max_artists="max_artists.selected=$event;updateCookie()"
                    @update:filtered="filtered=$event;updateCookie()"
                    @generate="generate"/>

      <ResultTitle class="result-title"
                   :fetchedData="result != undefined"
                   :state="generator.state"
                   :username="result ? result.username : undefined"
                   :artistCount="result ? result.artists.length : undefined"
                   :timePeriod="result ? result.period : undefined"
                   :error="error"/>

      <CloudBox ref="cloud-box"
                v-if="result != undefined && result.artists.length > 0"
                :result="result"
                :building="building"
                @building="building=$event;"/>

      <ArtistsList class="list"
                    v-if="result != undefined && result.artists.length > 0" 
                    :artists="result.artists" 
                    :listens="result.listens"/>

      <TagsList class="list"
                 v-if="result != undefined && result.artists.length > 0" 
                 :tags="result.tags" 
                 :taggings="result.taggings"
                 :tag_meta="result.tag_meta"
                 :building="building"
                 @applyTagChanges="$refs['cloud-box'].generateTagCloud('tags')"/>
    </main>

    <footer>
      <ul>
        <li><a href="https://www.last.fm/user/theteacat">My Last.Fml</a></li>
        <li><a href="https://github.com/PedantiCat/tag-cloud">Github</a> -  Star This!</li>
        <li><a href="https://github.com/TheTeaCat/lastfm-tag-cloud#how-are-the-tags-chosen--scaled">How Are The Tags Chosen & Scaled?</a></li>
        <li><a href="https://github.com/TheTeaCat/lastfm-tag-cloud#what-does-the-tag-filter-do">What Does The Tag Filter Do?</a></li>
      </ul>
      <div class="other-projects">Check out my other projects: <a href="http://picto.uk/">Picto</a>, <a href="https://theteacat.github.io/albums-by-year/">Albums-By-Year</a></div>
      <button class="theme-button" @click="changeTheme()">{{ theme.label }}</button>
    </footer>
  </div>
</template>

<script>
import ControlPanel from "./components/ControlPanel.vue"
import CloudBox from "./components/CloudBox.vue"
import ArtistsList from "./components/ArtistsList.vue"
import TagsList from "./components/TagsList.vue"
import ResultTitle from "./components/ResultTitle.vue"
import Generator from "./assets/js/Generator.js"

export default {
  components: {
    ControlPanel,
    CloudBox,
    ArtistsList,
    TagsList,
    ResultTitle,
  },
  data:function(){return{
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
    filtered:false,
    generator:new Generator(),
    result:undefined,
    error:undefined,
    cloudWords:undefined,
    building:true,
    theme: { 'label':'System Theme', 'value':''},
    themes: [{ 'label':'System Theme', 'value':''},
             { 'label':'Dark Theme', 'value':'dark'},
             { 'label':'Light Theme', 'value':'light'}]
  }},
  mounted: function(){
    //Loading theme from cookies.
    if (this.$cookies.isKey("theme")) {
      this.theme = this.$cookies.get("theme")
      document.getElementsByTagName("html")[0].setAttribute("theme", this.theme.value)
    }

    //Loading state from cookies.
    if (this.$cookies.isKey("config")) {
      this.username = this.$cookies.get("config").username
      this.period.selected = this.$cookies.get("config").period
      this.max_artists.selected = this.$cookies.get("config").max_artists
      this.filtered = this.$cookies.get("config").filtered
    }

    //Loading state from query, if it exists. If there's at least a username, we generate.
    if (this.period.options.some(
      function(option){return option.value==this.$route.query.period}.bind(this))
    ) { this.period.selected = this.$route.query.period }
    if (this.max_artists.options.some(
      function(option){return option.value==this.$route.query.max_artists}.bind(this))
    ) { this.max_artists.selected = this.$route.query.max_artists }
    if (this.$route.query.filtered != undefined) {
      this.filtered = {"true":true,"false":false}[this.$route.query.filtered]
    } if (this.$route.query.username != undefined) { 
      this.username = this.$route.query.username
      this.$router.push(this.$route.path)
      this.generate()
    }
  },
  methods: {
    async generate() {
      //If the generator is already generating, we ignore the call to generate().
      if (this.generator.state != undefined) { return }

      this.result=undefined
      this.error=undefined

      var response = await this.generator.generate(this.username,
                              this.period.selected,
                              this.max_artists.selected,
                              this.filtered)
      this.error = response.error
      this.result = response.result
    },
    updateCookie() {
      this.$cookies.set('config',{
        username:this.username,
        period:this.period.selected,
        max_artists:this.max_artists.selected,
        filtered:this.filtered,
      })
    },
    changeTheme() {
      this.theme = this.themes[(this.themes.map(t => {return t.label}).indexOf(this.theme.label)+1) % this.themes.length]
      document.getElementsByTagName("html")[0].setAttribute("theme", this.theme.value)
      this.$cookies.set('theme', this.theme)
    }
  },
}
</script>

<style lang="scss" scoped>
#app { 
  max-width:1080px;
  margin: 0 auto;
  padding: $spacer*2;
  min-height:100%;
  display:flex;
  flex-direction: column;
}
header {
  width:100%;
  padding: $spacer*4;
  padding-top: $spacer*2;
  h1 { 
    color: var(--text-alt-colour);
    @media(orientation: portrait) {
      width:100%;
      text-align:center;
    }
  }
}
main {
  flex-grow:1;
  >* {
    margin-bottom: $spacer*4;
  }
  .control-panel {
    margin-bottom: $spacer*8;
  }
  .artists-list, .tags-list {
    margin-bottom: 0;
  }
}
footer {
  margin-bottom: $spacer;
  margin-top: $spacer*6;
  position:relative;
  ul {
    >* {
      margin-left: 1em;
      margin-top: $spacer*2;
      box-sizing: content-box;   
      &:before {
        content: "~";
        margin-right: 1em;
      }
    }
    @media (orientation: landscape) {
      >* {
        display:inline;
        &:before {
          content: "|";
        }
        &:first-child {
          margin-left:0;
          &:before {
            content: "";
            margin-right:0;
          }
        }
      }
    }
  }
  .other-projects {
    display:inline-block;
    margin: 1em 0;
    @media(orientation: portrait) {
      margin-left:1em;
    }
  }
  .theme-button {
    float:right;
    margin-left: 1em;
  }
}
</style>