<template>
<!-- <meta http-equiv="Access-Control-Allow-Origin" content="*"> -->
  <div class="register" :style="note">
    <img class='login-icon' src="../assets/hb.png" alt="">
   <!-- <form action="" method="post"> -->
     <div class="form">
     <div class="phone-number-box">
       <img class='phone-icon' src="../assets/icon_phone.png" alt="">
       <input type="text" v-model.trim="user_name" name="txtUserName" placeholder="请输入手机号码">
       <img @click="clear" class='close-icon' src="../assets/icon_input_button_delete.png" alt="">
     </div>
     <div class="code-box">
       <img class='code-icon' src="../assets/input_icon_identifying codeb.png" alt="">
       <input v-model.trim="user_code" name="txtPassword" class='code' type="text" placeholder="请输入验证码">
        <span v-show="sendAuthCode" class="getcode" @click="getAuthCode">获取验证码</span>
      <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">还剩</span>{{auth_time}}秒 </span> </span> 
     </div>
     <input class='login' @click='login' type="button" value='登陆/注册'>
     </div>
   <!-- </form> -->
  </div>
</template>
<script>
import axios from 'axios'
import eventBus from '../until/eventbus.js'
import '../until/rem.js'
export default {
  name: "login",
  data: function() {
    return {
      user_name: "",
      user_code: "",  //绑定输入验证码框框
      userId:'',
      logining:false,
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
      auth_time: 0, /*倒计时 计数器*/
      isRegist:'',
      balance:'',
      jumpData:'',
      token:'',
      note: {
          backgroundImage: "url(" + require("../assets/siignin_bg.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",    
          position:" fixed"
        },
      path:''
   
    };
  },
//  created(){
//   this.path=this.$route.params.returnUrl;
//   console.log(this.path);
// },
  methods: {
    clear(){
      this.user_name=""
    },
       strQuery(str){
      var url=window.location.search();
       var n = (str.split('?')).length - 1;
        console.log(n);
        if(n===1){
           var urlArr=str.split("?")
           var queryArr= urlArr[1].split('&')
           var  paramsArr =queryArr[0].split('=')
           var  id=paramsArr[1]
           var userId=paramsArr[2]
        }else if(n==2||n==3){
           var num = str.indexOf("?")
          str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
          var arr = str.split("&"); //各个参数放到数组里
          var urlArr= arr[1].split("?");
          var queryArr= urlArr[1].split('&')
           var  paramsArr =queryArr[0].split('=')
           var  id=paramsArr[1]
           var userId=paramsArr[2]
        }
     },
    getAuthCode() {
        var params = new URLSearchParams()      
        var phone = this.user_name
        params.append('phone', phone)
         var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
         var username = this.user_name
         console.log(params);
         if (reg.test(this.user_name)) {
        this.$axios.post('sendSmsCode', params).then(response => {
          console.log(response);
          if (response.res === 1) {
            this.$message({
              message: response.msg,
              type: "success"
            });
          } else {
            this.$message.error(response.msg);
          }
        })      
         this.sendAuthCode = false;      //设置倒计时秒
              
        this.auth_time = 60;      
        var auth_timetimer = setInterval(() => {        
          this.auth_time--;        
          if (this.auth_time <= 0) {          
            this.sendAuthCode = true;          
            clearInterval(auth_timetimer);        
          }      
        }, 1000); 
         }else{
           this.$message({
            message: '请输入正确的手机号码',
            type: 'warning',
             });
         }   
      },
    login() {
        // 判断用户是否输入内容
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            var code = this.user_code
        if (this.user_name == "" || this.user_code == "") {
          this.$message({
            message: '警告哦，请输入手机号码与验证码',
            type: 'warning',
            // center:'true'
          });
        } else {
          if (reg.test(this.user_name)||(this.user_code==response.res.code)) {
            var params = new URLSearchParams()
            var username = this.user_name
            var code = this.user_code
            var userId = this.$route.query.userId
            params.append('username', username)
            params.append('code', code)
            if(userId==''||userId==undefined){
            }else{
              params.append('userId', userId)
            }
         console.log(params);
            this.$axios.post('codeLogin', params).then(response => {
              console.log(response);
               if(response.res===0){
                this.$message({
                  message:response.msg,
                   type: 'warning'
                })
                // return;
              }else if (response.res === 1) {
                 this.token = response.data.token;
                this.$message({
                  message: response.msg,
                  type: "success"
                });
                this.balance = response.data.balance+0.00;
                this.$store.commit("updatemoneyData", this.balance);
                this.$store.commit('updatetoken', this.token)
                if (response.data.isRegist === 1) {
                  setTimeout(() => {
                    this.$router.push({
                      path: '/newcomerprize',
                      query: {
                        userId: this.$route.query.userId,
                        // returnUrl: this.path
                      }
                    })
                  }, 1000)
                } else {
                  this.$message({
                    message: '您已经注册过，无法获得新人红包',
                    type: 'warning'
                  });
                  setTimeout(() => {
                    this.path=this.$store.state.path;
                      
                    console.log(this.path);
                    if(this.path){
                      // var urlArr = (this.path).split("?")
                      // var queryArr = urlArr[1].split('&')
                      // var paramsArr = queryArr[0].split('=')
                      // var userId = paramsArr[1]
                      // var id = paramsArr[2]
                      this.$router.go(-1)
                      // window.location.href=this.$router.go({name: 'group', params: {userId:paramsArr[1],id:paramsArr[2]}});
                    }
                    else{
                         window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"
                    }
                  }, 1500)
                }
                    // this.$store.commit('changelogin',true);
               //从哪里过来回到哪里去
          //      if(res)
          //            setTimeout(()=>{
          //              this.$router.go(-1);
          // //  window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd"
          //   },1500)
               }else{
                  this.$message.error(response.msg);
               }
          })
      }else{
        this.$message({
          message:'手机号码或者验证码有误',
          tye:'error',
          center:'true'
        })
      }}
  },
    mounted(){
          this.login();
          this.getAuthCode();
          this.clear();
}
 }
      }

</script>
<style lang="less">
body{
  margin:0;
  padding:0;
}
  .register{ 
     width: 100%;
     height: 100%;
  }
  

.login-icon{
  display: block;
  margin:1rem auto 0;
   height:5rem;
   width: 100%;

}
.form{
    zoom:1;
    position: relative;
    margin-top:20%;
    top:-5%;
    height: 9rem;
}
.form:after{
     display:block;
     content:'';
     clear:both;
     height:0;
     overflow:hidden
}

.phone-number-box{
  position: relative;
  box-sizing: border-box;
  // height: 0.37rem;
  width: 80%;
  margin:0 auto;
  margin-bottom: 0.36rem;
  // margin-bottom: 0.36rem;
  height: 1.1rem;
 
 .phone-icon{
  position: absolute;
  width: 0.4rem;
  height: 0.5rem;
  display: inline-block;
  left:0.27rem;
  // top:0.3rem;
  transform: translateY(0.3rem);
 }
 input{
   box-sizing: border-box;
   position: absolute;
  //  width: 28rem;
   width: 100%;
   height: 1.1rem;
   padding-left:0.8rem;
   font-size: 0.36rem;
   background-color: transparent;
   color:white;
   border:0.01rem solid white;
 }
 .close-icon{
   width: 0.48rem;
   height: 0.48rem;
   position: absolute;
   display: inline-block;
   right: 0.18rem;
  //  top:0.3rem;
   transform: translateY(0.3rem);
 }
}
 .code-box{
   display: flex;
   position: relative;
   border:0.01rem solid rgba(238,238,238,1);
  //  width: 0.28rem;
   width: 80%;
   margin: 0 auto;
   height: 1.1rem;
   .code-icon{
     width: 0.4rem;
     height: 0.5rem;
     display: inline-block;
     position: absolute;
     left:0.27rem;
     top:0.3rem;
   }
   .code{
     background-color: transparent;
     box-sizing: border-box;
     padding-left:0.8rem;
     font-size: 0.36rem;
     height: 1.1rem;
     flex:1;
     color:white;
     border:none;
   }
   .getcode{
     width: 30%;
    //  height: 1.1rem;
     background-color: transparent;
     font-size: 0.36rem;
     color:white;
     text-align: center;
     padding:0.02rem 0;
     box-sizing: border-box;
     display: inline-block;
     line-height: 1.1rem;
     border-left:0.01rem solid rgba(238,238,238,1);
   }
   .auth_text{
     box-sizing: border-box;
     display: inline-block;
    //  height: 1.1rem;
    //  padding:0.02rem 0;
     width: 30%;
     padding:0 0.07rem;
     background-color: transparent;
     font-size: 0.36rem;
     color:white;
     border-left:0.01rem solid rgba(238,238,238,1);
     text-align: center;
     line-height: 1.1rem;
   
   }
 }
 .login{
   display: block;
   box-sizing: border-box;
   width: 80%;
   height: 1.1rem;
   font-size: 0.54rem;
   color:white;
   background-color: transparent;
   margin:1.59rem auto;
   border:0.01rem solid white;
 }
  input::-webkit-input-placeholder {
        color: white;
        font-size: 0.36rem;
          }
.el-message__content{
  font-size: 0.16rem;
}
</style>