import Vue from 'vue';
import Router from 'vue-router';
import globalFn from '@/assets/javascripts/globalFn';
const index           = resolve => require(['@/views/index/index.vue'], resolve);//首页
const box404          = resolve => require(['@/views/index/404.vue'], resolve);//404页

//顾问
const Adviser        = resolve => require(['@/views/adviser/adviser.vue'], resolve);//顾问列表
const adviserDetail  = resolve => require(['@/views/adviser/adviser_detail.vue'], resolve);//顾问详情
const adviserWu      = resolve => require(['@/views/adviser/adviser_wu.vue'], resolve);//暂无顾问
const evaluateList   = resolve => require(['@/views/adviser/evaluate/evaluate_list.vue'], resolve);//买房人评价
const serviceDynamics= resolve => require(['@/views/adviser/evaluate/dongtai_service.vue'], resolve);//服务动态


const login          = resolve => require(['@/views/home/login/login.vue'], resolve);//登录
const city           = resolve => require(['@/views/city/city.vue'], resolve);//城市


//楼盘
const loupan         = resolve => require(['@/views/loupan/loupan.vue'], resolve);//楼盘列表
const searcloupan    = resolve => require(['@/views/loupan/search_loupan.vue'], resolve);//搜索楼盘列表
const sale           = resolve => require(['@/views/loupan/sale.vue'], resolve);//特卖楼盘列表
const relatedLoupan    = resolve => require(['@/views/loupan/related_loupan.vue'], resolve);//相关 楼盘列表

const saleDetail     = resolve => require(['@/views/loupan/details/sale_detail.vue'], resolve);//特价楼盘详情
const loupanDetail   = resolve => require(['@/views/loupan/details/loupan_detail.vue'], resolve);//普通楼盘详情
const brandDetail    = resolve => require(['@/views/loupan/details/brand_detail.vue'], resolve);//品牌馆详情



const lunBo          = resolve => require(['@/components/page/swiper/swHuxing.vue'], resolve);//轮播图

//房贷计算器
const caculator      = resolve => require(['@/views/tools/loan_caculator.vue'], resolve);

//测试购房资格
const purchaseQualification = resolve => require(['@/views/tools/purchase_qualification.vue'], resolve);

//户型
const huxinglist     = resolve => require(['@/views/loupan/huxing/huxing.vue'], resolve);//户型列表

//点评
const comment        = resolve => require(['@/views/loupan/comment/comment.vue'], resolve);//点评列表
const writeComment   = resolve => require(['@/views/loupan/comment/write_comment.vue'], resolve);//写点评

//楼栋
const loudong        = resolve => require(['@/views/loupan/loudong/loudong_detail.vue'], resolve);
//详情楼栋搜索
const loudongSearch  = resolve => require(['@/views/loupan/loudong/loudong_search.vue'], resolve);

//一房一价
const price          = resolve => require(['@/views/loupan/price/price.vue'], resolve);

//地图
const mapDetail      = resolve => require(['@/views/loupan/map/map_detail.vue'],resolve);//位置及周边地图
const mapLookup      = resolve => require(['@/views/loupan/map/map_lookup.vue'],resolve);//地图找房

const mapPeitao      = resolve => require(['@/views/loupan/map/map_peitao.vue'], resolve);//位置及周边详情

//动态
const dongtai        = resolve => require(['@/views/loupan/dongtai/dongtai.vue'], resolve);//动态列表
const dongtaiDetail  = resolve => require(['@/views/loupan/dongtai/dongtai_detail.vue'], resolve);//动态详情页

//评测
const evaluate       = resolve => require(['@/views/loupan/evaluate/evaluate.vue'],resolve);
const evaluateDetail = resolve => require(['@/views/loupan/evaluate/evaluate_detail.vue'],resolve);

//故事
const story          = resolve => require(['@/views/loupan/story/story.vue'], resolve);//故事列表
const storyDetail    = resolve => require(['@/views/loupan/story/story_detail.vue'], resolve);//故事详情页

//特色频道
const feature        = resolve => require(['@/views/loupan/feature/feature.vue'], resolve);//特色频道列表
const featureDetail  = resolve => require(['@/views/loupan/feature/details/feature_detail.vue'], resolve);//特色频道详情

//我的
const user           = resolve => require(['@/views/home/user.vue'], resolve);//个人中心

//买到宝
const treasure       = resolve => require(['@/views/pay/treasure/treasure.vue'], resolve);//买到宝
const treasuresult    = resolve => require(['@/views/pay/treasure/state/treasuresult.vue'], resolve);//购买成功
const treasureWait    = resolve => require(['@/views/pay/treasure/state/treasureWait.vue'], resolve);//购买等待
//会员
const member         = resolve => require(['@/views/pay/member/member.vue'], resolve);//会员
const memberesult      = resolve => require(['@/views/pay/member/state/memberesult.vue'], resolve);//购买成功
const memberWait      = resolve => require(['@/views/pay/member/state/memberWait.vue'], resolve);//购买等待

//消息
const sms             = resolve => require(['@/views/home/sms/sms.vue'], resolve);//消息

//择居百科
const wiki            = resolve => require(['@/views/wiki/wiki.vue'], resolve);
const wikiList        = resolve => require(['@/views/wiki/wiki_list.vue'], resolve);
const wikiDetail      = resolve => require(['@/views/wiki/wiki_detail.vue'], resolve);

//我的成交
const myDeals         = resolve => require(['@/views/home/deals/my_deals.vue'], resolve);
//我的带看
const myAppointments  = resolve => require(['@/views/home/appointments/my_appointments.vue'], resolve);
//带看评价
const seeEvaluate     = resolve => require(['@/views/home/appointments/appointment_evaluate.vue'], resolve);
//我的足迹
const myBrowses       = resolve => require(['@/views/home/browses/my_browses.vue'], resolve);
//关注楼盘
const attentionLoupan = resolve => require(['@/views/home/attention/attention_loupans.vue'], resolve);
//楼盘比较
const evaluateLoupan  = resolve => require(['@/views/home/attention/evaluate_loupan.vue'], resolve);

Vue.use(Router);

let router = new Router({
  mode :'history',
  routes: [
    //登录
    {path: '/:city/login',name: '登录页',component: login},
    //楼盘相册轮播页
    { path: "/:city/loupan/pic_lunbo/:id",name:'楼盘相册页', component: lunBo },

    /*首页*/
    {path: '/:city',name: '首页',component: index,
      meta:{
        // title:'首页' // 标题设置在这里
      }
    },
    /*  选择城市页  */
    {path: '/:city/city',name: '选择城市页',component: city},


    /*楼盘 */
    //列表
    { path: '/:city/loupan/list/:name',name: '楼盘列表页',component: loupan},
    { path: '/:city/loupan/search/:name',name: '搜索楼盘页',component: searcloupan},
    { path: '/:city/loupan/sale/:id',name: '特卖列表页',component: sale},//特卖列表
    { path: '/:city/loupan/related_loupans/:loupan_id/:name',name: '相关楼盘列表页',component: relatedLoupan},//相关楼盘

    //详情
    { path: "/:city/loupan/loupan_detail/:id",name:'楼盘详情页', component: loupanDetail}, //普通楼盘详情
    { path: '/:city/loupan/brand/brand_detail/:id',name:'品牌馆详情页', component: brandDetail },//品牌馆详情
    { path: "/:city/loupan/sale/:id/sale_detail",name: '特卖详情页', component: saleDetail } ,//特卖详情

    //楼盘评测
    {path: '/:city/loupan/evaluate/:flag', name: '楼盘评测列表页',component: evaluate},
    {path: '/:city/loupan/evaluate/evaluate_detail/:id', name: '楼盘评测详情页',component: evaluateDetail},

    /* 动态 */
    {path: '/:city/loupan/dongtai/:loupan_id',name: '楼盘动态列表页',component: dongtai},
    {path: '/:city/loupan/:loupan_id/dynamics/:id',name: '楼盘动态详情页',component: dongtaiDetail},

    //房贷计算器
    {path: '/:city/tools/loan_caculator', name: '房贷计算器页', component: caculator},

    //购房资格测试
    {path: '/:city/tools/purchase_qualification', name: '测试购房资格页', component: purchaseQualification},

    //户型列表
    {path: '/:city/loupan/huxing/:id',name: '户型列表页',component: huxinglist},

    //点评
    {path: '/:city/loupan/comment/:id', name:'楼盘点评列表页', component: comment},//点评列表
    {path: '/:city/loupan/write_comment/:id', name:'楼盘写点评页', component: writeComment},//写点评

    //楼栋信息
    {path: '/:city/loupan/loudong/:id', name:'楼栋详情页', component: loudong},
    //楼栋信息筛选
    {path: '/:city/loupan/loudong/:id/search', name:'楼栋详情筛选页', component: loudongSearch},

    //一房一价
    {path: '/:city/loupan/price/:id', name:'一房一价详情页', component: price},
    
    //地图
    {path: '/:city/loupan/map_lookup', name:'地图找房页', component: mapLookup},//位置及周边
    {path: '/:city/loupan/map_detail/:id', name:'位置及周边地图页', component: mapDetail},//位置及周边
    {path: '/:city/loupan/map_peitao/:id', name:'位置及周边详情页', component: mapPeitao},//位置及周边配套

    /*  顾问  */
    {path: '/:city/advisor',name: '顾问列表页',component: Adviser},
    //顾问详情
    {path: '/:city/advisor/advisor_detail/:id',name: '顾问详情页',component: adviserDetail},
    //暂无顾问
    {path: '/:city/advisor/advisor_wu',name: '无专属顾问页',component: adviserWu},
    //顾问评价
    {path: '/:city/advisor/advisor_detail/:id/evaluate_list', name: '买房人评价列表页', component: evaluateList},
    //服务动态
    {path: '/:city/advisor/advisor_detail/:id/service_dynamics', name: '顾问动态列表页', component: serviceDynamics},


    
    
    /* 故事 */
    {path: '/:city/loupan/story/:id/:type',name: '故事列表页',component: story},
    {path: '/:city/loupan/story_detail/:id/',name: '故事详情页',component: storyDetail},

    /* 百科 */
    {path: '/:city/wiki', name: '百科首页', component: wiki},//百科
    {path: '/:city/wiki/wiki_list/:id', name: '百科列表页', component: wikiList},//百科列表
    {path: '/:city/wiki/wiki_detail/:id', name: '百科详情页', component: wikiDetail},//百科详情
    
    /* 特色频道 */
    {path: '/:city/loupan/feature',name: '特色频道列表页',component: feature},
    {path: '/:city/loupan/feature/feature_detail/:id',name: '特色频道详情页',component: featureDetail},

    /*  个人中心 */

    {path: '/:city/home/index',name: '个人中心首页',component: user},


    {path: '/:city/pay/mdb',name: '买到宝服务页',component: treasure},
    {path: '/:city/pay/mdbResult',name: '买到宝成功页',component: treasuresult},
    {path: '/:city/pay/mdbWait',name: '买到宝失败页',component: treasureWait},
    
    /* 购买会员 */
    {path: '/:city/pay/member',name: '会员服务页',component: member},
    {path: '/:city/pay/memberResult/:clazz/:id/:trade',name: '购买会员成功页',component: memberesult},
    {path: '/:city/pay/memberWait',name: '购买等待',component: memberWait},

    {path: '/:city/home/sms',name: '我的消息页',component: sms},
    {path: '/:city/home/my_deals', name: '我的成交页', component: myDeals},
    {path: '/:city/home/my_appointments', name: '我的带看页', component: myAppointments},
    {path: '/:city/home/appointments_evaluate/:id', name: '带看评价页', component: seeEvaluate},
    {path: '/:city/home/my_browses', name: '我的足迹页', component: myBrowses},
    {path: '/:city/home/attention_loupan', name:'关注楼盘页', component: attentionLoupan},
    {path: '/:city/home/evaluate_loupan/:id/:loupanid', name:'楼盘对比页', component: evaluateLoupan},


    
    {path: '*',name: '404页',component: box404},

  ],
  scrollBehavior (to, from, savedPosition) {
    // if (savedPosition) {
    //   return savedPosition
    // } else {
      return { x: 0, y: 0 }
    // }
  }
});
export {router};
//埋点
router.beforeEach((to, from, next) => {
    //如果name为null，引用cookie值
    let name = from.name!=null?from.name:globalFn.getCookieFn('sourcePage','用户直接输入');
    globalFn.setCookieFn('sourcePage',name);
    
    // window.document.title = to.meta.title;
    //执行
    next();
});