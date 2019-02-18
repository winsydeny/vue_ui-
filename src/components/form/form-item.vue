<template>
    <div>
        <label v-if="label" :class="{'i-form-item-label-required':isRequired}">{{ label }}</label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
        </div>
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter.js'
import AsyncValidator from 'async-validate'
export default {
    name:'iFormItem',
    mixins:[Emitter],
    inject:['form'],
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String
        }
    },
    data(){
        return{
            isRequired:false,
            validateState:'',
            validateMessage:'',
        }
    },
    computed: {
        fieldValue(){
            return this.form.model[this.prop];
        }
    },
    methods: {
        getRules(){
            let formRules = this.form.rules;
            formRules = formRules ? formRules[this.prop] : [];
            return [].concat(formRules || []);
        },
         resetField () {
            this.validateState = '';
            this.validateMessage = '';

            this.form.model[this.prop] = this.initialValue;
        },
        getFilteredRule(trigger){
            const rules = this.getRules();


            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },

        validate(trigger,callback = function(){}){
            let rules = this.getFilteredRule(trigger);
            console.log(rules);
            if(rules[0].trigger === 'blur'){
                console.log(this.fieldValue);
                if(this.fieldValue === ''){
                    this.validateState = 'error';
                    this.validateMessage = "用户名不能为空";
                }else{
                    this.validateState = '1';
                }
            }else{
                if(this.fieldValue === ''){
                      this.validateState = 'error';
                    this.validateMessage = "用户名不能为空";
                }else{
                    this.validateState = '1';

                }
                console.log(this.fieldValue);
            }
            // console.log(rules[0].required);
            // console.log(123);

        },
        onFieldBlur(val){
            this.validate('blur');
        },
        onFieldChange(e){
            console.log("change");
            this.validate('change');
        },


        setRules(){
         
            let rules = this.getRules();
            if (rules.length) {
                rules.every((rule) => {
                    // 如果当前校验规则中有必填项，则标记出来
                    this.isRequired = rule.required;
                });
            }
            this.$on('on-form-blur',this.onFieldBlur);
            this.$on('on-form-change',this.onFieldChange);
        },
    },
    mounted() {
        if (this.prop){
            this.dispatch('iForm','on-form-item-add',this);
            this.setRules();
        }
    },
    beforeDestroy() {
            this.dispatch('iForm','on-form-item-remove',this);
    },
}
</script>
<style scoped>
 .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>
