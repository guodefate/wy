<template>
    <div class="comitem">
        <div class="wrap">
            <div class="wrap-contain">
                <div class="contain-img"><img class=comitem-icon :src=" 'http://192.168.0.115:8081/hqcd/download'+ companyDto.headUrl" alt=""></div>
                <div class='title-name'>{{companyDto.name}}</div>
                <div @click="getReg" class='title-detail'>更多详情>></div>
            </div>
            <div class="content-wrap-box">
                 <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" :stretch=true>
                <el-tab-pane label="全部产品" name="first" class='btn'>
                    <div class="wrap-content-box">
                        <div v-show="!product" class='tips'>暂时没有产品信息~</div>
                        <div v-show="product" class="wrap-content" v-for="item in appProductDtoList" :key="item._id">
                             <router-link :to ="{path:'/product',query:{id:item.id,userId:userId}}">
                            <div class="contain"><img class='product-icon' :src=" 'http://192.168.0.115:8081/hqcd/download'+ item.picture" alt=""></div>
                            <div class='wrap-protitle'>{{item.name}}</div>
                            <h4>{{item.productModel}}</h4>
                            <div class='promodel'>{{item.categoryName}}</div>
                            </router-link>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="求购" name="second" class='btn'>
                    <div class="tips" v-show="!buying
                    ">暂时没有求购消息~</div>
                    <div v-show="buying" class="wrap-contents" v-for="titles in stt" :key="titles._id" >
                        <router-link :to ="{path:'/purchase',query:{id:titles.id,userId:userId}}" class='wrap-count'>
                        <!-- <div class="jump" @click="jump"> -->
                        <div class="contains"><img class='contains-icon' :src=" 'http://192.168.0.115:8081/hqcd/download'+ titles.picture" alt=""></div>
                        <div class="shopp-box">
                            <div class='shopp'>{{titles.title}}</div>
                            <div class='shopp-time'>{{titles.createTime}}</div>
                        </div>
                        <!-- </div> -->
                        </router-link>
                    </div>
                </el-tab-pane>
            </el-tabs>
            </div>
           <div class="null"></div>
            <div class="footer">
                <!-- <mt-button size="small" type="danger" @click="getAPP" id="openApp">打开app</mt-button> -->
                <mt-button size="small" type="danger" @click="getReg">立即查看</mt-button>
                <!-- <mt-button size="small" type="primary"  @click="getApp(e)">下载App</mt-button> -->
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'comitem',
        data() {
            return {
                activeName2: 'first',
                appProductDtoList: [],
                title: {},
                stt: [],
                companyDto:{},
                userId:0,
                product:false,
                buying:false,
                buy:''
            }
        },
        methods: {
            strQuery(str) {
                var url = window.location.search();
                var urlArr = str.split("?")
                var queryArr = urlArr[1].split('&')
                var paramsArr = queryArr[0].split('=')
                var userId = paramsArr[1]
                var id = paramsArr[1]
            },
            handleClick(tab, event) {
                //console.log(tab, event)
            },
            getData() {
                this.$axios.get("getCompany", {
                    //id:this.$route.query.id,
                    userId: this.$route.query.id,
                    pageNum: 1,
                    pageSize: 10000
                }).then(res => {
                    console.log(res);
                    //console.log(res.data)
                    this.item = res.data.appProductDtoList[0]
                    this.appProductDtoList = res.data.appProductDtoList
                    if(this.appProductDtoList!=0){
                       this.product=true;
                    }
                    this.title = res.data.company
                    this.companyDto=res.data.companyDto
                })
            },
            getType() {
                this.$axios.get("getCompany", {
                    type: 3,
                    //  id:this.$route.query.id,
                    userId: this.$route.query.id,
                    pageNum: 1,
                    pageSize: 10000
                }).then(res => {
                    console.log(res);
                    //console.log(res.data)
                    // this.titles = res.data[0]
                    this.id=res.data
                    this.stt = res.data
                    // this.buy=res.data.title
                    if(this.stt!=0){
                        this.buying=true
                    }
                })
            },
            jump(){
                this.$router.push({
                    path: '/purchase',
                    query: {
                        id:3,userId: this.$route.query.userId
                    }
                })
            },
            // jumpPage() {
            //     this.$router.push({
            //         path: '/product',
            //         query: {
            //             userId: this.$route.query.id
            //         }
            //     })
            // },
            getReg() {
                this.$router.push({
                    path: '/register',
                    query: {
                        userId: this.$route.query.id
                    }
                })
            },
            // getApp(e){
            //    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"  
            // }
            getAPP() {
                if (navigator.userAgent.match(/android/i)) {
                    //通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并且自动组织a标签的默认行为
                    //负责打开a标签的href链接
                    var isInstalled;
                    // 下面是安卓端APP接口调用的地址，视情况修改
                    var contId = this.$route.query.id
                    //console.log(contId)
                    var ifrSrc = 'dzt://dzt.com?type=0&contentId=' + contId
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
                    var ifrSrc = 'dzt://dzt.com?type=6&contentId=${com.contentId}'
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
            this.getType()
        },
        created(){
            this.getData();
            this.userId= this.$route.query.userId
            console.log(this.$route.query);
        }
    }
</script>
<style>
    body {
        margin: 0;
        padding: 0;
        padding-bottom: 2rem;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
        margin:0;
        padding:0;
        font-size: 0.42rem;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
   
    .el-tabs--car .el-tabs__header .el-tabs__item:first-child {
        border: none;
         font-size: 0.42rem;
         color:white;
         width: 50%;
         box-sizing:border-box;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border-bottom-color: #16beac;
        background: #16beac;
        color: #fff;
        height: 1rem;
        line-height: 1rem;
        padding: 0;
        font-size: 0.42rem;
    }
    .el-tabs__item.is-active {
        margin: 0rem;
        padding: 0rem;
        font-size: 0.42rem;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
    .el-tabs--card .el-tabs__header .el-tabs__item {
        background: rgba(100, 212, 118, 1);
         font-size: 0.42rem;
         color:white;
         width: 50%;
         box-sizing:border-box;
    }

    .el-tabs__nav-wrap.is-scrollable {
        background: #16beac;
         font-size: 0.42rem;
         color:white;
         width: 50%;
         box-sizing:border-box;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
        display: none;
        background: #16beac;
         font-size: 0.42rem;
         color:white;
         width: 50%;
         box-sizing:border-box;
    }
    .el-tabs__item {
        width: 50%;
        box-sizing:border-box;
        height: 1rem;
        line-height: 1rem;
        color: rgba(246, 246, 246, 1);
        font-size: 0.42rem;
        background: #16beac;
        text-align: center;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
    .el-tabs--card .el-tabs__header .el-tabs__item{
        height: 1rem;
        line-height: 1rem;
        font-size: 0.42rem;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding: 0;
        margin: 0;
        font-size: 0.42rem;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        margin:0;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.42rem;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
    .el-tabs--top.el-tabs--card .el-tabs__item:last-child{
        height: 1rem;
        line-height: 1rem;
        font-size: 0.42rem;
        color:white;
        width: 50%;
        box-sizing:border-box;
    }
</style>
<style lang='less'>
    .wrap {
        background: rgba(246, 246, 246, 1);
        width: 100%;
    }
    .contain-img .comitem-icon {
        overflow: hidden;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin-left: 0.6rem;
    }
    .wrap-contain {
        width: 100%;
        height: 1.8rem;
        background: rgba(22, 190, 172, 1);
        padding-top: 1rem;
    }
    .wrap-contain .title-name {
        font-size: 0.36rem;
        margin-left: 2.5rem;
        margin-top: -1.5rem;
        margin-bottom: 0.3rem;
        color:white;
    }
    .wrap-contain .title-detail {
        margin-left: 2.5rem;
        font-size: 0.36rem;
        color:white;
    }
    .wrap-content-box {
        float:left;
        box-sizing: border-box;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
    }
    .wrap-content {
        width: 46.5% !important;
        display: inline-block;
        box-sizing: border-box;
        background-color: rgba(238,238,238,1);
        margin:0.15rem;
    }
    .contain .product-icon {
        display: block;
        height: 5rem;
        background: rgba(238, 238, 238, 1);
        width: 100%;
    }
    
    .wrap .wrap-contents {
        width: 100%;
        background: #fff;
        margin-top: 0.15rem;
        height: 3rem;
        margin-bottom: 0.3rem;
        margin-top: 0.3rem;
        background: #fff;
        padding-right: 0.25rem;
        padding-left: 0.25rem;
    }
    .wrap-count{
      display: flex;
    }
    .contains {
        width: 3rem;
    }
    .contains .contains-icon {
        display: block;
        width: 3rem;
        height: 2.5rem;
        padding-top: 0.3rem
    }
    .shopp-box {
        flex: 1;
        margin-left: 0.24rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
    }
    .wrap-contents .shopp {
        margin-top:0.04rem;
        font-size: 0.42rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-right: 0.25rem;
    }
    .wrap-contents .shopp-time {
        padding-bottom:0.5rem;
        font-size: 0.26rem;
    }
    .wrap-content .wrap-protitle {
        font-size: 0.42rem;
        font-weight: 500;
        color: #000;
        /* line-height:1.2; */
        margin-top: 0.3rem;
        margin-left: 0.2rem;
        margin-bottom: 0.25rem;
    }
    .wrap-content h4 {
        font-size: 0.34rem;
        color: rgba(100, 100, 100, 1);
        margin-top: -0.15rem;
        margin-left: 0.2rem;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .wrap-content .promodel{
        font-size: 0.34rem;
        margin:0.23rem 0.2rem;
    }
    .mint-button--danger {
        color: #fff;
        width: 100%;
        height: 0.8rem;
        border: 1px solid #999;
        font-size: 0.34rem;
        border-radius: 0;
    }
    .tips{
        font-size: 0.42rem;
        margin-top:0.35rem;
        text-align: center;
    }
  .footer {
        display: flex;
        z-index: 999;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.44rem;
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
            border-radius: 0;
        }
        .mint-button--small{
            font-size: 0.56rem;
        }
    .el-tabs__item {
        width: 50%;
        font-size: 0.42rem;
    }
    .null{
        height: 3.2rem !important;
        background-color: white;
        width: 100%;
    }
    a{
    text-decoration: none;
    color:black;
  }
</style>
