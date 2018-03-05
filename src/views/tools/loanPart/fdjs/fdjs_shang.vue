<template>
  <div>
    <div class="box">
      <ul>
        <li class="transverse_fen_center border">
          <div class="title">
            <span>计算方式</span>
            <span class="qing" :class="{'on':obj.jsfsText != '请选择计算方式'}" @click="clihide('jsfsArr')" :v-model="obj.jsfsType">{{ obj.jsfsText }}</span>
          </div>
          <i class="iconfont icon-jiantou2" @click="clihide('jsfsArr')"></i>
        </li>
        <li class="transverse_fen_center border" v-show="obj.jsfsText != '根据贷款总额计算'">
          <div class="title">
            <span>购买单价</span>
            <input type="number" placeholder="请输入购买单价" v-model.number="obj.gmdj">
            <span class="red">元/平方米</span>
          </div>
        </li>
        <li class="transverse_fen_center border" v-show="obj.jsfsText != '根据贷款总额计算'">
          <div class="title">
            <span>房屋面积</span>
            <input type="number" placeholder="请输入房屋面积" v-model.number="obj.gfmj">
            <span class="red">平方米</span>
          </div>
        </li>
        <li class="transverse_fen_center border" v-show="obj.jsfsText != '根据贷款总额计算'">
          <div class="title">
            <span>按揭成数</span>
            <span class="qing" :class="{'on':obj.ajcsText!='请选择按揭成数'}" @click="clihide('ajcsArr')">{{ obj.ajcsText }}</span>
          </div>
          <i class="iconfont icon-jiantou2" @click="clihide('ajcsArr')"></i>
        </li>
        <li class="transverse_fen_center border" v-show="obj.jsfsText == '根据贷款总额计算'">
          <div class="title">
            <span>贷款总额</span>
            <input type="text" placeholder="请输入贷款总额" v-model="obj.dkze">
            <span class="red">万元</span>
          </div>
        </li>
        <li class="transverse_fen_center border">
          <div class="title">
            <span>按揭年数</span>
            <span class="qing" :class="{'on':obj.ajnsText!='请选择按揭年数'}" @click="clihide('ajnsArr')">{{ obj.ajnsText }}</span>
          </div>
          <i class="iconfont icon-jiantou2" @click="clihide('ajnsArr')"></i>
        </li>
        <li class="transverse_fen_center border">
          <div class="title">
            <span>贷款利率</span>
            <span class="qing" :class="{'on':obj.dkllText!='请选择基准利率'}" @click="clihide('dkllArr')">{{ obj.dkllText }}</span>
          </div>
          <i class="iconfont icon-jiantou2" v-show="obj.dkllText=='请选择基准利率'" @click="clihide('dkllArr')"></i>
          <div class="shuilv" v-show="obj.dkllText!='请选择基准利率'">
            <input type="number" v-model.number="obj.lilvNum">
            <span>%</span>
          </div>
        </li>
        <li class="transverse_fen_center border">
          <div class="title">
            <span>还款方式</span>
            <div class="hkfs transverse_fen_center">
              <p class="pt" v-for="(k,index) in dengArr" :key="index" ref="dengName" @click="dengFunc(k.value)" :class="obj.hkfsType == k.value?'cur':''">
                <i class="iconfont icon-duihao"></i>
                <span>{{ k.name }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props : {
    obj : {
      type : Object,
      default: function(){
        return {}
      }
    }
  },
  data (){
    return {
      totalArr  : [],
      alertFalg : true,
      sdlvFlag  : true,
      gjjllFlag : true,
      anjiecsNum: '',
      arr       : [],
      dengArr   : [
        {name: '等额本息', value: '1'},
        {name: '等额本金', value: '2'},
      ],
      jsfsArr : [
        {name: '根据面积、单价计算', value: '1', mark: 'jsfsText'},
        {name: '根据贷款总额计算', value: '2', mark: 'jsfsText'},
      ],
      ajcsArr : [
        {name: '8成', value: '0.8', mark: 'ajcsText'},
        {name: '7.5成', value: '0.75', mark: 'ajcsText'},
        {name: '7成', value: '0.7', mark: 'ajcsText'},
        {name: '6.5成', value: '0.65', mark: 'ajcsText'},
        {name: '6成', value: '0.6', mark: 'ajcsText'},
        {name: '5.5成', value: '0.55', mark: 'ajcsText'},
        {name: '5成', value: '0.5', mark: 'ajcsText'},
        {name: '4.5成', value: '0.45', mark: 'ajcsText'},
        {name: '4成', value: '0.4', mark: 'ajcsText'},
        {name: '3.5成', value: '0.35', mark: 'ajcsText'},
        {name: '3成', value: '0.3', mark: 'ajcsText'},
        {name: '2.5成', value: '0.25', mark: 'ajcsText'},
        {name: '2成', value: '0.2', mark: 'ajcsText'},
      ],
      ajnsArr : [
        {name: '25年（300期）', value: '300', mark: 'ajnsText'},
        {name: '24年（288期）', value: '288', mark: 'ajnsText'},
        {name: '23年（276期）', value: '276', mark: 'ajnsText'},
        {name: '22年（264期）', value: '264', mark: 'ajnsText'},
        {name: '21年（252期）', value: '252', mark: 'ajnsText'},
        {name: '20年（240期）', value: '240', mark: 'ajnsText'},
        {name: '19年（228期）', value: '228', mark: 'ajnsText'},
        {name: '18年（216期）', value: '216', mark: 'ajnsText'},
        {name: '17年（204期）', value: '204', mark: 'ajnsText'},
        {name: '16年（192期）', value: '192', mark: 'ajnsText'},
        {name: '15年（180期）', value: '180', mark: 'ajnsText'},
        {name: '14年（168期）', value: '168', mark: 'ajnsText'},
        {name: '13年（156期）', value: '156', mark: 'ajnsText'},
        {name: '12年（144期）', value: '144', mark: 'ajnsText'},
        {name: '11年（132期）', value: '132', mark: 'ajnsText'},
        {name: '10年（120期）', value: '120', mark: 'ajnsText'},
        {name: '9年（108期）', value: '108', mark: 'ajnsText'},
        {name: '8年（96期）', value: '96', mark: 'ajnsText'},
        {name: '7年（84期）', value: '84', mark: 'ajnsText'},
        {name: '6年（72期）', value: '72', mark: 'ajnsText'},
        {name: '5年（60期）', value: '60', mark: 'ajnsText'},
        {name: '4年（48期）', value: '48', mark: 'ajnsText'},
        {name: '3年（36期）', value: '36', mark: 'ajnsText'},
        {name: '2年（24期）', value: '24', mark: 'ajnsText'},
        {name: '1年（12期）', value: '12', mark: 'ajnsText'},
      ],
      dkllArr : [
        {name: '基准利率', value: '10', mark: 'dkllText'},
        {name: '7折', value: '7', mark: 'dkllText'},
        {name: '85折', value: '8.5', mark: 'dkllText'},
        {name: '88折', value: '8.8', mark: 'dkllText'},
        {name: '9折', value: '9', mark: 'dkllText'},
        {name: '95折', value: '9.5', mark: 'dkllText'},
        {name: '1.05倍', value: '10.5', mark: 'dkllText'},
        {name: '1.1倍', value: '11', mark: 'dkllText'},
        {name: '1.2倍', value: '12', mark: 'dkllText'},
        {name: '1.3倍', value: '13', mark: 'dkllText'},
      ]
    }
  },
  methods : {
    //点击出来弹框
    clihide (typeobj){
      var obj = {alertFalg : false,arr:this[typeobj]};
      this.$emit('hidepart',obj);
    },
    dengFunc (index){
      var obj = {
        type : index,
        hkfs : 'hkfsText'
      }
      this.$emit('hidepart',obj);
    },
  }
}
</script>
<style>

</style>
