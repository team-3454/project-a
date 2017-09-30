import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import wantedData from './wantedService.mock.data'

Vue.http.interceptors.push((request, next) => {
  // modify request
  if (request.method === 'POST' && request.url === '/wanted/add') {
    wantedData.push(JSON.parse(request.body))
    return next(request.respondWith('', {
      status: 200
    }))
  }

  // continue to next interceptor
  next()
})

export default {
  add (info) {
    return Vue.http.post('/wanted/add', JSON.stringify(info))
  }
}
