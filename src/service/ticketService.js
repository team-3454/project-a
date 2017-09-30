import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import ticketData from './ticketService.mock.data'

Vue.http.interceptors.push((request, next) => {
  const rTicketOwner = /\/ticket\/(\w+)/
  // modify request
  if (request.method === 'GET' && request.url === '/ticket') {
    return next(request.respondWith(ticketData, {
      status: 200
    }))
  } else if (request.method === 'GET' && rTicketOwner.test(request.url)) {
    const owner = request.url.match(rTicketOwner)[1]
    const resData = ticketData.filter(function (ticket) {
      return ticket.passengers.id === owner
    })
    return next(request.respondWith(resData, {
      status: 200
    }))
  }

  // continue to next interceptor
  next()
})

const path = '/ticket'

export default {
  get (ownerId) {
    return Vue.http.get(path + (ownerId ? '/' + ownerId : ''))
  }
}
