import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './Login/login.vue'
import home from './Home/home.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/home', component: home }
  ]
})
export default router
