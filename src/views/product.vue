<template>
<div class="product" >
   <div class="wrap">
  <div class="slider">
      <mt-swipe :auto="3000" class="wrap-title">
        <mt-swipe-item  >
             <img src="http://192.168.1.123:8081/hqcd/download/product/IMG_20180530_121443.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item  >
             <img src="http://192.168.1.123:8081/hqcd/download/product/1534648761256554.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item  >
             <img src="http://192.168.1.123:8081/hqcd/download/product/1534413187228413.jpg" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="wrap-content">
    <h2>{{item.name}}</h2>
    <h3>{{item.categoryName}}</h3>
    <h4>{{item.productDescribe}}</h4>
    <h4>{{item.suitableRange}}</h4>
    </div>
    <div class="wrap-content">
    <h2>{{user.address}}</h2>
     <div class="contain-img"><img :src=" 'http://192.168.1.123:8081/hqcd/download'+ user.headUrl" alt=""></div>
    <div class="title">
    <h4>{{user.nickname}}</h4>
    <h4>{{user.userInCompany}}</h4>
    </div>
    </div>
     <div class="footer" >
       <mt-button size="small" type="primary" @click="getReg">立即注册</mt-button>
       <mt-button size="small" type="primary" @click="getApp(e)">下载App</mt-button>
   </div>
     </div>
  </div>
</template>
<script>
import axios from 'axios'
import {Swipe, SwipeItem} from 'mint-ui'

export default {
  name:'product',
  data(){
      return{
          item:{},
          user:{}
      }
  },
  methods:{
      strQuery(str){
       var url=window.location.search();
       var urlArr=str.split("?")
       var queryArr= urlArr[1].split('&')
       var  paramsArr =queryArr[0].split('=')
       var  newsId=paramsArr[1]
     },
      getData(){
       axios.get("http://192.168.1.116:8081/api/product/findById",{
           params:{
               id:this.$route.query.id,
               userid:this.$route.query.userid
           }
       }).then(res => {
               console.log(res);
               console.log(res.data)
               this.item =res.data.data.product; 
               this.user =res.data.data.user; 
             })
      },
       getReg(){
        this.$router.push({path:'/register'})
      },
      getApp(e){
           window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"
      }
      
      
      },
      mounted(){
          this.getData();
}
}
</script>
<style>
.product{
    background:#f2f2f2
}
</style>
<style scoped>
.wrap{
    background:#fff;
    position:absolute;
     width:600px;
     height:1400px;
     text-align:center;
     top:50%;
     left:50%;
     margin-top:-380px;
     margin-left:-300px;     
    
}
  .wrap img{
    display:block;
    width: 600px;
    height:300px;
  }
  .wrap .slider{
    display:block;
    height:350px;
    width:600px;
    margin-left:30px
  }
  .mint-swipe-item {
    display:block;
    width:600px;
    height:350px
  }
 .wrap .wrap-content{
   background:#fff;
   border:1px solid #d1d1d1;
   border-radius:10px;
   width:600px;
   height:140px;
   margin-bottom:15px;
   margin-left:28px;
   margin-top:15px
 }
 .wrap .wrap-content h2{
   font-size:25px;
   text-align:center;
   margin-top:10px;
 }
  .wrap .wrap-content h3{
    font-size:20px;
    font-weight:500;
    color:#000;
    line-height:1.2;
    margin-botto:10px;
    margin-top:-10px;
    text-align:center
  }
  .wrap .wrap-content  h4{
    font-weight:300;
    color:#000;
    line-height:1.2;
    margin-top:-15px;
     text-align:center
  }
    .contain-img img{
    display:block;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-left:112px; 
    margin-top:-5px
  }
  .title{
    margin-top:-40px
  }
   .mint-button--primary{
    background-color:#f5f5f5;
    color:#333;
    width:200px;
    height: 40px;
    margin-left:10px ;
    margin-top:10px; 
    border:1px solid #999
  }
.footer{
  display:flex;
  position:fixed;
  bottom:0;
  width:605px;
  height:60px;
  margin-top:30px;
  justify-content:center;
  background:#fff;
}
</style>


