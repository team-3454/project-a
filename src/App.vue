<template>
  <div id="app">
    <ul class="nav nav-tabs">
      <li><a href="#buy">Buy</a></li>
      <li><a href="#sell">Sell</a></li>
    </ul>
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
  font-family: 'Droid Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

</style>
