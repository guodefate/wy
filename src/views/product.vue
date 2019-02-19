<template>
  <div class="product">
    <div class="wrap">
      <div class="slider">
        <mt-swipe :auto="3000" class="wrap-title">
          <mt-swipe-item v-for="items in images" :key="items._id">
            <img class='swipe-icon' :src="'http://192.168.0.115:8081/hqcd/download'+ items.imageUrl" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="wrap-content-rbox">
        <h2>{{item.name}}</h2>
        <h3>{{item.productModel}}</h3>
        <h4>{{item.brand}}</h4>
        <h4>{{item.suitableRange}}</h4>
      </div>
      <div class="title">
        <div class="contain-img"> <img class='user-icon' :src="'http://192.168.0.115:8081/hqcd/download'+ user.headUrl" alt=""></div>
        <div class='username'>{{user.nickname}}</div>
        <div class='usertime'>{{introduction}}</div>
      </div>
      <div class="wrap-box">
        <div class="wrap-techlogo">
          <h3>技术参数</h3>
          <h4>{{technicalParameter[0]["key"]}} {{technicalParameter[0]["value"]}}
          </h4>
        </div>
        <div class="wrap-foot">
          <h3>产品描述</h3>
          <h4>{{item.productDescribe}}</h4>
        </div>
      </div>
      <!-- 相关推荐 -->
      <div class="recommend-box">
        <div class="recommend-title">
          相关推荐
        </div>
        <div class="recommend-content-box">
            <div class="recommend-content" v-for="(item, index) in similarList" :key="item.id" >
           <img class='recommend-icon' :src=" 'http://192.168.0.115:8081/hqcd/download'+ item.picture" alt="">
           <div class="recommend-content-tibox">
              <div class="recommend-content-title">
                 {{item.name}}
              </div>
              <div class="recommend-bottom">
                {{item.categoryName}}
              </div>
          </div> 
        </div>
        
         </div>
      </div>
      <div class="div"></div>
      <div class="footer">
        <!-- <mt-button size="small" type="danger" @click="getAPP" id="openApp">打开app</mt-button> -->
        <mt-button size="small" type="danger" @click="getReg">立即查看</mt-button>
        <!-- <mt-button size="small" type="primary" @click="getApp(e)">下载App</mt-button> -->
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {
    Swipe,
    SwipeItem
  } from 'mint-ui'
  export default {
    name: 'product',
    data() {
      return {
        item: {},
        user: {},
        images: [],
        technicalParameter: [],
        introduction:'',
        similarList:[]

      }
    },
    methods: {
      strQuery(str) {
        var url = window.location.search();
        var urlArr = str.split("?")
        var queryArr = urlArr[1].split('&')
        var paramsArr = queryArr[0].split('=')
        var userId = paramsArr[1]
        var id = paramsArr[2]
      },
      getData() {
        this.$axios.get("getProduct", {
          id: this.$route.query.id,
          userId: this.$route.query.userId
        }).then(res => {
          console.log(res);
          //console.log(res.data)
          this.item = res.data.product;
          this.technicalParameter = JSON.parse(res.data.product.technicalParameter)
          this.items = res.data.product.images[0]
          this.images = res.data.product.images
          this.user = res.data.user;
          // this.introduction=res.data.company.introduction
          this.similarList=res.data.similarList
        })
      },
      getReg() {
        this.$router.push({
          path: '/register',
          query: {
            userId: this.$route.query.userId
          }
        })
      },
      // getApp(e){
      //      window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"
      // }
      getAPP() {
        if (navigator.userAgent.match(/android/i)) {
          //通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并且自动组织a标签的默认行为
          //负责打开a标签的href链接
          var isInstalled;
          // 下面是安卓端APP接口调用的地址，视情况修改
          var contId = this.$route.query.id
          //console.log(contId)
          var ifrSrc = 'dzt://dzt.com?type=1&contentId=' + contId
          //console.log(ifrSrc)
          var ifr = document.createElement('iframe')
          ifr.src = ifrSrc;
          ifr.style.display = 'none';
          ifr.onload = function() {
            isInstalled = true;
            alert(isInstalled);
            document.getElementById('openApp0').click()
          }
          ifr.onerror = function() {
            //alert('May be not installed')
            isInstalled = false;
            alert(isInstalled)
          }
          document.body.appendChild(ifr);
          setTimeout(function() {
            document.body.removeChild(ifr)
          }, 1000)
        }
        //ios判断
        if (navigator.userAgent.match(/(iphone|ipod|ipas);?/i)) {
          var isInstalled
          //下面ios调用的地址
          var ifrSrc = 'dzt://dzt.com?type=1&contentId=${com.contentId}'
          var ifr = document.createElement('iframe')
          ifr.src = ifrSrc
          ifr.style.display = 'none';
          ifr.onload = function() {
            isInstalled = true;
            alert(isInstalled)
            document.getElementById('openApp1').click()
          }
          ifr.onerror = function() {
            isInstalled = false;
            alert(isInstalled)
          }
          document.body.appendChild(ifr)
          setTimeout(function() {
            document.body.removeChild(ifr)
          }, 1000)
        }
      },
    },
    mounted() {
      this.getData();
    }
  }
</script>
<style>
  body {
    margin: 0;
    padding: 0;
    padding-bottom: 2rem;
  }
</style>
<style lang='less'>
  .wrap {
    background: rgba(246, 246, 246, 1);
    width: 100%;
  }
  .wrap .swipe-icon {
    display: block;
    width: 100%;
    height: 11.51rem;
    background: rgba(238, 238, 238, 1);
    border: none;
  }
  .wrap .slider {
    height: 11.51rem;
    width: 100%;
    border: none;
  }
  .mint-swipe-item {
    display: block;
    width: 100%;
    height: 11.51rem;
    border: none;
  }
  .wrap .wrap-content-rbox {
    width: 100%;
    margin-top: -0.3rem;
    background: #fff;
    padding-left: 0.25rem;
    padding-bottom: 0.22rem;
  }
  .wrap .wrap-content-rbox h3 {
    font-size: 0.42;
    color: rgba(40, 120, 158, 1);
    margin-bottom: 0.17rem;
    margin-top: 0;
  }
  .wrap .wrap-content-rbox h2 {
    font-size: 0.52rem;
    margin-top: 0.1rem;
    padding-top: 0.2rem;
    margin-bottom: 0.22rem;
  }
  .wrap .wrap-content-rbox h4 {
    font-weight: 300;
    color: #000;
    line-height: 1.2;
    margin-top: 0.17rem;
    margin-bottom: 0.08rem;
    font-size: 0.34rem;
    /* margin-left:0.2rem; */
  }
  .contain-img>.user-icon {
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    margin-left: 0.6rem;
  }
  .title {
    background: #fff;
    width: 100%;
    height:1.8rem;
    margin: 0.24rem 0;
    padding: 0.25rem 0;
  }
  .title .username {
    margin-left: 2.6rem;
    margin-top: -1.5rem;
    margin-bottom: 0.37rem;
    padding-right:0.15rem;
  }
  .title .usertime {
    margin-left: 2.6rem;
    padding-right:0.15rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .mint-button--danger {
    color: #fff;
    width: 100%;
    height: 0.8rem;
    border: 1px solid #999;
    font-size: 0.34rem
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
  .wrap-box{
     margin-top:0.24rem;
     padding:0.23rem 0.5rem;
     background-color:white;
  }
  .wrap-techlogo {
    background: #fff;
    width: 100%;
    border-bottom:0.01rem solid rgba(153,153,153,1);
    margin-bottom:0.37rem;
   
  }
  .wrap-techlogo h3 {
    font-size:0.42rem;
    margin-bottom:0.45rem;
  }
  .wrap-techlogo h4 {
    height: 0.23rem;
    opacity: 1;
    font-size: 0.34rem;
    font-family: PingFang SC;
    color: rgba(100, 100, 100, 1);
    letter-spacing: 0rem;
    margin-bottom: 0.67rem;
  }
  .wrap-foot {
    background: #fff;
    width: 100%;
    /* margin: 0.3rem auto; */
  }
  .wrap-foot h3 {
    margin-top: 0.3rem;
    font-size:0.42rem;
  }
  .wrap-foot h4 {
    opacity: 1;
    font-size: 0.34rem;
    font-family: PingFang SC;
    color: rgba(100, 100, 100, 1);
    letter-spacing: 0rem;
    margin-bottom: 0.3rem;
    justify-content: center;
  }
  /* 相关推荐 */
  .recommend-box{
    .recommend-title{
      height: 0.88rem;
      line-height: 0.88rem;
      font-size:0.42rem;
      padding-left:0.5rem; 
      background-color: white;
      margin:0.25rem 0;
    }
    .recommend-content-box{
      float: left;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-around;
      box-sizing: border-box;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
      // background-color: white;
        // overflow: hidden;
    }
    .recommend-content{
      width: 46.5% !important;
      display: inline-block;
      box-sizing: border-box;
      // border: 1px solid #fff;
      background-color: rgba(238,238,238,1);
      margin:0.15rem;
    }
    .recommend-icon{
      display: block;
      height: 5rem;
      // padding-top:0.05rem;
    }
    .recommend-content-tibox{
       width:100%;
      //  background: white;
    }
    .recommend-content-title{
      font-size: 0.42rem;
      padding:0.21rem;
      padding-left:0.1rem;
    }
    .recommend-bottom{
     float:right;
     padding:0.2rem 0;
     padding-right: 0.12rem;
    font-size: 0.32rem;
      
    }

  }
     .div{
        height: 2.2rem;
        background-color: white;
        width: 100%;
    }
</style>
