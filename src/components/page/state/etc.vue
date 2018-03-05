<template>
  <header class="header back transverse_mo_center_ya">
    <span>等待支付</span>
    <span>需付款：510元</span>
  </header>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
     
    }
  },
  methods : {
    
  }
}
</script>
<style lang="less" scoped>
.header{
  background-image:url(/static/assets/images/back1.png);
  height: 9rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding:0 1rem 1rem;
  span{
    color:#fff;
    &:first-child{
      font-size:2rem;
    }
    &:last-child{
      font-size: 1.4rem;
    }
  }
}
</style>
