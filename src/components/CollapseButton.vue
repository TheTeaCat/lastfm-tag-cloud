<template>
    <button @click="$emit('collapse')" class="collapse-button">{{ collapsed ? '+' : '-' }}</button>
</template>

<script>
export default {
    props: ['collapsed'],
}
</script>