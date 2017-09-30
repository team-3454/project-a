<template>
  <div class="ticket-selector">
    <div class="container" >
        <div class="row">
          <div class="col-md-2">
            <h4>From<input type="text" id="dropFrom" class="form-control" style="height: 40px;" v-model="from" data-toggle="dropdown" >
              <ul class="dropdown-menu" id="menuFrom" aria-labelledby="dropFrom">
                <li v-for="item in fromMenu"><a @click="updateFrom(item)">{{ item }}</a></li>
              </ul>
            </h4>
          </div>
          <div class="col-md-2">
            <h4>To<input type="text" id="dropTo" class="form-control" style="height: 40px;" v-model="to" data-toggle="dropdown">
              <ul class="dropdown-menu" id="menuFrom" aria-labelledby="dropTo">
                <li v-for="item in toMenu"><a @click="updateTo(item)">{{ item }}</a></li>
              </ul>
            </h4>
          </div>
          <div class="col-md-2"><h4 style="color: #0a0a0a">Date<br/><input type='date' style="height: 40px; color: #cacaca; " value="2017-09-30"></h4></div>
          <div class="col-md-2"><h4 style="color: #0a0a0a">Time<br/><input type='time' style="height: 40px; color: #cacaca" v-model="time"></h4></div>
          <div class="col-md-2"><h4 style="color: #0a0a0a">Price<br/><input type='number' style="height: 40px; color: #cacaca"></h4></div>
          <div class="col-md-2">
            <br/>
            <button type="button" style="width:100px; height: 40px;" class="btn btn-danger btn-lg" v-on:click="want">Want</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ticket from '@/service/ticketService'

export default {
  name: 'TicketInfo',
  data () {
    var now = new Date()
    return {
      from: '',
      to: '',
      time: ('0' + now.getHours()).substr(-2) + ':' + ('0' + now.getMinutes()).substr(-2),
      fromList: [],
      toList: [],
      fromMenu: [],
      toMenu: []
    }
  },
  watch: {
    from: function (val) {
      if (!val) {
        this.fromMenu = this.fromList.slice(0)
      } else {
        this.fromMenu = this.fromList.slice(0).filter(val => {
          return val.indexOf(this.from) >= 0
        })
      }
    },
    to: function (val) {
      if (!val) {
        this.toMenu = this.toList.slice(0)
      } else {
        this.toMenu = this.toList.slice(0).filter(val => {
          return val.indexOf(this.to) >= 0
        })
      }
    }
  },
  methods: {
    updateFrom (val) {
      this.from = val
    },
    updateTo (val) {
      this.to = val
    }
  },
  mounted () {
    $('#menuFrom').dropdown()
    $('#menuTo').dropdown()

    ticket.get().then(res => {
      res.body.forEach(r => {
        const fromName = r.from.name
        const toName = r.to.name

        if (this.fromList.indexOf(fromName) < 0) {
          this.fromList.push(fromName)
        }
        if (this.toList.indexOf(toName) < 0) {
          this.toList.push(toName)
        }
      })

      const sortFn = function (a, b) {
        return a > b
      }

      this.fromList.sort(sortFn)
      this.toList.sort(sortFn)
      this.fromMenu = this.fromList.slice(0)
      this.toMenu = this.toList.slice(0)
    })
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

ul.dropdown-menu {
  margin: -10px 0 0 15px;
  min-width: 165px;
}

</style>
