import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: App
    }
  ]
})

Vue.use(VueRouter)

export default router