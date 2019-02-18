import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// import form  from '../components/form/form.vue'
// import Test from '../components/Test'
import display from '../views/display'
import table from '../views/table-render'
// import alert from '../components/alert/alert'
const router = new Router({
   mode:'history',
    routes:[
        {
            path:'/',
            component:table
        }
    ]
})

export default router;