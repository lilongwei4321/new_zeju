<template>
<!-- 楼栋信息 -->
  <div class="loudong">
    <router-link :to="`/${cityName}/loupan/loudong/${id}`">
      <img src="/static/assets/images/itemdong.png" alt="">
    </router-link>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  props : {
    id : {
      type:Number,
      default:0
    }
  },
  computed : {...mapGetters(['cityName'])}
}
</script>
<style lang="less" scoped>
.loudong{
  img{
    width: 100%;
  }
}
</style>
