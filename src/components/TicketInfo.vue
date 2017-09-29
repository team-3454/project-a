<template>
  <div class="ticket-info">
    <div class="info-border">
      <div class="container"> 
        <h1>{{ msg }}</h1>
        <div>
          <h2>Reference number: {{ RefNumber}}</h2>
        </div>
        <div class="row">
          <div class="col-md-4">
            <h2>From: {{From}}</h2>
          </div>
          <div class="col-md-8">
            <h2>To: {{To}}</h2>
          </div>
        </div>
        <div>
          <h2>Out:</h2>
          <div class="row">
            <div class="col-md-4"><h3>Date: {{Departure}}</h3> </div>
            <div class="col-md-4"><h3>Time: {{Arrive}}</h3> </div>
          </div>
        </div>
        <div> 
          <h2>Bought price: {{ BoughtPrice}} </h2> 
        </div>
        <div>
            <div class="row">
              <div class="col-md-4"></div><h2>Sell price:</h2></div>
              <div class="col-md-4"><input type="text" class="form-control"></div>
              <div class="col-md-4"><input type="button" class="btn btn-primary" value="Submit"></div>
            </div>
        </div>
        <br>
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
.info-border {
  border-style: solid;
};
</style>
