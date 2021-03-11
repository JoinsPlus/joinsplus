<template>
  <div>
    <br />
    <h2>Signing in...</h2>
    <img src="https://cdn.discordapp.com/emojis/780159108124901396.gif?v=1" />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Login",
  mounted() {
    fetch(this.$data.api + "/login?code=" + encodeURIComponent(this.$router.currentRoute.query.code));
  },
  methods: {},
  components: {},
  data() {
    return {
      api: process.env.VUE_APP_API,
    };
  },
};
</script>
