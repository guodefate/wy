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
        resolve(res.data)
      }).catch(err=>{
        console.log(err)
        reject(err)
     })
    })
  },
  post(url,params){
    return new Promise((resolve,reject)=> {
      xhr.post(api[url], params,{headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(res=> {
        resolve(res.data)
      }).catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  }
}
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.$axios=$axios;
