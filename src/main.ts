import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import './assets/css/common.css'

const List = () => import('./pages/List.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/list', component: List },
    { path: '*', redirect: '/list' }
  ]
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
