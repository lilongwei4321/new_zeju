<template>
  <div class="alert_back transverse_center_center" @click.self="guanFn('关闭',false)">
    <section class="box portrait_center_ya">
      <header class="header">
        <h4 v-html="obj[name].title"></h4>
        <p>{{obj[name].text}}</p>
      </header>
      <main class="main portrait_fen_ya">
        <p>
          <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11" :disabled="phoneAsync" class="phone" >
        </p>
        <p>
          <input type="text" placeholder="请输入验证码" v-model="key" maxlength="4" class="key" >
          <input type="button" :value="keyText" class="key_btn" :class="{'on':keyAsync}" @click="yanBtnFn" :disabled="!keyAsync">
        </p>
        <p>
          <input type="button" value="确认" class="btn" :class="{'on':btnAsync}" :disabled="!btnAsync" @click="submitFn">
        </p>
      </main>
    </section>
  </div>
</template>

<script>
import api  from '@/api/api';
import {Token} from '@/assets/javascripts/token.js'  ;
import zhuGe from '@/assets/javascripts/zhuGe';
import globalFn from '@/assets/javascripts/globalFn';
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  props : {
    name  : {
      type : String,
      default : ''
    },  
    liuObj  : {
      type : Object,
      default : function(){
        return {}
      }
    }
  }, 
  watch : {
    phone (val) {
      //手机号校验
      this.inputFunc();
    },
    key () {
      //验证码校验
      this.passFunc();
    }
  },
  computed : {...mapGetters(['customerId','cityName'])},
  data () {
    return {
      obj : {
        '立即预约' : {title:'预约看房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;免费专车',text:'买方顾问，专车看房，特价特供'},
        '立即开通' : {title:'开盘通知我',text:'第一时间获取开盘通知'},
        '领取优惠' : {title:'购房优惠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不要错过',text:'我们将尽快将优惠通知发给您'}
      },
      keyText : '获取验证码',
      phone   : '',//手机号
      key     : '',//验证码
      keyAsync: false,
      btnAsync: false,
      phoneAsync : false
    }
  },
  methods : {
    init () {
      this.keyText = '获取验证码';
      this.phone   = '';//手机号
      this.key     = '';//验证码
      this.keyAsync= false;
      this.btnAsync= false;
      this.phoneAsync = false ;
      clearInterval(this.timer);
    },
    //关闭组件
    guanFn (str,async) {
      this.$emit('liuziFn',str,async);
      if(str == '关闭'){
        let name = '';
        if(this.liuObj.clue_type_id == 4){
          name = '预约专车';
        } else if(this.liuObj.clue_type_id == 6){
          name = '领取优惠';
        } else if(this.liuObj.clue_type_id == 7){
          name = '开盘通知我';
        }
        zhuge.track(`取消${name}`,{
          '当前页面' : '楼盘详情页',
          '所属模块' : '楼盘'
        })
      }
    },
    //手机号校验
    inputFunc () {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if(this.phone.length == 11 && reg.test(this.phone)){
        //验证码btn，可点击
        this.keyAsync = true;
        //判断提交是否可以点击
        if(this.key.length == 4){
          this.btnAsync = true;
        }
      } else{
        //验证码btn，置灰
        this.keyAsync = false;
        //不可提交
        this.btnAsync = false;
      }
    },
    //验证码校验
    passFunc () {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if(this.key.length == 4 && this.phone.length == 11 && reg.test(this.phone)){
        this.btnAsync =true;
      } else{
        this.btnAsync =false;
      }
    },
    //获取验证码
    gitSendVcode (num) {
      let token  = Token(num);
      api.gitSendVcode({token}).then((res)=>{
        if(res.status == 200){
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //获取验证码
    yanBtnFn () {
      //验证按钮是否可以点击
      this.keyAsync = false;
      //手机号不可更改
      this.phoneAsync= true;
      let num =  60 ;
      this.timer = setInterval( () =>{
        num--;
        this.keyText =`${num}后获取验证码`;
        if(num == 0){
          clearInterval(this.timer);
          this.keyText =`获取验证码`;
          this.phoneAsync= false;
          this.keyAsync = true;
        }
      },1000);
      //获取验证码
      this.gitSendVcode(this.phone);
    },
    //确定提交
    submitFn (){
      //不可重复点击
      this.btnAsync = true;
      //埋点
      this.zhugeBury();
      var para = {
        phone : this.phone,
        code   : this.key,
        loupan_id : this.liuObj.id,
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
        city_name : this.cityName, //城市
        clue_type_id : this.liuObj.clue_type_id
      }
      api.getYuecheJson(para).then((res)=>{
        if(res.status == 200){
          //可以点击
          this.btnAsync = false;
          //父组件 显示状态
          this.guanFn('提交',res.data);
          //重置输入内容
          if(!res.data){
            this.init();
          }
        } else if(res.status == 422){
          this.$router.push(`/${this.cityName}/404`);
        }
      })
    },
    //诸葛  --- 埋点
    zhugeBury () {
      let name = '';
      if(this.liuObj.clue_type_id == 4){
        name = '预约专车';
      } else if(this.liuObj.clue_type_id == 6){
        name = '领取优惠';
      } else if(this.liuObj.clue_type_id == 7){
        name = '开盘通知我';
      }
      zhuge.track(`提交${name}`, {
        '当前页面' : '楼盘详情页',
        '所属模块' : '楼盘',
        '手机号'   : this.phone,
        '验证码'   : this.key,
      });
    }
  }
}
</script>
<style lang="less" scoped>
.alert_back{
  position: fixed;
  top:0;
  left: 0;
  bottom:0;
  right: 0;
  z-index:202;
  background: rgba(0,0,0,0.4);
  .box{
    background: #fff;
    border-radius: .6rem;
    width:30.5rem;
    height: 26.2rem;
    position:relative;
    justify-content: space-between;
    padding: 2rem 2rem 1rem ; 
    box-sizing: border-box;
    .header{
      text-align: center;
      margin-bottom: 2.4rem;
      h4{
        font-size: 1.8rem;
        color:#333;
        margin-bottom: 1rem;
      }
      p{
        font-size: 1.4rem;
        color:#666;
      }
    }
    .main{
      width:100%;
      flex:1;
      p{
        flex:1;
        display: flex;
        input{
          display: block;
          height: 4rem;
          width:100%;
          border:1px solid #E5E5E5;
          -webkit-appearance: none;
          font-size: 1.6rem;
          line-height: 2rem;
        }
        .phone{
          border-radius: .4rem;
          padding-left: 1rem;
        }
        .btn{    
          background: #FFB299;
          color:#fff;
          border-radius: .4rem;
          border:none;
          -webkit-appearance:none;
          &.on{
            background:#f63;
          }
        }
        .key{
          width: 0;
          flex:1;
          border-right: none;
          border-radius: .4rem 0 0 .4rem;
          padding-left:1rem;
        }
        .key_btn{
          background: transparent;
          width: 11rem;
          color:#999;
          border-left:0;
          border-radius: 0 .4rem .4rem 0;
          &.on{
            color:#f63;
          }
        }
      }
    }
  }
}
</style>
