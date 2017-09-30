<template>
  <div class="buy-page">  
    <div style="background-image:url('/static/train_crop.png'); 
    background-repeat: no-repeat; 
    background-size: 100%; 
    background-position:center;
    height: 300px; padding: 50px;">
      <h2 style="color: #FFFFFF">Buy</h2>
      <ticket-selector></ticket-selector>
    </div>
    <div style="padding: 50px;">
      <search-result></search-result>
    </div>
  </div>
  
</template>

<script>
import TicketSelector from './TicketSelector'
import SearchResult from './SearchResult'
export default {
  name: 'buy',
  components: {
    TicketSelector,
    SearchResult
  },
  data () {
    return {
      msg: 'Buy'
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

.buy-page
{
  
margin: 0 auto;
text-align: center;

}

.bottom_control {
  margin-top: 10px;
  margin-right: 25px;
  text-align: right;
}

</style>
