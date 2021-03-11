import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import FAQ from '../views/FAQ.vue'
import Privacy from '../views/Privacy.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
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

export default router
