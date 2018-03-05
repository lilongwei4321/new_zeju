<template>
  <div class="user_wrap">
    <header-text name = "个人中心" :async="false" :msg="msgText" :wordFlag="true" :url="indexUrl"></header-text>
    <main class="user_main">
      <header class="header header1 back" v-if="async">
        <dl class="transverse_mo_center_ya">
          <dt>
            <img :src="headImgUrl" alt="" v-show="headFn">
            <i class="iconfont icon-ren-copy-copy" v-show="!headFn"></i>
          </dt>
          <dd>您好 {{phone}}</dd>
        </dl>
      </header>
      <header v-else class="header header2 back">
        <nav class="nav">
          <p class="text">加入择居，享受</p>
          <div class="dec_div">
            <p>免费看房专车，专业房产顾问</p>
            <p>最新房源消息，最多购房优惠</p>
          </div>
          <div class="transverse_center_center btn_div">
            <router-link :to="{ path: `/${cityName}/login`,query:{name:'注册'}}" class="transverse_center_center">注册</router-link>
            <router-link :to="{ path: `/${cityName}/login`,query:{name:'登录'}}" class="transverse_center_center">登录</router-link>
          </div>
        </nav>
      </header>
      <div class="main">
        <nav>
          <div class="func transverse_fen border">
            <span class="transverse_center_center" @click="fangdaiFn">房贷计算器</span>
            <span class="transverse_center_center" @click="routeHref">测试购房资格</span>
          </div>
          <router-link class="border" :to="`/${cityName}/pay/member`">
            <span><i class="iconfont icon-huangguan huiyuan"></i><b>择居会员</b></span>
            <span><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="quanxian(`/${cityName}/home/sms`)">
            <span><i class="iconfont icon-xiaoxi xiaoxi"></i><b>我的消息</b></span>
            <span><i :class="{'dian':xiaoxiFlag}"></i><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="zsAdvisor()">
            <span><i class="iconfont icon-kefu1 kefu"></i><b>专属顾问</b></span>
            <span><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="quanxian(`/${cityName}/home/attention_loupan`)">
            <span><i class="iconfont icon-xin1 xin"></i><b>关注楼盘</b></span>
            <span><b>{{guanzhu}}</b><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="quanxian(`/${cityName}/home/my_appointments`)">
            <span><i class="iconfont icon-kan kan"></i><b>看房记录</b></span>
            <span><b>{{daikan}}</b><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="quanxian(`/${cityName}/home/my_deals`)">
            <span><i class="iconfont icon-chengjiao jiao"></i><b>我的成交</b></span>
            <span><b></b><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="`/${cityName}/home/my_browses`">
            <span><i class="iconfont icon-zuji zuji"></i><b>我的足迹</b></span>
            <span><b></b><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
          <router-link class="border" :to="`/${cityName}/pay/mdb`">
            <span><i class="iconfont icon-bao bao"></i><b>买到宝</b></span>
            <span><i class="iconfont icon-jiantou2"></i></span>
          </router-link>
        </nav>
        <p class="btn" v-if="async">
          <input type="button" value="退出登录" @click="exitLogon" v-if="customerId != null">
        </p>
      </div>
    </main>
    <div v-show="alertFlag">
      <alert-warn title="您确定退出吗?" alertBtn="立即退出" @showFn="resetUser"></alert-warn>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';
import {mapGetters,mapActions} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
  //引用  公用头部
import headerText from '@/components/base/header/header_text.vue';
//弹框
import alertWarn from '@/components/page/alert/alert_state.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    alertWarn
  },
  data () {
    return {
     async : true,
     phone : '',
     xiaoxiFlag : false,
     guanzhu    : '',
     daikan     : '',
     headImgUrl : '',//头像
     headFn     : false,
     msgText : '首页',
     indexUrl : '',
     alertFlag : false,//退出弹框
    }
  },
  watch :{
    '$route' (to){
      if(to.name == '个人中心首页'){
        this.indexUrl = '/'+this.cityName;
        this.alertFlag = false;
        this.customerId!=null? this.async = true:this.async = false;
        //页面初始化
        this.init();
      }
    }
  },
  computed: {...mapGetters(['customerId','customerPhone','majorAdvisor','cityName'])},
  methods : {
    //设置storage
    ...mapActions(['delCookieFn']),
    //进入页面加载
    init (){
      if(this.customerId != null){
        var headImg = localStorage.getItem('headImgUrl');
        if(headImg!=null && headImg!='null'){
          this.headImgUrl = 'http://imgs.zeju.cn'+headImg;
          this.headFn = true;
        } else{
          this.headFn = false;
        }
        //获取所有未读数据
        this.getUserData();
        var phones = this.customerPhone;
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        this.phone = phones.replace(reg, "$1****$2");
      }
      //诸葛  --- 打开埋点
      this.zhugeBury();
    },
    //退出登录
    exitLogon () {
      this.alertFlag = true;
    },
    resetUser (async){
      if(async){
        this.delCookieFn(['customerId',null]);
        this.delCookieFn(['customerLevel',0]); 
        this.delCookieFn(['majorAdvisor',null]); 
        this.delCookieFn(['customerPhone',null]); 
        
        this.$router.push({ path: `/${this.cityName}/login`,query:{name:'登录'}});
      } else{
        this.alertFlag = false;
      }
    },
    //专属顾问
    zsAdvisor (){
      if(this.majorAdvisor != null){
        return '/' + this.cityName + '/advisor/advisor_detail/'+globalFn.getCookieFn('majorAdvisor');
      } else{
        return '/' + this.cityName + '/advisor/advisor_wu';
      }
    },
    //获取所有未读数据
    getUserData (){
      var id = this.customerId;
      api.getUserJson({},id).then((res)=>{
        if(res.status == 200){
          // res.data.messages_count!=0? this.xiaoxiFlag=true : this.xiaoxiFlag=false;//消息
          res.data.favorites_count!=0? this.guanzhu=res.data.favorites_count : this.guanzhu='暂无';
          res.data.appointments_count!=0? this.daikan=res.data.appointments_count +'个' : this.daikan='暂无';
        } else if(res.status == 422){
          this.$router.push(`/${this.cityName}/404`);
        }
      })
    },
    //点击消息判断是否登录
    quanxian (url){
      if(this.customerId != null){
        return url;
      } else{
        return '/'+this.cityName+'/login';
      }
    },
    //诸葛  --- 打开埋点
    zhugeBury () {
      zhuge.track('打开个人中心首页', {
        '当前页面' : '个人中心首页',
        '所属模块' : '个人中心'
      });
    },
    //房贷计算器
    fangdaiFn (){
      this.$router.push(`/${this.cityName}/tools/loan_caculator`);
    },
    //测试购房资格
    routeHref () {
      this.$router.push(`/${this.cityName}/tools/purchase_qualification`);
    }
  },
  mounted (){
    this.indexUrl = '/'+this.cityName;
    this.alertFlag = false;
    this.customerId!=null? this.async = true:this.async = false;
    //页面初始化
    this.init();
  }
}
</script>
<style lang="less" scoped>
.user_wrap{
  padding-top:4.4rem;
  // background: #F6F5F5;
  .user_main{
    .header{
      dl{
        height: 100%;
        padding:0 1rem;
        dt{
          height: 4.4rem;
          width: 4.4rem;
          border-radius: 100%;
          background: #FFF;
          margin-right: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            font-size: 4rem;
            color: #EBEBEB;
          }
          img{
            width: 100%;
            border-radius: 100%;
          }
        }
        dd{
          font-size: 1.6rem;
          color:#fff;
        }
      }
      .nav{
        height: 80%;
        text-align: center;
        .text{
          font-size: 1.4rem;
          color: #FFF;
          line-height: 1.4rem;
          padding: 2rem 0 1rem;
        }
        .dec_div{
          p{
            font-size: 2rem;
            color: #FFFFFF;
            line-height: 3rem;
            font-weight: 600;
          }
        }
        .btn_div{
          margin:1.5rem 0;
          a{
            width:8.8rem;
            height: 3rem;
            color:#fff;
            border:1px solid #fff;
            border-radius: .4rem;
            font-size:1.4rem;
            margin:0 .5rem;
          }
        }
      }
    }
    .header1{
      background-image:url(/static/assets/images/back1.png);
      height: 9rem;
    }
    .header2{
      background-image:url(/static/assets/images/back2.png);
      height: 18rem;
    }
    .main{
      padding-bottom: 3rem;
      nav{
        background: #fff;
        padding:0 1rem;
        display: flex;
        flex-direction:column;
        margin-bottom: 1rem;
        .func{
					padding: 1.5rem 0;
					display: flex;
					span{
						width:0;
						flex: 1;
						background: #FFF7F4;
						border: 1px solid #FF6633;
						border-radius: 2px;
						color: #F63;
						font-size: 1.2rem;
						height: 3.6rem;
						&:first-child{
							margin-right:.5rem;
						}
						&:last-child{
							margin-left:.5rem;
						}
					}
				}
        a{
          height: 4.4rem;
          color:#333;
          font-size:1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            height: 2rem;
            display: flex;
            align-items: center;
            b{
              font-weight: normal;
            }
            &:first-child{
              color:#333;
              font-size:1.6rem;
              i{
                display: inline-block;
                width:3rem;
                font-size:2.2rem;
                &.huiyuan{color:#FF868A;font-size:2rem;}
                &.xiaoxi {color:#B0F46C;font-size:2.4rem;}
                &.kefu   {color:#40E1BD;font-size:2.3rem;}
                &.xin    {color:#FF494B;}
                &.kan    {color:#FF926D;}
                &.jiao   {color:#f7E400;font-size:2.4rem;}
                &.zuji   {color:#FFB63D;}
                &.bao    {color:#75B5FF;}
              }
            }
            &:last-child{
              color:#999;
              font-size:1.4rem;
              .dian{
                width: 1rem;
                height: 1rem;
                background: red;
                border-radius: 100%;
              }
            }
          }
        }
      }
      .btn{
        padding:1.4rem 1rem;
        box-sizing: border-box;
        input{
          display: block;
          width:100%;
          height: 4.4rem;
          background: #fff;
          border-radius: .4rem;
          color:#FF5A5F;
          -webkit-appearance:none;
          font-size: 1.6rem;
          border: 1px solid #D8D8D8;
        }
        a{
          width: 100%;
          height: 4.4rem;
          background: #F63;
          border:none;
          border-radius: .4rem;
          -webkit-appearance:none;
          color: #FFF;
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
