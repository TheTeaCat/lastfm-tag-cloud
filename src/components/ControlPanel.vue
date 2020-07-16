<template>
    <div id="control-panel">
        <control-panel-option class="username"
                              :name="'Username'"
                              :type="'input'"
                              :params="{value:username}"
                              @update="$emit('update:username',$event)"
                              @submit="this.submit"/>

        <control-panel-option class="tag-filter"
                              :name="'Tag Filter'"
                              :type="'checkbox'"
                              :params="{value:filtered}"
                              @update="$emit('update:filtered',$event)"/>

        <control-panel-option class="period"
                              :name="'Period'"
                              :type="'select'"
                              :params="{options:period.options,
                                        selected:period.selected}"
                              @update="$emit('update:period',$event)"/>

        <control-panel-option class="max-artists"
                              :name="'Max Artists'"
                              :type="'select'"
                              :params="{options:max_artists.options,
                                        selected:max_artists.selected}"
                              @update="$emit('update:max_artists',$event)"/>

        <control-panel-option class="load-data"
                              :name="'Load Data'"
                              :type="'button'"
                              :params="{label:'Go!',
                                        disabled:state!=undefined}"
                              @clicked="submit"/>
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

<style scoped lang="scss">
#control-panel {
    width:100%;
    display:flex;
    align-items: center;
    margin-bottom: $spacer*4;
    >* { padding: 0 $spacer*2; }
    @media (orientation: landscape) {
        >*:first-child { padding-left: 0; }
        >*:last-child { padding-right: 0; }        
    }
    @media(orientation:portrait) {
        flex-wrap:wrap;
        .username { flex-basis:66.6%; }
        .tag-filter { flex-basis:33.3%; }
        .period, .max-artists, .load-data {
            padding-top: $spacer*2;
            flex-basis:33.3%;
        }
    }
}
</style>