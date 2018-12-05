import Vue from 'vue'
import axios from 'axios'
import api from './api'
import router from '../router/index'

var xhr=axios.create({
  baseURL:'/api/',
  timeout:5000
});

var $axios={
  get(url,params,config){
    return new Promise((resolve,reject)=>{
     xhr.get(api[url],{params:params,config}).then(res=>{
        // if(res.data.islogin==false){
        //   alert("登录失败！请重新登录..");
        //   router.push("/login");
        // }
        resolve(res.data)
      }).catch(err=>{
        console.log(err)
        reject(err)
     })
    })
  },
  post(url,params){
    return new Promise((resolve,reject)=> {
      xhr.post(api[url], params).then(res=> {
        // if (res.data.islogin == false) {
        //   // alert("登录失败！请重新登录..");
        //   router.push("/login");
        // }
        resolve(res.data)
      }).catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  }
}

Vue.prototype.$axios=$axios;
