<template>
<div class="purchase" >
  <div class="wrap">
      <h2 v-text="item.title"></h2>
      <h4> {{item.nickName}}</h4>
      <h4> {{item.createTime}}</h4>
      <div class="contain-img"><img :src=" 'http://192.168.1.123:8081/hqcd/download'+ item.headUrl" alt=""></div>
      <div class="content-wrap" v-for="title in comments" :key="title._id">
      <div   class="content-wrap-content" >
        {{title.content}}
    </div>
    <img  :src="'http://192.168.1.123:8081/hqcd/download'+title.imageUrl" alt="">
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
  name:'purchase',
  data(){
      return{
          item:{ },
          comments:[
            // {id: 2177, contentId: 137, dType: 2, content: "/purchase/1542273739.438220.jpg"},
            // {id: 2178, contentId: 137, dType: 1, content: "防晒霜,环球磁电环球磁电环球磁电环球磁电环球磁电环球磁电环球磁电环球磁电"},
            // {id: 2179, contentId: 137, dType: 2, content: "/purchase/1542273696.355387.jpg"}
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
          axios.get("http://192.168.1.116:8081/api/purchase/newDetail?",{params:{
           id:this.$route.query.id,
           userId:this.$route.query.userId,
            // id:137,
            pageNum:1,
            pageSize:10000}}).then(res => {
               console.log(res);
               console.log(res.data)
               console.log(res.data.data)
               this.item =res.data.data.purchase;
 
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
.purchase{
    padding:20px;
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
    width:600px;
    height:300px;
    

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
    .contain-img img{
    display:block;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-left:5px; 
    margin-top:-40px
  }
  .content-wrap{
    margin-top:20px;
    text-indent:20px;
    line-height:22px;
    text-align:justify
  }
  .content-wrap-content{
    margin-left: 5px;
  }
   .mint-button--primary{
    background-color:#f5f5f5;
    color:#333;
    width: 130px;
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


