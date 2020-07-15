<template>
    <div></div>
</template>

<style scoped>
@keyframes spinner {
    0%,100%{content:"|"}
    25%{content:"/"}
    50%{content:"-"}
    75%{content:"\\"}
}
div {
    font-family:'Courier New', Courier, monospace;
    display:inline-block;
}
div::after {
    content:"";
    animation: spinner 1s steps(4,end) infinite;
}
</style>