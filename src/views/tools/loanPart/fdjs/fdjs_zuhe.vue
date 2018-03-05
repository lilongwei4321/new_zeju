<template>
  <div class="box">
    <ul>
      <li class="transverse_fen_center border">
        <div class="title">
          <span>商业贷款额度</span>
          <input type="number" placeholder="请输入商业贷款额度" v-model.number="datas.sydked">
          <span class="red">万元</span>
        </div>
      </li>
      <li class="transverse_fen_center border">
        <div class="title">
          <span>商贷利率</span>
          <span class="qing" :class="{'on':datas.sdllText!='请输入商贷利率'}" @click="clihide('sdllArr')">{{ datas.sdllText }}</span>
        </div>
        <i class="iconfont icon-jiantou2" v-show="datas.sdllText=='请输入商贷利率'" @click="clihide('sdllArr')"></i>
        <div class="shuilv" v-show="datas.sdllText!='请输入商贷利率'">
          <input type="number" v-model.number="datas.sdllNum">
          <span>%</span>
        </div>
      </li>
      <li class="transverse_fen_center border">
        <div class="title">
          <span>公积金贷款额</span>
          <input type="number" placeholder="请输入公积金贷款额" v-model.number="datas.gjjdked">
          <span class="red">万元</span>
        </div>
      </li>
      <li class="transverse_fen_center border">
        <div class="title">
          <span>公积金利率</span>
          <span class="qing" :class="{'on':datas.gjjllText!='请输入公积金利率'}" @click="clihide('gjjllArr')">{{ datas.gjjllText }}</span>
        </div>
        <i class="iconfont icon-jiantou2" v-show="datas.gjjllText=='请输入公积金利率'" @click="clihide('gjjllArr')"></i>
        <div class="shuilv" v-show="datas.gjjllText!='请输入公积金利率'">
          <input type="number" v-model.number="datas.gjjllNum">
          <span>%</span>
        </div>
      </li>
      <li class="transverse_fen_center border">
        <div class="title">
          <span>按揭年数</span>
          <span class="qing" :class="{'on':datas.ajnsText!='请选择按揭年数'}" @click="clihide('ajnsArr')">{{ datas.ajnsText }}</span>
        </div>
        <i class="iconfont icon-jiantou2" @click="clihide('ajnsArr')"></i>
      </li>
      <li class="transverse_fen_center border">
        <div class="title">
          <span>还款方式</span>
          <div class="hkfs transverse_fen_center">
            <p class="pt" v-for="(k,index) in dengArr" :key="index" ref="dengName" @click="dengFunc(k.value)" :class="datas.hkfsType == k.value?'cur':''">
              <i class="iconfont icon-duihao"></i>
              <span>{{ k.name }}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props : {
    datas : {
      type : Object,
      default: function(){
        return {}
      }
    }
  },
  data (){
    return {
      dengArr   : [
        {name: '等额本息', value: '1'},
        {name: '等额本金', value: '2'},
      ],
      sdllArr : [
        {name: '基准利率', value: '10', mark: 'sdllText'},
        {name: '7折', value: '7', mark: 'sdllText'},
        {name: '85折', value: '8.5', mark: 'sdllText'},
        {name: '88折', value: '8.8', mark: 'sdllText'},
        {name: '9折', value: '9', mark: 'sdllText'},
        {name: '95折', value: '9.5', mark: 'sdllText'},
        {name: '1.05倍', value: '10.5', mark: 'sdllText'},
        {name: '1.1倍', value: '11', mark: 'sdllText'},
        {name: '1.2倍', value: '12', mark: 'sdllText'},
        {name: '1.3倍', value: '13', mark: 'sdllText'}
      ],
      gjjllArr: [
        {name: '基准利率', value: '10', mark: 'gjjllText'},
        {name: '7折', value: '7', mark: 'gjjllText'},
        {name: '85折', value: '8.5', mark: 'gjjllText'},
        {name: '88折', value: '8.8', mark: 'gjjllText'},
        {name: '9折', value: '9', mark: 'gjjllText'},
        {name: '95折', value: '9.5', mark: 'gjjllText'},
        {name: '1.05倍', value: '10.5', mark: 'gjjllText'},
        {name: '1.1倍', value: '11', mark: 'gjjllText'},
        {name: '1.2倍', value: '12', mark: 'gjjllText'},
        {name: '1.3倍', value: '13', mark: 'gjjllText'}
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
      ]
    }
  },
  methods : {
    //点击出来弹框
    clihide (typeobj,name){
      var obj = {alertFalg : false,arr:this[typeobj]};
      this.$emit('zuhepart',obj);
    },
    dengFunc (index){
      var datas = {
        type : index,
        hkfs : 'hkfsText'
      }
      this.$emit('zuhepart',datas);
    }
  }
}
</script>
<style>

</style>