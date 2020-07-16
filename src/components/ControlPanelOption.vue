<template>
    <div class="option">
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

        <label v-if="type=='checkbox'" class="checkbox-container">
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
    </div>
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
    .checkbox-container {
        @extend button;
        align-self: center;
        width:auto;
        .checkbox {
            display:none;
        }
        .checkmark:after {
            display:none;
            content:"";
            height:90%;
            width:40%;
            margin: auto;
            transform: translate(10%, -10%) rotate(45deg);
            border: solid $black;
            border-width: 0px 3px 3px 0px;
        }
        .checkbox:checked ~ .checkmark:after {
            display:block;
        }
    }
}
</style>