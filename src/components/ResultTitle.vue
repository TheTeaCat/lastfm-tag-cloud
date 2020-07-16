<template>
  <h2 v-if="fetchedData && state == undefined">
    <a :href="'https://www.last.fm/user/'+username">
      {{ username }}</a>{{ artistCount > 0 ? (username[username.length-1].toLowerCase() == "s" ? "'" : "'s") : "" }}
    {{ (artistCount > 0 ? 
            "tag cloud based upon their top " + artistCount + " artists "
            : "hasn't listened to anything ")
        + {'7day':'over the last 7 days',
        '1month':'over the last month',
        '3month':'over the last 3 months',
        '6month':'over the last 6 months',
        '12month':'over the last year',
        'overall':'overall'}[timePeriod]
        + (artistCount > 0 ? ':' : "")
    }}
  </h2>            
  <h2 v-else-if="state == undefined && error != undefined">
      An error occured :'(
      <br><br>
      {{ error }}
  </h2>
  <h2 v-else-if="state != undefined">
      <div class="spinner"></div> {{ state }}
  </h2>
</template>

<script>
export default {
  props: ['fetchedData', 'state', 'username', 'artistCount', 'timePeriod', 'error'],
}
</script>

<style lang="scss" scoped>
@keyframes spinner {
    0%,100%{content:"|"}
    25%{content:"/"}
    50%{content:"-"}
    75%{content:"\\"}
}
.spinner {
    font-family:'Courier New', Courier, monospace;
    display:inline-block;
}
.spinner::after {
    content:"";
    animation: spinner 1s steps(4,end) infinite;
}
</style>