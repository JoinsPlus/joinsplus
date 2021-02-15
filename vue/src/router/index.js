import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DiscordAuth from '../views/DiscordAuth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Discord Authentication',
    component: DiscordAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
