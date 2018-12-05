<template>
<div class="newsitem" >
  <div class="wrap">
    <h2>{{item.title}}</h2>
    <h4>{{item.nickname}}</h4>
    <h4 >{{item.createTime}}</h4>
    <div class="contain"> <img :src="'http://192.168.1.123:8081/hqcd/download'+ item.headUrl" alt=""></div>
   <div class="content-wrap" v-for="items in comments" :key="items._id">
      <div   class="content-wrap-content" >
        {{items.content}}
    </div>
    <img  :src="'http://192.168.1.123:8081/hqcd/download'+items.headUrl" alt="">
   </div>        
    <!-- <h4>{{title.content}}</h4>
    <div > <img :src="'http://192.168.1.123:8081/hqcd/download'+ title.imageUrl" alt=""></div> -->
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
  name:'newsItem',  
  data(){
      return{
          item:{},
          comments:[
          
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
       axios.get("http://192.168.1.116:8081/api/news/detail?",{
         params:{
           newsId:this.$route.query.id,
           userId:this.$route.query.userId,
           pageNum:1,
           pageSize:10000
         }
       }).then(res => {
               console.log(res);
               console.log(res.data)
               this.item =res.data.data; 
               console.log(res.data.data)
              
               this.items=res.data.data.comments[0]
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
          this.getApp()
       
}
}
</script>
<style>
</style>
<style scoped>
html{
  font-size:75px;
  height:1600px;
}
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
 .content-wrap{
    margin-top:15px;
    text-align:justify;
    text-indent:30px;
    line-height:30px;
  
  }
  .content-wrap-content{
    margin-left: 5px;
  }
.contain img{
    display:block;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-left:5px; 
    margin-top:-40px
  }
.wrap  .content-wrap img{
        display: block;
        width:600px;
        height:400px;
        margin-left:5px;
    }
.wrap h2{
   text-align:center;
   font-size:20px;
}
  .wrap h4{
    font-size:15px;
    font-weight:300;
    color:#000;
    line-height:1.2;
    margin-top:2px;
    margin-bottom:5px;
    margin-left:50px;
    text-align:left;
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


