import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showNav: false
  },
  mutations: {
    toggleNav (state, newState) {
      showNav: newState
    }
  },
  actions: {
  },
  modules: {
  }
})
