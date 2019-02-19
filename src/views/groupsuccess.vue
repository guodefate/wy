<template>
    <div class='groupsuccess'>
        <div class="order-title">
            订单提交成功！
        </div>
        <div class="order-content">
            该型号拼团数量拼满后，商家会尽快与你取得联系
        </div>
        <div class="order-end">
            <span class="order-time">(<span>{{auth_time}}</span>s)</span>
            <span>后跳转至电子通下载页</span>
        </div>
        <button @click="getAPP()">立即跳转</button>
    </div>
</template>
<script>
import '../until/rem.js'
export default {
    name:'groupsuccess',
    data(){
        return{
          auth_time:''
        }
    },
    mounted(){
        this.getdata();
        this.getAPP();
    },
    methods:{
        getdata(){
             //设置倒计时秒
      this.auth_time = 5;
      var auth_timetimer = setInterval(()=>{
        this.auth_time--;
        if(this.auth_time<=0){
          this.sendAuthCode = true;
         window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd" 
           
          clearInterval(auth_timetimer);
        }
      }, 1000);
        },
         getAPP(){
               window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd" 
           
//         if(navigator.userAgent.match(/android/i)){
//        //通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并且自动组织a标签的默认行为
//        //负责打开a标签的href链接
//        var isInstalled;
//        // 下面是安卓端APP接口调用的地址，视情况修改
//        var contId=this.$route.query.id
//         ////console.log(contId)
//       var ifrSrc='dzt://dzt.com?type=7&contentId=' +contId
//        window.location.href = 'dzt://dzt.com?type=4&contentId'+contId
//         // var ifrSrc='dzt://dzt.com? type=4&contentId=237'
//        ////console.log(ifrSrc)
//        var ifr=document.createElement('iframe')
//        ifr.src=ifrSrc;
//        ifr.style.display='none';
//        ifr.onload=function(){
//            isInstalled=true;
//            alert(isInstalled);
//            document.getElementById('openApp0').click()
//        }
//        ifr.onerror=function(){
//            //alert('May be not installed')
//            isInstalled=false;
//            alert(isInstalled)
//        }
//        document.body.appendChild(ifr);
//        setTimeout(function(){
//            document.body.removeChild(ifr)
//        },1000)
//    }

//    //ios判断
//    if (navigator.userAgent.match(/(iphone|ipod|ipas);?/i)){
//        var isInstalled
//        //下面ios调用的地址
//         var contId=this.$route.query.id
//         ////console.log(contId) 
//        var ifrSrc = "dzt://type=4&contentId="+contId
//        var ifr=document.createElement('iframe')
//        ifr.src=ifrSrc
//        ifr.style.display='none';
//        ifr.onload=function(){
//            isInstalled=true;
//            alert(isInstalled)
//            document.getElementById('openApp1').click()
//        }
//        ifr.onerror=function(){
//            isInstalled=false;
//            alert(isInstalled)
//        }
//        document.body.appendChild(ifr)
//        setTimeout(function(){
//            document.body.removeChild(ifr)
//        },1000)
//    }
      } ,
    }
}
</script>
<style lang='less'>
body{
    background-color: white;
}
  .order-title{
      font-size: 0.68rem;
      color: rgba(100,212,118,1);
      text-align: center;
      margin:2.46rem auto 0.91rem;
  }
  .order-content{
      font-size: 0.54rem;
      margin:0 auto;
      width: 7rem;
  }
  .order-end{
      margin:0.67rem auto 0;
      font-size: 0.54rem;
      text-align: center;
      .order-time{
          color: rgba(255,0,0,1);
      }
  }
  button{
      position: fixed;
      width: 100%;
      left:0;
      bottom: 0;
      background-color: rgba(22,190,172,1);
      color:white;
      font-size: 0.54rem;
      height: 1.44rem;
  }

</style>
