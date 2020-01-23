<template>
    <div>
        <span>{{ name }}:</span>
        <input type="checkbox" :checked="value"
                @change="$emit('update',$event.target.checked)"/>
    </div>
</template>

<script>
    export default {
        props: ['name','value'],
    }
</script>

<style scoped>
    span { white-space:nowrap; }
    div { display:flex; flex-direction:column; align-items:stretch; }
</style>