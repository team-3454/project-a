import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import ticketData from './ticketService.mock.data'

Vue.http.interceptors.push((request, next) => {
  // modify request
  if (request.method === 'GET' && request.url === '/ticket') {
    return next(request.respondWith(ticketData, {
      status: 200
    }))
  }

  // continue to next interceptor
  next()
})

export default {
  get () {
    return Vue.http.get('/ticket')
  }
}
