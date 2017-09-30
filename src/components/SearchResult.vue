<template>
  <div class='search-result'>
    <div class='search-result-table'>
          <table class='table table-hover'>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Time</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='result in results'>
                <td>{{result.from.name}}</td>
                <td>{{result.to.name}}</td>
                <td>{{result.departure}}</td>
                <td>{{result.tickets[0].price.currency}} {{result.tickets[0].price.cents}}</td>
              </tr>
            </tbody>
          </table>
    </div>
    
  <div class='bottom_control'>
    <button type="button" class="btn btn-primary btn-lg" v-show="results.length > 0" v-on:click="nextPage">Next Page</button>
    <!--<button type="button" class="btn btn-warning btn-lg" v-on:click="want">Want</button> -->
  </div>

  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  methods: {
    want: function (event) {
      var price = prompt('我要徵票!\n\n請輸入期望的價格', '')
      var expectPrice = parseFloat(price)
      if (price != null && isNaN(expectPrice) !== true && confirm('我要徵' + expectPrice + '元的票？')) {
        alert('已成功以' + expectPrice + '掛單!!')
      }
    },
    nextPage: function (event) {
    }
  },
  data () {
    return {
      results: [
        {
          'id': 'OD_02NY86GJP',
          'PNR': 'A4DL5N',
          'railway': {
            'code': 'DB'
          },
          'from': {
            'code': 'ST_E020P6M4',
            'name': 'Berlin Hbf (tief)'
          },
          'to': {
            'code': 'ST_EMYR64OX',
            'name': 'München Hbf'
          },
          'departure': '2017-11-08T12:27:00+01:00',
          'duration': {
            'hour': 6,
            'minutes': 11
          },
          'created_at': 1509363000,
          'tickets': [
            {
              'id': 'TK_2E6GY7MYZ',
              'from': {
                'code': 'ST_E020P6M4',
                'name': 'Berlin Hbf (tief)'
              },
              'to': {
                'code': 'ST_EMYR64OX',
                'name': 'München Hbf'
              },
              'price': {
                'currency': 'EUR',
                'cents': 5980
              }
            }
          ]
        },
        {
          'id': 'OD_02NY86GJP',
          'PNR': 'A4DL5N',
          'railway': {
            'code': 'DB'
          },
          'from': {
            'code': 'ST_LO812W4J',
            'name': 'Frankfurt(M) Flughafen Fernbf'
          },
          'to': {
            'code': 'ST_EMYR64OX',
            'name': 'München Hbf'
          },
          'departure': '2017-11-09T16:52:00+01:00',
          'duration': {
            'hour': 4,
            'minutes': 9
          },
          'created_at': 1509363000,
          'tickets': [
            {
              'id': 'TK_2E6GY7MYZ',
              'from': {
                'code': 'ST_LO812W4J',
                'name': 'Frankfurt(M) Flughafen Fernbf'
              },
              'to': {
                'code': 'ST_EMYR64OX',
                'name': 'München Hbf'
              },
              'price': {
                'currency': 'EUR',
                'cents': 2990
              }
            }
          ]
        },
        {
          'id': 'OD_02NY86GJP',
          'PNR': 'A4DL5N',
          'railway': {
            'code': 'DB'
          },
          'from': {
            'code': 'ST_E020P6M4',
            'name': 'Berlin Hbf (tief)'
          },
          'to': {
            'code': 'ST_EMYR64R3',
            'name': 'Düsseldorf Hbf'
          },
          'departure': '2017-11-11T16:52:00+01:00',
          'duration': {
            'hour': 4,
            'minutes': 14
          },
          'created_at': 1509363000,
          'tickets': [
            {
              'id': 'TK_2E6GY7MYZ',
              'from': {
                'code': 'ST_E020P6M4',
                'name': 'Berlin Hbf (tief)'
              },
              'to': {
                'code': 'ST_EMYR64R3',
                'name': 'Düsseldorf Hbf'
              },
              'price': {
                'currency': 'EUR',
                'cents': 5980
              }
            },
            {
              'id': 'TK_2E6GY7MYA',
              'from': {
                'code': 'ST_E020P6M4',
                'name': 'Berlin Hbf (tief)'
              },
              'to': {
                'code': 'ST_EMYR64R3',
                'name': 'Düsseldorf Hbf'
              },
              'price': {
                'currency': 'EUR',
                'cents': 5980
              }
            }
          ]
        }
      ]
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.search-result-table
{
  margin: 0 auto;
  text-align: center;
}

.bottom_control
{   
  margin: 25px;
  text-align: right;
}

</style>
