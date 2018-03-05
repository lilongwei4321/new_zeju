<template>
  <!-- 房贷计算器 -->
  <div class="caculator">
    <header-text name = "房贷计算器"></header-text>
    <div class="big_box">
      <div class="fixedHead">
        <div id="nav">
          <a class="" v-for="(k,index) in btnArr" :key="k.id" :class="index == 0?'check':''" ref="btnName" @click="changeBtn(index,k)">{{ k.name }}</a>
        </div>
      </div>
      <fdjs-part v-if="part == 0" v-show="jieguoFlag" @resultPanel="testArr"></fdjs-part>
      <sfjs-part v-else-if="part == 1" v-show="jieguoFlag" @resultPanel="testArr"></sfjs-part>
      <tqhdjs-part v-else-if="part == 2" v-show="jieguoFlag" @resultPanel="testArr"></tqhdjs-part>
      <gjjdk-part v-else-if="part == 3" v-show="jieguoFlag" @resultPanel="testArr"></gjjdk-part>
      <gfnl-part v-else-if="part == 4" v-show="jieguoFlag" @resultPanel="testArr"></gfnl-part>
      <result-panel v-show="!jieguoFlag" :resultObj="resultData" @result="resultFunc"></result-panel>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';
//引用  公用头部
import headerText  from '@/components/base/header/header_text.vue';
import fdjsPart    from '@/views/tools/loanPart/fdjs/fdjs_part.vue';//房贷计算
import sfjsPart    from '@/views/tools/loanPart/sfjs/sfjs_part.vue';//税费计算
import tqhdjsPart  from '@/views/tools/loanPart/tqhdjs/tqhdjs_part.vue';//税费计算
import gjjdkPart   from '@/views/tools/loanPart/gjjdkedcx/gjjdkedcx_part.vue';//税费计算
import gfnlPart   from '@/views/tools/loanPart/gfnlpg/gfnlpg_part.vue';//税费计算
import resultPanel from '@/views/tools/loanPart/result.vue';//结果面板
export default {
  components : {
    headerText,
    fdjsPart,
    sfjsPart,
    tqhdjsPart,
    gjjdkPart,
    gfnlPart,
    resultPanel
  },
  data (){
    return {
      part : 0,
      alertFlag : true,
      jieguoFlag: true,
      resultData : {},
      btnArr : [
        {name: '房贷计算'},
        {name: '税费计算'},
        {name: '提前还贷计算'},
        {name: '公积金贷款额度查询'},
        {name: '购房能力评估'},
      ],
    }
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods: {
    //头部导航改变
    changeBtn (index,name){
      var btn = this.$refs['btnName'];
      for(let itme of btn){
        itme.classList.remove('check');
      }
      btn[index].classList.add('check');
      this.part = index;
      this.jieguoFlag = true;
      this.zhugeBury(name);
    },
    zhugeBury (name){
      var zhugeData = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具'
      }
      zhuge.track(`打开${name.name}页`,zhugeData);
    },
    testArr (obj){
      this.jieguoFlag = obj.jieguoFlag;
      this.resultData  = obj;
    },
    resultFunc (obj){
      this.jieguoFlag = obj;
    }
  },
  created (){
    //默认房贷计算器页
    let obj = {name : '房贷计算器'};
    this.zhugeBury(obj);
  }
}
</script>
<style lang="less" scoped>
.caculator{
  background: #F6F5F5;
  .big_box{
    .fixedHead{
      padding: 0 1.5rem;
      #nav{
        a{
          padding: 0;
          margin-right: 1.5rem;
        }
      }
    }
    
  }
}
</style>
