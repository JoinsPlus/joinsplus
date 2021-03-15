<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <img class="logo" src="./assets/logo.png" />
      </router-link>
      <template v-if="!$router.currentRoute.path.startsWith('/dashboard')">
        <router-link to="/">{{ $t("Home") }}</router-link> |
        <router-link to="/about">{{ $t("About") }}</router-link> |
        <router-link to="/faq">{{ $t("FAQ") }}</router-link> |
        <router-link to="/privacy">{{ $t("Privacy") }}</router-link>
        <router-link to="/dashboard" class="login">
          {{ $t("Dashboard") }}
        </router-link>
      </template>
      <template v-if="$router.currentRoute.path.startsWith('/dashboard')">
        <router-link to="/dashboard">{{ $t("Overview") }}</router-link>
        <a class="login" v-on:click="menuToggle">
          <img :src="$store.state.pfp" class="pfp" />
          {{ $store.state.username }}
        </a>
        <div class="menu" v-if="menu">
          <router-link to="/dashboard/account">
            <i class="fas fa-user"></i>
            {{ $t("Account") }}
          </router-link>
          <br />
          <div class="spacer"></div>
          <router-link to="/dashboard/settings">
            <i class="fas fa-cog"></i>
            {{ $t("Settings") }}
          </router-link>
          <br />
          <div class="spacer"></div>
          <a>
            <i class="fas fa-language"></i>
            {{ $t("Language") }}
          </a>
          <LanguageSelect v-if="langSelect" />
          <br />
          <div class="spacer"></div>
          <div class="menudiv"></div>
          <a v-on:click="logout" class="logout">
            <i class="fas fa-sign-out-alt"></i>
            {{ $t("Logout") }}
          </a>
        </div>
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>
import LanguageSelect from "./components/LanguageSelect";

export default {
  data() {
    return {
      menu: false,
      langSelect: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    menuToggle() {
      this.menu = !this.menu;
    },
    changeLang() {
      this.langSelect = !this.langSelect;
    },
  },
  components: {
    LanguageSelect,
  },
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

.menu {
  background-color: #292b2f;
  padding: 15px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 7px;
  position: absolute;
  top: 60px;
  right: 5px;
}

.spacer {
  margin-top: 5px;
  margin-bottom: 5px;
}

.menudiv {
  border: solid 1px #202225;
  width: calc(100% + 20px);
  transform: translateX(-10px);
  margin-top: 5px;
  margin-bottom: 5px;
}

#nav a.logout {
  color: red;
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

a {
  cursor: pointer;
}

.logo {
  margin: 7.5px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
}
</style>
