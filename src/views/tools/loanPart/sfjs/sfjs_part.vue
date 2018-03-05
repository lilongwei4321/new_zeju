<template>
  <div class="sfjs">
    <div class="boxfdjs">
      <div class="box">
        <ul>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>购买单价</span>
              <input type="number" placeholder="请输入购买单价" v-model.number="gmdj">
              <span class="red">元/平方米</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>房屋面积</span>
              <input type="number" placeholder="请输入购买单价" v-model.number="gfmj">
              <span class="red">平方米</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>首次购房</span>
              <div class="hkfs transverse_fen_center">
                <p class="pt" v-for="(k,index) in dengArr" :key="index" ref="dengName" @click="dengFunc(k.value)" :class="firstType == k.value?'cur':''">
                  <i class="iconfont icon-duihao"></i>
                  <span>{{ k.name }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="fixed_btn_fdjs border1 transverse_fen_center">
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
      wran : false,
      gmdj : '',
      gfmj : '',
      firstType : 1,
      dengArr   : [
        {name: '是', value: '1'},
        {name: '否', value: '2'},
      ],
    }
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods : {
    //点击出来弹框
    clihide (typeobj){
      var obj = {alertFalg : false,arr:this[typeobj]};
      this.$emit('hidepart',obj);
    },
    dengFunc (index){
      this.firstType = index;
    },
    //重置
    clearData (){
      this.gmdj = '';
      this.gfmj = '';
      var name = '清空税费计算内容';
      zhuGe.resetFangData(name);
    },
    //计算
    jisuan (){
      if(this.gmdj == '' || this.gfmj == ''){
        var that = this;
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }
      var fkzeTotal = this.gmdj * this.gfmj;
      var qsTotal;
      var wxjjTotal;
      var hejiTotal;
      //契税
      if(this.firstType == 2){
        qsTotal = fkzeTotal*0.03;
      } else{
        if(this.gfmj < 90){
          qsTotal = fkzeTotal*0.01;
        } else if(this.gfmj >=90 && this.gfmj < 140){
          qsTotal = fkzeTotal*0.015;
        } else{
          qsTotal = fkzeTotal*0.03;
        }
      }
      wxjjTotal = fkzeTotal*0.03;
      hejiTotal = 5 + 80 + qsTotal + wxjjTotal;

      var resultData = {
        fkze : fkzeTotal,
        gbf  : '5',
        qs   : qsTotal,
        qsdj : '80',
        wxjj : wxjjTotal,
        heji : hejiTotal,
        type : 5
      }
      this.$emit('resultPanel',resultData);
      let zhugeObj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '购买单价' : this.gmdj,
        '房屋面积' : this.gfmj,
        '首次购房' : this.firstType == 1?'是':'否'
      }
      this.zhugeIo(zhugeObj);
    },
    zhugeIo (dataObj){
      zhuge.track('提交税费计算',dataObj)
    }
  }
}
</script>
<style>

</style>
