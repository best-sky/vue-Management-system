import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
// import Index from './views/About.vue'
// import Temperature from './views/Temperature.vue'
// import Temperature2 from './views/Temperature2.vue'
import newEchart from './views/newEchart.vue'
import Register from './views/Register.vue'
import EquipmentManagement from './views/EquipmentManagement.vue'
import UserEquipment from './views/UserEquipment.vue'
import UserManagement from './views/UserManagement.vue'
import userEqNumber from './views/userEqNumber.vue'

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
          path:'/new',
          name:'new',
          component:newEchart
        },
        {
          path:'/register',
          name:'register',
          component:Register
        },
        {
          path:'/EquipmentManagement',
          name:'EquipmentManagement',
          component:EquipmentManagement
        },
        {
          path:'/UserEquipment',
          name:'UserEquipment',
          component:UserEquipment
        },
        {
          path:'/UserManagement',
          name:'UserManagement',
          component:UserManagement
        },
        {
          path:'/userEqNumber',
          name:'userEqNumber',
          component:userEqNumber
        }
      ]
    },
  ]
})
