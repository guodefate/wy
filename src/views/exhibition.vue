<template>
<div class="exhibition" >
  <div class="wrap">
    <h2>{{item.title}}</h2>
    <h4>{{item.nickName}}</h4>
    <h4>{{item.createTime}}</h4>
    <div class="contain"><img :src=" 'http://192.168.1.123:8081/hqcd/download'+ item.headUrl" alt=""></div>
   <div class="content-wrap" v-for="title in comments" :key="title._id" >
      <div >
        {{title.content}}
    </div>
    <img  :src="'http://192.168.1.123:8081/hqcd/download'+title.headUrl" alt="">
    </div>
     <div class="footer" >
       <mt-button size="small" type="primary" @click="getReg">立即注册</mt-button>
         <mt-button size="small" type="primary"  @click="getApp(e)">下载App</mt-button>
   </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:'exhibition',
  data(){
      return{
          item:{ },
          comments:[
            // {id: 1373, contentId: 100, dType: 1,content:"你好啊,快递快递快递快递快递快递快递快递快递快递快递快递快递快递快递快递"},
            // {id: 1472, contentId: 100, dType: 2, content: "/exhibition/2018-1113-174502.jpg"},
            // {id: 1373, contentId: 100, dType: 1,content:"电子通app电子通app电子通app电子通app电子通app电子通app电子通app电子通app"},
            // {id: 1473, contentId: 100, dType: 2, content: "/topic/2018-1114-104222.jpg"}
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
       axios.get("http://192.168.1.116:8081/api/exhibition/newDetail",{
         params:{
           exhibitionId:this.$route.query.id,
          // exhibitionId:100,
           userId:this.$route.query.userId,
           pageSize:'',
           pageNum:''
         }
       }).then(res => {
               console.log(res);
               console.log(res.data)
               this.item =res.data.data;
               
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
 .content-wrap{
    margin-top:15px;
    text-align:justify;
    text-indent:20px;
    line-height:22px
  }
  .wrap img{
        display: block;
        width:600px;
        height:250px
    }
  .contain img{
    display:block;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-left:5px; 
    margin-top:-40px
  }
  .wrap h4{
    font-weight:300;
    color:#000;
    line-height:1.2;
    margin-top:-15px;
    text-align:left;
    margin-left:50px
  }
    .mint-button--primary{
    background-color:#f5f5f5;
    color:#333;
    width:200px;
    height: 45px;
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


