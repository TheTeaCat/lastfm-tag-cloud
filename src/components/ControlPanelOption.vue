<template>
    <div>
        <span>{{ name }}</span>

        <input  v-if="type=='input'"
                :value="params.value"
                @keyup="(e) => e.key == 'Enter' 
                        ? this.$emit('submit')
                        : this.$emit('update',e.target.value)"/>

        <select v-if="type=='select'"
                :value="params.selected"
                @change="$emit('update',$event.target.value)">
            <option v-for="option in params.options" 
                    :key="option.value" 
                    :value="option.value">
                {{ option.text }}
            </option>
        </select>

        <input v-if="type=='checkbox'"
                type="checkbox" 
                :checked="params.value"
                @change="$emit('update',$event.target.checked)"/>

        <button v-if="type=='button'"
                :disabled="params.disabled"
                @click="$emit('clicked')">
                {{ params.label }}
        </button>
    </div>
</template>

<script>
    export default {
        props: ['name','type','params'],
    }
</script>

<style scoped>
    span {
        white-space:nowrap;
        font-size:90%;
        margin:0 0 0.25vw 0;
    }
    div {
        display:flex; 
        flex-direction:column; 
        align-items:stretch; 
        justify-content:space-between;
    }
    input, button, select {
        height:100%;
        padding:0.5vw;
    }
    input[type="checkbox"] {
        margin:0 auto 0 auto;
    }
</style>