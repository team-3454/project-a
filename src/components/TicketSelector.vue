<template>
  <div class="ticket-selector">
    <div class="container" > 
        <div class="row">
          <div class="col-md-2">
            <h4 style="color: #0a0a0a">From<br/><input type="text" class="form-control" style="height: 40px; color: #cacaca" value="Berlin Hbf (tief)"></h4>
          </div>
          <div class="col-md-2">
            <h4 style="color: #0a0a0a">To<br/><input type="text" class="form-control" style="height: 40px; color: #cacaca" value="München Hbf"></h4>
          </div>
          <div class="col-md-2"><h4 style="color: #0a0a0a">Date<br/><input type='date' style="height: 40px; color: #cacaca; " value="2017-09-30"></h4></div>
          <div class="col-md-2"><h4 style="color: #0a0a0a">Time<br/><input type='time' style="height: 40px; color: #cacaca" v-model="time"></h4></div>
          <div class="col-md-2"><h4 style="color: #0a0a0a">Price<br/><input type='number' style="height: 40px; color: #cacaca"></h4></div>
          <div class="col-md-2">
            <h4><br/>
            <button type="button" style="width:100px; height: 40px;" class="btn btn-danger btn-lg" v-on:click="want">Want</button>
            </h4>
          </div>
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
  margin: 10px;
  text-align: right;
  vertical-align: center;
}

</style>
