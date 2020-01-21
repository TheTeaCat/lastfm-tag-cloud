<template>
    <ol>
        <li v-for='tagging in collapsed ? taggings.slice(0,3) : taggings' 
            v-bind:key='tagging.artist'>{{ tagging.artist }}</li
        >{{ collapsed && taggings.length > 3 ? ', ' : '. ' }}

        <li id="collapser"
            v-if="taggings.length > 3" 
            v-on:click="toggle">
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

<style scoped>
    ol { display:inline; }
    ol li { display:inline; }

    li:before { content:", "; }
    li:first-child:before { content:""; }
    #collapser:before { content:""; }

    a { color:var(--text-colour)}
</style>