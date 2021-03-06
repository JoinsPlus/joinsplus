import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import(/* webpackChunkName: "faq" */ '../views/FAQ.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "privacy" */ '../views/Privacy.vue')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter(to, from, next) {
      console.log(process.env)
      window.location.href = process.env.VUE_APP_API + "/login"
    }
  },
  {
    path: '/support',
    name: 'Support Server',
    beforeEnter(to, from, next) {
      console.log(process.env)
      window.location.href = process.env.VUE_APP_SUPPORT_URL
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
