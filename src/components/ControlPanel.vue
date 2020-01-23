<template>
    <div id="control-panel">
        <control-panel-option class="option"
                              :name="'Username'"
                              :type="'input'"
                              :params="{value:username}"
                              @update="$emit('update:username',$event)"
                              @submit="this.submit"/>

        <div id="tag-filter">
            <div class="separator" id="first-separator">|</div>
            <control-panel-option class="option" id="tag-filter-option"
                                :name="'Tag Filter'"
                                :type="'checkbox'"
                                :params="{value:filtered}"
                                @update="$emit('update:filtered',$event)"/>
            <div class="separator" id="last-separator">|</div>
        </div>

        <control-panel-option class="option"
                              :name="'Period'"
                              :type="'select'"
                              :params="{options:period.options,
                                        selected:period.selected}"
                              @update="$emit('update:period',$event)"/>

        <control-panel-option class="option"
                              :name="'Max Artists'"
                              :type="'select'"
                              :params="{options:max_artists.options,
                                        selected:max_artists.selected}"
                              @update="$emit('update:max_artists',$event)"/>

        <control-panel-option class="option"
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

<style scoped>
    #control-panel {
        margin: 0 0 4vw 0;
        display: flex;
        justify-content:flex-start;
        align-items:stretch;
        flex-wrap:wrap;
    }
    @media (orientation: portrait) {
        #control-panel { 
            padding:0 1vw 1vw 1vw;
            border-style:solid;
            border-color:var(--section-border-colour);
            border-width:1px;
            border-radius:3px;
            background:var(--end-sections-colour);
        }
    }

    .option {
        padding:0 2vw 0 0;
        box-sizing:border-box;
    }
    #tag-filter {
        display:flex;
    }
    #control-panel .option:last-child {
        margin:0;
    }
    .separator {
        margin:auto 2vw auto 0vw;
    }
    @media (orientation: portrait) {
        #control-panel .option:first-child {
            flex-basis:66%;
        }

        .option {
            margin:1vw 0 0 0 !important;
            flex-basis:33%;
            flex-grow:1;
        }

        #tag-filter {
            flex-grow:0;
            margin-right:auto;
        }
        #tag-filter-option {
            align-items:center;
        }

        #control-panel .option:last-child {
            flex-grow:0;
        }
    }
</style>