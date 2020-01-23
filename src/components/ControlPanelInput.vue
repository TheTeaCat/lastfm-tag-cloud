<template>
    <div>
        <span>{{ name }}:</span>
        <input :value="value"
                @keyup="(e) => e.key == 'Enter' 
                        ? this.$emit('submit')
                        : this.$emit('update',e.target.value)"/>
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