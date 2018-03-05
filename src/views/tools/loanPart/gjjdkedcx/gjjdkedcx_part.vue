<template>
  <div class="tqhdjs">
    <div class="boxfdjs" v-show="alertFalg">
      <div class="box">
        <ul>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>月缴存额</span>
              <input type="number" placeholder="请输入住房公积金月缴存额" v-model.number="yjce">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>缴存比例</span>
              <input type="number" placeholder="请输入缴存比例" v-model.number="jcbl2">
              <span class="red">%</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>配偶月缴</span>
              <input type="number" placeholder="请输入配偶住房公积金月缴存额" v-model.number="poyj">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>缴存比例</span>
              <input type="number" placeholder="请输入缴存比例" v-model.number="jcbl3">
              <span class="red">%</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>房屋评估</span>
              <input type="number" placeholder="请输入房屋评估价值或实际购房款" v-model.number="fwpg">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>房屋性质</span>
              <div class="hkfs transverse_fen_center">
                <p class="pt" v-for="(k,index) in fwxzArr" :key="index" @click="fwxzFunc(k.value)" :class="fwxzType == k.value?'cur':''">
                  <i class="iconfont icon-duihao"></i>
                  <span>{{ k.name }}</span>
                </p>
              </div>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>贷款年限</span>
              <input type="number" placeholder="期限最长到借款人70周岁且不超过30年" v-model.number="dknx">
              <span class="red">年</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>信用等级</span>
              <div class="hkfs transverse_fen_center">
                <p class="pt" v-for="(k,index) in xydjArr" :key="index" @click="xydjFunc(k.value)" :class="xydjType == k.value?'cur':''">
                  <i class="iconfont icon-duihao"></i>
                  <span>{{ k.name }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="fixed_btn_fdjs border1 transverse_fen_center" v-show="alertFalg">
      <p class="transverse_center_center" @click="clearData">清空重填</p>
      <p class="transverse_center_center" @click="jisuan">开始计算</p>
    </div>
    <div class="fixedAlert transverse_center_center" v-show="wran">请确认是否填写完整！</div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import alertPart from '@/views/tools/loanPart/alert_part.vue';//弹框
export default {
  components :{
    alertPart,
  },
  data (){
    return {
      yjce  : '',
      jcbl2 : '',
      poyj  : '',
      jcbl3 : '',
      fwpg  : '',
      dknx  : '',
      fwxzType  : '1',
      xydjType  : '1',
      alertFalg : true,
      wran      : false,
      fwxzArr   : [
        {name: '政策性住房', value: '1'},
        {name: '其他', value: '2'},
      ],
      xydjArr   : [
        {name: 'AAA级', value: '1'},
        {name: 'AA级', value: '2'},
        {name: '其他', value: '3'},
      ]
    }
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods : {
    //点击出来弹框
    clihide (typeobj){
      this.totalArr  = this[typeobj];
      this.alertFalg = false;
    },
    xydjFunc (index){
      this.xydjType = index;
    },
    fwxzFunc (index){
      this.fwxzType = index;
    },
    //重置
    clearData (){
      this.yjce  = '';
      this.jcbl2 = '';
      this.poyj  = '';
      this.jcbl3 = '';
      this.fwpg  = '';
      this.dknx  = '';
      this.fwxzType  = '1';
      this.xydjType  = '1';
      var name = '清空公积金贷款额度查询内容';
      zhuGe.resetFangData(name)
    },
    //计算
    jisuan (){
      var that = this;
      if(this.yjce =='' || this.jcbl2 =='' || this.fwpg =='' || this.dknx == ''){
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }

      //住房公积金贷款评估
      var gryjce;//住房公积金个人月缴存额
      var poyjce;//配偶住房公积金个人月缴存额
      var grjcbl;//缴存比例
      var pojcbl;//配偶缴存比例
      var xy;//个人信用
      var xyText;
      var fwzj;//房屋总价
      var fwxz;//房屋性质
      var dknx;//贷款申请年限
      var syhk;//首月还款额

      var dked;//需要贷款额度
      var hkfs;//还款方式
      var bxhj;//本息合计
      var bxhj2;//本息合计等本金

      //中间变量
      var gbl;
      var jtysr;//家庭月收入
      var r;//月还款
      var gjjdka;//住房公积金贷款额度a
      var gjjdkb;//住房公积金贷款额度b
      var gjjdkc; //住房公积金贷款额度c
      var fangwzx;

      gryjce = this.yjce;

      if(poyjce !=''){
        poyjce = this.poyjce;
        pojcbl = this.jcbl3 / 100;
      }
      grjcbl = this.jcbl2 / 100;
      
      if(this.fwxzType == 1){
        fwxz = 0.9;
      } else{
        fwxz = 0.8;
      }
      if(this.xydjType == 1){
        xy = 1.3;
      } else if(this.xydjType == 2){
        xy = 1.15;
      } else{
        xy = 1;
      }
      fwzj = this.fwpg;
      dknx = this.dknx;
      //个人公积金
      var l1_5 = 0.0333;
      var l6_30 = 0.0387;
      var bcv = 0;
      if (dknx > 5) {
        bcv = Math.round(1000000 * l6_30 / 12) / 1000000;
      } else {
        bcv = Math.round(1000000 * l1_5 / 12) / 1000000;
      }
      r = (10000 * bcv * Math.pow(1 + bcv, 12 * dknx)) / (Math.pow(1 + bcv, 12 * dknx) - 1);
      if (poyjce > 0) {
        jtysr = Math.ceil((gryjce / grjcbl + poyjce / pojcbl) * 10) / 10;
      }
      else {
        jtysr = Math.ceil((gryjce / grjcbl) * 10) / 10;
      }
      if (jtysr <= 400) {
        layer.msg('家庭月收入低于400，不符合贷款条件');
        return;
      }

      gjjdka = Math.min(Math.round((jtysr - 400) / r * 10000 * 10) / 10, 600000);
      gjjdkb = Math.round(gjjdka * xy * 10) / 10;
      gjjdkc = Math.round(fwzj * fwxz * 10) / 10;
      var total = Math.floor(Math.min(gjjdkb, gjjdkc)  * 10) / 10;

      var resultData = {
        zgdked : total,
        type   : 7
      }
      this.$emit('resultPanel',resultData);
      var zhugeObj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '月缴存额' : this.yjce,
        '缴存比例' : this.jcbl2,
        '配偶月缴' : this.poyj,
        '配偶缴存比例' : this.jcbl3,
        '房屋评估' : this.fwpg,
        '房屋性质' : this.fwxzType==1?'政策性住房':'其他',
        '贷款年限' : this.dknx,
        '信用等级' : this.xingji(this.xydjType)
      }
      this.zhugeIo(zhugeObj);
    },
    zhugeIo (dataObj){
      zhuge.track('提交公积金贷款额度查询',dataObj)
    },
    xingji (id){
      if(id == 1){
        return 'AAA级';
      } else if(id == 2){
        return 'AA级';
      } else{
        return '其他';
      }
    }
  }
}
</script>
<style>

</style>
