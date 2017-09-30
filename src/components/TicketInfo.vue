<template>
  <div class="ticket-info">
      <div class="container"> 
        <div class="row"> 
          <h2>Reference number: {{info.RefNumber}}</h2>
        </div>
        <div class="row">
          <div class="col">
            <h4>From: {{info.From}}</h4>
          </div>
          <div class="col">
            <h4>To: {{info.To}}</h4>
          </div>
        </div>
        <div class="row">
            <div class="col"><h4>Date: {{info.Departure}}</h4> </div>
            <div class="col"><h4>Time: {{info.Arrive}}</h4> </div>
          </div>
        </div>
        <h4 class="row" Bought price: {{info.BoughtPrice}} </h4> 
        <div class="container">
          <div class="col-md-2"><h4>Sell price:</h4></div>
          <div class="col-md-2"><input type="text" class="form-control" :placeholder="info.HighestPrice"></div>
          <div class="col-md-2"><input type="button" class="btn btn-primary" value="Submit"></div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'TicketInfo',
  props: {
    info: {
      default: []
    }
  },
  data () {
    return {
      msg: 'Ticket Information'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
