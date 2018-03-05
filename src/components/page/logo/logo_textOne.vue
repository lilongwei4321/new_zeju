<template>
  <div class="logo_box">
    <p v-if="obj.name!=''">
      <img :src="`/static/assets/images/${backFn(obj.name)}.png`" >
      <span :class="backFn(obj.name)">{{obj.name}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props : {
    obj : {
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  methods : {
    backFn (str) {
      switch (str) {
        case '品牌':
          return 'logo_back';
        break;
        case '特卖':
          return 'logo_back1';
        break;
        case '品牌':
          return 'logo_back2';
        break;
        case '在售':
          return 'logo_back4';
        break;
        case '待售':
          return 'logo_back3';
        break;
        default :
          return 'logo_back5';
      }
    }
  }
}
</script>
<style lang="less" scoped>
.logo_box{
  position: relative;
  width:100%;
  height: 100%;
  p{
    position: absolute;
    top:.6rem;
    left:-0.5rem;
    display: flex;
    height: 2.1rem;
    img{
      display: block;
      width:.5rem;
    }
    span{
      height: 1.6rem;
      color:#fff;
      font-size:1.1rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-right:.6rem;
      &.logo_back{
        background:#ff3b30;
      }
      &.logo_back1{
        background:#9b00f8;
      }
      &.logo_back2{
        background:#f51386;
      }
      &.logo_back3{
        background:#4a90e2;
      }
      &.logo_back4{
        background:#50e3c2;
      }
      &.logo_back5{
        background:#C0C0C0;
      }
    }
  }
}

</style>
