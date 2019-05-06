import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Index from './views/About.vue'
import Temperature from './views/Temperature.vue'
import Temperature2 from './views/Temperature2.vue'
import newEchart from './views/newEchart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path:'/index',
          name:'index',
          component:Index
        },
        {
          path:'/temperature',
          name:'temperature',
          component:Temperature
        },
        {
          path:'/temperature2',
          name:'temperature2',
          component:Temperature2
        },
        {
          path:'/new',
          name:'new',
          component:newEchart
        }
      ]
    },
  ]
})
