<template>
  <div>
    <p>API is hosted at {{ api }}</p>
    <p>Your API token is {{ token }}</p>
  </div>
</template>

<script>
import store from '../store'

// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      api: process.env.VUE_APP_API,
      token: this.$store.state.token
    };
  },
};
console.log(store.state.token)
</script>
