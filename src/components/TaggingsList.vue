<template>
    <ol>
        <li v-for='tagging in collapsed ? taggings.slice(0,3) : taggings' 
            :key='tagging.artist'>{{ tagging.artist }}</li
        >{{ collapsed && taggings.length > 3 ? ', ' : '. ' }}

        <li id="collapser"
            v-if="taggings.length > 3" 
            @click="toggle">
            <a>{{ collapsed ? "show more..." : "show less" }}</a>
        </li>
    </ol>
</template>

<script>
export default {
    props:['taggings'],
    data:function(){return{
        collapsed:true,
    }},
    methods: {
        toggle: function() {
            this.collapsed = !this.collapsed;
        },
    },
}
</script>