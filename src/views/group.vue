<template>
    <div class="group">
        <div class="wrap">
            <div class="slider">
                <mt-swipe :auto="3000" class="wrap-title">
                    <mt-swipe-item v-for="items in images" :key="items._id">
                        <img class='swipe-icon' :src="'http://192.168.0.115:8081/hqcd/download'+ items.imageUrl" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="wrap-time" v-show="replace">
                <span class="left">限时特卖</span>
                <span class="right"> 距结束:{{dd+"天"+hh+":"+mm+":"+ss}}</span>
            </div>
            <div class="right-replace" v-show="!replace">
                拼团已结束
            </div>
            <div class="wrap-model-box">
                <h3>{{title.productName}}</h3>
                <h4>型号：{{title.productModel}}/{{title.productModel}}/{{title.productModel}}</h4>
                <h4 class="content">{{item.suitableRange}}</h4>
                <span class="left">￥{{title.price}}</span>
            </div>
            <!-- <div class="wrap-top-hearder">
                     <img :src=" 'http://192.168.0.115:8081/hqcd/download'+ company.headUrl" alt="">
                      <h3>{{company.name}}</h3>
                      <h4>{{company.introduction}}</h4> 
                  </div> -->
            <!-- 火拼数据 -->
            <!-- <div class="rush-box">
                      <div class="rush-left">火拼数据</div>
                      <div class="rush-right">
                          <div class="rush-model">12121 <span>拼团成功</span>10人&nbsp;&nbsp;&nbsp;剩0件</div>
                          <div class="rush-model">12121 <span>拼团成功</span>10人&nbsp;&nbsp;&nbsp;剩0件</div>
                      </div>
                  </div> -->
            <div class="box">
                <div class="wrap-techlogo">
                    <h3>技术参数</h3>
                    <div class="wrap-techlogo-content"  v-for="(item, index) in technicalParameter">
                    <h4>{{item.key}}</h4>
                    <span>{{item.value}}</span>
                    </div>
                </div>
                <div class="wrap-foot">
                    <h3>产品描述</h3>
                    <h4>{{item.productDescribe}}
                    </h4>
                </div>
            </div>
            <div class="fight-group-box">
                <div v-show="group" class="fight-group-title">
                    相关拼团
                </div>
                <div v-for="(item, index) in similarList" :key="item.id">
                    <router-link class="fight-group-content" :to ="{path:'/group',query:{id:item.id,userId:userId}}">
                    <img class='icon' :src="`http://192.168.0.115:8081/hqcd/download`+item.picture" alt="">
                    <div class="fight-group-right">
                        <div class="product-name">
                            {{item.categoryName}}
                        </div>
                        <div class="product-model">
                            {{item.productModel}}
                        </div>
                        <div class="fight-group-botton">
                            <div class="product-price">￥<span>{{item.min}}</span>-￥<span>{{item.max}}</span></div>
                            <div class="product-time">
                                {{item.startTime}}
                            </div>
                        </div>
                    </div>
                    </router-link>
                </div>
            </div>
            <div class="footer">
                <!-- <mt-button size="small" type="primary" @click="getReg">立即注册</mt-button> -->
                <!-- <mt-button size="small" type="primary" @click="getApp(e)">下载App</mt-button> -->
                <!-- <mt-button size="small" type="danger" @click="getAPP" id="openApp">打开app</mt-button> -->
                <mt-button class="group-btn" v-show='money' size="small" type="danger" @click="getbullet">跟你拼了</mt-button>
                <!-- <mt-button class="look-btn" v-if="!replace" size="small" type="danger" @click="getReg">查看更多拼团</mt-button> -->
                <mt-button v-show="!money" size="small" type="danger" @click="getReg" >确定拼了</mt-button>
            </div>
            <!-- 弹框 -->
            <div v-show='bullet' class="bullet-box-box">
                <div class="bullet-box">
                    <div class="bullet-title">
                        <img class='bullet-icon' :src="'http://192.168.0.115:8081/hqcd/download'+ picture" alt="">
                        <div class="bullet-right">
                            <div class="right-box">
                                <div class="bullet-product-name">
                                    {{productName}}
                                </div>
                                <img @click="close" class='bullet-close-icon' src="../assets/icon_sc.png" alt="">
                            </div>
                            <div class="bullet-product-price">￥<span>{{min}}</span>-￥<span>{{max}}</span></div>
                        </div>
                    </div>
                    <div class="bullet-content">
                        <div class="bullet-model-title">型号规格</div>
                        <div v-for="(item, index) in collage" :key="item.id" class="model-box">
                            <div class="in-stock-left">
                                <div class="bullet-model-name">
                                    {{item.productModel}}
                                </div>
                                <div class="in-stock-price">
                                    ￥{{item.price}}
                                </div>
                            </div>
                            <div class="in-stcok-right">
                                <el-input-number size="medium" :min="nummin" :max="item.totalNumber" v-model="item.num"></el-input-number>
                                <div class="bullet-in-stock">
                                    剩余：{{item.totalNumber}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import eventBus from '../until/eventbus.js'
    import '../until/rem.js'
    import {
        Swipe,
        SwipeItem,
        DatetimePicker
    } from 'mint-ui'
    export default {
        name: 'product',
        data() {
            return {
                item: {},
                title: {},
                collage: [],
                images: [],
                company: {},
                technicalParameter: [],
                expirationTime: '',
                expirationTimes: '',
                dd: 0,
                hh: 0,
                mm: 0,
                ss: 0,
                productId: '',
                price: '',
                token: '',
                datas: 
                [
                   {
                       id: '',
                       number: '',
                       totalMoney: '',
                    }
                ]
               ,
                similarList: [],
                bullet: false,
                valueBtn: '跟你拼了',
                min: '',
                max: '',
                productName: '',
                picture: '',
                nummin: 0,
                list: [],
                money: true,
                createTimes: '',
                replace: true,
                path:'',
                num:0,
                group:false,
                userId:0
            }
        },
        //计算属性
        computed: {
            // 总价
            totalMoney() {
               let num=0;
                this.collage.forEach(v => {
                        num +=v.price * v.num;
                    });
                this.datas.totalMoney=num+0.000;
                console.log(this.datas.totalMoney);
                  return num;
            },
            // 总数
            number(){
              let count=0;
              this.collage.forEach(v=>{
                  count+=v.num
              })
              this.datas.number=count;
              console.log(this.datas.number);
              return count;
            },
            // 选中商品的id
            id(){
                let ids = '';
                this.collage.forEach(v=>{
                    if(v.isSelected==true){
                        ids+=v.id;
                        ids+=','
                    }
                })
                // 去掉最后的,
                ids = ids.slice(0,ids.length-1);
                // 返回ids
                return ids;
        }
      },
        watch:{
            collage:{
                handler:function(val,oldVal){
                    let obj={};
                    val.forEach(v=>{
                        // 动态的增加属性
                        // {id:个数}
                        obj[v.id]=v.num;
                    });
                    this.$store.commit('updatagroupData',obj)
                },
                //深度观察 内部的属性改变也会触发
                deep:true
            }
        },
        created() {
              this.token=this.$store.state.token;
              console.log(this.token);
                if(!this.token){
                   this.$message({
                   message: '警告，您还未登录',
                   type: 'warning'
                 });
                       this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
                   
                }else{
                    this.$message({
                   message: '您已是登录状态',
                   type:'success'
                 });
                }
            // this.bullet=false;
            console.log(this.bullet);
            this.path = window.location.href;
            var paths=this.path;
            this.$store.state.path=paths;
            console.log(this.path);
            console.log(paths);
            this.userId= this.$route.query.userId
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
  },
        mounted() {
            this.getData();
            this.countdown();
            this.getReg();
            //   this.getBulletData()   
            // this.getAPP();
        },
        methods: {
            close() {
                this.bullet = false;
                this.money=true;
            },
            // 带参跳转
             jump(){
                 this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
             },
            // 倒计时
            countdown: function() {
                var now = new Date().getTime() / 1000
                var end = (new Date(this.expirationTimes)).getTime() / 1000;
                var time = end - now
                if (time <= 0) {
                    this.replace=false;
                    return '结束'
                } else {
                    let dd = parseInt(time / 60 / 60 / 24);
                    let hh = parseInt((time / 60 / 60) % 24);
                    let mm = parseInt((time / 60) % 60);
                    let ss = parseInt(time % 60);
                    this.dd = dd;
                    this.hh = hh > 9 ? hh : '0' + hh;
                    this.mm = mm > 9 ? mm : '0' + mm;
                    this.ss = ss > 9 ? ss : '0' + ss
                    const that = this
                    setTimeout(function() {
                        that.countdown()
                    }, 1000)
                }
            },
            // 截取url参数
            strQuery(str) {
                var url = window.location.search();
                var urlArr = str.split("?")
                var queryArr = urlArr[1].split('&')
                var paramsArr = queryArr[0].split('=')
                var userId = paramsArr[1]
                var id = paramsArr[2]
                var createTime = paramsArr[3]
            },
            getData() {
                var params = new URLSearchParams()
                var id = this.$route.query.id
                var userId = this.$route.query.userId
                var createTime = this.$route.query.createTime
                params.append('id', id)
                // params.append('createTime',createTime)
                // params.append('password',password)
                this.$axios.post("getGroup", params
                    //  conut:this.$route.query.count 
                ).then(res => {
                    console.log(res);
                    this.similarList = res.data.similarList;
                    if(this.similarList!=0){
                        this.group=true
                    }
                    this.similarList.forEach(v => {
                        this.createTimes = v.createTimes
                        v.startTime = this.createTimes.substring(0, 10)
                    })
                    this.pricemin = res.data.similarList.min;
                    this.pricemax = res.data.similarList.max;
                    //  console.log(res.data)
                    this.item = res.data.product;
                    this.technicalParameter = JSON.parse(res.data.product.technicalParameter)
                    // console.log(this.technicalParameter);
                    this.company = res.data.company
                    this.items = res.data.product.images[0]
                    this.images = res.data.product.images
                    this.title = res.data.collage[0];
                    this.productName = res.data.collage[0].productName;
                    this.picture = res.data.collage[0].picture;
                    this.min = res.data.collage[0].min;
                    this.max = res.data.collage[0].max;
                    this.collage = res.data.collage;
                    this.collage.forEach((v) => {
                        v.num = 0
                    })
                    this.expirationTime = res.data.collage[0].expirationTime // 后端值存到 data 中
                    this.expirationTimes = res.data.collage[0].expirationTimes
                    this.productId = res.data.collage[0].productId
                    console.log(this.productId)
                    console.log(this.num);
                   this.collage.forEach((v) => {
                        this.datas[0].id=v.id
                    })
                });
            },
            //   getBulletData(){
            //          eventBus.$on('token',function(data){
            //         //赋值给拼团的数据
            //         this.token=data; ;
            //         var token=this.token;
            //         console.log(token)
            //         console.log(data)
            //         console.log(this.token)
            //       }.bind(this))
            //   var params=new URLSearchParams()
            //       var productId=this.productId;
            //     //   this.$axios.post('myCollage')
            //       console.log(productId)
            //       var datas=this.datas
            //       console.log(datas)
            //         var token=this.token
            //         console.log(token)
            //        params.append('productId',productId)
            //     //    params.append('datas',datas)
            //        params.append('token',token)
            //        this.$axios.post('myCollage',params).then(res=>{
            //          console.log(res)
            // if(res.res==1){
            //        this.$message({
            //            message:"拼团成功",
            //            type:"success"
            //        });
            //          setTimeout(()=>{
            //            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"  
            // },1500)
            //    }
            //        else{
            //          this.$message({
            //         message:res.msg,
            //          type:'warning'
            //      });
            //          setTimeout(()=>{
            //     //  this.$router.push({path:'/login',query:{userId:this.$route.query.userId}})
            //     },1500)
            //    }
            //        })
            //   },
            //登陆
            //   getLogin(){
            //     this.$router.push({path:'/login',query:{userId:this.$route.query.userId}})
            //   }, 
            download(){
                 window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd" 
            },
            // getAPP() {
            //     if (navigator.userAgent.match(/android/i)) {
            //         //通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并且自动组织a标签的默认行为
            //         //负责打开a标签的href链接
            //         var isInstalled;
            //         // 下面是安卓端APP接口调用的地址，视情况修改
            //         var contId = this.$route.query.id
            //         console.log(contId)
            //         var ifrSrc = 'dzt://dzt.com?type=7&contentId=' + contId
            //         //    window.location.href = 'dzt://dzt.com?type=4&contentId'+contId
            //         //     var ifrSrc='dzt://dzt.com? type=4&contentId=237'
            //         console.log(ifrSrc)
            //         var ifr = document.createElement('iframe')
            //         ifr.src = ifrSrc;
            //         ifr.style.display = 'none';
            //         ifr.onload = function() {
            //             isInstalled = true;
            //             alert(isInstalled);
            //             document.getElementById('openApp0').click()
            //         }
            //         ifr.onerror = function() {
            //             //alert('May be not installed')
            //             isInstalled = false;
            //             alert(isInstalled)
            //         }
            //         document.body.appendChild(ifr);
            //         setTimeout(function() {
            //             document.body.removeChild(ifr)
            //         }, 1000)
            //     }
            //     //ios判断
            //     if (navigator.userAgent.match(/(iphone|ipod|ipas);?/i)) {
            //         var isInstalled
            //         //下面ios调用的地址
            //         var contId = this.$route.query.id
            //         console.log(contId)
            //         var ifrSrc = "dzt://type=4&contentId=" + contId
            //         var ifr = document.createElement('iframe')
            //         ifr.src = ifrSrc
            //         ifr.style.display = 'none';
            //         ifr.onload = function() {
            //             isInstalled = true;
            //             alert(isInstalled)
            //             document.getElementById('openApp1').click()
            //         }
            //         ifr.onerror = function() {
            //             isInstalled = false;
            //             alert(isInstalled)
            //         }
            //         document.body.appendChild(ifr)
            //         setTimeout(function() {
            //             document.body.removeChild(ifr)
            //         }, 1000)
            //     }
            // },
            //   getBullet(){
            //       this.bullet=true;
            //   },
            getbullet(){
              this.bullet = true;
              this.money=false;
            },
            getReg() {
                //    this.datacom();
                console.log(this.bullet);
                //   根据key名获取传递回来的参数，data就是map
                if (this.bullet === true) {
                    // eventBus.$on('token', function(data) {
                    //     //赋值给拼团的数据
                    //     this.token = data;
                    //     var token = this.token;
                    //     console.log(token)
                    //     console.log(data)
                    //     console.log(this.token)
                    // }.bind(this))
                    //   debugger
                    // this.datas.id=this.id

                    // 参数一 datas(里面有number,id,totalMoey)
                    this.datas[0].number=this.number
                    this.datas[0].totalMoney=this.totalMoney
                    console.log(this.token);

                    this.datas=JSON.stringify(this.datas)
                    var params = {}      
                    params.token=this.token;
                    params.productId=this.productId;
                    params.datas=this.datas;
                    console.log(params);
                    // // 参数二productid
                    // var productId = this.productId;
                    // // var userId = this.$route.query.userId;
                    // console.log(this.productId)
                    // var datas = this.datas
                    // console.log(datas)
                    // // 参数三token
                    // var token = this.token
                    // console.log(token);
                    // params.token=token;
                    // params.datas=datas;
                    // params.productId=productId;
                    // // params.append('productId', productId)
                    // // params.append('datas', datas)
                    // // params.append('token', token)
                    // console.log(params);

                    // 跨域(可以传数值过去 )
            //         axios({
            //   url:'http://192.168.0.115:8081/hqcd/api/collage/addAssemble',
            //   method:'post',
            //   params:{
            //     token:this.token,
            //     productId:this.productId,
            //     datas:this.datas
            //   }
            //    }).then(function(res){
            //      console.log(res.data);
            //    }).catch(function(error){
            //      console.log(error);
            //    })
                    //发起拼团
                       this.$axios.post('sendGroup', params
              ).then(res=>{
                         console.log(res)
                           })


                        //  debugger
                        // if(res.res==1){
                        //        this.$message({
                        //            message:"拼团成功",
                        //            type:"success"
                        //        });
                        //          setTimeout(()=>{
                        //              this.$router.push({path:'/groupsuccess',query:{userId:this.$route.query.userId}})
                        //         //    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"  
                        // },1500)
                        //    }
                        //    else{
                        //      this.$message({
                        //     message:res.msg,
                        //      type:'warning'
                        //  });
                        //  debugger
                        //      setTimeout(()=>{
                        // var path=location.href;
                        //  this.$router.push({path:'/register',params:{returnUrl:path}})
                        //  console.log(path);
                        //  this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
                        // },1500)
                    //    }
                     
                }
            },
        },
    }
</script>
<style>
    body {
        margin: 0rem;
        padding: 0rem;
        padding-bottom: 1rem;
    }
</style>
<style lang='less'>
a{
    text-decoration: none;
    color:black;
  }
.group{
    height: 100%;
    background: rgba(246, 246, 246, 1);
}
    .wrap {
        // background: rgba(246, 246, 246, 1);
        width: 100%;
        // height: 25rem;
    }
    .wrap .swipe-icon {
        display: block;
        width: 100%;
        height: 11.51rem;
    }
    .wrap .slider {
        display: block;
        height: 11.51rem;
        width: 100%;
    }
    .mint-swipe-item {
        display: block;
        width: 100%;
        height: 11.51rem;
    }
    .wrap-time {
        height: 1.2rem;
        background: url("../assets/djs_bg.png");
        position:relative;
    }
    .wrap-time .left {
        margin-left: 0.73rem;
        position: absolute;
        // flex: 1;
        // height: 1.2rem;
        // line-height: 1.2rem;
        top:0.25rem;
        opacity: 1;
        font-size: 0.54rem;
        font-family: Source Han Sans CN;
        font-weight: Bold;
        color: rgba(255, 239, 1, 1);
    }
    .wrap-time .right {
        position: absolute;
        right:0;
        top:0.3rem;
        width: 4.5rem;
        margin-right: 0.57rem;
        // line-height: 1.2rem;
        opacity: 1;
        font-size: 0.42rem;
        font-family: Source Han Sans CN;
        font-weight: Normal;
        color: rgba(255, 255, 255, 1);
    }
    .wrap-model-box {
        /* height:2rem;
                 */
        //  height: 3.82rem;
        box-sizing: border-box;
        padding-top: 0.32rem;
        padding-left: 0.3rem;
        width: 100%;
        /* margin-top:-0.1rem; */
        opacity: 1;
        background: rgba(255, 255, 255, 1);
    }
    .wrap-model-box h3 {
        display: block;
        opacity: 1;
        font-size: 0.54rem;
        font-family: PingFang SC;
        font-weight: Bold;
        color: rgba(51, 51, 51, 1);
        height: 0.5rem;
        line-height: 0.5rem;
        margin: 0rem;
    }
    .wrap-model-box h4 {
        /* height: 0.34rem;
                 */
        margin: 0.3rem 0 0.25rem;
        opacity: 1;
        font-size: 0.42rem;
        font-family: PingFang SC;
        font-weight: Bold;
        color: rgba(40, 120, 158, 1);
        line-height: 0.42rem;
    }
    .wrap-model-box .content {
        display: block;
        /* height: 0.54rem;
                 */
        opacity: 1;
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: Regular;
        color: rgba(100, 100, 100, 1);
        /* line-height:0.3rem; */
    }
    .wrap-model-box .left {
        display: block;
        /* height: 0.26rem; */
        opacity: 1;
        font-size: 0.42rem;
        font-family: PingFang SC;
        color: rgba(255, 0, 0, 1);
        padding-bottom: 0.52rem;
    }
    .wrap-top-hearder {
        background: #fff;
        border: 1px solid #d3d3d3;
        border-radius: 0.1rem;
        width: 6.5rem;
        height: 2rem;
        overflow: hidden;
        /* margin-top:2rem;
                 margin-left: 0.1rem;
                 */
        margin: 2rem auto 0.3rem;
    }
    .wrap-top-hearder img {
        overflow: hidden;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin-left: 0.3rem;
        margin-top: 0.3rem;
    }
    .wrap-top-hearder h3 {
        float: right;
        ;
        width: 3rem;
        height: 0.27rem;
        opacity: 1;
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: Bold;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 0rem;
        margin-top: -1.4rem;
        padding-right: 1.4rem;
    }
    .wrap-top-hearder h4 {
        width: 4rem;
        height: 0.5rem;
        overflow: hidden;
        margin-left: 2rem;
        font-size: 0.14rem;
        text-indent: 0.3rem;
        margin-top: -0.8rem;
        line-height: 0.28rem;
    }
    .box {
        padding: 0.22rem 0.5rem 0;
        background-color: white;
    }
    .wrap-techlogo {
        background: #fff;
        border-bottom: 0.01rem solid rgba(153, 153, 153, 1);
        /* height: 2rem;
                 */
    }
    .wrap-techlogo h3 {
        font-size: 0.42rem;
    }
    .wrap-techlogo-content{
        display: flex;
        line-height: 0.57rem;
        >h4{
             opacity: 1;
             margin: 0.1rem 0;
             width: 3rem;
             font-size: 0.34rem;
             font-family: PingFang SC;
             color: rgba(100, 100, 100, 1);
        }
        >span{
            flex:1;
            font-size: 0.34rem;
            margin: 0.1rem 0;
            color: rgba(100, 100, 100, 1);
        }
    }
    .wrap-foot {
        background: #fff;
        /* height: 2rem;
                 */
        /* margin-top:0.3rem;
                 margin-left: 0.1rem;
                 */
    }
    .wrap-foot h3 {
        font-size: 0.42rem;
        margin: 0.35rem 0;
    }
    .wrap-foot h4 {
        opacity: 1;
        font-size: 0.32rem;
        font-family: PingFang SC;
        color: rgba(100, 100, 100, 1);
        letter-spacing: 0rem;
        /* margin-left:0.6rem;
                 margin-top:-0.1rem;
                 */
        justify-content: center;
        padding-bottom: 0.3rem;
        margin: 0;
    }
    .mint-button--danger {
        /* background-color:#f5f5f5;
                 */
        color: #fff;
        width: 100%;
        height: 0.8rem;
        margin-top: 0.1rem;
        border: 1px solid #999;
        font-size: 0.54rem;
        font-weight: 700;
    } // 火拼数据;
    .rush-box {
        display: flex;
        flex-wrap: wrap;
        padding: 0.53rem 0.3rem;
        background-color: white;
        margin: 0.25rem 0;
        .rush-left {
            width: 1.75rem;
            font-size: 0.42rem;
            font-weight: bold;
        }
        .rush-right {
            flex: 1;
            padding-left: 0.45rem;
        }
    } // 相关拼团
    .box {
        margin-top: 0.25rem
    }
    .fight-group-box {
        background: rgba(246, 246, 246, 1);
        margin-bottom: 1.7rem;
        .fight-group-title {
            font-size: 0.42rem;
            font-weight: bold;
            height: 0.88rem;
            line-height: 0.88rem;
            background-color: white;
            padding-left: 0.45rem;
            margin: 0.25rem 0;
        }
        .fight-group-content {
            padding: 0.1rem 0.25rem 0;
            display: flex;
            margin-bottom: 0.15rem;
            .icon {
                display: inline-block;
                width: 3.1rem;
                height: 3.3rem;
            }
            .fight-group-right {
                flex: 1;
                padding-left: 0.25rem;
                .product-name {
                    font-size: 0.42rem;
                    font-weight: bold;
                }
                .product-model {
                    font-size: 0.38rem;
                    color: rgba(100, 100, 100, 1);
                    margin: 0.4rem 0 0.8rem;
                }
                .fight-group-botton {
                    display: flex;
                    align-items: flex-end;
                    position: relative;
                    background-color: transparent;
                    .product-price {
                        color: rgba(255, 0, 0, 1);
                        font-size: 0.3rem;
                    }
                    .product-time {
                        position: absolute;
                        right: 0.05rem;
                        font-size: 0.3rem;
                        color: rgba(100, 100, 100, 1);
                        display: block;
                    }
                }
            }
        }
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
        background: #fff;
        .mint-button--danger {
            height: 1.44rem;
            font-size: 0.56rem;
        }
        .group-btn{
            font-size: 0.56rem;
        }
         .mint-button{
            font-size: 0.56rem;
        }
        .mint-button--small{
            font-size: 0.56rem;
        }
    } //弹框
    .bullet-box-box {
        width: 100%;
        height: 100%;
        z-index: 777;
        background: rgba(0, 0, 0, 0.4);
        position: absolute; // filter:alpha(opacity=60);  /*设置透明度为60%*/
        // opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
        // display:none; 
        left: 0rem;
        top: 0rem;
    }
    .bullet-box {
        position: fixed;
        background-color: white;
        z-index: 999;
        width: 100%;
        height: 13.6rem;
        bottom: 1.45rem;
        opacity: 1;
        .bullet-title {
            display: flex;
            flex-wrap: wrap;
            height: 2.75rem;
            border-bottom: 0.01rem solid rgba(153, 153, 153, 1);
            .bullet-icon {
                background-color: aquamarine;
                width: 3.1rem;
                height: 3.3rem;
                margin-left: 0.6rem;
                margin-top: -0.8rem;
            }
            .bullet-right {
                flex: 1;
                margin: 0.5rem 0.3rem 0.25rem 0.25rem;
                .right-box {
                    display: flex;
                    margin: 0;
                    padding: 0;
                    justify-content: space-between;
                    .bullet-product-name {
                        flex: 1;
                        font-size: 0.48rem;
                        margin-right: 0.1rem;
                        height: 1.1rem;
                        box-sizing: content-box;
                    }
                    .bullet-close-icon {
                        display: inline-block;
                        width: 0.4rem;
                        height: 0.4rem;
                        background-color: white;
                        border: 0.01rem dashed rgba(102, 102, 102, 1);
                    }
                }
                .bullet-product-price {
                    font-size: 0.42rem;
                    color: rgba(255, 0, 0, 1);
                    margin-top: 0.3rem;
                }
            }
        }
        .bullet-content {
            .bullet-model-title {
                width: 100%;
                color: rgba(239, 99, 99, 1);
                font-size: 0.54rem;
                padding: 0.35rem 4.34rem;
                border-bottom: 0.01rem solid rgba(153, 153, 153, 1);
            }
            .model-box {
                display: flex;
                padding: 0.5rem 0;
                margin: 0 0.6rem;
                box-sizing: border-box;
                border-bottom: 0.01rem solid rgba(153, 153, 153, 1);
                .in-stock-left {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .bullet-model-name {
                        font-size: 0.42rem;
                    }
                    .in-stock-price {
                        margin-top: 0.25rem;
                        font-size: 0.32rem;
                        color: rgba(255, 0, 0, 1);
                    }
                }
                .in-stock-right {
                    width: 3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
        }
    }
    .bullet-in-stock {
        color: rgba(102, 102, 102, 1);
        font-size: 0.32rem;
        display: block;
        padding-top: 0.25rem;
        padding-right: 0.05rem;
    }
    .el-input-number {
        display: inline-block; // width: 2.5rem;
        // height: 0.5rem;
        border: 0.01rem solid rgba(153, 153, 153, 1);
    }
    .right-replace {
        width: 100%;
        height: 1.2rem;
        opacity: 1;
        background: rgba(153, 153, 153, 1);
        font-size: 0.54rem;
        text-align: center;
        color:rgba(255,255,255,1);
        line-height: 1.2rem;
        margin-top:0;
        padding-top: 0;
    }
     
    .look-btn{
        background-color: rgba(22,190,172,1);
        color:rgba(255,255,255,1);
        height: 1.44rem;
        line-height: 1.44rem;
        position: fixed;
        width: 100%;
        left:0;
        bottom: 0;
        font-size: 0.54rem;
        z-index: 999
    }
</style>


