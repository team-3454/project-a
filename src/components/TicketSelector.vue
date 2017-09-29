<template>
  <div class="ticket-selector">
    <div class="container"> 
        <div class="row">
          <div class="col-md-2">
            <h4>From: <input type="text" class="form-control" ></h4>
          </div>
          <div class="col-md-2">
            <h4>To: <input type="text" class="form-control" ></h4>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-md-2"><h4>Date: <input type='date'></h4> </div>
            <div class="col-md-2"><h4>Time: <input type='time'></h4> </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-md-2"><h4>Person: <input type='number'></h4> </div>
          </div>
        </div>
        <div>
          <div>
              <div class="row">
                <div class="col-md-2"><input type="button" class="btn btn-primary" value="Search"></div>
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
