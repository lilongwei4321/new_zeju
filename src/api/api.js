import {fetch} from './config.js';
export default {
  //发送验证码
  gitSendVcode (params,id) {return fetch(`http://service.zeju.com/vcode`, params,'get')},
  //登录
  getLoginJson (params) {return fetch('login', params,'post')},
  //首页焦点图
  getBanners (params) {return fetch('banners', params,'get')} ,

  //城市列表
  getCity (params) {return fetch('cities', params,'get')} ,
  //获取城市name
  gitCityName (params,name) {return fetch(`cities/${name}`, params,'get')},

  /*  楼盘  */

  //获取楼盘列表 -- 下拉菜单区域筛选条件
  getRegionList (params) {return fetch('cities/districts', params,'get')} ,
  //价格下拉筛选
  getPriceJson (params) {return fetch(`home/conditions`,params, 'get')},
  //获取楼盘列表 -- 楼盘数据
  getLoupanList (params) {return fetch('loupans', params,'get')} ,

  //获取楼盘详情 -- 普通
  getLoupanDetail (params,id) {return fetch(`loupans/${id}`, params,'get')} ,

  //获取楼盘户型列表
  getHuxingData (params,id) {return fetch(`loupans/${id}/huxings`, params,'get')} ,
  //获取轮播--imgs
  getImgList (params,id) {return fetch(`loupans/${id}/photos`, params,'get')} ,

  //楼栋信息首页
  getBanData (params) {return fetch('loupan_buildings', params,'get')},
  //楼栋信息列表
  getBanList (params) {return fetch('loupan_houses', params,'get')},
  //周边楼盘
  getAroundsJson (params,id) {return fetch(`/loupans/${id}/arounds`, params, 'get')},
  //同价位楼盘
  gitsamePriceData (params,id) {return fetch(`loupans/${id}/prices`, params,'get')},
  //楼盘详情户型图
  getHuxingJson (params,id) {return fetch(`/loupans/${id}/house_types`,params,'get')},
  //楼盘收藏
  getFavoritesJson (params) {return fetch(`/favorites`, params,'post')},
  //特卖，买到宝，推荐类的特殊 楼盘详情
  gitSpecialData (params,id) {return fetch(`loupans/${id}/maidaobao`, params,'get')},
  //获取首页特卖
  gitHomeTemai (params) {return fetch(`items/temai`, params,'get')},

  /*  顾问  */

  //顾问列表
  getAdviserList (params) {return fetch(`advisors`, params,'get')} ,
  //顾问详情
  getAdviserDetail (params,id) {return fetch(`advisors/${id}`, params,'get')},
  //专属顾问手机号
  getAdviserPhone (params,id) {return fetch(`advisors/${id}/phone`, params,'get')},
  
  //顾问 -- 评价列表
  getAdviserEval (params,id) {return fetch(`advisors/${id}/evals`, params,'get')},
  //顾问 -- 动态列表
  getAdviserDong (params,id) {return fetch(`advisors/${id}/appointments`, params,'get')},

   /*  故事  */
  //故事列表
  getStoryList (params) {return fetch(`stories`, params,'get')} ,
  //故事详情
  getStoryDetail (params,id) {return fetch(`stories/${id}`, params,'get')} ,
  

   /*  百科  */
  //首页百科
  getIndexBaike (params) {return fetch(`wikis`, params,'get')},
  //百科列表
  getWikiList (params) {return fetch(`wikis/main_category`, params,'get')} ,
  //百科分类列表
  getWikiFenList (params) {return fetch(`wikis/sub_category`, params,'get')} ,
  //百科详情
  getWikiDetail (params,id) {return fetch(`wikis/${id}`, params,'get')} ,

  //评测
  getEvaluateJson(params) {return fetch(`loupan_evaluations`, params,'get')},
  getEvaluatedetJson(params,id) {return fetch(`loupan_evaluations/${id}`, params,'get')},
  
  //楼盘动态
  getDongtaiJson(params,id) {return fetch(`/loupans/${id}/dynamics`, params,'get')},
  getDongtaidetJson(params,id,loupan_id) {return fetch(`/loupans/${loupan_id}/dynamics/${id}`, params, 'get')},

  
  //一房一价
  getYfyjData (params,id) {return fetch(`loupans/${id}/yifangyijia`, params,'get')},
  //百度地图，获取楼盘基本信息
  getLoupanData (params,id) {return fetch(`loupans/${id}/location`, params,'get')},
  //地图找房
  getMapLoupan (params) {return fetch(`loupans/house_map`, params,'get')},


  
  //择居推荐
  getXejuTuijian (params) {return fetch(`recommends`, params,'get')},
  //热词接口
  getReciSearch (params) {return fetch(`loupans/hot_words`, params,'get')},


  
  //上传图片接口
  uploadImage (params) {return fetch(`http://img.zeju.cn/zejuimg/img/upload`, params,'post')},


  //点评
  gitCommentData (params,id) {return fetch(`loupans/${id}/customer_comments`, params,'get')},
  //写点评
  writeComment (params) {return fetch(`loupan_customer_comments`, params,'post')},


  //特色频道
  gitTeseChannel (params) {return fetch(`loupan_channels`, params,'get')},
  //特色频道详情
  gitTeseChannelDetail (params,id) {return fetch(`loupan_channels/${id}`, params,'get')},



  
  //支付宝请求接口
  getAlipay (params) {return fetch(`alipay`, params,'post')},
  //微信请求接口
  getWeixinAlipay (params) {return fetch(`wechat`, params,'post')},
  //支付结果查询
  getZhifuChaxun (params) {return fetch(`pay_result`, params,'get')},

  /*个人中心*/
  //我的成交
  gerdealJson (params,id) {return fetch(`customers/${id}/deals`,params,'get')},
  //我的关注
  getAttentJson (params) {return fetch(`customers`,params,'get')},
  //删除关注楼盘
  removeAttentionJson (params,id) {return fetch(`customers/${id}/cancel_favorites`,params,'get')},
  //关注楼盘对比
  getEvaluateDuibiJson (params) {return fetch(`loupans/compares`,params,'get')},
  //我的带看
  getAppointJson (params,id) {return fetch(`customers/${id}/appointments`,params,'get')},
  //带看详情
  daikanEvaluateJson (params,id) {return fetch(`customers/${id}/appoint_eval`,params,'get')},
  //提交带看评论
  tijiaoEvaluateJson (params) {return fetch(`new_appointment_eval`,params,'post')},
  //买到宝列表
  getTreasureJson (params,id) {return fetch(`customers/${id}/loupan_mdb_orders`,params,'get')},
  //个人中心列表
  getUserJson (params,id) {return fetch(`customers/${id}/my_counts`,params,'get')},
  //我的足迹
  getBrowsesJson (params,id) {return fetch(`customers/${id}/footprints`,params,'get')},
  //我的消息
  getSmsJson (params,id) {return fetch(`customers/${id}/informations`,params,'get')},
  //约车
  getYuecheJson (params) {return fetch(`liuzi`,params,'post')},
  /* 购房资格能力评估*/
  //测试城市
  getCityJson (params) {return fetch(`cities/qualification`,params,'get')},
  //问题
  getQuestionsData (params) {return fetch(`ziges/questions`,params,'get')},
  //答案
  getAnswerJson (params) {return fetch(`ziges/answers`,params,'get')},
  //请求综合结果
  getResultsJson (params) {return fetch(`ziges/results`,params,'get')}
}
