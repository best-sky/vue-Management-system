import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
// import Index from './views/About.vue'
// import Temperature from './views/Temperature.vue'
// import Temperature2 from './views/Temperature2.vue'
import newEchart from './views/newEchart.vue'
import newEchart2 from './views/newEchart2.vue'
import myEchart from './views/myEchart.vue'
import myTable from './views/myTable.vue'
import Register from './views/Register.vue'

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
        // {
        //   path:'/index',
        //   name:'index',
        //   component:Index
        // },
        // {
        //   path:'/temperature',
        //   name:'temperature',
        //   component:Temperature
        // },
        // {
        //   path:'/temperature2',
        //   name:'temperature2',
        //   component:Temperature2
        // },
        {
          path:'/new',
          name:'new',
          component:newEchart
        },
        {
          path:'/new2',
          name:'new2',
          component:newEchart2
        },
        {
          path:'/myEchart',
          name:'myEchart',
          component:myEchart
        },
        {
          path:'/myTable',
          name:'myTable',
          component:myTable
        },
        {
          path:'/register',
          name:'register',
          component:Register
        }
      ]
    },
  ]
})
