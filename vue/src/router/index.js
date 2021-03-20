import Vue from 'vue'
import twemoji from 'twemoji'

import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Privacy from '../views/Privacy.vue'
import NotFound from '../views/NotFound.vue'
import Debug from '../views/Debug.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import FAQ from '../views/FAQ.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter(to, from, next) {
      if (!to.query.code)
        window.location.href = process.env.VUE_APP_API + "/login"
      next()
    },
    component: Login
  },
  {
    path: '/support',
    name: 'Support Server',
    beforeEnter(to, from, next) {
      console.log(process.env)
      window.location.href = process.env.VUE_APP_SUPPORT_URL
    }
  },
  {
    path: '/lang/:lang',
    name: "Change Lang",
    beforeEnter(to, from, next) {
      localStorage.lang = to.params.lang
      next('/')
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/debug',
    name: 'Debug',
    component: Debug,
    beforeEnter(to, from, next) {
      if (store.state.debug) return next()
      next('/')
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/dashboard')) {
    if (!store.state.token) return window.location.href = process.env.VUE_APP_API + '/login'
  }
  next()
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    console.log("parse")
    twemoji.parse(document)
    store.commit("closeMobileMenu")
  })
})

export default router
