<template>
  <div class="sell">
  <div class="container" v-for="info in infos">
    <div class="col-md-6">
      <ticket-info :info="info" ></ticket-info>
      <div class="row">
        <div class="col"><h4>Bought price: {{info.BoughtPrice}}</h4></div>
      </div>
      <div class="row">
          <div class="col-md-4"><h4>Sell price:</h4></div>
          <div class="col-md-4"><input type="text" class="form-control" :placeholder="info.HighestPrice"></div>
          <div class="col-md-4"><input type="button" class="btn btn-primary" value="Submit"></div>
      </div>
    </div>
    <div class="col-md-6"><bid-ask-table></bid-ask-table></div>    
  </div>
  
  </div>
</template>

<script>
import BidAskTable from './BidAskTable'
import TicketInfo from './TicketInfo'

var myInfos = [
  {
    RefNumber: 'xxxxxxxxxx',
    From: 'Paris',
    To: 'Berlin',
    Departure: 18000000000,
    Arrive: 18000000001,
    BoughtPrice: 500,
    HighestPrice: 800
  }, {
    RefNumber: 'kkkkkkk',
    From: 'gggggg',
    To: 'hhhhhhhh',
    Departure: 18000000000,
    Arrive: 18000000001,
    BoughtPrice: 500,
    HighestPrice: 800
  }, {
    RefNumber: 'ffffff',
    From: 'gggggg',
    To: 'hhhhhhhh',
    Departure: 18000000000,
    Arrive: 18000000001,
    BoughtPrice: 500,
    HighestPrice: 800
  }
]
var loadTicketInfo = function () {
  // infos initial
  myInfos[0].RefNumber = 'ssss'
}

export default {
  name: 'sell',
  components: {
    BidAskTable,
    TicketInfo
  },
  created: function () {
    loadTicketInfo() // Here
  },
  data () {
    return {
      msg: 'selllllll',
      infos: myInfos
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
