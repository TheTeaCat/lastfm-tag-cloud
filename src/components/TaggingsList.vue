<template>
    <ol>
        <li v-for='(tagging, i) of collapsed ? taggings.slice(0,3) : taggings' 
            :key='i'>{{ tagging.artist + (i == taggings.length-1 ? '. ' : ', ') }}</li
        >

        <li class="collapser"
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

<style lang="scss" scoped>
li {
    display:inline;
}
a {
    text-decoration:none;
    &:hover {
        text-decoration:underline;
    }
}
</style>