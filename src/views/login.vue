<template>
    <div class="login">
        <div class="login-hearder">
            <img src="../assets/logo_icon.png" alt="">
        </div>
        <div class="login-content">
             <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="账号密码登录" name="first">
                    <el-form ref="formdata" :model="formdata" class="formdata"  label-width="0"> 
                        <el-form-item >
                            <!-- <span class="item">手机号码：</span> -->
                          <el-input type="tel" v-model="formdata.username" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                         <el-form-item >
                            <!-- <span class="item">输入密码：</span> -->
                          <el-input type="password"  v-model="formdata.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                         <el-form-item >
                         <el-button type="success" @click="getlogin" class="getlogin" size="large">登录</el-button>
                        </el-form-item>
                          <el-form-item >
                         <el-button  @click="getpwd" class="getpwd" size="small">找回密码</el-button>
                          </el-form-item>
                        <h3>还没有账号！</h3>
                        <el-form-item >
                         <el-button type="danger" @click="getregister" class="getregister" size="large">快速注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机动态码登录" name="second">
                         <el-form ref="formdata" :model="formdata" class="formdata"  label-width="0"> 
                        <el-form-item >
                            <!-- <span class="item">手机号码：</span> -->
                          <el-input type="tel" v-model="formdata.username" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                            <div class="titles">
                                <!-- 验 证 码： -->
                                <input class="auth_input" type="text" v-model="formdata.code"  placeholder="输入验证码" />
                                <span v-show="sendAuthCode" class="getcode" @click="getAuthCode">获取验证码</span>
                                <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒之后重新发送验证码</span> 
                            </div>
                         <el-form-item >
                         <el-button type="success" @click="getlogins" class="getlogin" size="large" :loading="logining">登录</el-button>
                        </el-form-item>
                          <el-form-item >
                         <el-button  @click="getpwd" class="getpwd" size="small">找回密码</el-button>
                          </el-form-item>
                        <h3>还没有账号！</h3>
                        <el-form-item >
                         <el-button type="danger" @click="getregister" class="getregister" size="large">快速注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import eventBus from '../until/eventbus.js'
export default {
  name: "login",
   data() {
      return {
        activeName: 'first',
        formdata:{
            username:'',
            password:'',
            code:''
        },
        token:'',
         userId:'',
         logining:false,
         sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
         auth_time: 0, /*倒计时 计数器*/
         code:"",//绑定输入验证码框框
      };
    },
    methods: {
      handleClick(tab, event) {
        ////console.log(tab, event);
      },
      getlogin(){  
          var params=new URLSearchParams()
          var username=this.formdata.username 
          var password=this.formdata.password
          var userId=this.$route.query.userId
          ////console.log(userId)
          params.append('username',username)
          params.append('password',password)
          params.append('userId',userId)
            this.$axios.post('login',params).then(res=>{
                ////console.log(res)
                // ////console.log(json.data)
                // this.$store.commit('ADD_COUNT',json.data.token)
               if(res.res==1){
                   this.$message({
                       message:"登录成功",
                       type:"success"
                   });
                     this.token=res.data.token
                       ////console.log(this.token)
                     setTimeout(()=>{
                         //传递一个map，token是key，this.token是value
                         eventBus.$emit('token',this.token)
                         this.$router.go(-1)
            //  this.$router.push({path:'/group',query:{token:this.token}})
            //  this.$router.push({name:'/group',params:{token:this.token}})
            },1500)
               }
               else{
                 this.$message({
                message:res.msg,
                 type:'warning'
             });
                 setTimeout(()=>{
            // this.$router.push('/login')
            },1500)
           }
           })
      },
       getAuthCode () {
        var params=new URLSearchParams()
        var phone=this.formdata.username 
        //  var code=this.code 
       params.append('phone',phone)
      //  params.append('code',code)
         axios.post("http://192.168.1.110/hqcd/sms/sendSmsCode",params).then(res=>{
          ////console.log(res)
          })
     this.sendAuthCode = true;
     //设置倒计时秒
         this.auth_time =10;
      var auth_timetimer = setInterval(()=>{
        this.auth_time--;
        if(this.auth_time<=0){
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
    },
        getlogins(){   
          var params=new URLSearchParams()
          var username=this.formdata.username 
          var code=this.formdata.code
        //  var userId=this.$route.params.userId
          params.append('username',username)
          params.append('code',code)
        //   params.append('userId',userId)
               this.$axios.post('getLogin',params
               ).then(res=>{
               if(res.res==1){
                   this.$message({
                       message:"登录成功",
                       type:"success"
                   });
                     setTimeout(()=>{
            // this.$router.push('/group')
             this.$router.go(-1)
            },1500)
               }
               
               else{
                 this.$message({
                message:res.msg,
                 type:'warning'
             });
                 setTimeout(()=>{
            // this.$router.push('/login')
            },1500)
           }
           })
        },
        getregister(){
        this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
      },
      getpwd(){
          this.$router.push({path:'/pwd'})
      }
    },
     mounted(){
          this.getlogin();
          this.getlogins();
          this.getAuthCode();
}
  };
</script>
<style>
 *{
     margin: 0;
     padding: 0;
 }
.el-tabs__item.is-active{
    font-size:37px;
    color:rgba(255,255,255,1);
    opacity:1 ;
    width:245px;
    height: 40px;
    margin-left:30px;
}
.el-tabs__item{
    /* padding-left: 20px; */
    margin-left:-25px;
    /* padding-left:-10px; */
}
.el-tabs__nav {
     margin-left:100px; 
    padding-left:30px;
}
.el-tabs__active-bar{
     background: rgba(255,255,255,1); 
      margin-left:60px; 
     padding-left: 20px;
}
.el-input{
    width:330px;
    height:50px;
}
.el-input__inner{
    width:550px;
    height:60px;
    background: rgba(22,190,172,1);
    font-size:30px;
    margin-left:-110px;
}
.el-form-item__content{
    margin-top: 30px;
}
.el-tabs__nav-wrap::after{
    width:400px;
    height: 60px;
    padding-left:30px; 
    background: rgba(22,190,172,1);
}
</style>

<style  scoped>
.login{
    width:100%;
    height:1218px;
    background:rgba(22,190,172,1);
    opacity:1; 
}
.login-hearder {
  margin-left:300px;
  padding-top: 100px;
}
.login-content{
    width: 100%;
    height: 765px; 
    margin-top: 100px;
    text-align:center
}
.item{
    font-size:30px;
}
.el-button--success{
    width: 550px;
    height:60px;
    background:rgba(255,255,255,0);
    font-size:34px;
    text-align:center;
     border-color:#fff
}
h3{
    color:#fff;
    font-size:30px;
    margin-top: -20px;
}
.el-button--danger{
    width: 300px;
    height:60px;
    background:rgba(255,255,255,0);
    font-size:34px;
     margin-top: -10px; 
    border-color:#fff
}
.auth_input{
    width:395px;
    height:60px;
    margin-left:24px;   
    margin-top:20px;
    background:rgba(22,190,172,1);
    border:1px solid #fff

}
.titles{
    font-size:30px;
    margin-left:70px;
}
.getpwd{
    float:right;
    font-size:34px;
    color:#fff;
    background:rgba(22,190,172,1);
    border:none;
    margin-right:80px;
    margin-top:-40px;
}
.getcode{
    display:block;
     float:right; 
    height:60px;
    width: 150px;
    line-height:60px;
    margin-right:100px;
    border:1px solid #fff;
    margin-top: 20px;
    border-left:none;
}
</style>