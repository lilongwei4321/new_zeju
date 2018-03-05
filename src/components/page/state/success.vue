<template>
  <section class="state_box portrait_fen_center_ya kuai_box">
    <i class="iconfont " :class="async ? 'icon-dui':'icon-cuo'"></i>
    <h6>{{async ? "支付成功" : "支付失败"}}</h6>
    <p>我们将第一时间为您服务，帮您抢到称心好房！</p>
  </section>
</template>

<script>
export default {
  props : {
    async : {
      type : Boolean,
      default : false
    }
  }
}
</script>
<style lang="less" scoped>
.state_box{
  height: 25rem;
  justify-content: flex-end;
  padding-bottom:1.5rem;
  i{
    display: block;
    color: #f63;
    font-size:12rem;
  }
  h6{
    font-size:2rem;
    color:#666;
    padding:.6rem 0 2rem;
  }
  p{
    color:#888;
    font-size:1.4rem;
  }
}
</style>
