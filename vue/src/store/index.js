import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    username: localStorage.username || 'Guest'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsername(state, username) {
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
