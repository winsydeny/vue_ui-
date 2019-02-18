import Alert from './alert.vue'
import Vue from 'vue'
// console.log(Alert);
Alert.newInstance = properties => {
    /* props 传参 扩展性较好 如不需要传参可以直接使用简写
        使用render渲染是为了运行时尽量不出现错误
    */
        const props = properties || {};
        // console.log(props);
        // render instance
        const Instance = new Vue({
            // data:props,

            // 
            // render(h){
            //     return h(Alert,{
            //         // props:props
            //     });
            // }
            render:h => h(Alert)
        });
        //mount instance
        /*
            vm.$mount 手动挂实例(为挂载)
            由于Instance实例没有el选项，处于“为挂在”状态，即没有关联的DOM元素
        */
        const component = Instance.$mount();
        // console.log(component);
        
        document.body.appendChild(component.$el);
        const alert = Instance.$children[0];
        // console.log(alert);

        return{
            add(noticeProps){
                alert.add(noticeProps);
            },
            remove(name){
                alert.remove(name);

            }
        }

};
export default Alert;