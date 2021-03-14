import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messages from './i18n'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'de', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.$router = router
window.$store = store
