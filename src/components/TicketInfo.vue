<template>
  <div class="ticket-info">
      <div class="container"> 
        <h1>{{ msg }}</h1>
        <div>
          <h2>Reference number: {{ RefNumber}}</h2>
        </div>
        <div class="row">
          <div class="col-md-2">
            <h4>From: {{From}}</h4>
          </div>
          <div class="col-md-2">
            <h4>To: {{To}}</h4>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-md-2"><h4>Date: {{Departure}}</h4> </div>
            <div class="col-md-2"><h4>Time: {{Arrive}}</h4> </div>
          </div>
        </div>
        <div>
          <h4>Bought price: {{BoughtPrice}} </h4> 
          <div>
              <div class="row">
                <div class="col-md-2"><h4>Sell price:</h4></div>
                <div class="col-md-2"><input type="text" class="form-control"></div>
                <div class="col-md-2"><input type="button" class="btn btn-primary" value="Submit"></div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'TicketInfo',
  data () {
    return {
      msg: 'Ticket Information',
      RefNumber: 'xxxxxxxxx',
      From: 'Paris',
      To: 'Berlin',
      Departure: 18000000000,
      Arrive: 18000000001,
      BoughtPrice: 500
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
