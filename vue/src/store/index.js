import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    username: localStorage.username || 'Guest',
    pfp: localStorage.pfp,
    api: new API(this),
    mobileMenu: false
  },
  mutations: {
    setToken(state, token) {
      localStorage.token = token
      state.token = token
    },
    setUsername(state, username) {
      localStorage.username = username
      state.username = username
    },
    setPfp(state, pfp) {
      localStorage.pfp = pfp
      state.pfp = pfp
    },
    logout(state) {
      let lang = localStorage.lang
      localStorage.clear()
      localStorage.lang = lang
      window.location.href = "/"
    },
    mobileMenuToggle(state) {
      state.mobileMenu = !state.mobileMenu
    },
    closeMobileMenu(state) {
      state.mobileMenu = false
    }
  },
  actions: {
  },
  modules: {
  }
})
