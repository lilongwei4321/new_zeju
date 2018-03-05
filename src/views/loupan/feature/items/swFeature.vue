<!-- 首页  特色频道-->
<template>
  <swiper class="feature_box" :options="swiperOption"  ref="mySwiper" >
      <swiper-slide v-for="(m,ind) in arr" class="list swiper-slide" :key="ind" >
        <router-link :to="`/${cityName}/loupan/feature/feature_detail/${m.id}`" class="router">
          <dl>
            <dt class="back" :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.img_url})`}"></dt>
            <dd >
              <h5 class="text_ove1">{{m.title}}</h5>
            </dd>
          </dl>
        </router-link>
      </swiper-slide>
  </swiper>
</template>
<script>
import {mapGetters} from 'vuex';
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
  computed : {...mapGetters(['cityName'])},
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      num : 0,
      swiperOption: {  
        slidesPerView: 2.8,//显示一个list
        spaceBetween: 8,
        onTouchEnd : () =>{
          this.num = this.num +1;
          if(this.num != 0){
            zhuge.track('划动特色频道', {
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
.feature_box{
  height: 12.5rem;
  .list{
    height: 100%;
    a{
      display: block;
      height: 100%;
      dl{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        dt{
          height: 9.6rem;
          width: 100%;
        }
        dd{
          width:100%;
          flex:1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          color:#333;
          padding:0 .4rem;
          box-sizing: border-box;
          h5{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
