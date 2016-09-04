import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes, { redirect } from './routes'
import store from './store'

var VueResource = require('vue-resource')

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter()

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })

router.map(routes)
router.redirect(redirect)

router.beforeEach(({ to, next }) => {
  if (store.state.articles && store.state.categories) {
    next()
  } else {
    return Promise.all([
      store.dispatch('getArticles'),
      store.dispatch('getCategories'),
      store.dispatch('getTags')
    ]).catch(res => {
      console.log('提示网络问题')
    })
  }
})

router.start(App, 'body')
