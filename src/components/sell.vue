<template>
  <div class="sell">
  <div class="container">
    <div class="col-md-6"><ticket-info></ticket-info></div>
    <div class="col-md-6"><bid-ask-table></bid-ask-table></div>
  </div>

  </div>
</template>

<script>
import BidAskTable from './BidAskTable'
import TicketInfo from './TicketInfo'

export default {
  name: 'sell',
  components: {
    BidAskTable,
    TicketInfo
  },
  data () {
    return {
      msg: 'selllllll'
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
