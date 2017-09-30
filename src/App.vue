<template>
  <div id="app">

  <div class="container">
    <div class="nav nav-pills">
      <ul class="active">
        <a data-toggle="pill" href="#buy">Buy</a>
      </ul>
      <ul>
        <a data-toggle="pill" href="#sell">Sell</a>
      </ul>
    </div>
  </div>

    <router-view></router-view>
  </div> 
  

</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
