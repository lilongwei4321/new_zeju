<!-- 首页  楼盘详情 -->
<template>
  <swiper class="details_box" :options="swiperOption"  ref="mySwiper" >
      <swiper-slide v-for="(m,ind) in arr" class="list swiper-slide" :key="ind">
        <item-list :temaiData="m" :num="ind+1"></item-list>
      </swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
//引用布局
import itemList from '@/components/base/items/item_list_usual.vue';
export default {
  name: 'Home',
  props : {
    arr : {
      type : Array,
      default : function(){return []}
    }
  },
  components: {
    swiper,
    swiperSlide,
    itemList
  },
  data () {
    return {
      num : 0,
      swiperOption: {  
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
        notNextTick: true,  
        direction: 'horizontal',
        slidesPerView: 1.1, 
        centeredSlides : true,
        initialSlide :0, //第几张显示
        preventClicksPropagation:true,
        grabCursor:true, //小手
        effect:"coverflow", //3d
        coverflow: {
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
        onTouchEnd : () =>{
          this.num = this.num +1;
          if(this.num != 0){
            zhuge.track('滑动首页精选楼盘', {
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
.details_box{
  .list{
    margin-bottom: 2rem;
  }
}
</style>
