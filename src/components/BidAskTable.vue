<template>
  <div class="bid_ask_table">
    <h1>Bid-Ask Table</h1>
    <div class="bid_ask_table">
      <div class="row">
        <div class="col-sm-6">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Bid Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bid in bids">
                <td v-on:click="deal">{{bid}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-6">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Ask Price</th>
              </tr>
            </thead>
            <tbody>         
              <tr v-for="ask in asks">
                <td v-on:click="fillPrice">{{ask}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BidAskTable',
  data () {
    return {
      // TO DO: 使用 db 資料
      bids: [97.8, 97.7, 97.6, 97.5, 97.2],
      asks: [97.9, 98.3, 98.9, 99.0, 99.4]
    }
  },
  methods: {
    deal: function ($event) {
      // TO DO: 跳出成交頁面
      var index = this.bids.indexOf(parseFloat(event.target.textContent))
      var text = '確定要進行此交易？'
      if (index !== 0) {
        text += '\n貼心提醒: 幫您使用最貴價格' + this.bids[0] + '賣出！'
      }
      if (confirm(text) === true) {
        alert('恭喜您成交!!')
      }
    },
    fillPrice: function (event) {
      // TO DO: 自動填入賣價欄位
      if (confirm('是否以價格' + event.target.textContent + '賣出？') === true) {
        alert('已成功掛單!!')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bid_ask_table {
  margin: 0 auto;
  text-align: center;
}


</style>
