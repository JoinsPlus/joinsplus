<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <img class="logo" src="./assets/logo.png" />
      </router-link>
      <template v-if="!$router.currentRoute.path.startsWith('/dashboard')">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/faq">FAQ</router-link> |
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/dashboard" class="login">Dashboard</router-link>
      </template>
      <template v-if="$router.currentRoute.path.startsWith('/dashboard')">
        <router-link to="/dashboard">Overview</router-link>
        <a class="login">
          <img :src="$store.state.pfp" class="pfp" />
          {{ $store.state.username }}
        </a>
        <div class="menu">
          <router-link to="/dashboard/account">Account</router-link>
          <div class="menudiv"></div>
          <a v-on:click="logout">Logout</a>
        </div>
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit('l'gout))
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  font-size: 18px;
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: rgb(211, 211, 211);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b960;
}

.pfp {
  height: 35px;
  float: left;
  border-radius: 100%;
  margin-right: 8px;
  transform: translateY(-5px);
}

.login {
  position: absolute;
  right: 18px;
  top: 18px;
}

.logo {
  margin: 7.5px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
}
</style>
