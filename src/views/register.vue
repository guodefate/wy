<template>
    <div  class="register">
      <mt-header fixed  title="用户注册">
  </mt-header>
        <div class="register-wrap">
            <form action="" method="" >
           <p>手机号码: 
               <input type="tel"  v-model="user.username" placeholder="请输入手机号" >    
           </p>
           <p>设置密码:
               <input type="password" v-model="user.password" placeholder="6到20位字符" > 
             </p>
           <p class="title">再次输入密码: <input type="password"  v-model="user.getpassword" placeholder="再次输入密码" >
           </p>
           <!-- <div class="register-content">
            <p>验证码 <input type="text"   placeholder="请输入验证码"  v-model="user.code" >
           <mt-button  type="danger" :disabled="disabled" @click="codebtn"  >{{btntxt}}</mt-button>
           </p> 
           </div> -->
           <div class="register-contain">
           <router-link to="/help">
            <a href="/help">查看协议>></a>
            </router-link>
             <mt-button size="large" type="primary" @click="stt">同意协议并注册</mt-button>
           </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios' 
export default {
  name:'register',
  data(){
      return{
        //   btntxt:"获取短信验证码",
        //   disabled:false,
        //   time:0  ,
        user:{
            username:'',
            password:'',
            //  userId:'',
             getpassword:'',
            //  code:'',
           
        }
      }
  },
  methods:{
      //验证手机号部分
    //   checkphone:function(){
    //      var username=this.username.val()//获取输入的手机号
    //          var pattern = /^1[0-9]{10}$/;/*是否为11位*/

    //     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; /*手机号段设置*/

    //     isPhone = 1;
    //     //未输入内容时，给出提醒
    //     if(phone == '') {
    //         //alert('请输入手机号码');
    //         $('#check_1').show();
    //         isPhone = 0;
    //         return;
    //     }
    //      else{
    //      $('#check_1').hide();

    //      }
    //     //不满足11位条件时，给出提醒
    //     if(!pattern.test(phone)){
    //         //alert('请输入正确的手机号码');
    //         $('#check_2').show();
    //         isPhone = 0;
    //         return;
    //     }
    //      else{
    //      $('#check_2').hide();
    //      }
    //     //手机号段判断，不符的话，提醒重新输入手机号
    //     if(!myreg.test($("#tel").val())){
    //         //alert('请输入有效的手机号！');
    //         $('#check_3').show();
    //         isPhone = 0;
    //         return;
    //     }
    //      else{
    //      $('#check_3').hide();
    //      }
    //   },

//       codebtn:function(){
//           var reg=11&&/^((13|14|15|17|18)[0-9]{1}\d{8})$/
//         //   var url="/nptofficiaWebsite/apply/sennnndSms?mobile="+this.ruleForm.phone;
//           if(this.ruleForm.username==''){
//               alert("请输入手机号码");
//           }else if(!reg.test(this.phone)){
//               alert("手机格式不正确")
//           }else{
//                this.time=60;
//                this.disabled=true;
//               this.timer();
//         //   axios.post(url).then(
//         //       res=>{
//         //           this.phonedata=res.data;
//         //       })
//           }  
//       },
//       timer:function(){
//           if(this.time > 0){
//               this.time--;
//               console.log(this.time);
//               this.btntxt=this.time+"s,后重新获取验证码";
//               setTimeout(this.timer,1000);
//           }else{
//               this.time=0;
//               this.btntxt="获取验证码";
//               this.disabled=false
//           }
//       },
//      checkpwd:function(){
//                 var word=this.password.trim();
//                 if(word.length==0)
//                     this.msgpassword="密码不能为空";
//                 var count=0;
//                 if(/[0-9]/.test(word)){
//                     count++;
//                 }
//                 if(/[A-Za-z]/.test(word))
//                 {
//                     count++;
//                 }
//                 if(/[^0-9A-Za-z]/.test(word)){
//                     count++;
//                 }
//                 if(count==3&& word.length>=6)
//                 {
//                     this.msgpassword="高强度";
//                 }else if(count==2&& word.length>=6){
//                     this.msgpassword="中强度";
//                 }else{
//                     this.msgpassword="低强度";
//                 }
//                 return word >=0;
//             },
//             // codebtn:function () {
//             //     console.log(1);
//             //     this.disab=true;
//             //     setTimeout(this.enableCodeBtn,1000);
//             // },
//             // enableCodeBtn:function () {
//             //     if(this.c > 0) {
//             //         this.btn=this.c+"秒后重新获取";
//             //         setTimeout(this.enableCodeBtn, 1000); // 1 秒后再次调用自己
//             //         this.c--;
//             //     } else {
//             //         this.disab=false;
//             //         this.btn="获取短信验证码";
//             //         this.c = 60;
//             //     }
//             // },
//        stt(){
//           axios.post("http://192.168.1.116:8081/api/user/register",).then(res=>{
//               if(res.ret){
//                 this.$router.push({path:'newsitem'})
//               }

//           })
//       },
                // var username=user.username;
                // var password=user.password
      stt(){
          const user = [{username:this.user.username,password:this.user.password}]
         axios.post("http://192.168.1.116:8081/api/user/register",{
                user,
            //  userId:'136'
            
            //  userId:this.user.userId
        }).then(res=>{
              if(res.ret){
                  this.$router.push({path:'go(-1)'})  
              }
          })
      }
    },
    mounted(){
          this.stt();
}
}     
     
   

</script>
<style>
 .mint-header{
  height:45px;
  width:100%;
  background:#16beac
}
.mint-header-title{
  
  font-size:24px;
  color:#f1f1f1;
}
</style>
<style scoped>
 .register-wrap{
     position:absolute;
     width:400px;
     height:500px;
     text-align:center;
     top:50%;
     left:50%;
     margin-top:-200px;
     margin-left:-150px
 }
 .register-wrap p input{
     width:300px;
     height:30px;
     background:#fff;
     margin-left:10px;
     font-size:14px;
 }
 .title{
     display:block;
     margin-left:-32px;
 }
 .register-content p input{
     height:30px;
     width:153px;
     background:#fff
 }
 .register-content p{
     display:block;
     margin-left:20px
 }
 .mint-button--danger{
    background-color:#d1d1d1;
    height:36px; 
    margin-left:-4px;
 }
 .register-contain a{
     display:block;
     text-decoration:none;
     color:#a1a1a1;
     margin-left:-70px;
     margin-bottom:10px;
     margin-top:-5px
 }
 .register-contain a:hover{
     color:#f00
 }
 .mint-button--primary{
  background-color:#16beac;
  margin-left:85px;
  height:45px;
  width:304px
 }
</style>