// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $axios from './until/$axios'
import 'lib-flexible/flexible.js'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import { Swipe, SwipeItem } from 'mint-ui'
import { Field, } from 'mint-ui'
import Vuex from 'vuex' //引入状态管理
import './until/rem'
import Cookies from 'js-cookie'

Vue.use(ElementUI)
Vue.use(MintUI)
Vue.component(Field.name, Field)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.config.productionTip = false
Vue.use(Vuex)

const ADD_COUNT = 'ADD_COUNT'; //用常量代替事件类型，使代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT'

//注册状态管理全局参数
var store = new Vuex.Store({
    state: {
        token: Cookies.get('token'),
        userId: '',
        moneyData: window.localStorage.getItem('balance'),
        // moneyData: '',
        jumpData: '',
        path: Cookies.get('path'),
        groupData:''


    },
    mutations: {
        updatetoken(state, token) { //第一个参数为state用于变更状态 登录
            // sessionStorage.setItem("token",token);
            state.token = token;
            console.log(token);
            Cookies.set('token', state.token);
           
        },
        // [REMOVE_COUNT](state,token){ //退出登录
        //   sessionStorage.removeItem("token",token)
        //   state.token=token
        // },
        // 记录新人红包的金额
        updatemoneyData(state, data) {
            state.moneyData = data
                // Cookies.set('balance',JSON.stringify(state.moneyData))
                // Cookies.set('balance',JSON.stringify(state.moneyData))
            console.log(state.moneyData)
        },
        // 跳转页面的跳转路径
        updatepath(state, path) {
            state.path = path
            Cookies.set('path', state.path)
        },
        // 修改拼团数据的函数
        updatagroupData(state,obj) {
         // 把数据的修改同步到缓存中
         state.groupData=obj
       },

    }
});
window.onbeforeunload = function() {
        window.localStorage.setItem('balance', store.state.moneyData)
    }
    // 跳转页面的实现
//     router.beforeEach((to, from, next) => {
//     //  store.state.token=sessionStorage.getItem('token') //获取本地存储的token

//  if(to.matched.requireAuth){   //判断该路由是否需要登录权限
//     if(store.state.token){ //通过vuex state获取当时的token是否存在
//       next();
//     }else{
//         this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
//     //   next({
//     //     path:'./register',
//     //     query:{redirect: to.fullPath} //将跳转的路由path作为参数，登录成功后跳转到该路由
//     //   })
//     }
//  }
// // if (from.meta.name == 'group') {
// //     let path = this.$store.state.path
// //     console.log(path);
// //     this.$store.commit('updatapath', path);
// //     next();
// // if (to.meta.name == "register") {
// //     let path = this.$store.state.path

// //     next();

// // }
//     // }
// })
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //注册组件
    components: { App },
    template: '<App/>'
})