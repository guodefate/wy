<template>
<div class="group" >
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
    <!-- <div class="wrap-time"> 
        <span class="left">限时特卖</span>
        <span class="right"> 距结束：29天15:16:18</span>
    </div> -->
    <!-- <div class="wrap-content">
    <h2>{{item.name}}</h2>
    <h3>{{item.content}}</h3>
    <h4>{{item.productDescribe}}</h4>
    <h4>{{item.price}}</h4>  <h4>{{item.number}}</h4>
    </div>
    <div class="wrap-content">
    <h2>{{user.address}}</h2>
     <div class="contain-img"><img :src=" 'http://192.168.1.117:8081/hqcd/download'+ user.headUrl" alt=""></div>
    <div class="title">
    <h4>{{user.nickname}}</h4>
    <h4>{{user.userInCompany}}</h4>
    </div>
    </div>
     <div class="footer" >
       <mt-button size="small" type="primary" @click="getReg">立即注册获取积分</mt-button>
       <mt-button size="small" type="primary" @click="getApp">立即联系打卡APP查看</mt-button>
   </div> -->
   <div class="wrap-content">
       <h3>{{item.categoryName}}</h3>
       <h4>{{item.productModel}}</h4>
       <span class="content">{{item.custom}}</span>
       <span class="left">{{title.price}}</span> 
       <!-- <span class="right">1件起拼</span> -->
   </div>
   <!-- <div class="wrap-number">
       <h3>火拼数据</h3> 
        <h4>UU-119 <span>拼团成功</span>  10人   剩0件 </h4>
        <h4 class="botton">UU-120 <span> 28595 </span>   5人   剩128000件 </h4>
   </div> -->
   <div class="wrap-title-item">
     <div class="wrap-top-hearder">
          <!-- <img src="../assets/logo_icon.png" alt=""> -->
         <img :src=" 'http://192.168.1.123:8081/hqcd/download'+ item.headUrl" alt="">
          <h3>{{item.name}}</h3>
          <!-- <a href="">进入商铺>></a>    -->
      </div>
      <div class="wrap-hr"><hr></div>
   <div class="wrap-techlogo">
      <h3>技术参数</h3>
      <!-- <h4> 产品名称   <span>环球磁电环球磁电环球磁电环球磁电</span></h4>
      <h4> 产品名称   <span>环球磁电环球磁电环球磁电环球磁电</span></h4>
      <h4> 产品名称   <span>环球磁电环球磁电环球磁电环球磁电</span></h4> -->
      <h4>{{item.technicalParameter}}</h4>
   </div>
    <div class="wrap-hr"><hr></div>
    <div class="wrap-foot">
        <h3>产品描述</h3>
        <span>{{item.productDescribe}}
        </span>
    </div>
     <div class="footer" >
       <mt-button size="small" type="primary" @click="getReg">立即注册</mt-button>
       <mt-button size="small" type="primary" @click="getApp(e)">下载App</mt-button>
   </div>
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
          title:{}
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
       axios.post("http://192.168.1.116:8081/api/collage/findById",{
               id:949 ,
               count:10    
       }).then(res => {
               console.log(res);
               console.log(res.data)
               this.item =res.data.data.product; 
               this.title =res.data.data.collage[0]; 
             })
      },
       getReg(){
        this.$router.push({path:'/register'})
      },
      getApp(){
        axios.get("http://192.168.1.117:8081/hqcd").then(res=>{
          console.log(res)
        })
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
    position:absolute;
     width:600px;
     height:1200px;
     /* text-align:center; */
     background:rgba(246,246,246,1) ;
     top:50%;
     left:50%;
     margin-top:-250px;
     margin-left:-230px;
  }
  .wrap img{
    display:block;
    width: 400px;
    height:300px;
  }
  .wrap .slider{
    display:block;
    height:350px;
    width:400px;
    margin-left:30px
  }
  .mint-swipe-item {
    display:block;
    width:400px;
    height:350px
  }
  .wrap-time{
    height:64px;
    background:url("../assets/djs_bg.png")
  }
  .wrap-time .left{
    display: block;
    float: left;
    margin: 12px 35px;
    width: 142px;
    height: 34px;
    opacity: 1;
    font-size: 26px;
    font-family: Source Han Sans CN;
    font-weight: Bold;
    color: rgba(255,239,1,1);
    line-height: nullpx;
    letter-spacing: 0px
  }
  .wrap-time .right{
    display: block;
    float:right;
    margin: -40px -10px;
    width: 324px;
    height: 28px;
    opacity: 1;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: Normal;
    color: rgba(255,255,255,1);
    line-height: nullpx;
    letter-spacing: 0px;
  }
  .wrap-content{
    height: 170px;
    opacity: 1;
    background: rgba(255,255,255,1);
    float: left;
    padding-left: 10px;
  }
  .wrap-content h3{
    width: 319px;
    height: 34px;
    opacity: 1;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: Bold;
    color: rgba(51,51,51,1);
    line-height: 40.1088px;
    letter-spacing: 0px;
    margin-top: 8px;
  }
  .wrap-content h4{
    height: 34px;
    opacity: 1;
    font-size:20px;
    font-family: PingFang SC;
    font-weight: Bold;
    color: rgba(40,120,158,1);
    line-height: 40.1088px;
    letter-spacing: 0px;
    margin-top: -21px;
  }
  .wrap-content .content{
    display:block;
    height: 54px;
    opacity: 1;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: Regular;
    color: rgba(100,100,100,1);
    line-height: 25.0816px;
    margin-top: -21px;
  }
  .wrap-content .left{
    display:block;
    float:left;
    height: 26px;
    opacity: 1;
    font-size:18px;
    font-family: PingFang SC;
    color: rgba(255,0,0,1);
    line-height:35.1048px;
    margin-top: -7px;
  }
  .wrap-content .right{
    display:block;
    float:right;
    width: 97px;
    height: 26px;
    opacity: 1;
    font-size: 18px;
    font-family: PingFang SC;
    color: rgba(51,51,51,1);
    line-height: 27.9972px;
    margin-top: -2px;
    margin-right:220px;
  }
  .wrap-number{
    height: 100px;
    opacity: 1;
    background: rgba(255,255,255,1);
    margin-top:184px;
  }
  .wrap-number h3{
    width: 110px;
    height: 27px;
    opacity: 1;
    font-size:20px;
    font-family: PingFang SC;
    font-weight: Bold;
    color: rgba(51,51,51,1);
    line-height: 40.1048px;
    padding-left:45px;
    padding-top: 15px;
    margin-bottom:10px;
  }
  .wrap-number h4{
    float:right;
    height: 22px;
    opacity: 1;
    font-size:18px;
    font-family: PingFang SC;
    font-weight: Medium;
    color: rgba(51,51,51,1);
    line-height: 0.1048px;
    letter-spacing: 0px;
    margin-right:100px;
    margin-top: -15px;
    text-align:justify;
    
  }
   .wrap-number h4 span{
     color:rgba(239,99,99,1)
   }
   .wrap-number   .botton{
     margin-right: 72px;
   }
   .wrap-title-item{
      height: 699px;
      opacity: 1;
      background: rgba(255,255,255,1);
      margin-top:15px;
   }
   .wrap-top-hearder img{
      display:block;
      width: 50px;
      height: 50px;
      /* opacity: 1;
      border:1px solid rgba(51,51,51,1); */
      border-radius:50%;
      margin-left: 50px;
      padding-top:15px;
   }
   .wrap-top-hearder h3{
      float: right;;
      width: 300px;
      height: 27px;
      opacity: 1;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: Bold;
      color: rgba(51,51,51,1);
      line-height: nullpx;
      letter-spacing: 0px;
      margin-top:-45px;
      padding-right:70px;
   }
   .wrap-top-hearder a{
    float:left;
    text-decoration: none;
    color:rgba(255,0,0,1);
    margin-top: -11px;
    padding-left:130px;
    font-size:18px
   }
   .wrap-top-hearder a:hover{
    color:rgba(22,190,172,1);
   }
   .wrap-hr{
      width: 450px;
      height: 2px;
      opacity: 1;
      background: rgba(153,153,153,1);
      margin: 25px auto;
   }
   .wrap-techlogo h3{
      width: 111px;
      height: 28px;
      opacity: 1;
      font-size:18px;
      font-family: PingFang SC;
      font-weight: Bold;
      color: rgba(51,51,51,1);
      line-height: 40.1088px;
      letter-spacing: 0px;
      margin-left: 30px;
      margin-top:-15px;
   }
   .wrap-techlogo h4{
      height: 23px;
      opacity: 1;
      font-size:16px;
      font-family: PingFang SC;
      color: rgba(100,100,100,1);
      line-height: 40.1088px;
      letter-spacing: 0px;
      margin-left: 30px;
      margin-top: -17px;
   }
   .wrap-techlogo span{
     height: 23px;
     color: rgba(100,100,100,1);
     margin-left:35px;
     font-size:14px
   }
   .wrap-foot h3{ 
      width: 110px;
      height: 27px;
      opacity: 1;
      font-size:16px;
      font-family: PingFang SC;
      color: rgba(51,51,51,1);
       margin-left: 30px;
       margin-top: -10px;
   }
   .wrap-foot  span{
     display: block;
      height: 183px;
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: Regular;
      color: rgba(100,100,100,1);
      margin-left: 30px;
      margin-top: -17px;
      text-align:justify;
      text-indent:30px;
      line-height:20px
   }
 /* .wrap .wrap-content{
   background:#fff;
   border:1px solid #d1d1d1;
   border-radius:10px;
   width:400px;
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
    margin-bottom:10px;
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
    background-color:rgba(0,0,0,0.5);
    color:black;
    margin-left:40px ;
    margin-top:15px; 
  }
.footer{
  display:flex;
  position:fixed;
  bottom:0;
  height:45px;
  justify-content:center
}   */

</style>


