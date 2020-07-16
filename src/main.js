import Vue from 'vue'
import App from './App.vue'

import '@/assets/scss/style.scss'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter({
  mode: 'history',
  routes: []
});

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
