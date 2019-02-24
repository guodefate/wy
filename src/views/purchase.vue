<template>
<div class="purchase" >
  <div class="wrap">
      <h1 v-text="item.title"></h1>
      <h4> {{item.nickName}}</h4>
      <h4> {{item.createTime}}</h4>
      <div class="contain-img"><img :src=" 'http://192.168.0.115:8081/hqcd/download'+ item.headUrl" alt=""></div>
     <div class="content-wrap-box">
         <div class="content-wrap" v-for="title in contents" :key="title._id" >
      <div v-if="title.dType===1"  class="content-wrap-content" v-html='title.content.replace(/\n/g,"</br>")'>
       </div>
       <img  v-else-if="title.dType===2" :src=" 'http://192.168.0.115:8081/hqcd/download'+ title.content"     alt="">
    </div>
     </div>
     <div class="related-purchase-box">
         <div class="related-purchase-title">
             相关求购
         </div>
         <div class="related-purchase-content" v-for="(items, index) in similarList" :key="index">
             <router-link :to="{path:'/purchase',query:{id:items.id,userId:userId}}">
                            <div class='purchase-titles'>{{items.title}}</div>
                            <div class="purchase-content">{{items.content}}</div>
                            <div class='purchase-time'>{{items.createTime}}</div>
                            </router-link>
                       </div>

         </div>
     </div>
     <div class="div"></div>
     <div class="footer" >
       <!-- <mt-button size="small" type="danger" @click="getAPP" id="openApp">打开app</mt-button> -->
       <mt-button size="small" type="danger" @click="getReg">立即查看</mt-button>
       <!-- <mt-button size="small" type="primary" @click="getApp(e)">下载App</mt-button> -->
   </div> 
      </div> 
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:'purchase',
  data(){
      return{
          item:{ },
          contents:[],
          title:{},
          similarList:[],
          userId:''
 
      }
  },
  created(){
       this.userId= this.$route.query.userId
  },
  methods:{
    
     strQuery(str){
        var url=window.location.search();
       var urlArr=str.split("?")
        var queryArr= urlArr[1].split('&')
        var  paramsArr =queryArr[0].split('=')
        var  id=paramsArr[1]
        var userId=paramsArr[2]
     },
      getData(){
         this. $axios.get("getPurchase",{
           id:this.$route.query.id,
           userId:this.$route.query.userId,
            // id:137,
            pageNum:1,
            pageSize:10000}).then(res => {
               console.log(res);
               this.item =res.data.purchase;
               this.title=res.data.purchase.contents[0]
               this.contents=res.data.purchase.contents
               this.similarList=res.data.similarList
               
             })
      },
       getReg(){
               this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
      },
      //  getApp(e){
      //      window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"
      // }
        getAPP(){
        if(navigator.userAgent.match(/android/i)){
       //通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并且自动组织a标签的默认行为
       //负责打开a标签的href链接
       var isInstalled;
       // 下面是安卓端APP接口调用的地址，视情况修改
      var contId=this.$route.query.id
        //console.log(contId)
      var ifrSrc='dzt://dzt.com?type=2&contentId=' +contId
       //console.log(ifrSrc)
       var ifr=document.createElement('iframe')
       ifr.src=ifrSrc;
       ifr.style.display='none';
       ifr.onload=function(){
           isInstalled=true;
           alert(isInstalled);
           document.getElementById('openApp0').click()
       }
       ifr.onerror=function(){
           //alert('May be not installed')
           isInstalled=false;
           alert(isInstalled)
       }
       document.body.appendChild(ifr);
       setTimeout(function(){
           document.body.removeChild(ifr)
       },1000)
   }

   //ios判断
   if (navigator.userAgent.match(/(iphone|ipod|ipas);?/i)){
       var isInstalled
       //下面ios调用的地址
       var ifrSrc='dzt://dzt.com?type=2&contentId=${com.contentId}'
       var ifr=document.createElement('iframe')
       ifr.src=ifrSrc
       ifr.style.display='none';
       ifr.onload=function(){
           isInstalled=true;
           alert(isInstalled)
           document.getElementById('openApp1').click()
       }
       ifr.onerror=function(){
           isInstalled=false;
           alert(isInstalled)
       }
       document.body.appendChild(ifr)
       setTimeout(function(){
           document.body.removeChild(ifr)
       },1000)
   }
      } ,
      
      },
      mounted(){
          this.getData();
},
 watch: {
    $route(newVal, oldVal) {
        console.log('数据变了');
      // 重新获取数据即可
      //   this.created();
      // 初始化数据
      // this.strQuery(str);
      this.getData();
        location.replace(location) 
    }
  }
}
</script>
<style>
  body{
  margin: 0;
  padding: 0;
}
</style>
<style lang='less'>
a{
    text-decoration: none;
    color:black;
  }
.wrap{
     background:#fff;
     width:100%;
}
 .wrap img{
     display:block;
     width:100%;
}
 .wrap h1{
     /* text-align:center; */
     font-size:0.54rem;
     padding:0.4rem;
}
 .wrap h4{
     font-size:0.36rem;
     font-weight:300;
     color:#000;
     line-height:1.2;
     margin-top:0.1rem;
     margin-bottom:0.05rem;
     margin-left:1.35rem;
     text-align:left;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
     word-break: break-all;
}
 .contain-img img{
     display:block;
     width:1rem;
     height:1rem;
     border-radius:50%;
     margin-left:0.2rem;
     margin-top:-1rem 
}
.content-wrap-box{
   border-top:0.02rem solid rgba(100,100,100,1);
   margin-top:0.25rem;
}
   .div{
        height: 2.2rem;
        background-color: white;
        width: 100%;
    }
 .content-wrap{
     margin:0.24rem;
    
}
 .content-wrap-content{
     /* text-indent:0.4rem; */
     text-align:justify;
     margin-left: 0.2rem;
     margin-right: 0.2rem;
     font-size:0.36rem
}
 .mint-button--danger{
     color:#fff;
     width:100%;
     height:0.8rem;
     border:1px solid #999;
     font-size:0.34rem 
}
 .footer {
        display: flex;
        z-index: 999;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.44rem;
        margin-top: 0.35rem;
        left: 0;
        line-height: 1.44rem;
        justify-content: center;
        background: #fff;}
        .mint-button--danger {
            height: 1.44rem;
            font-size: 0.56rem;
        }
        .group-btn{
            font-size: 0.56rem;
        }
         .mint-button{
            font-size: 0.56rem;
            border-radius:0rem;
        }
        .mint-button--small{
            font-size: 0.56rem;
        }
        //相关求购
        .related-purchase-box{
         .related-purchase-title{
            background-color: rgba(22,190,172,1);
            color:white;
            text-align: center;
            font-size: 0.42rem;
            padding:0.13rem 0;
         }
         .related-purchase-content{
             margin:0.5rem;
             .purchase-titles{
                 font-size: 0.36rem;
                 font-weight: bold;
                 padding-bottom: 0.1rem;
                 border-bottom: 0.02rem solid #E5E5E5 ;
             }
             .purchase-content{
                 font-size: 0.36rem;
                 color:rgba(51,51,51,1);
                 padding:0.1rem 0;
             }
             .purchase-time{
                 font-size: 0.26rem;
                 color:rgba(102,102,102,1);

             }
         }

        }
 
</style>


