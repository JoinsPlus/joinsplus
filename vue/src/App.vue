<template>
  <div id="app">
    <LanguageSelect v-if="langSelect" :exit="changeLang" />
    <DesktopNav v-if="windowWidth > 600" :changeLang="changeLang" :path="$router.currentRoute.path" />
    <MobileNav v-else :changeLang="changeLang" :path="$router.currentRoute.path" />
    <router-view />
  </div>
</template>

<script>
import LanguageSelect from "./components/LanguageSelect";
import DesktopNav from './components/DesktopNav'
import MobileNav from './components/MobileNav'
import 'simplebar/dist/simplebar.min.css';
import flagReg from "./flagReg";

export default {
  data() {
    return {
      langSelect: false,
      flagReg: flagReg,
      menu: false,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    menuToggle() {
      this.menu = !this.menu;
    },
    changeLang() {
      this.langSelect = !this.langSelect;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: {
    LanguageSelect,
    DesktopNav,
    MobileNav
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
</style>

<style>
.emoji {
  height: 1rem;
  margin-left: 2px;
  margin-right: 2px;
}
</style>

