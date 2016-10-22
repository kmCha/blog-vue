import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'

var VueResource = require('vue-resource')

Vue.use(VueRouter)
Vue.use(VueResource)

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
