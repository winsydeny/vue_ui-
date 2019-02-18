<template>
     <div>
    <!-- <h3>动态渲染 .vue 文件的组件—— Display</h3>
    <form action="">
      <textarea v-model="textCode"></textarea>
      <input type="button" value="Run" @click="complier">
    </form>

    <i-display :code="code" id="idisplay"></i-display> -->
    <button @click="handleOpen1">Open</button>
  </div>   
</template>
<script>
import iDisplay from '../components/Display/display'
import defaultCode from './default-code.js'
export default {
     components: { iDisplay },
    data () {
      return {
        textCode:'',
        code:''
      }
    },
    methods: {
      handleOpen1 () {
      //  console.log(this.$Alert);
       this.$Alert({
         content:'message-01',
         duration:1.5,
         type:'warning'
         
       })
      },
      complier(){
        this.code = this.textCode;
      }
    },
    mounted(){
      // console.log(this.code)
    }
}
</script>
<style lang="scss" scoped>
  textarea{
    width: 50%;
    height: 600px;
    float: left;
    font-size: 26px;
  }
  #idisplay{
    float: left;
  }
</style>
