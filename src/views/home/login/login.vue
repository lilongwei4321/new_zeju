<template>
  <div class="wrap">
    <header-login :name = "message" @Login = "isLogin"></header-login>
    <section class="from">
      <div class="dec_div">
        <p class="text">加入择居，享受</p>
        <div class="red_div">
          <p>免费看房专车，专业房产顾问</p>
          <p>最新房源消息，最多购房优惠</p>
        </div>
        <p class="text">绝不让您失望！</p>
      </div>
      <header class="title">{{ message }}</header>
      <main class="main">
        <!-- 客户姓名 -->
        <p class="borbot" v-show="message == '注册'">
          <input class="username" type="text" maxlength="16"  v-model="username" placeholder="请输入姓名">
        </p>
        <!-- 手机号 -->
        <p class="borbot">
          <input class="phone" type="text" maxlength="11" v-model="phone" placeholder="请输入手机号" :disabled="phoneAsync">
          <input 
            class="yan_btn_hui" 
            :class="{'on':yanAsync}" 
            type="button" 
            :value="yanbtntext"
            @click="yanBtnFn" 
            :disabled="!yanAsync"
          >
        </p>
        <!-- 手机号错误提示 -->
        <p class="red" v-show="flag_phone">请您检查手机号</p>
        <!-- 验证码 -->
        <p class="borbot">
          <input class="password" type="text" maxlength="4"  v-model="password" placeholder="请输入验证码">
        </p>
        <p class="login_btn" >
          <!-- 是否可以点击登录 -->
          <input 
            type="button" 
            :value="message" 
            @click="loginFn" 
            :disabled="!btnAsync" 
            :class="{'on':btnAsync}" 
          >
        </p>
        <!-- 底部提醒 跳转链接 -->
        <p class="red2" @click="isLogin">{{ account }}</p>
        <!-- 验证码错误提示 -->
        <p class="error_code" v-show="flagerrorcode">{{codeError}}</p>
        <!-- <p class="error_phone" v-show="flagerrorphone">{{ errorphonetext }}</p> -->
      </main>
    </section>
  </div>
</template>
<script>
import api from '@/api/api';
import { mapActions,mapGetters} from 'vuex';
import {Token} from '@/assets/javascripts/token.js'  ;
import globalFn from '@/assets/javascripts/globalFn';
//引用  公用头部
import headerLogin from '@/components/base/header/header_login.vue';
export default {
  data () {
    return {
      username   : '',//用户名称
      phone      : '',//手机号
      password   : '',//验证码
      yanAsync : false,//验证按钮是否可以点击,
      flag_phone : false,//手机号提示
      btnAsync   : false,//是否可以提交
      phoneAsync : false,//手机号不可更改
      yanbtntext : '获取验证码',
      message    : '注册',
      flagerrorcode : false,//提醒显示
      errorphonetext: '',//手机号尚未注册
      flagerrorphone: false,
      account       : '已有账号',//底部提醒链接跳转
      timer  : null,//倒计时句柄
      userObj  : {},
      codeError : '验证码错误'
    }
  },
  components : {
    headerLogin
  },
  computed : {...mapGetters(['fromPath','cityName'])},
  watch : {
    phone (val) {
      //手机号校验
      this.inputFunc();
    },
    password () {
      //验证码校验
      this.passFunc();
    },
    '$route' (to,from) {
      if(to.name == '登录页'){
        this.init();
      }
    }
  },
  methods : {
    init () {
      this.message = this.$route.query.name!=undefined? this.$route.query.name:'注册';
      this.username = '';//用户名称
      this.phone    = '';//手机号
      this.password = '';//验证码
      this.yanbtntext ='获取验证码';
      this.phoneAsync = false;
      this.yanAsync   = false;
      if(this.message == '登录'){
        this.username = "";
        this.account   = '去注册';
      }else{
        this.account   = '已有账号';
      }
      clearInterval(this.timer);
      //储存来源页
      let path = globalFn.getCookieFn('fromPath',`/${this.cityName}`);
      //储存来源页
      this.setCookieFn(['fromPath',path]);
    },
    //设置storage
    ...mapActions(['setCookieFn']),
    //手机号校验
    inputFunc () {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if(this.phone.length == 11 && reg.test(this.phone)){
        //验证码btn，可点击
        this.yanAsync = true;
        //判断提交是否可以点击
        if(this.password.length == 4){
          this.btnAsync = true;
        }
      } else{
        //验证码btn，置灰
        this.yanAsync = false;
        //不可提交
        this.btnAsync = false;
      }
    },
    //验证码校验
    passFunc () {
      if(this.password.length == 4 && this.phone.length == 11){
        this.btnAsync =true;
      } else{
        this.btnAsync =false;
      }
    },
    //获取验证码
    yanBtnFn () {
      //验证按钮是否可以点击
      this.yanAsync = false;
      //手机号不可更改
      this.phoneAsync= true;
      let num =  60;
      this.timer = setInterval( () =>{
        num--;
        this.yanbtntext =`${num}后获取验证码`;
        if(num == 0){
          clearInterval(this.timer);
          this.yanbtntext =`获取验证码`;
          this.phoneAsync= false;
          this.yanAsync = true;
        }
      },1000);
      //获取验证码
      this.gitSendVcode(this.phone);
    },
    //登录
    loginFn () {
      if(/^\d{4}$/.test(this.password)){
        var para = {
          phone : this.phone,
          code  : this.password,
          nickname : this.username,
          zjfrom : globalFn.getCookieFn('zjfrom'),
          tgjh   : globalFn.getCanShu('tgjh'), // 推广计划
          tgdy   : globalFn.getCanShu('tgdy'), // 推广单元
          tgsb   : globalFn.getCanShu('tgsb'), // 推广设备
          tgcy   : globalFn.getCanShu('tgcy'), //推广创意
          gjc    : globalFn.getCanShu('gjc'),  //点击关键词
          gjcppms: globalFn.getCanShu('gjcppms'),//关键词匹配模式
          gjcpm  : globalFn.getCanShu('gjcpm'),//关键词排名
          ggsc   : globalFn.getCanShu('ggsc'), //广告素材
          ggw    : globalFn.getCanShu('ggw'),  //广告位
          pd     : globalFn.getCanShu('pd'),   //广告频道
          xq     : globalFn.getCanShu('xq'),   //定向人群兴趣
          xb     : globalFn.getCanShu('xb'),   //定向人群性别
          nld    : globalFn.getCanShu('nld'), //定向人群年龄段
          city_name : globalFn.getCookieFn('cityName'), //城市
          clue_type_id : 9
        }
        api.getLoginJson(para).then((res)=>{
          if(res.status == 200){
            if(!res.data){
              //点击提交埋点
              this.zhugeTijiao('验证码错误');
              // this.$router.push(`/${this.cityName}/404`);
              this.codeError = '验证码错误';
              this.flagerrorcode = true;
              setTimeout(() =>{
                this.flagerrorcode = false;
              },3000)
            } else{
              let obj = res.data;
              this.userObj = obj;
              localStorage.setItem('headImgUrl',obj.head_img_url);//用户头像
              this.setCookieFn(['customerId',obj.customer_id]);//用户id
              this.setCookieFn(['customerLevel',obj.vip_level]);//等级
              this.setCookieFn(['majorAdvisor',obj.advisor_id]);//专属顾问id
              this.setCookieFn(['customerPhone',obj.phone]);//用户手机号
              //点击提交埋点
              this.zhugeTijiao('成功');
            }
          } else if(res.status==422){
            //点击提交埋点
            this.zhugeTijiao('验证码错误');
            // this.$router.push(`/${this.cityName}/404`);
            this.codeError = res.data;
            this.flagerrorcode = true;
            setTimeout(() =>{
              this.flagerrorcode = false;
            },3000)
          }	
        })
      }else{
        this.flagerrorcode = true;
        setTimeout(() =>{
          this.flagerrorcode = false;
        },3000)
      }
    },
    //重置手机号，登录
    isLogin () {
      this.phone = '';
      this.password = '';
      if(this.message == '注册'){
        this.username = '';
        this.message = '登录';
        this.account   = '去注册';
      }else{
        this.message = '注册';
        this.account   = '已有账号';
      }
      //切换状态埋点
      this.zhugeQiehuan();
    },
    //获取验证码
    gitSendVcode (num) {
      let token  = Token(num);
      api.gitSendVcode({token}).then((res)=>{
        if(res.status == 200){
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //切换状态埋点
    zhugeQiehuan () {
      zhuge.track(`打开${this.message}页`, {
        '当前页面' : '登录页',
        '所属模块' : '个人中心'
      });
    },
    //点击提交埋点
    zhugeTijiao (str) {
      let obj = {
        '当前页面'   : '登录页',
        '所属模块'   : '个人中心',
        '提交手机号' : this.phone,
      }

      if(this.message == '注册'){
        obj['登录结果'] = str;
      } else{
        obj['注册结果'] = str;
      }
      zhuge.track(`提交${this.message}`,obj);

      if(str == '成功') {
        let phones = this.userObj.phone;
        let reg = /^(\d{3})\d{4}(\d{4})$/;
        let phoneName = phones.replace(reg, "$1****$2");

        zhuge.identify(phoneName, {
            // name: '张三',
            //预定义属性
            // avatar: '头像地址',
            //预定义属性
            // '行业': '互联⽹网' //⾃自定义属性 
        },() =>{
          //跳转后，默认来源页为首页
          globalFn.setCookieFn('fromPath', `/${this.cityName}`);
          this.$router.push(this.fromPath);
        });  
      }
    }
  },
  mounted () {
    //重置手机号，登录
    this.init();
  },
  //设置来源页
  beforeRouteEnter (to,from,next) {
    if(from.name !=null){  
      globalFn.setCookieFn('fromPath', from.path);
    }
    next();
  }
}
</script>
<style lang="less" src="./login.less" scoped></style>