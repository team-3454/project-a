import wanted from '@/service/wantedService'
import wantedData from '@/service/wantedService.mock.data'

import deepEqual from 'deep-equal'

describe('wantedService.js', () => {
  it('should add wanted info correctly', (done) => {
    const newInfo = {
      user_id: 'PN_69NKJLY13',
      from: {
        'code': 'ST_E020P6M4',
        'name': 'Berlin Hbf (tief)'
      },
      to: {
        'code': 'ST_EMYR64OX',
        'name': 'München Hbf'
      },
      price: {
        'currency': 'EUR',
        'cents': 5980
      },
      expire_time: new Date(2017, 10, 9).toISOString()
    }
    wanted.add(newInfo)
    .then(_ => {
      if (wantedData.some(w => deepEqual(w, newInfo))) {
        return done()
      }
      console.log(JSON.stringify(wantedData, null, 2))
      done(new Error(`new wanted info not shown in wantedData`))
    })
  })
})
