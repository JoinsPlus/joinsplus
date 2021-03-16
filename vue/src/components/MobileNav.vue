<template>
  <div id="nav">
    <router-link to="/">
      <img class="logo" src="../assets/logo.png" />
    </router-link>
    <template v-if="$router.currentRoute.path.startsWith('/dashboard')">
    </template>
    <template v-else>
      <div class="login">
        <div class="hamburger"></div>
        <a v-on:click="changeLang" class="langFlag">
          <img
            :src="`https://twemoji.maxcdn.com/v/13.0.2/72x72/${
              flagReg[$i18n.locale] || flagReg['en']
            }.png`"
          />
        </a>
      </div>
    </template>
  </div>
</template>

<script>
import flagReg from "../flagReg";

export default {
  name: "MobileNav",
  components: {},
  data() {
    return {
      menu: false,
      flagReg: flagReg,
    };
  },
  props: {
    changeLang: Function,
  },
};
</script>

<style scoped>
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

.langFlag {
  float: right;
  transform: translateY(-9px);
  margin-left: 8px;
}

.langFlag > img {
  height: 40px;
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
