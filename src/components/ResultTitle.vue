<template>
  <h2 v-if="fetchedData && state == undefined">
    <a :href="'https://www.last.fm/user/'+username">
        {{ username }}
    </a>{{ artistCount > 0 ? 
                (username[username.length-1].toLowerCase() == "s" ? "'" : "'s") 
                : "" }}

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
      <spinner/> {{ state }}
  </h2>
</template>

<script>
import Spinner from "./Spinner.vue"

export default {
  components: {
    Spinner
  },
  props: ['fetchedData', 'state', 'username', 'artistCount', 'timePeriod', 'error'],
}
</script>