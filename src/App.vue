<template>
    <div id="app" :theme="theme">
      <Header :theme="theme"
              @toggleTheme="toggleTheme"/>

      <main>
        <control-panel id="control-panel"
                      :username="username"
                      :period="period" 
                      :max_artists="max_artists"
                      :state="generator.state"
                      @update:username="username=$event;$cookies.set('username',$event)"
                      @update:period="period.selected=$event;$cookies.set('period',$event)"
                      @update:max_artists="max_artists.selected=$event;$cookies.set('max_artists',$event)"
                      @generate="generate"/>

        <results ref="results"
                :state="generator.state"
                :result="result"
                :error="error"/>
      </main>

      <Footer/>
    </div>
</template>

<script>
    import Header from "./components/Header.vue"
    import ControlPanel from "./components/ControlPanel.vue"
    import Results from "./components/Results.vue"
    import Footer from "./components/Footer.vue"
    import Generator from "./assets/js/Generator.js"

    export default {
        components: {
            Header,
            ControlPanel,
            Results,
            Footer,
        },

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
        if (this.$cookies.isKey("theme") && this.$cookies.get("theme") == "dark"
            || window.matchMedia("(prefers-color-scheme: dark)").matches) {
            this.theme="dark"
        }

        //Loading state from query, if it exists. If there's at least a username, we generate.
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
        async generate() {
            //If the generator is already generating, we ignore the call to generate().
            if (this.generator.state != undefined) { return }

            this.$refs["results"].clear()
            this.result=undefined
            this.error=undefined

            var response = await this.generator.generate(this.username,
                                                        this.period.selected,
                                                        this.max_artists.selected)
            this.error = response.error
            this.result = response.result
        },
        toggleTheme() {
            this.theme = this.theme ==  "dark" ? "light" : "dark"
            this.$cookies.set("theme",this.theme)
        },
    }
  }
</script>

<style scoped>
    @import './assets/css/reset.css';
    @import './assets/css/styles.css';

    main {
        margin:0 10vw 0 10vw;
    }
    @media(orientation: portrait) {
        main {
            margin: 0 1vw 0 1vw;
        }
    }
</style>