<template>
    <div class="alert">
        <div class="alert-main" v-for="(item) in notices" :key="item.name">
            <div 
            :class="['alert-content',
                    {'default':isDefault},
                    {'warning':isWarning},
                    {'error':isError}]">
                    {{ item.content }}
                    {{ Message }}
            </div>
        </div>
    </div>
</template>
<script>
let seed = 0;
 function getUuid() {
    return 'alert_' + (seed++);
  }
export default {
    props:{
        Message:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            notices:[],
            isWarning:false,
            isDefault:false,
            isError:false
        }
    },
    methods: {
      add (notice) {
        //   console.log(notice);
        const name = getUuid();

        let _notice = Object.assign({
          name: name
        }, notice);

        this.notices.push(_notice);
        // console.log(this.notices[0].name);
        this.isType(this.notices[0].type);
        
        // 定时移除，单位：秒
        const duration = notice.duration;
        setTimeout(() => {
          this.remove(name);
        }, duration * 1000);
      },
      isType(type){
        if(type === "default"){
            this.isDefault = true;
        }else if(type === "warning"){
            this.isWarning = true;
        }else if(type === "error"){
            this.isError = true;
        }
      },
      remove (name) {
        const notices = this.notices;

        for (let i = 0; i < notices.length; i++) {
          if (notices[i].name === name) {
            this.notices.splice(i, 1);
            break;
          }
        }
      }
    },
    // mounted() {
    //     console.log(this);
    // },

}
</script>
<style scoped>
  .alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content{
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
  .warning{
      color:rgb(25, 143, 253);
  }
  .default{
      color:green;
  }
  .error{
      color:red;
  }
</style>


