<template>
    <div>
        <span>{{ name }}:</span>
        <select :value="selected"
                @change="$emit('update',$event.target.value)">
            <option v-for="option in options" 
                    :key="option.value" 
                    :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['name','options','selected'],
    }
</script>

<style scoped>
    span { white-space:nowrap; }
    div { display:flex; flex-direction:column; align-items:stretch; }
</style>