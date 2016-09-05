import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes, { redirect } from './routes'

var VueResource = require('vue-resource')

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter()

router.map(routes)
router.redirect(redirect)

router.start(App, 'body')
