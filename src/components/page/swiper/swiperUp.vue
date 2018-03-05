<!-- 首页  楼盘详情 -->
<template>
  <swiper class="details_box" :options="swiperOption"  ref="mySwiper" >
      <swiper-slide v-for="(m,ind) in arr" class="list swiper-slide" :key="ind"  v-if="m.detail_url">
        <a :href="m.detail_url" class="router">
          <p class="daogou">{{m.tybe}}</p>
          <p class="text text_ove1">{{m.title}}</p>
        </a>
      </swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'Home',
  props : {
    arr : {
      type : Array,
      default :function(){
        return [];
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {  
        loop:true,//自动切换
        direction: 'vertical',//向上
        slidesPerView: 1,//显示一个list
        autoplay  : 3000,//3秒切换
        speed     : 1000 ,//切换速度
        autoplayDisableOnInteraction : false //用户操作，不会停止轮播
      }
    }
  }
}
</script>
<style lang="less" scoped>
.details_box{
  width:0;
  flex:1;
  height: 100%;
  .router{
    height: 100%;
    width:100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .daogou{
      font-size: 1.1rem;
      color: #FF3B30;
      padding-right:.5rem;
    }
    .text{
      font-size: 1.2rem;
      color: #333;
      flex:1;
      margin-right:1.5rem;
    }
  }
}
</style>
