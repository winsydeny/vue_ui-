<template>
    <div class="test">
      <!-- <iCheckBox checked="true"  value=""  @on-change="handler"> -->
        <!-- <p>数据:<span>{{txt}}</span></p> -->
      <!-- </iCheckBox> -->
      <music 
        :sources="this.list"
        width="430"
        style="margin:0 auto"> 
      </music>
    </div>
</template>
<script>
// import hello from './HelloWorld.vue'
// import child from './child.vue'
import iCheckBox from './checkbox/checkbox.vue'
import music from './Player/music.vue'
// import mList from './Player/musicList.vue'
import {findComponentDownward} from '../utils/assits.js'

import alice from '../assets/Alice Merton - Lash Out.mp3'
import adele_make from '../assets/Adele - Make You Feel My Love.mp3'
import japan from '../assets/ゴンチチ - 歩いても 歩いても.mp3'
export default {
    name:'c-a',
    components:{
      // hello,child
      iCheckBox,music
    },
    data(){
      return {
          toHello:'tohello',
          txt:'',
          list:[{'src':alice,'songname':'Lash Out',duration:'194'},
                {'src':adele_make,'songname':'Make You Feel My Love',duration:'212'},
                {'src':japan,'songname':'ゴンチチ - 歩いても 歩いても',duration:'80'}
          ]
      }
    },
    methods: {
      handler(text){
        this.txt = text;
        console.log(text);
        // console.log(value);
      },
      get(){
        console.log(this.toHello);
      },
      findChilds(){
        let rl = findComponentDownward(this,'hello');
        // console.log(rl.$options.name);
        // rl.post();

        // let child = this.$children;
        // console.log(rl);
      }
    },
    created() {
    },
    mounted() {
      this.findChilds();
    },
}
</script>
<style>
  
</style>