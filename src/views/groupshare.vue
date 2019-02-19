<template>
    <div  class="register">
          <mt-header fixed  title="用户注册">
  </mt-header>
        <div class="register-item">
      <el-main>
   <el-form 
   :model="ReginForm"
   ref="ReginForm"
   :rules="rule"
   class="regform"
   label-width="0">
   <!-- <h3 class="login-text">用户注册</h3> -->
    <el-form-item prop="tel">
      <!-- <span class="item">手机号码：</span> -->
    <el-input 
     type="text"
     v-model.number="ReginForm.username"
     placeholder="请输入手机号码">
    </el-input>
   </el-form-item>
    <el-form-item prop="password">
    <!-- <span class="item">设置密码：</span> -->
    <el-input 
     type="password"
     v-model="ReginForm.password"
     placeholder="请输入密码">
    </el-input>
   </el-form-item>
    <el-form-item prop="password">
      <!-- <span class="item">输入密码：</span> -->
    <el-input 
     type="password"
     placeholder="再次输入密码">
    </el-input>
   </el-form-item>
        <div class="titles">
          <!-- 验证码： -->
       <input class="auth_input" type="text" v-model="ReginForm.code"  placeholder="输入验证码" />
      <span v-show="sendAuthCode" class="getcode" @click="getAuthCode">获取验证码</span>
      <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒之后重新发送验证码</span> 
      </div>
   <el-form-item >
     <div class="title">
      <router-link to="/help">
            <a href="/help">查看协议>></a>
            </router-link>
            </div>
    <el-button 
     type="success"
     class="submitBtn"
     round
     @click.native.prevent="submit"
     :loading="logining">
     注册
    </el-button>
   </el-form-item>
  </el-form>
 </el-main>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
 data () {
  let confirmpasswordCheck = (rule, value, callback) => {
   if (value === '') {
    return callback(new Error('密码是必须的'))
   } else {
    return callback()
   }
  }
  let telCheck = (rule, value, callback) => {
   if (value === '') {
    return callback(new Error('电话号码是必须的'))
   } else if (!Number.isInteger(value)) {
    return callback(new Error('电话号码必须是数字'))
   } else if (value.toString().length !== 11) {
    return callback(new Error('电话号码必须是11位数字'))
   } else {
    callback()
   }
  }
  return {
   ReginForm: {
    password: '',
    username: '',
    code:'',
   },
    userId:'',
    logining:false,
    sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
      auth_time: 0, /*倒计时 计数器*/
      code:"",//绑定输入验证码框框
   rule: {
    password: [
     {
      required: true,
      message: '密码是必须的！',
      trigger: 'blur'
     }
    ],
    username: [
     {
      required: true,
      validator: telCheck,
      trigger: 'blur'
     }
    ],
   }
  }
 },
 methods: {
   //  验证
     getAuthCode () {
        var params=new URLSearchParams()
        var phone=this.ReginForm.username 
       params.append('phone',phone)
         axios.post("http://192.168.1.110/hqcd/sms/SendSmsNumForRegist",params).then(res=>{
          //console.log(res)
          })
      this.sendAuthCode = true;
     //设置倒计时秒
      this.auth_time = 10;
      var auth_timetimer = setInterval(()=>{
        this.auth_time--;
        if(this.auth_time<=0){
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
    },
       submit(){

          var params=new URLSearchParams()
          var username=this.ReginForm.username 
          var password=this.ReginForm.password
          var code=this.ReginForm.code
          var userId=this.$route.query.userId
          //console.log(userId)
          params.append('username',username)
          params.append('password',password)
           params.append('code',code)
          params.append('userId',userId)
       
        this. $axios.post("register",params).then(res=>{
          //console.log(res)
          if(res.res==1){
                   this.$message({
                       message:"注册成功",
                       type:"success"
                   });
                     setTimeout(()=>{
           window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"
            },1500)
               }
               
               else{
                 this.$message({
                 message:"请注册",
                 type:'warning'
             });
                 setTimeout(()=>{
            // this.$router.push('/register')
            },1500)
           }
          })
      }
  },
    mounted(){
          this.submit();
          this.getAuthCode();
}
 }
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
.mint-header-title{  
  font-size:34px;
  color:#f1f1f1;
}
.el-input__inner{
  width:550px;
  height:65px;
  margin-top:-40px;
  font-size:30px;
  background:#fff;
  margin-left:40px;
}

</style>
<style scoped>
.register{
    width:100%;
    height: 1118px;
    background:#fff;
    opacity:1; 
}
 .mint-header{
  height:80px;
  width:100%;
  background:#16beac
}

  .regform {
 margin:200px auto;
 width:600px;
 height: 600px;
 padding: 30px 30px 0 30px;
 border:none;
}
.submitBtn {
 width:80%;
}
.item{
  font-size:24px;
}
.el-input{
  width: 350px;
   height:60px;
}
input .el-input__inner{
  height:60px;
}
.to {
 color: #FA5555;
 cursor: pointer;
}
.auth_input{
  width:390px;
  height:60px;
  margin-bottom:20px;
  border:1px solid #DCDFE6;
  font-size:24px;
  margin-left:25px;
 
}
.regform[data-v-92def6b0]{
  width:370px;
  min-height: 440px;
}
.titles{
  margin-left:18px;
  margin-top:40px;
}
.login-text{
 text-align: center;
 margin-bottom:20px;
}
.el-button--success{
    margin-left:50px;
    background-color:#16beac;
    margin-top: 20px;
    height: 65px;
    font-size:30px;
}
 .title a{
     display:block;
     text-decoration:none;
     color:#a1a1a1;
     font-size:24px;
     margin-bottom:10px;
     margin-top:10px;
     margin-left:20px;
 }
 .title a:hover{
     color:#f00
 }
 .getcode{
    display:block;
    float:right; 
    height:60px;
    width:150px;
    line-height:60px;
    margin-right:10px;
    border:1px solid #DCDFE6;
    border-left:none;
}
</style>
