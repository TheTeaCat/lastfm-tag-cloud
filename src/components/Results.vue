<template>
    <div>
        <h2 v-if="result != undefined && state == undefined && result.artists.length > 0">
            <a :href="'https://www.last.fm/user/'+result.username">
                {{ result.username }}</a>{{ (result.username[result.username.length-1].toLowerCase() == "s" ? "'" : "'s") }}
            tag cloud based upon their top 
            {{ result.artists.length }} 
            artists
            {{ {'7day':'over the last 7 days',
                '1month':'over the last month',
                '3month':'over the last 3 months',
                '6month':'over the last 6 months',
                '12month':'over the last year',
                'overall':'overall'}[result.period] }}:
        </h2>
        <h2 v-else-if="result != undefined && state == undefined && error == undefined && result.artists.length == 0">
            <a :href="'https://www.last.fm/user/'+result.username">
                {{ result.username }}</a>
            hasn't listened to anything
            {{ {'7day':'in the past week',
                '1month':'in the past month',
                '3month':'in the past 3 months',
                '6month':'in the past 6 months',
                '12month':'in the past year',
                'overall':'at all'}[result.period] }}!
        </h2>
        <h2 v-else-if="state == undefined && error != undefined">
            An error occured :'(
            <br><br>
            {{ error }}
        </h2>
        <h2 v-else-if="state != undefined">
            <spinner/> {{ state }}
        </h2>
        <h2 v-else>
            Click "Load Data"!
        </h2>

        <CloudBox ref="cloud-box"
                  v-if="result != undefined && result.artists.length > 0"
                  :result="result"
                  :generating="generating"
                  @generating="generating=$event"/>

        <artists-list class="list"
                      v-if="result != undefined && result.artists.length > 0" 
                      :artists="result.artists" 
                      :listens="result.listens"/>

        <tags-list class="list"
                   v-if="result != undefined && result.artists.length > 0" 
                   :tags="result.tags" 
                   :taggings="result.taggings"
                   :tag_meta="result.tag_meta"
                   :generating="generating"
                   @applyTagChanges="applyTagChanges"/>
    </div>
</template>

<script>
    import Spinner from "./Spinner.vue"
    import CloudBox from "./CloudBox.vue"
    import ArtistsList from "./ArtistsList.vue"
    import TagsList from "./TagsList.vue"

    export default {
        components: {
            Spinner,
            CloudBox,
            ArtistsList,
            TagsList,
        },    
        props: ['state','result','error'],
        data: function(){return{
            generating:true,
        }},
        methods: {
            clear(){
                this.cloudState = undefined
            },
            applyTagChanges(){
                this.$refs['cloud-box'].reshuffle()
            },
        },
    }
</script>

<style scoped>
    h2 { margin:0 0 4vw 0; }

    .list {
        margin:1vw;
        padding:1vw;
        display:flex;
        flex-wrap:wrap;
        align-items:center;
    }
    @media(orientation:landscape) {
        .list {
            border-width:1px 0px 1px 0px;
            border-style:solid;
            border-color:var(--list-border-colour);
        }
    }
</style>