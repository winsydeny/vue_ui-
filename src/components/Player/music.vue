/*
@imusic 
@params list(Object) width(String)
list{'src','songname','duration','img'}
 */


<template>  
        <div class="box">
            <audio  
                :src="currentPlay.src" 
                ref="audio">
            </audio>
            <div class="photo">
                <img :src="currentPlay.img" alt="" width="80" height="80" @click="fullScreen">
            </div>
            <div class="right-area" :style="{'width':width + 'px'}">
                <div class="song-name">
                    <span>{{currentPlay.songName}}</span>
                </div>
                <div class="time">
                    <span>{{total}}/</span>
                    <span>{{currentDuration|format}}</span>
                </div>
                <div class="bar" ref="bar">
                    <span class="progress"
                        :style="{'width':bars + '%'}">
                    </span>
                    <span class="bar-head"
                        :style="{'left':bars + '%'}"
                        ref="barHead"
                        @mousedown="movebar"
                        @mouseup="clearmove"></span>

                </div>
                <div class="controls">
                    <span class="pre iconfont icon-zshangyishou" @click="pre"></span>
                    <span 
                        :class="{'play':true, 'iconfont':true, 'icon-ai23':!play,'icon-stop':play}" 
                        @click="doplay"></span>
                    <span class="next iconfont icon-zxiayishou" @click="next"></span>
                
                </div>
                <div class="controls-right">
                        <span 
                            :class="{'voice':true,'iconfont':true, 'icon-shengyin':isVoice,'icon-jingyin':!isVoice}"
                            @click="mute"></span>
                        <span 
                            :class="['loop','iconfont','icon-xunhuan',{'loop-choose':chooseLoop}]"
                            @click="loop"></span>
                        <span 
                            :class="['list', 'iconfont', 'icon-liebiao',{'show-list':showlists}]"

                            @click="showlist"></span>
                   </div>
            </div>
            <mList :list="playlist"  v-on:songNum="getSongNum" ref="mlist"></mList>  
        </div>
              
   
</template>
<script>
import {swiper,clearMove,getStyle} from './js/utils'
import './css/iconfont.css'
// console.log(swiper);
import mList from './musicList'
import song from '../../assets/song.jpg'
export default {
    name:'iMusic',
    props:{
        sources:{
            type:Array,
            default:'none'
        },
        width:{
            type:String,
        }

    },
    components:{
        mList
    },
    data(){
        return{
            playlist:[],
            autoplay:'false',
            currentPlay:{
                index:'',
                src:'',
                songName:'Alice Merton',
                img:song
            },
            play:false,
            total:'00:00',
            duration:'00:00',
            currentDuration:0,
            ti:'',
            bars:0,
            isVoice:true,
            chooseLoop:false,
            showlists:false,
            
        }
    },
    methods: {
        fullScreen(){
            alert('full screen')
        },
        loop(){
            this.chooseLoop = !this.chooseLoop;

        },
        showlist(){
            let mlist = this.$refs.mlist;
            // console.log(mlist);
            if(!this.showlists){
                // console.log('this.$refs.mlist');
                mlist.show();

            
            
            }else{
                mlist.close();
            }


            this.showlists = !this.showlists;
            
            // this.$refs.mlist.show();


        },
        movebar(e){
            // console.log(e);
            let barhead = this.$refs.barHead;
            let x = e.pageX - barhead.offsetLeft;
            let width = getStyle(this.$refs.bar,'width');
            console.log(x);
            let distence;
            document.onmousemove = (e) =>{
                
                 if(e.pageX > x && e.pageX < x + width){
                    distence = (e.pageX - x) / width;
                    this.bars = distence * 100;
                    this.$refs.audio.currentTime = distence * this.$refs.audio.duration;
                    this.currentDuration = distence * this.$refs.audio.duration
                 }                   
            }
            document.onmouseup =()=>{
                clearMove();
            }
        },
        clearmove(){
            console.log('clearmove');
            clearMove();
        },
        pre(){
            let index = this.currentPlay.index;
            if(index){
                this.currentPlay.src = this.playlist[--index].src;
                this.currentPlay.songName = this.playlist[index].songname;
                this.currentPlay.index = index;

           }else{
                alert("已经到第一个了");
            }
                this.switch();

        },
        next(){
            // console.log(this.currentDuration);
            let index = this.currentPlay.index;
            if(index < this.playlist.length-1){
                
                    this.currentPlay.src = this.playlist[++index].src;
                    this.currentPlay.songName = this.playlist[index].songname;

                    //  console.log(index);
                    this.currentPlay.index = index;
                
                
                // this.switch();
                
            }
            else if(index === this.playlist.length-1){
                if(this.chooseLoop){
                    this.currentPlay.src = this.playlist[index].src;
                    this.currentPlay.songName = this.playlist[index].songname;
                }
                // alert("已经到最后一个了");
                this.play = false;
                this.$refs.audio.pause();
                this.$refs.audio.currentTime = 0;
                clearInterval(this.ti);
                alert("已经到最后一个了");

                // this.currentPlay.src = this.playlist[0].src;
                // this.currentPlay.songName = this.playlist[0].songname;
            }else{
                alert("已经到最后一个了");

            }
            this.switch();

            // console.log(this.currentPlay.src);
            // console.log(this.$refs.audio);
        },
        switch(){
            if(this.play){
                this.$refs.audio.autoplay = true;  
                  
            }else{
                this.$refs.audio.autoplay = false;
            }
            this.getMusicInfo();
            console.log("switch");
            this.currentDuration = 0;
            this.bars = 0; 
            
            
        },
        volume(){
            this.$refs.audio.volume = 0.1;
            console.log(this.$refs.audio);
        },
        doplay(){
            // console.log("doplay--"+this.play);
            console.log(this.$refs.audio);
            !this.play?this.$refs.audio.play():this.$refs.audio.pause();
            if(!this.play) clearInterval(this.ti);
            this.play = !this.play;
            this.timeRange();
        },
        timeRange(){            
            // let speed = Math.floor(this.$refs.audio.duration);
            console.log(this.$refs.audio.duration);

            if(this.play){
                this.ti = setInterval(() => {
                    // console.log(this.currentDuration++);
                this.currentDuration = this.$refs.audio.currentTime;
                // this.currentDuration ++;
                // console.log(this.$refs.audio.currentTime);
                //进度条
                this.bars =(this.$refs.audio.currentTime/this.$refs.audio.duration) * 100; 
                console.log(this.bars);     
                // // console.log(this.$refs.audio.currentTime);          
                if(this.currentDuration > Math.floor(this.$refs.audio.duration))
                    {
                        if(this.chooseLoop){
                            // this.currentDuration = 0;
                            // this.bars = 0;
                            // console.log('loop');
                            this.switch();
                            this.$refs.audio.play();


                        }else{
                            this.next();
                        }
                        // clearInterval(this.ti);
                    }
                
                }, 1000);
            }
            else{
                clearInterval(this.ti);
            }      
        },
        getbar(){
            let bar = this.$refs.bar;
            // console.log(bar);

        },
        getMusicInfo(){
            let that = this;
            this.$refs.audio.oncanplay = function(){
                let duration = this.duration;
                let minutes = Math.floor(duration/60);
                let second = Math.floor(duration%60);
                that.total = minutes+':'+second;        
            }
        },
        mute(){
            this.isVoice = !this.isVoice;
            this.$refs.audio.muted = !this.isVoice;
        },
        init(){
            this.playlist = this.sources;
            console.log(this.playlist);
            this.currentPlay.src = this.playlist[0].src;
            this.currentPlay.songName = this.playlist[0].songname;
            this.currentPlay.index = 0;
            this.getMusicInfo();
            this.getbar();
        },
       getSongNum(i){
           console.log(i+'----0000')
           this.currentPlay.src = this.playlist[i].src;
           this.currentPlay.songName = this.playlist[i].songname;
           this.currentPlay.index = i;
        //    this.play = false;
           if(!this.play){
            //    this.play = !this.play;
            //    this.$refs.audio.play();
                this.play = !this.play;
                let that = this;
                this.$refs.audio.play();
                this.$refs.audio.oncanplay = function(){
                    // that.doplay();
                    this.play();
                    that.timeRange();
                    // clearInterval(that.ti);
                    console.log('123');
                }
               console.log('getsongnum')
           }else{
            //    this.$refs.audio.pause();
           
            if(this.$refs.audio.currentTime > 0){

            }else{
                this.bars = 0;
                this.currentDuration = 0;
                clearInterval(this.ti);
            }

           }
        //    this.$refs.audio.play();
        //    this.doplay();

       }
        
    },
    computed: {
        
        
    },
    
    filters:{
        format(num){
            let m = Math.floor(num/60);
            let s = Math.floor(num%60);
            if(s < 10)
                s = `0${s}`;
            return `0${m}:${s}`; 
        }
    },
    mounted() {
        this.init();
        // this.getSongNum();
    }, 
}
</script>
<style lang="scss" scoped>
$m-width:430px;
    .box{
        width: $m-width;
       height: 80px;
       min-width: 428px;
        // margin: 0 auto;
        position: relative;
        .photo{
            width: 80px;
            height: 100%;
            background: greenyellow;
            position:absolute;
            z-index: 1;
            img{
                cursor: pointer;
            }
        }
        .right-area{
            width: $m-width;
            height: 100%;
            background: rgb(35, 56, 66);
            position: absolute;
            left:0;
            .song-name{
                color: white;
                position: absolute;
                top: 50%;
                margin-top: -24px;
                left: 110px;
            }
            .time{
                color: white;
                position:absolute;
                right: 29px;
                top:50%;
                margin-top: -20px;
            }
            .bar{
                // width: 85%;
                height: 3px;
                background: rgb(209, 160, 160);
                position: absolute;
                top: 50%;
                right: 30px;
                left: 105px;
                margin-top:-1.5px;
                .progress{
                    width: 0;
                    height: 100%;
                    background: red;
                    display: block;
                  
                      &::after{
                    //     content: "";
                    //     width:10px;
                    //     height: 10px;
                    //     background: rgb(6, 0, 58);
                    //     display: block;
                    //     border-radius: 50%;
                    //     transform: translateY(-3px);
                    }
                }  
                .bar-head{
                    width: 8px;
                    height: 8px;
                    background: yellow;
                    display: block;
                    border-radius: 50%;
                    position: absolute;
                    top: -3px;
                    cursor: pointer;
                    // left: 2%;
                }  
            }
            .controls{
                position: absolute;
                bottom: 1px;
                // transform: translateX(18%);
                left: 88px;
                color: gold;

                span{
                    // width: 18px;
                    // height: 18px;
                    // background: blueviolet;
                    display: inline-block;
                    margin:6px 20px;
                    cursor: pointer;
                    font-size: 21px;
                     
                }
                
                .pre{
                    color: gold;
                    // width:0;
                    // height:0;
                    // border-left:$triangle solid transparent;
                    // border-right:16px solid gold;
                    // border-top:$triangle solid transparent;
                    // border-bottom:$triangle solid transparent;
                }
                .play{
                    // width: $triangle+10px;
                    // height: $triangle+10px;
                    // background: green;

                }
                .next{
                    // width:0;
                    // height:0;
                    // border-left:16px solid salmon;
                    // border-right:$triangle solid transparent;
                    // border-top:$triangle solid transparent;
                    // border-bottom:$triangle solid transparent;
                }
              
            }
              .controls-right{
                    position: absolute;
                    right: 20px;
                    color: gold;
                    bottom: 4px;
                    right: 25px;
                    cursor: pointer;
                    .voice,.loop,.list{
                    font-size: 16px;
                    // position: absolute;
                    // right: 10px;
                    margin: 0 4px;
                    }
                    .loop-choose,.show-list{
                        color:red;
                    }
                    
                }
        }
        
    }
    
</style>
