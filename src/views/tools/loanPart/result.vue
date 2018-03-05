<template>
  <div class="result">
    <!-- 房贷计算器 -->
    <div class="result_info" v-if="resultObj.type == 1">
      <h3>计算结果</h3>
      <p><span>首付</span>：<span class="red">{{ resultObj.sfk }}元</span></p>
      <p><span>每月月供</span>：<span class="red">{{ resultObj.yjhk }}元</span></p>
      <p><span>贷款总额</span>：<span>{{ resultObj.dkze }}元</span></p>
      <p><span>支付利息</span>：<span>{{ resultObj.zflx }}元</span></p>
      <p><span>还款总额</span>：<span>{{ resultObj.hkze }}元</span></p>
      <p><span>还款月数</span>：<span>{{ resultObj.dkys }}个月</span></p>
    </div>
    <div class="result_info" v-else-if="resultObj.type == 2">
      <h3>计算结果</h3>
      <p><span>每月月供</span>：<span class="red">{{ resultObj.yjhk }}元</span></p>
      <p><span>贷款总额</span>：<span>{{ resultObj.dkze }}元</span></p>
      <p><span>支付利息</span>：<span>{{ resultObj.zflx }}元</span></p>
      <p><span>还款总额</span>：<span>{{ resultObj.hkze }}元</span></p>
      <p><span>还款月数</span>：<span>{{ resultObj.dkys }}个月</span></p>
    </div>
    <div class="result_info" v-else-if="resultObj.type == 3">
      <h3>计算结果</h3>
      <p><span>首月月供</span>：<span class="red">{{ resultObj.yjhk }}元</span></p>
      <p><span>贷款总额</span>：<span>{{ resultObj.dkze }}元</span></p>
      <p><span>支付利息</span>：<span>{{ resultObj.zflx }}元</span></p>
      <p><span>还款总额</span>：<span>{{ resultObj.hkze }}元</span></p>
      <p><span>还款月数</span>：<span>{{ resultObj.dkys }}个月</span></p>
    </div>
    <div class="result_info" v-else-if="resultObj.type == 4">
      <h3>计算结果</h3>
      <p><span>首付</span>：<span class="red">{{ resultObj.sfk }}元</span></p>
      <p><span>首月月供</span>：<span class="red">{{ resultObj.yjhk }}元</span></p>
      <p><span>贷款总额</span>：<span>{{ resultObj.dkze }}元</span></p>
      <p><span>支付利息</span>：<span>{{ resultObj.zflx }}元</span></p>
      <p><span>还款总额</span>：<span>{{ resultObj.hkze }}元</span></p>
      <p><span>还款月数</span>：<span>{{ resultObj.dkys }}个月</span></p>
    </div>
    <!-- 税费计算器 -->
    <div class="result_info" v-else-if="resultObj.type == 5">
      <h3>计算结果</h3>
      <p><span>房款总额</span>：<span class="red">{{ resultObj.fkze }}元</span></p>
      <p><span>工本费</span>：<span>{{ resultObj.gbf }}元</span></p>
      <p><span>契税</span>：<span>{{ resultObj.qs }}元</span></p>
      <p><span>权属登记</span>：<span>{{ resultObj.qsdj }}元</span></p>
      <p><span>维修基金</span>：<span>{{ resultObj.wxjj }}元</span></p>
      <p><span>合计</span>：<span class="red">{{ resultObj.heji }}元</span></p>
    </div>
    <!-- 提前还贷计算 -->
    <div class="result_info" v-else-if="resultObj.type == 6">
      <h3>计算结果</h3>
      <p><span>原月还款</span>：<span class="red">{{ resultObj.yyhk }}元</span></p>
      <p><span>最后还款期</span>：<span>{{ resultObj.zhhkq }}</span></p>
      <p><span>已还款额</span>：<span>{{ resultObj.yhke }}元</span></p>
      <p><span>已还利息</span>：<span>{{ resultObj.yhlx }}元</span></p>
      <p><span>该月一次还款</span>：<span>{{ resultObj.gyhke }}元</span></p>
      <p><span>下月起月还款额</span>：<span>{{ resultObj.xyqyhke }}元</span></p>
      <p><span>节省利息</span>：<span>{{ resultObj.jslx }}元</span></p>
      <p><span>新还款期</span>：<span>{{ resultObj.xhkq }}</span></p>
    </div>
    <!-- 公积金贷款额度查询 -->
    <div class="result_info" v-else-if="resultObj.type == 7">
      <h3>计算结果</h3>
      <p><span class="bigSpan">您可以申请的最高贷款额度是</span>：<span class="red">{{ resultObj.zgdked }}元</span></p>
    </div>
    <!-- 购房能力评估 -->
    <div class="result_info" v-else-if="resultObj.type == 8">
      <h3>计算结果</h3>
      <p><span class="bigSpan">您可以购买的房屋总价为</span>：<span class="red">{{ resultObj.fwzj }}元</span></p>
      <p><span class="bigSpan">您可以购买的房屋单价为</span>：<span class="red">{{ resultObj.fwdj }}元/㎡</span></p>
    </div>
    <div class="notes">*以上结果仅供参考</div>
    <div class="fixed_btn_fdjs">
      <p class="transverse_center_center" @click="chongxin">重新计算</p>
    </div>
  </div>
</template>
<script>
export default {
  props :{
    resultObj :{
      type :Object,
      default :function(){
        return []
      }
    }
  },
  methods : {
    chongxin (){
      this.$emit('result',true)
    }
  }
}
</script>
<style lang="less" scoped>
  .result{
    background: #FFF;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    .result_info{
      padding: 9rem 1rem 0;
      h3{
        font-size: 1.6rem;
        color: #333;
        padding: 2rem 0 1.5rem;
      }
      p{
        color: #999;
        font-size: 1.4rem;
        display: flex;
        line-height: 1.5rem;
        span{
          &:first-child{
            width: 6rem;
            text-align:justify;
            text-align-last:justify;
            &:after{
              display:inline-block;
              overflow:hidden;
              width:100%;
              height:0;
              content:'';
              vertical-align:top;
            }
          }
          &:last-child{
            color: #151515;
          }
        }
        .red{
          color: #F63!important;
        }
        .bigSpan{
          width: auto!important;
        }
      }
    }
    .notes{
      width: 100%;
      height: 100%;
      color: #999;
      font-size: 1.2rem;
      background: #F6F5F5;
      padding: 1.5rem 1rem;
    }
    .fixed_btn_fdjs{
      p{
        margin-left: 0;
      }
    }
  }
</style>
