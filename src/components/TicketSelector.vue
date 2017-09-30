<template>
  <div class="ticket-selector">
    <div class="container" > 
        <div class="row">
          <div class="col-md-2">
            <h4>From<input type="text" class="form-control" style="height: 40px;" value="Berlin Hbf (tief)"></h4>
          </div>
          <div class="col-md-2">
            <h4>To<input type="text" class="form-control" style="height: 40px;" value="München Hbf"></h4>
          </div>
          <div class="col-md-2"><h4>Date<input type='date' style="height: 40px;" value="2017-09-30"></h4> </div>
          <div class="col-md-2"><h4>Time<input type='time' style="height: 40px;" v-model="time"></h4> </div>
          <div class="col-sm-2"><h4>Passengers<input type='number' style="height: 40px;" value="1"></h4> </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TicketInfo',
  data () {
    var now = new Date()
    return {
      time: ('0' + now.getHours()).substr(-2) + ':' + ('0' + now.getMinutes()).substr(-2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info-border {
  border-style: solid;
};

.bottom_control {
  margin: 30px;
  text-align: right;
}

</style>
