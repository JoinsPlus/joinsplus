import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    username: localStorage.username || 'Guest',
    pfp: localStorage.pfp,
    api: new API(this)
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
      localStorage.clear()
      window.location.href = "/"
    }
  },
  actions: {
  },
  modules: {
  }
})
