// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

Vue.config.productionTip = false
/* eslint-disable no-new */

const data = {
  currentPath: '/sell'
}

router.afterEach(route => {
  console.log(route.path)
  data.currentPath = route.path
})

new Vue({
  el: '#app',
  router,
  template: '<App :currentPath="currentPath" />',
  components: { App },
  data
})
