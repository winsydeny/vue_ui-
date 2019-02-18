<template>
    <input 
        type="text"
        :value="currentValue"
         @input="handleInput"
        @blur="handleBlur" 
        
    />


</template>
<script>
import Emitter from '../../mixins/emitter'
export default {
    name:'iInput',
    mixins:[Emitter],
    props:{
        value:{
            type:String,
            default:''
        },
    },
    data(){
        return{
            currentValue:this.value
        }
    },
    watch:{
        value(val){
            this.currentValue = val;
        }
    },
    methods: {
        handleInput(event){
            const value = event.target.value;
            // console.log(event);
            this.currnetValue = value;
            // console.log(value);

            this.$emit('input',value);
            this.dispatch('iFormItem','on-form-change',value);
        },
        handleBlur (){
            // this.currentValue = e.taget.value;
            // console.log(this.currentValue);
            this.dispatch('iFormItem','on-form-blur',this.currentValue);
        }
    },


}
</script>
<style scope>
    
</style>