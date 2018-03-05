<template>
  <div class="zanwu">
    <header-city name="专属顾问"></header-city>
    <div class="content">
      <img src="/static/assets/images/rentou.png" alt="">
      <p>拨打免费电话，马上为您分配专属顾问</p>
      <a class="phone" href="javascripts:;" @click.prevent="phoneFn()">
        <i class="iconfont icon-dianhuaji"></i>
        <span>400-656-1188转0</span>
      </a>
    </div>
  </div>
</template>
<script>
//引用  公用头部
import headerCity  from '@/components/base/header/header_text.vue';
export default {
  components: {
    headerCity
  },
  watch :{
    '$route' (to){
      if(to.name == '无专属顾问页'){
        //诸葛  --- 打开埋点
        this.zhugeBury();
      }
    }
  },
  methods : {
    //诸葛  --- 打开埋点
    zhugeBury () {
      zhuge.track('打开专属顾问页', {
        '当前页面' : '专属顾问页',
        '所属模块' : '个人中心',
        '有无专属顾问' : '无'
      });
    },
    //拨打电话
    phoneFn () {
      zhuge.track('点击400', {
        '当前页面' : '专属顾问页 ',
        '所属模块' : '个人中心',
        '分机号类型' : '客服400'
      },() =>{
        window.location.href =`tel:4006561188,0`;
      });
    }
  },
  mounted () {
    //诸葛  --- 打开埋点
    this.zhugeBury();
  }
}
</script>
<style lang="less" scoped>
  .zanwu{
    padding-top: 4.5rem;
    .content{
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding: 0 1rem;
      img{
        padding: 4rem 0;
        width: 15rem;
      }
      p{
        font-size: 1.6rem;
        color: #333333;
        padding-bottom: 4rem;
      }
      .phone{
        background: #FF6633;
        border-radius: 2px;
        height: 4.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
        color: #FFFFFF;
        i{
          font-size: 2rem;
        }
        span{
          padding-left: 1rem;
        }
      }
    }
  }
</style>

