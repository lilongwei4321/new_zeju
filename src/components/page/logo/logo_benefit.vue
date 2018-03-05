<template>
  <div>
    <p class="transverse_center_center">
      <span>{{text}}</span>
      <img src="/static/assets/images/logo_back.png">
    </p>
  </div>
</template>

<script>
export default {
  props : {
    text : {
      type:String,
      default:''
    }
  }
}
</script>
<style lang="less" scoped>
p{
  position: relative;
  height: 100%;
  background: #FF3B30;
  color:#fff;
  padding:0 .7rem 0 .7rem;
  font-size:1.2rem;
  img{
    position: absolute;
    left: 0;
    top:0;
    width:.7rem;
    display: block;
  }
}
</style>
