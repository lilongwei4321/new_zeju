<template>
  <div id="app" class="app">
    <!-- <transition > -->
      <keep-alive>
        <router-view v-wechat-title='$route.meta.title'></router-view>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="less">
@import './assets/stylesheets/reset.css';
@import './common/icon/iconfont.css';
@import './common/ping/ping.css';
@import './assets/stylesheets/public.less';
@import "~swiper/dist/css/swiper.css";
</style>
