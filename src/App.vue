<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Test from './components/Test.vue';
export default {
  name: 'app',
    

  data(){
    return {
      message:'this is app message'
    }
  },
  methods: {
    gohead(){
      return 100;
    }
  },
  provide(){
    return {
      app:this
    }
  },
  components:{
    // Test
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
