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

  it('should get correct ticket list with owner id', (done) => {
    const ownerId = 'PN_69NKJLY13'
    ticket.get(ownerId).then(res => {
      expect(res.body.length)
        .to.equal(3)

      done()
    })
  })

  it('should get correct ticket list with owner id (fail)', (done) => {
    const ownerId = 'PN_69NKJLY10'
    ticket.get(ownerId).then(res => {
      expect(res.body.length)
        .to.equal(0)

      done()
    })
  })
})
