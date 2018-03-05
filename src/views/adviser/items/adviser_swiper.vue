<template>
  <div class="guwen_main">
    <swiper :options="swiperOption"  ref="mySwiper"  class="column">
      <swiper-slide v-for="(m,key) in arr" :key="key">
        <dl class="guwen_list transverse_fen_ya">
          <dt>
            <router-link 
            :to="{path:`/${cityName}/advisor/advisor_detail/${m.id}`,query:{num:key+1}}"
            :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.portrait})`}" 
            class="back block">
            </router-link>
          </dt>
          <dd class="portrait_fen">
            <div class="title_box">
              <h4>{{m.name}}</h4>
              <!-- 星状态 -->
              <guwen-level :levelObj= "{level:m.star_level,num:5}"></guwen-level>
            </div>
            <div class="zili transverse_fen_center">
              <p>从业{{m.year}}年 | 最近带看{{m.recent_appoint_count}}次</p>
            </div>
            <!-- 理由 -->
            <div class="liyou">
              <span :class="'text_back'+(ind+1)" v-for="(item,ind) in m.lable" :key="ind">{{item}}</span>
            </div>
          </dd>
        </dl>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
//评星
import guwenLevel from '@/components/page/level/level.vue';
export default {
  name: 'Home',
  props : {
    arr : {
      type:Array,
      defalut : function(){
        return []
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
  components: {
    swiper,
    swiperSlide,
    guwenLevel
  },
  data () {
    return {
      num : 0,
      swiperOption: {
        notNextTick: true,  
        slidesPerView:2.1, 
        preventClicksPropagation:true,
        onTouchEnd : () =>{
          this.num = this.num +1;
          if(this.num != 0){
            //诸葛埋点
            this.zhugeBury();
          }
        }
      },
      zjfrom:'00'
    }
  },
  methods : {
     //诸葛埋点
    zhugeBury () {
      zhuge.track('滑动推荐顾问', {
        '当前页面' : this.$route.name,
        '所属模块' : '顾问',
        '滑动次数' : this.num
      });
    }
  }
}
</script>
<style lang="less" scoped>
.guwen_main{
  padding:0 1rem;
  .column{
    .guwen_list{
      width:100%;
      flex-direction: column;
      padding:1.5rem .8rem 1.5rem 0;
      box-sizing: border-box;
      dt{
        width:100%;
        height:19rem;
      }
      dd{
        flex:1;
        height:7rem;
        padding:.5rem 0;
        box-sizing: border-box;
        .title_box{
          display: flex;
          align-items: center;
          h4{
            font-size:1.4rem;
            color: #333;
          }
          p{
            display: flex;
            padding-left:1rem;
            align-items: center;
          }
        }
        .zili{
          margin-bottom: .4rem;
          p{
            font-size:1.2rem;
            color: #666;
          }
          a{
            display: block;
            color:#f63;
            font-size:1.8rem;
          }
        }
        .liyou{
          display: flex;
          span{
            height:1.8rem;
            margin-right:.5rem;
            padding:0 .6rem;
            display: flex;
            align-items: center;
            border-radius:1rem;
            font-size:1rem;
          }
        }
      }
    }
  }
}
</style>
