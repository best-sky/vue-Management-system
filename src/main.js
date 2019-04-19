import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 引入完整的饿了么组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'

Vue.use(ElementUI)
// 使用登录页粒子效果插件
Vue.use(VueParticles)
// 将axios绑定到vue原型上
Vue.prototype.$axios = axios

Vue.config.productionTip = false
require('./assets/css/reset.css')
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
