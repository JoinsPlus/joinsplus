<template>
  <div>
    <h1>Welcome to the debug page</h1>
    <p>
      <strong
        >This should only be accessed by people who know what they are
        doing!</strong
      >
    </p>
    <div class="requestMaker">
      <input v-model="request.path" />
    </div>
  </div>
</template>

<script>
import store from "../store";

// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      api: process.env.VUE_APP_API,
      token: this.$store.state.token,
      request: {
        path: "",
      },
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },
};

//console.log(store.state.token);
</script>
