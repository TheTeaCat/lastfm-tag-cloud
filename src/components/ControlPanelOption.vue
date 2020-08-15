<template>
    <label class="option">
        <span class="label">{{ name }}</span>

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

        <label v-if="type=='checkbox'" class="button">
            <input class="checkbox"
                   type="checkbox" 
                   :checked="params.value"
                   @change="$emit('update',$event.target.checked)"/>
            <span class="checkmark"></span>
        </label>

        <button v-if="type=='button'"
                :disabled="params.disabled"
                @click="$emit('clicked')">
                {{ params.label }}
        </button>
    </label>
</template>

<script>
export default {
    props: ['name','type','params'],
}
</script>

<style lang="scss" scoped>
.option {
    display:flex;
    flex-direction: column;
    align-items: center;
    .label {
        margin-bottom: $spacer;
    }
    input, select, button {
        align-self: stretch;
    }
    .button {
        align-self: center;
    }
}
</style>