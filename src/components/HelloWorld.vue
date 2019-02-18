<template>
  <div class="helloworld">
      <button :class="'i-button-' + size">
        <slot></slot>
      </button>
  </div>
</template>

<script>
    
import {findComponentUpward} from '../utils/assits.js'
export default {
  name:'hello',
  props:{
    size:{
      type:String,
      default:'default',
    }
  },
  methods: {
    get(){
      let rl = findComponentUpward(this,'c-a');
      // console.log(rl);
    },
    post(){
      console.log(123);
    }
  },
  created() {
    this.get();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.i-button-big{
  width: 100px;
  height: 200px;
  background: red;
}
.i-button-small{
  width: 50px;
  height: 100px;
  background: green;
}
</style>
