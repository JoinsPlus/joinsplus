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
    fetch(this.$data.api + "/login?code=" + encodeURIComponent(this.$router.currentRoute.query.code)).then((response) => {
      response.json().then((data) => {
        this.$store.commit('setToken', data.jwt)
        this.$store.commit('setUsername', data.user.username)
        this.$store.commit('setPfp', `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}`)
        this.$router.push('/dashboard')
      })
    })
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
