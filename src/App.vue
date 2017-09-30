<template>
  <div id="app">
    <b-navbar toggleable="md" >
      <b-navbar-brand href="#">3454</b-navbar-brand>
      <b-nav is-nav-bar>
        <b-nav-item href="#buy">Buy</b-nav-item>
        <b-nav-item href="#sell">Sell</b-nav-item>
      </b-nav>
    </b-navbar>
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
