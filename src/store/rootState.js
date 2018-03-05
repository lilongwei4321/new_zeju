//保存顶层的数据
import globalFn from '@/assets/javascripts/globalFn';
import api  from '@/api/api';
let str = (window.location.pathname.split('/'))[1],
    city = str!='' && str!='404'?str:'bj';
//获取当前城市，存到cookie
globalFn.setCookieFn('cityName',city);

const state = {
  msg    : '我是原始数据',
  //用户id
  customerId    : globalFn.getCookieFn('customerId'),
  //用户级别
  customerLevel : globalFn.getCookieFn('customerLevel',0),
  //当前城市 -- 缩写
  cityName      : city,
  //来源页面路径
  fromPath      : globalFn.getCookieFn('fromPath','/'),
  //专属顾问
  majorAdvisor  : globalFn.getCookieFn('majorAdvisor'),
  //用户手机号
  customerPhone : globalFn.getCookieFn('customerPhone'),
  //专属顾问
  advisorId     : globalFn.getCookieFn('advisorId')
}
export default state;