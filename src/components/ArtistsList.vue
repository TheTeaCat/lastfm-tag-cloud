<template>
    <div>
        <button v-on:click="collapse" class="collapse-button">{{ collapsed ? '>' : 'V' }}</button>
        <h2>Artists:</h2>
        <div v-if="!collapsed">
            <ol id="artists-list">
                <li v-for='artist in artists' v-bind:key='artist' v-bind:artist='artist'>
                    <span class="artist">{{ artist }}</span> ({{ listens[artist] }} <span v-if="listens[artist]>1">listens</span> <span v-else>listen</span>)
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['artists','listens'],
        data: function(){
            return {
                collapsed:true
            }
        },
        methods: {
            collapse: function(){
                this.collapsed = !this.collapsed
            }
        }
    }
</script>

<style scoped>
h2 {
    display:inline
}

.artist {
    font-weight:bold;
}
</style>