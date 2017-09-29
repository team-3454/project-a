import ticket from '@/service/ticketService'
import ticketData from '@/service/ticketService.mock.data'

describe('ticketService.js', () => {
  it('should get correct ticket list', (done) => {
    ticket.get().then(res => {
      expect(res.body.length)
        .to.equal(ticketData.length)

      done()
    })
  })
})
