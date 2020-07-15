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