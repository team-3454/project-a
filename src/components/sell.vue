<template>
  <div class="sell">  
    <div style="background-image:url('/static/savingmoneyincanada.jpg'); 
          background-repeat: no-repeat; 
          background-size: 100%; 
          background-position:center;
          height: 300px; padding: 50px;">
      <h2 style="color: #FFFFFF; text-align: center">Sell</h2>
    </div>
    <div class="container" >
      <div class="col-md-6" v-for="info in infos">
        <ticket-info :info="info" ></ticket-info>
        <div class="row">
          <div class="col-md-6"><h4>Bought price: {{info.BoughtPrice}}</h4></div>
        </div>
        <div class="row">
          <div class="col-md-5" style="color: green;" v-on:click = "deal(info)"><h4>Bid price: {{info.Bid}}</h4></div>
          <div class="col-md-5" style="color: red;" v-on:click = "fillPrice(info)"><h4>Ask price: {{info.Ask}}</h4></div>
        </div>
        <div class="row">
          <div class="col-md-9"><input type="text" :disabled="info.Bidded" class="form-control" v-model="info.CurrentSelectPrice"></div>
          <div class="col-md-3"><input type="button" class="btn btn-primary" v-on:click="onSummitClick(info)" :value="!info.Bidded?'Submit':'Cancel'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketInfo from './TicketInfo'

var myInfos = [
  {
    RefNumber: 'YH0943223',
    From: 'Berlin Hbf',
    To: 'Stuttgart Hbf',
    Departure: '2017-11-11T15:14:00+01:00',
    Arrive: '2017-11-11T19:00:00+01:00',
    BoughtPrice: 99.3,
    Bid: 97.8,
    Ask: 98.9,
    CurrentSelectPrice: 97.8,
    Bidded: false
  }, {
    RefNumber: 'TD0928340',
    From: 'Berlin Hbf',
    To: 'München Hbf',
    Departure: '2017-11-11T15:14:00+01:00',
    Arrive: '2017-11-11T19:00:00+01:00',
    BoughtPrice: 133.5,
    Bid: 99.8,
    Ask: 123.9,
    CurrentSelectPrice: 99.8,
    Bidded: false
  }, {
    RefNumber: 'RT0873378',
    From: 'Frankfurt(Main)Hbf',
    To: 'Köln Hbf',
    Departure: '2017-11-10T15:44:00+01:00',
    Arrive: '2017-11-10T18:44:00+01:00',
    BoughtPrice: 102.3,
    Bid: 92.7,
    Ask: 98.9,
    CurrentSelectPrice: 92.7,
    Bidded: false
  }
]
var loadTicketInfo = function () {

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
      console.log(ticket.CurrentSelectPrice)
      if (ticket.Bidded) {
        ticket.Bidded = false
        return
      }
      if (ticket.CurrentSelectPrice > ticket.Bid) {
        if (confirm('是否以價格' + ticket.CurrentSelectPrice + '賣出？') === true) {
          alert('已成功以' + ticket.CurrentSelectPrice + '掛單!!')
        }
        ticket.Bidded = true
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
