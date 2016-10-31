import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import { Tree } from 'element-ui'

var VueResource = require('vue-resource')

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Tree)

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
