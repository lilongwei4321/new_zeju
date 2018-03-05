<template>
  <div class="tqhdjs">
    <div class="boxfdjs" v-show="alertFalg">
      <div class="box">
        <ul>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>持有资金</span>
              <input type="number" placeholder="包括现金、存款、有价值证券等总和" v-model.number="cyzj">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>家庭收入</span>
              <input type="number" placeholder="请输入家庭月收入" v-model.number="jtsr">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>固定支出</span>
              <input type="number" placeholder="请输入家庭每月固定支出" v-model.number="gdzc">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>贷款年限</span>
              <span class="qing" :class="{'on':dknxText!='请选择您期望偿还贷款的年限'}" @click="clihide('dknxArr')">{{ dknxText }}</span>
            </div>
            <i class="iconfont icon-jiantou2" @click="clihide('dknxArr')"></i>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>购房面积</span>
              <input type="number" placeholder="请输入您计划购买的房屋面积" v-model.number="gfmj">
              <span class="red">㎡</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <alert-part :totalArr="totalArr" :isFlag="!alertFalg" @increment="incrementTotal" ref="list"></alert-part>
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
      wran : false,
      alertFalg : true,
      cyzj : '',
      jtsr : '',
      gdzc : '',
      gfmj : '',
      totalArr : [],
      gfnxNum  : '',
      dknxText : '请选择您期望偿还贷款的年限',
      dknxArr  : [
        {name: '25年（300期）', value: '300', mark: 'dknxText'},
        {name: '24年（288期）', value: '288', mark: 'dknxText'},
        {name: '23年（276期）', value: '276', mark: 'dknxText'},
        {name: '22年（264期）', value: '264', mark: 'dknxText'},
        {name: '21年（252期）', value: '252', mark: 'dknxText'},
        {name: '20年（240期）', value: '240', mark: 'dknxText'},
        {name: '19年（228期）', value: '228', mark: 'dknxText'},
        {name: '18年（216期）', value: '216', mark: 'dknxText'},
        {name: '17年（204期）', value: '204', mark: 'dknxText'},
        {name: '16年（192期）', value: '192', mark: 'dknxText'},
        {name: '15年（180期）', value: '180', mark: 'dknxText'},
        {name: '14年（168期）', value: '168', mark: 'dknxText'},
        {name: '13年（156期）', value: '156', mark: 'dknxText'},
        {name: '12年（144期）', value: '144', mark: 'dknxText'},
        {name: '11年（132期）', value: '132', mark: 'dknxText'},
        {name: '10年（120期）', value: '120', mark: 'dknxText'},
        {name: '9年（108期）', value: '108', mark: 'dknxText'},
        {name: '8年（96期）', value: '96', mark: 'dknxText'},
        {name: '7年（84期）', value: '84', mark: 'dknxText'},
        {name: '6年（72期）', value: '72', mark: 'dknxText'},
        {name: '5年（60期）', value: '60', mark: 'dknxText'},
        {name: '4年（48期）', value: '48', mark: 'dknxText'},
        {name: '3年（36期）', value: '36', mark: 'dknxText'},
        {name: '2年（24期）', value: '24', mark: 'dknxText'},
        {name: '1年（12期）', value: '12', mark: 'dknxText'}
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
    incrementTotal (obj){
      if(obj.mark == 'dknxText'){
        this.gfnxNum = obj.value;
      }
      this.alertFalg = obj.alertFalg;
      this[obj.mark] = obj.name;
    },
    //重置
    clearData (){
      this.$refs['list'].clearData();//清空选中的数据
      this.cyzj = '';
      this.jtsr = '';
      this.gdzc = '';
      this.gfmj = '';
      this.totalArr = [];
      this.dknxText = '请选择您期望偿还贷款的年限';
      var name = '清空购房能力评估内容';
      zhuGe.resetFangData(name)
    },
    //计算
    jisuan (){
      var that = this;
      if(this.cyzj == '' || this.jtsr == '' || this.gdzc == '' || this.gfmj == '' || this.dknxText == '请选择您期望偿还贷款的年限'){
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }


      //购房能力计算
      var month = this.gfnxNum/12;
      var lilv  = 0.00576;
      if(month > 5){
        var lilv  = 0.00594;
      }
      var shengyu = this.jtsr*1 - this.gdzc*1;//收入减支出
      var lixi    = Math.pow(1 + lilv,this.gfnxNum)-1;//月利息
      var zonglixi  = lilv * Math.pow(1 + lilv,this.gfnxNum);
      var fwzjTotal = Math.round(shengyu * lixi / zonglixi + this.cyzj);
      var fwdjTotal = Math.round((shengyu * lixi / zonglixi + this.cyzj) / this.gfmj).toFixed(2);

      var resultData = {
        fwzj : fwzjTotal,
        fwdj : fwdjTotal,
        type : 8
      }
      this.$emit('resultPanel',resultData);
      var zhugeObj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '持有资金' : this.cyzj,
        '家庭收入' : this.jtsr,
        '固定支出' : this.gdzc,
        '贷款年限' : this.dknxText,
        '购房面积' : this.gfmj
      }
      this.zhugeIo(zhugeObj);
    },
    zhugeIo (dataObj){
      zhuge.track('计算购房能力评估',dataObj)
    },
  }
}
</script>
<style>

</style>
