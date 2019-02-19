<template>
    <div class='newcomerprize' :style="note">
        <div class="right">
            <!-- <img src="../assets/btn_return.png" alt=""> -->
        </div>
     <div class="prize-box">
         <img class='bgicon' src="../assets/registered_100rmb.png" alt="">
         <div class="prize">
             <div class="prize-name">恭喜你!获得新人红包</div>
             <div class="money-box"><div class="money">{{balance}}<span class='money-right'>元</span></div></div>
             <button class="btn">已存入余额帐户,可登录查看 </button>
             <div class="return" @click="jump">{{jumptext}}  >></div>
         </div>
     </div>
    </div>
</template>
<script>
import eventBus from '../until/eventbus.js'
export default {
    name:'newcomerprize',
    data(){
        return{
          balance:'',
          path:'',
          token:'',
          jumptext:'立即下载',
           note: {
                backgroundImage: "url(" + require("../assets/prizebg.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",    
                position:" fixed"
                }
        }
    },
    methods:{
       jump(){
           this.path=this.$store.state.path;
           console.log(this.path);
            if(this.path){
            //    window.location.href=this.path
            this.$router.go(-2)

            }else{
              window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hqcd" 
                    }
            
       },
       moeny(){
           this.balance=this.$store.state.moneyData;
       }
    },
    computed:{
        moneyData(state){
             if(this.balance==''){
              this.$store.state.moneyData(JSON.parse(window.localStorage.getItem('balance')))
          }
          return state.moneyData;
        }
    },
    mounted(){
        this.moeny();
        // this.jump();
        ////console.log(this.$store.states)
        this.balance=this.$store.state.moneyData;
    },
    created(){
        this.path=this.$store.state.path;
        if(this.path){
            this.jumptext='返回详情页'
        }
        this.token=this.$store.state.token;
         ////console.log(this.token);
           if(!this.token){
           this.$message({
          message: '警告，您还未登录',
          type: 'warning'
        });
           this.$router.push({path:'/register',query:{userId:this.$route.query.userId}})
       }

    },
    destroyed(){
        this.$store.commit("updatemoneyData", this.balance);
    }
}

</script>
<style lang='less'>
    body {
        padding: 0;
        margin: 0;
    }
    .newcomerprize {
        // background: url('../assets/prizebg.png')no-repeat left top/cover;
        // background-size: cover;
        // position: fixed;
        width: 100%;
        height: 100%;
    }
    .login-icon {
        display: block;
        width: 100%;
        height: 6rem;
    }
    .right {
        // position: relative;
        width: 1.22rem;
        height: 0.7rem;
        margin-left: 0.21rem; // font-size: 1rem;
        margin-top: 1.2rem;
    }
    .prize-box {
        position: relative;
        width: 10.24rem;
        height: 11.58rem;
        bottom: -2rem;
        background-size: cover;
        margin: 0 auto;
        .bgicon {
            display: block;
            width: 10.24rem;
            height: 11.58rem;
            position: absolute;
            margin: 0 auto; // z-index: 45;
        }
        .prize {
            .prize-name {
                width: 4.48rem;
                height: 0.44rem;
                position: absolute;
                opacity: 1;
                font-size: 0.46rem;
                font-family: Source Han Sans CN;
                color: rgba(255, 255, 255, 1);
                line-height: 0.35rem;
                top: 1.9rem;
                left: 3rem;
            }
            .money-box {
                position: relative;
                width: 4.5rem;
                height: 2.3rem;
                left: 50%;
                top: 2.5rem;
                margin-top: 0.5rem;
                height: 3rem;
                transform: translateX(-50%);
            }
            .money {
                //  width: 5.40rem;
                opacity: 1;
                font-size: 2.5rem;
                font-family: Source Han Sans CN;
                color: rgba(255, 255, 255, 1);
                letter-spacing: -0.3rem;
                position: absolute;
                .money-right {
                    font-size: 0.65rem;
                    display: inline-block;
                    position: absolute;
                    right: -0.7rem;
                    top: 1.5rem;
                }
            }
            .btn {
                width: 6.2rem;
                height: 1.03rem;
                opacity: 1;
                font-size: 0.46rem;
                font-family: Source Han Sans CN;
                color: rgba(249, 36, 66, 1);
                line-height: 0.95rem;
                position: absolute;
                background-color: white;
                border-radius: 30rem;
                top: 6rem;
                left: 2rem;
                border: 0.01rem solid rgba(255, 231, 231, 1);
            }
            .return {
                height: 1.52rem;
                opacity: 1;
                font-size: 0.72rem;
                font-family: Source Han Sans CN;
                color: rgba(255, 255, 255, 1);
                line-height: 1.52rem;
                position: absolute;
                top: 8.5rem;
                left: 3.2rem;
                z-index: 9991;
            }
        }
    }
</style>