<template>
  <div class="news">
    <mt-header title="新闻" fixed>
      <mt-button icon="back" @click="$router.back()" slot="left">
      </mt-button>
    </mt-header>

    <div class="news-wrap">
      <div class="news-content" v-for="item in arr" :key="item._id">
        <router-link :to="'/newsitem?id='+item._id" class="new">
          <div class="new-left">
            <img :src="item.img" alt="">
          </div>
          <div class="new-right">
            <h3 v-text="item.title"></h3>
            <div class="new-bar">
              <span v-text="item.updateTime"></span>
              <div>{{item.pageNum}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "news",
      data(){
          return{
            arr:[]
          }
      },
      methods:{
          getNews(){
           axios.get("http://localhost:8081/api/news/newsList",{pageNum:5,pageSize:5}).then(res=>{
              console.log(res)
              console.log(res.data);
              this.arr=res.data.data;
            })
          }
      },
      created(){
          this.getNews();
      }
    }
</script>

<style >
.mint-header{
  height:45px;
  background:#fff
}
.mint-header-title{
  font-wight:400;
  color:black;

}
.mint-header .mint-button{
  color:black
}
</style>
