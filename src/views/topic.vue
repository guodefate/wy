<template>
<div class="topic" >
  <div class="wrap">
     <h2>{{item.title}}</h2>
     <h4>{{item.nickname}}</h4>
     <h4>{{item.createTime}}</h4>
     <div class="contain"><img :src=" 'http://192.168.1.123:8081/hqcd/download'+ item.headUrl" alt=""></div>
    <div class="content-wrap" v-for="title in comments" :key="title._id">
     <div   class="content-wrap-content" >
        {{title.content}}
    </div>
    <img  :src="'http://192.168.1.123:8081/hqcd/download'+title.headUrl" alt="">
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
export default {
  name:'topic',
  data(){
      return{
          item:{},
          comments:[
            // {id: 1620, contentId: 183, dType: 1,content:"你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电你好啊环球磁电"},
            // {id: 1815, contentId: 183, dType: 2, content: "/topic/2018-1114-104222.jpg", imgWidth: 271, imgHeight: 271},
            // {id: 1841, contentId: 183, dType: 1, content: "环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通环球磁电电子通"},
            // {id: 1886, contentId: 183, dType: 2, content: "/topic/-59b54913d12f8457.jpg", imgWidth: 427,imgHeight:422}
          ]
      }
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
          axios.get("http://192.168.1.116:8081/api/topic/newDetail",{
              params:{
                  id:this.$route.query.id,
                  userId:this.$route.query.userId,
                  pageSize:8,
                  pageNum:1
              }
          }).then(res => {
               console.log(res);
               console.log(res.data)
               this.item =res.data.data

               this.title=res.data.data.comments[0]
               this.comments=res.data.data.comments
              
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
.wrap  img{
        display: block;
        width:600px;
        height:300px
    }
.wrap h2{
  font-size:25px;
  font-weight:400;
  text-align:center;
}
  .wrap h4{
    font-weight:300;
    color:#000;
    line-height:1.2;
    margin-top:-15px;
    text-align:left;
    margin-left:50px
    
  }
  .content-wrap{
    margin-top:10px;
    text-indent:30px;
    line-height:30px;
    text-align:justify
    
  }
  .content-wrap-content{
    margin-left:10px;
  }
   .contain img{
    display:block;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-left:5px; 
    margin-top:-60px
  }
    .mint-button--primary{
    background-color:#f5f5f5;
    color:#333;
    width:200px;
    height:45px;
    margin-left:10px ;
    margin-top:10px; 
    border:1px solid #999
  }
  .footer{
    display:flex;
    position:fixed;
    bottom:0;
    width:605px;
    height:45px;
    justify-content:center;
    background:#fff;
  }
</style>


