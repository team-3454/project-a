import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import sell from '@/components/sell'
import buy from '@/components/buy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/buy',
      name: '',
      component: buy
    },
    {
      path: '/sell',
      name: '',
      component: sell
    }

  ]
})
