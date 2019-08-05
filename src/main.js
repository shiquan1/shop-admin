import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import axios from 'axios'
// 解决axios的三个问题
// 问题1
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题2
// 以后的vue实例(组件) 都可以用 this.$axios 代替
Vue.prototype.$axios = axios
// 问题3
axios.interceptors.request.use(
  function (config) {
    // 添加token
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

Vue.use(ElementUi)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
