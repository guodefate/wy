<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="全部产品" name="first">
    <div class="wrap">
      <h1 v-text="item.title">标题</h1>
      <div class="content" v-html="item.content">内容</div>
  </div> 
    </el-tab-pane>
    <el-tab-pane label="求购" name="second"><div class="wrap">
      <h1 v-text="item.title">标题</h1>
      <div class="content" v-html="item.content">内容</div>
  </div> 
  </el-tab-pane> 
  </el-tabs>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        activeName2: 'first',
        item:{}
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
        getData(){
          axios.get("http://localhost:8081/api/company/companyList",{pageNum:5}).then(res => {
               console.log(res);
               console.log(res.data.data)
               this.item =res.data.data
             })
      },
            mounted(){
          this.getData();
}
      
    }
  };
</script>