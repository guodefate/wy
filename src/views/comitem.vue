<template>
<div class="comitem" >
  <div class="wrap">
    <h2>{{item.title}}</h2>
    <h3>{{item.categoryName}}</h3>
    <div class="content" v-html="item.content"></div>
    <h4>{{item.nickName}}</h4>
    <h4>{{item.username}}    {{item.createTime}} </h4>
      <div class="contain"><img :src=" 'http://192.168.1.123:8081/hqcd/download'+ item.headUrl" alt=""></div>
   <div class="content-wrap" v-for="item in images"  :key="item._id">   
       <img :src="'http://192.168.1.123:8081/hqcd/download/'+item.picture" alt="">
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
  name:'comitem',
  data(){
      return{
          item:{},
          images:[
              // {id:81,userId:145,picture:"/purchase/2018-0530-1856560.jpg"}
          ]
      }
  },
  methods:{
      strQuery(str){
       var url=window.location.search();
       var urlArr=str.split("?")
       var queryArr= urlArr[1].split('&')
       var  paramsArr =queryArr[0].split('=')
       var  userId=paramsArr[1]
       var type=paramsArr[2]
     },

      getData(){
          axios.get("http://192.168.1.116:8081/api/company/otherInfo",
          { params:{
           type:this.$route.query.type,
           userId:this.$route.query.userId,
           pageNum:1,
           pageSize:10000
           }
         }).then(res => {
               console.log(res);
               console.log(res.data)
               this.item =res.data.data[0]
             })
      }
      
      },
      mounted(){
          this.getData();
}
}
</script>
<style>

.comitem{
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
.wrap h2{
   text-align:center;
}
  .content-wrap img{
        display: block;
        width: 600px;
        margin-left:60px;
        margin-top:40px
    }
 .wrap h3{
    font-size:20px;
    font-weight:500;
    color:#000;
    line-height:1.2;
    margin-top:-15px;
    text-align:center
  }
    .wrap h4{
    font-weight:300;
    color:#000;
    line-height:1.2;
    margin-top:2px;
    text-align:left;
    margin-left:110px;
    margin-bottom:10px
  }
  .wrap .content{
  display:block;
  text-indent:30px;
  line-height:25px;
  text-align:center;
  overflow-y:hidden;
}
 .contain img{
    display:block;
    width:40px;
    height:40px;
    border-radius:50%;
    margin-left:60px; 
    margin-top:-55px
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


