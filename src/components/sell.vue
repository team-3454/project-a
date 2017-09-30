<template>
  <div class="sell">
    <div class="container" >
      <div class="col-md-6" v-for="info in infos">
        <ticket-info :info="info" ></ticket-info>
        <div class="row">
          <div class="col-md-6"><h4>Bought price: {{info.BoughtPrice}}</h4></div>
        </div>
        <div class="row">
          <div class="col-md-5" v-on:click = "deal(info)"><h4>Bid price: {{info.Bid}}</h4></div>
          <div class="col-md-5" v-on:click = "fillPrice(info)"><h4>Ask price: {{info.Ask}}</h4></div>
        </div>
        <div class="row">
          <div class="col-md-9"><input id="input-price" type="text" class="form-control" v-model="info.CurrentSelectPrice"></div>
          <div class="col-md-3"><input type="button" class="btn btn-primary" v-on:click="onSummitClick(info)" value="Submit"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketInfo from './TicketInfo'
import $ from 'jquery'

var myInfos = [
  {
    RefNumber: 'xxxxxxxxxx',
    From: 'Paris',
    To: 'Berlin',
    Departure: 18000000000,
    Arrive: 18000000001,
    BoughtPrice: 500,
    Bid: 97.8,
    Ask: 97.9,
    CurrentSelectPrice: 97.8
  }, {
    RefNumber: 'kkkkkkk',
    From: 'gggggg',
    To: 'hhhhhhhh',
    Departure: 18000000000,
    Arrive: 18000000001,
    BoughtPrice: 500,
    Bid: 97.8,
    Ask: 97.9,
    CurrentSelectPrice: 97.8
  }, {
    RefNumber: 'ffffff',
    From: 'gggggg',
    To: 'hhhhhhhh',
    Departure: 18000000000,
    Arrive: 18000000001,
    BoughtPrice: 500,
    Bid: 97.8,
    Ask: 97.9,
    CurrentSelectPrice: 97.8
  }
]
var loadTicketInfo = function () {
  // infos initial
  myInfos[0].RefNumber = 'ssss'
}

export default {
  name: 'sell',
  components: {
    TicketInfo
  },
  created: function () {
    loadTicketInfo() // Here
  },
  methods: {
    deal: function (data) {
      // TO DO: 跳出成交頁面
      var text = '確定要進行此交易？'
      data.CurrentSelectPrice = data.Bid
      setTimeout(() => {
        if (confirm(text) === true) {
          alert('恭喜您以' + data.Bid + '成交!!')
        }
        var index = myInfos.findIndex((info) => info === data)
        if (index > -1) {
          myInfos.splice(index, 1)
        }
      }, 0)
    },
    fillPrice: function (data) {
      data.CurrentSelectPrice = data.Ask
      setTimeout(() => {
        if (confirm('是否以價格' + data.Ask + '賣出？') === true) {
          alert('已成功以' + data.Ask + '掛單!!')
        }
      }, 0)
    },
    onSummitClick: function (ticket) {
      console.log($('#input-price')[0].value)
      var userPrice = $('#input-price')[0].value
      if ($('#input-price')[0].value > ticket.Bid) {
        if (confirm('是否以價格' + userPrice + '賣出？') === true) {
          alert('已成功以' + userPrice + '掛單!!')
        }
      } else {
        this.deal(ticket)
      }
    }
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
