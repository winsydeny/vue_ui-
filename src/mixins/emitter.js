// parent => child
// 通过vue的api $emit $on 实现的，在页面中通过mixins使用
function broadcast(componentName,eventName,params){
    this.$children.forEach(child => {
        const name = child.$options.name;
        if(name === componentName){
            child.$emit.apply(child,[eventName].concat(params));
        }else{
            broadcast.apply(child,[componentName,eventName].concat([params]));
        }
    });
}
//child => parent
function  dispatch(componentName,eventName,params){
    let parent = this.$parent || this.$root;
    // console.log(eventName);
    let name = parent.$options.name;
    while(parent && (!name || name !== componentName)){
        parent = parent.$parent;
        if(parent){
            name = parent.$options.name;
        }
    }
    if(parent){
        parent.$emit.apply(parent,[eventName].concat(params));

    }
}

export default{
    methods: {
        dispatch(componentName,eventName,params){
            dispatch.call(this,componentName,eventName,params);
        }
       ,
        broadcast(componentName,eventName,params){
            broadcast.call(this,componentName,eventName,params);
        }
    },
};