<template>
    <div class="panel" >
        <ul ref="panel">
            
            <li v-for="(item, index) in list" :key="index" @click="play(index)">
                {{item.songname}}
                <span>{{item.duration|formate}}</span>
            </li>
        </ul>
        
    </div>
</template>
<script>
export default {
    name:'mList',
    props:{
        list:{
            type:Array,
            default:''
        }
    } ,
    filters:{
        formate(duration){
            let minutes = Math.floor(duration/60);
            let second = Math.floor(duration%60);
            return  minutes+':'+second;        
             
        }
    },
    methods: {
        play(i){
            this.$emit('songNum',i);
        },
        show(){
            console.log(this.$refs.panel);
            this.$refs.panel.style.height = "100px";
        },
        close(){
            console.log('close');
            this.$refs.panel.style.height = "0";
        }
    },
    mounted() {
        
    },
}
</script>
<style lang="scss" scoped>
*{
    margin: 0;padding:0;
}
    .panel{
        width: 100%;
        height: 0;
       
        position: relative;
        top: 80px;
        
        
        ul{
            overflow: hidden;
            height: 0;
            margin:0 0;
            background: rgb(197, 235, 142);
            width: 100%;
            list-style: none;
            text-align: left;
            padding-top: 3px;
            transition: .5s;
            li{
                // margin: 10px 0;
                // padding-left: 10px;
                cursor: pointer;
                padding: 5px 0 5px 10px;
                // border:1px solid black;
                &:hover{
                    background: rgb(1, 42, 1);
                    color: white;
                
                }
                span{
                    float: right;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
