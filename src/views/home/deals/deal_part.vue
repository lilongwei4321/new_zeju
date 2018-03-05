<template>
  <div class="deal_part">
    <ul>
      <li><label>手续日期：</label><span>{{dealPart.create_at}}</span></li>
      <li><label>签约楼号：</label><span>{{dealPart.situation}}</span></li>
      <li><label>成交户型：</label><span>{{dealPart.house_type}}</span></li>
      <li><label>成交面积：</label><span>{{dealPart.deal_area}}㎡</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props :{
    dealPart :{
      type: Object,
      default : function(){
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .deal_part{
    padding: 0 1rem;
    ul{
      padding: 1rem 0;
      li{
        line-height: 2rem;
        label{
          font-size: 1.4rem;
          color: #999;
        }
        span{
          font-size: 1.4rem;
          color: #151515;
        }
      }
    }
  }
</style>
