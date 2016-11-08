import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import { Tree, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

var VueResource = require('vue-resource')

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Tree)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
