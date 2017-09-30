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
  </div>
</template>

<script>
import ticket from '@/service/ticketService'

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
      results: []
    }
  },
  mounted () {
    ticket.get().then(res => {
      this.results = res.body.sort((a, b) => {
        return a.from.name > b.from.name
      })
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.search-result-table
{
  margin: 0 auto;
  text-align: left;
  padding-left: 50px;
  padding-right: 50px;

}

.bottom_control
{   
  margin: 25px;
  text-align: right;
}

</style>
