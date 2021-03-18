<template>
  <div id="nav" v-if="!path.startsWith('/login')">
    <div class="menu" :class="$store.state.mobileMenu ? 'open' : ''">
      <template v-if="path.startsWith('/dashboard')">
        <p>
          <router-link to="/dashboard">{{ $t("Overview") }}</router-link>
        </p>
        <div class="divider"></div>
        <p>
          <router-link to="/dashboard/account">{{ $t("Account") }}</router-link>
        </p>
        <p>
          <router-link to="/dashboard/settings">{{
            $t("Settings")
          }}</router-link>
        </p>
        <div class="divider"></div>
        <p>
          <a v-on:click="logout" class="logout">{{ $t("Logout") }}</a>
        </p>
      </template>
      <template v-else>
        <p>
          <router-link to="/">{{ $t("Home") }}</router-link>
        </p>
        <p>
          <router-link to="/about">{{ $t("About") }}</router-link>
        </p>
        <p>
          <router-link to="/faq">{{ $t("FAQ") }}</router-link>
        </p>
        <p>
          <router-link to="/privacy">{{ $t("Privacy") }}</router-link>
        </p>
        <div class="divider"></div>
        <p>
          <router-link to="/dashboard">{{ $t("Dashboard") }}</router-link>
        </p>
      </template>
    </div>
    <router-link to="/">
      <img class="logo" src="../assets/logo.png" />
    </router-link>
    <div class="login">
      <div
        class="hamburger"
        v-on:click="toggleMenu"
        :class="$store.state.mobileMenu ? 'open' : ''"
      >
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <a v-on:click="changeLang" class="langFlag">
        <img
          :src="`https://twemoji.maxcdn.com/v/13.0.2/72x72/${
            flagReg[$i18n.locale] || flagReg['en']
          }.png`"
        />
      </a>
    </div>
  </div>
</template>

<script>
import flagReg from "../flagReg";

export default {
  name: "MobileNav",
  components: {},
  data() {
    return {
      flagReg: flagReg,
    };
  },
  props: {
    changeLang: Function,
    path: String,
  },
  methods: {
    toggleMenu() {
      this.$store.commit("mobileMenuToggle");
    },
    logout() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style scoped>
#nav {
  font-size: 18px;
  padding: 10px;
  height: 30px;
  z-index: 10;
}

#nav a {
  font-weight: bold;
  color: rgb(211, 211, 211);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b960;
}

.divider {
  width: calc(100% - 100px);
  margin-left: 50px;
  margin-right: 50px;
  background-color: #3e3935;
  height: 4px;
  border-radius: 5px;
}

.langFlag {
  float: right;
  transform: translateY(-9px);
  margin-left: 8px;
}

.langFlag > img {
  height: 50px;
}

.menu {
  background-color: #292b2f;
  overflow: hidden;
  position: fixed;
  width: 100vw;
  height: 0;
  left: 0;
  top: 0;
  transition: all 0.25s;
}

.menu.open {
  padding-top: 50px;
  height: 100vh;
}

.hamburger {
  height: fit-content;
  width: 50px;
  float: left;
  margin-right: 5px;
  cursor: pointer;
}

.bar {
  width: 50px;
  height: 5px;
  background-color: white;
  border-radius: 3px;
  transition: all 0.2s;
}

.bar:not(:first-child) {
  margin-top: 9px;
}

.hamburger.open > .bar:nth-child(1) {
  transform: rotate(45deg) translateY(5px) translateX(15px);
}

.hamburger.open > .bar:nth-child(2) {
  opacity: 0;
  transform: translateX(-50vw);
}

.hamburger.open > .bar:nth-child(3) {
  transform: rotate(-45deg) translateY(-5px) translateX(15px);
}

.center {
  text-align: center;
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
