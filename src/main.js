// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {router} from './router';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueWechatTitle from 'vue-wechat-title'
import axios from 'axios';
import store from './store/index';
import obj from './directives/directive';
// import weizhi from './assets/javascripts/weizhi';
import zhuGe from './assets/javascripts/zhuGe';
import globalFn from './assets/javascripts/globalFn';

//获取zjfrom  ， 
globalFn.getCanShu('zjfrom');

//全局引用诸葛io，全局埋点
zhuGe.getAllCookie();
//创建 自定义指令
for (let i in obj){
  Vue.directive(i,obj[i])
}

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
/* eslint-disable no-new */
Vue.use(VueAwesomeSwiper);
Vue.use(VueWechatTitle)
var vm = new Vue({
  el: '#app',
  router,
  store ,
  template: '<App/>',
  components: { App }
})
  