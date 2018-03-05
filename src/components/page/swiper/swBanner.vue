<!-- 首页  活动banner-->
<template>
  <swiper class="banner_box" :options="swiperOption"  ref="mySwiper" >
      <swiper-slide v-for="(m,ind) in arr" class="list swiper-slide" :key="ind" >
        <a :href="m.description" class="router back" :style="{'backgroundImage':`url(${m.img_url})`}">
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
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
      num : 0,
      swiperOption: {  
        pagination : '.swiper-pagination',
        loop:true,//自动切换
        slidesPerView: 1,//显示一个list
        autoplay  : 5000,//3秒切换
        speed     : 1000 ,//切换速度
        autoplayDisableOnInteraction : false, //用户操作，不会停止轮播
        onTouchEnd : () =>{
          this.num = this.num +1;
          if(this.num != 0){
            zhuge.track('划动焦点图', {
              '当前页面' : '首页',
              '所属模块' : '首页',
              '划动次数' : this.num
            });
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.banner_box{
  height: 20rem;
  .list{
    height: 100%;
    a{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="less" >
.banner_box{
  background:#fff;
  .swiper-pagination{
    bottom:1.6rem;
    .swiper-pagination-bullet{
      background: #fff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active{
      background:#f63;
    }
  }
}
</style>
