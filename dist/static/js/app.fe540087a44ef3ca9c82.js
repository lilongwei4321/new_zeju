webpackJsonp([54],{"4jvJ":function(t,n,e){"use strict";var a=e("3cXf"),o=e.n(a),i=e("hgh4"),u={levelMode:function(t){var n=i.a.getZjfrom(),e={"01":["付费推广","百度搜索M"],"06":["付费推广","百度搜索PC"],"09":["付费推广","百度直通车M"],"03":["付费推广","百度信息流M"],"02":["付费推广","百度DSP_M"],15:["付费推广","百度DSP_PC"],"07":["付费推广","360搜索PC"],12:["付费推广","搜狗搜索M"],13:["付费推广","搜狗搜索PC"],14:["付费推广","神马搜索M"],"04":["付费推广","一点资讯M"],"05":["付费推广","网易新闻M"],16:["自然流量","自然流量M"],"00":["自然流量","自然流量PC"],"08":["社群营销","618"],10:["渠道合作","淘宝房产"],11:["渠道合作","国美房产"],17:["付费推广","广点通"],18:["付费推广","智慧推"]};return e[n][t]},getAllCookie:function(){var t=i.a.getCanShu("tgjh"),n=i.a.getCanShu("tgdy"),e=i.a.getCanShu("tgsb"),a=i.a.getCanShu("tgcy"),o=i.a.getCanShu("gjc"),u=i.a.getCanShu("gjcppms"),r=i.a.getCanShu("gjcpm"),c=i.a.getCanShu("ggsc"),s=i.a.getCanShu("ggw"),l=i.a.getCanShu("pd"),p=i.a.getCanShu("xq"),h=i.a.getCanShu("xb"),f=i.a.getCanShu("nld"),d=i.a.getCookieFn("sourcePage"),m=i.a.getCookieFn("cityHanName");zhuge.setSuperProperty({"来源页面":d,"当前城市":m,"推广计划":t,"推广单元":n,"推广设备":e,"推广创意":a,"广告素材":c,"广告位":s,"广告频道":l,"点击关键词":o,"关键词排名":r,"关键词匹配模式":u,"定向人群 - 兴趣":p,"定向人群 - 性别":h,"定向人群 - 年龄段":f,"一级获客方式":"推广","二级获客方式":this.levelMode(0),"三级获客方式":this.levelMode(1)})},clickShaixuan:function(t){var n=this.getStyles(t),e=this.getNeiRong(t);if(""==n)return!1;zhuge.track("提交楼盘筛选",{"当前页面":t.thePage,"所属模块":"楼盘","筛选类型":n,"筛选内容":e})},getStyles:function(t){var n=[];if(t.area_ids.length>0&&n.push("区域"),t.prices.length>0&&n.push("价格"),t.room_counts.length>0&&n.push("房型"),"{}"!=o()(t.moreObj)){var e=t.moreObj;e.property_types.length>0&&n.push("类型"),e.labels.length>0&&n.push("特色"),""!=e.total_price[0].replace(/\s+/g,"")&&n.push("最低总价"),""!=e.total_price[1].replace(/\s+/g,"")&&n.push("最高总价"),""!=e.area[0].replace(/\s+/g,"")&&n.push("最小面积"),""!=e.area[1].replace(/\s+/g,"")&&n.push("最大面积")}return n.join(",")},getNeiRong:function(t){var n=[];if(t.area_ids.length>0&&n.push(t.area_ids.join(",")),t.prices.length>0&&n.push(t.prices.join(",")),t.room_counts.length>0&&n.push(t.room_counts.join(",")),"{}"!=o()(t.moreObj)){var e=t.moreObj;e.property_types.length>0&&n.push(e.property_types.join(",")),e.labels.length>0&&n.push(e.labels.join(",")),""!=e.total_price[0].replace(/\s+/g,"")&&n.push(e.total_price[0]+"万元"),""!=e.total_price[1].replace(/\s+/g,"")&&n.push(e.total_price[1]+"万元"),""!=e.area[0].replace(/\s+/g,"")&&n.push(e.area[0]+"㎡"),""!=e.area[1].replace(/\s+/g,"")&&n.push(e.area[1]+"㎡")}return n.join("|")},resetFangData:function(t){var n={"当前页面":"房贷计算器页","所属模块":"小工具"};zhuge.track(t,n)},theModular:function(t){switch(void 0!=t?t:i.a.getCookieFn("sourcePage")){case"首页":case"选择城市页":return"首页";case"顾问列表页":case"顾问详情页":case"买房人评价列表页":return"顾问";case"注册页":case"登录页":case"专属顾问页":case"关注楼盘页":case"我的带看页":case"我的成交页":case"我的消息页":case"我的足迹页":case"个人中心首页":return"个人中心";case"会员服务页":case"买到宝服务页":case"会员服务购买结果页":return"会员服务";case"一房一价页":case"搜索楼盘页":case"楼栋信息页":case"楼盘列表页":case"户型列表页":case"楼盘点评列表页":case"楼盘写点评页":case"楼盘相册页":case"楼盘详情页":case"特卖列表页":case"特卖详情页":case"看房记录页":case"品牌馆列表页":case"品牌馆详情页":case"开发商详情页":case"楼盘动态列表页":case"楼盘动态详情页":case"相关楼盘列表页":case"楼盘评测列表页":case"楼盘评测详情页":case"特卖楼盘列表页":case"特色频道列表页":case"特色频道详情页":case"位置及周边地图页":case"位置及周边详情页":case"顾问买房人评价页":return"楼盘";case"故事列表页":case"故事详情页":return"择居故事";case"百科首页":case"百科列表页":case"百科详情页":return"择居百科";case"房贷计算器页":return"小工具";case"活动页":return"活动"}}};n.a=u},ADBz:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"swiper-container"},[t._t("parallax-bg"),t._v(" "),e("div",{class:t.defaultSwiperClasses.wrapperClass},[t._t("default")],2),t._v(" "),t._t("pagination"),t._v(" "),t._t("button-prev"),t._v(" "),t._t("button-next"),t._v(" "),t._t("scrollbar")],2)},o=[],i={render:a,staticRenderFns:o};n.a=i},"BdG/":function(t,n,e){"use strict";n.a={name:"swiper-slide",data:function(){return{slideClass:"swiper-slide"}},ready:function(){this.update()},mounted:function(){this.update(),this.$parent.options.slideClass&&(this.slideClass=this.$parent.options.slideClass)},updated:function(){this.update()},attached:function(){this.update()},methods:{update:function(){this.$parent&&this.$parent.swiper&&this.$parent.swiper.update&&(this.$parent.swiper.update(!0),this.$parent.options.loop&&this.$parent.swiper.reLoop())}}}},I522:function(t,n,e){"use strict";var a="undefined"!=typeof window;a&&(window.Swiper=e("Bnvi")),n.a={name:"swiper",props:{options:{type:Object,default:function(){return{autoplay:3500}}},notNextTick:{type:Boolean,default:function(){return!1}}},data:function(){return{defaultSwiperClasses:{wrapperClass:"swiper-wrapper"}}},ready:function(){!this.swiper&&a&&(this.swiper=new Swiper(this.$el,this.options))},mounted:function(){var t=this,n=function(){if(!t.swiper&&a){delete t.options.notNextTick;var n=!1;for(var e in t.defaultSwiperClasses)t.defaultSwiperClasses.hasOwnProperty(e)&&t.options[e]&&(n=!0,t.defaultSwiperClasses[e]=t.options[e]);var o=function(){t.swiper=new Swiper(t.$el,t.options)};n?t.$nextTick(o):o()}}(this.options.notNextTick||this.notNextTick)?n():this.$nextTick(n)},updated:function(){this.swiper&&this.swiper.update()},beforeDestroy:function(){this.swiper&&(this.swiper.destroy(),delete this.swiper)}}},IcnI:function(t,n,e){"use strict";var a=e("VCXJ"),o=e("9rMa"),i=e("mUbh"),u=e("ukYY"),r=e("UjVw"),c=e("ZLrO");a.a.use(o.a);var s=new o.a.Store({state:c.a,getters:r,actions:i,mutations:u});n.a=s},J9r4:function(t,n,e){"use strict";var a=(e("qM1Q"),{Focus:{inserted:function(t){t.focus()}},SrcollsShow:{bind:function(t,n){function e(){var e=window.scrollY,a=t.offsetTop;e>50&&0!=e?n.value.headerFn(!0):n.value.headerFn(!1),e>a-110&&0!=e?n.value.navigationFn(!0):n.value.navigationFn(!1)}window.addEventListener("scroll",e),window.addEventListener("touchmove",e)}},Srcolls:{inserted:function(t,n){function e(){var e=window.pageYOffset,a=t.offsetTop;t.className=e>a?n.value.cls+" "+n.value.cls1:n.value.cls;var e=window.pageYOffset,a=t.offsetTop;t.className=e>a?n.value.cls+" "+n.value.cls1:n.value.cls}window.addEventListener("scroll",e),window.addEventListener("touchmove",e)}},LoadMore:{inserted:function(t,n){function e(){var t=window.pageYOffset,e=document.body.clientHeight||document.documentElement.offsetHeight;t+window.screen.availHeight>=e-10&&0!=t?n.value(!0):n.value(!1)}window.addEventListener("scroll",e),window.addEventListener("touchmove",e)}},ScrollMove:{inserted:function(t,n){var e=0,a=0,o=0;t.addEventListener("touchstart",function(n){var a=n.targetTouches[0];e=a.pageY,o=t.scrollTop}),t.addEventListener("touchmove",function(){var n=event.targetTouches[0];a=n.pageY,t.scrollTop=o-(a-e)})}},ScrollDetail:{inserted:function(t,n){function e(t,n,e){var o=document.querySelectorAll(".public_detail"),i=document.getElementById("header_icon"),u=document.getElementById("fixedHead");if(void 0!=o&&void 0!=i&&void 0!=u)for(var r=i.offsetHeight,c=u.offsetHeight,s=r+c,l=0;l<o.length;l++){if(t+s<=o[l].offsetTop-20)return a(l-1,n,!1),e.value(l-2),!1;t+s<=o[l].offsetTop+o[l].offsetHeight&&l==o.length-1&&(a(l-1,n,!0),e.value(l-1))}}function a(t,n,e){if(t<=0)return!1;var a=0,o=document.getElementById("nav"),i=window.innerWidth-30,u=o.scrollLeft;n?(a=document.querySelectorAll("#nav a")[t].offsetLeft,e?o.scrollLeft=a+document.querySelectorAll("#nav a")[t].offsetWidth:a>i+u&&(o.scrollLeft=a-i)):(a=document.querySelectorAll("#nav a")[t-1].offsetLeft)-u<30&&(o.scrollLeft=u-(u-a))}var o=0,i=!0,u=0,r=0,c=0;window.addEventListener("touchstart",function(t){var n=t.targetTouches[0];o=n.pageY,r=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset}),window.addEventListener("scroll",function(){c=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset,i=r<=c,e(c,i,n)}),window.addEventListener("touchmove",function(){var t=event.targetTouches[0];u=t.pageY,c=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset,i=o>=u,e(c,i,n)})}}});n.a=a},M93x:function(t,n,e){"use strict";function a(t){e("xH9w")}var o=e("s15m"),i=e("r1do"),u=e("X4nt"),r=a,c=u(o.a,i.a,!1,r,null,null);n.a=c.exports},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("VCXJ"),o=e("M93x"),i=e("YaEn"),u=e("41jX"),r=e.n(u),c=e("HLLT"),s=e.n(c),l=e("BMa3"),p=e.n(l),h=e("IcnI"),f=e("J9r4"),d=e("4jvJ");e("hgh4").a.getCanShu("zjfrom"),d.a.getAllCookie();for(var m in f.a)a.a.directive(m,f.a[m]);a.a.config.productionTip=!1,a.a.prototype.$http=p.a,a.a.use(r.a),a.a.use(s.a);new a.a({el:"#app",router:i.a,store:h.a,template:"<App/>",components:{App:o.a}})},P9l9:function(t,n,e){"use strict";var a=e("T452");n.a={gitSendVcode:function(t,n){return e.i(a.a)("http://service.zeju.com/vcode",t,"get")},getLoginJson:function(t){return e.i(a.a)("login",t,"post")},getBanners:function(t){return e.i(a.a)("banners",t,"get")},getCity:function(t){return e.i(a.a)("cities",t,"get")},gitCityName:function(t,n){return e.i(a.a)("cities/"+n,t,"get")},getRegionList:function(t){return e.i(a.a)("cities/districts",t,"get")},getPriceJson:function(t){return e.i(a.a)("home/conditions",t,"get")},getLoupanList:function(t){return e.i(a.a)("loupans",t,"get")},getLoupanDetail:function(t,n){return e.i(a.a)("loupans/"+n,t,"get")},getHuxingData:function(t,n){return e.i(a.a)("loupans/"+n+"/huxings",t,"get")},getImgList:function(t,n){return e.i(a.a)("loupans/"+n+"/photos",t,"get")},getBanData:function(t){return e.i(a.a)("loupan_buildings",t,"get")},getBanList:function(t){return e.i(a.a)("loupan_houses",t,"get")},getAroundsJson:function(t,n){return e.i(a.a)("/loupans/"+n+"/arounds",t,"get")},gitsamePriceData:function(t,n){return e.i(a.a)("loupans/"+n+"/prices",t,"get")},getHuxingJson:function(t,n){return e.i(a.a)("/loupans/"+n+"/house_types",t,"get")},getFavoritesJson:function(t){return e.i(a.a)("/favorites",t,"post")},gitSpecialData:function(t,n){return e.i(a.a)("loupans/"+n+"/maidaobao",t,"get")},gitHomeTemai:function(t){return e.i(a.a)("items/temai",t,"get")},getAdviserList:function(t){return e.i(a.a)("advisors",t,"get")},getAdviserDetail:function(t,n){return e.i(a.a)("advisors/"+n,t,"get")},getAdviserPhone:function(t,n){return e.i(a.a)("advisors/"+n+"/phone",t,"get")},getAdviserEval:function(t,n){return e.i(a.a)("advisors/"+n+"/evals",t,"get")},getAdviserDong:function(t,n){return e.i(a.a)("advisors/"+n+"/appointments",t,"get")},getStoryList:function(t){return e.i(a.a)("stories",t,"get")},getStoryDetail:function(t,n){return e.i(a.a)("stories/"+n,t,"get")},getIndexBaike:function(t){return e.i(a.a)("wikis",t,"get")},getWikiList:function(t){return e.i(a.a)("wikis/main_category",t,"get")},getWikiFenList:function(t){return e.i(a.a)("wikis/sub_category",t,"get")},getWikiDetail:function(t,n){return e.i(a.a)("wikis/"+n,t,"get")},getEvaluateJson:function(t){return e.i(a.a)("loupan_evaluations",t,"get")},getEvaluatedetJson:function(t,n){return e.i(a.a)("loupan_evaluations/"+n,t,"get")},getDongtaiJson:function(t,n){return e.i(a.a)("/loupans/"+n+"/dynamics",t,"get")},getDongtaidetJson:function(t,n,o){return e.i(a.a)("/loupans/"+o+"/dynamics/"+n,t,"get")},getYfyjData:function(t,n){return e.i(a.a)("loupans/"+n+"/yifangyijia",t,"get")},getLoupanData:function(t,n){return e.i(a.a)("loupans/"+n+"/location",t,"get")},getMapLoupan:function(t){return e.i(a.a)("loupans/house_map",t,"get")},getXejuTuijian:function(t){return e.i(a.a)("recommends",t,"get")},getReciSearch:function(t){return e.i(a.a)("loupans/hot_words",t,"get")},uploadImage:function(t){return e.i(a.a)("http://img.zeju.cn/zejuimg/img/upload",t,"post")},gitCommentData:function(t,n){return e.i(a.a)("loupans/"+n+"/customer_comments",t,"get")},writeComment:function(t){return e.i(a.a)("loupan_customer_comments",t,"post")},gitTeseChannel:function(t){return e.i(a.a)("loupan_channels",t,"get")},gitTeseChannelDetail:function(t,n){return e.i(a.a)("loupan_channels/"+n,t,"get")},getAlipay:function(t){return e.i(a.a)("alipay",t,"post")},getWeixinAlipay:function(t){return e.i(a.a)("wechat",t,"post")},getZhifuChaxun:function(t){return e.i(a.a)("pay_result",t,"get")},gerdealJson:function(t,n){return e.i(a.a)("customers/"+n+"/deals",t,"get")},getAttentJson:function(t){return e.i(a.a)("customers",t,"get")},removeAttentionJson:function(t,n){return e.i(a.a)("customers/"+n+"/cancel_favorites",t,"get")},getEvaluateDuibiJson:function(t){return e.i(a.a)("loupans/compares",t,"get")},getAppointJson:function(t,n){return e.i(a.a)("customers/"+n+"/appointments",t,"get")},daikanEvaluateJson:function(t,n){return e.i(a.a)("customers/"+n+"/appoint_eval",t,"get")},tijiaoEvaluateJson:function(t){return e.i(a.a)("new_appointment_eval",t,"post")},getTreasureJson:function(t,n){return e.i(a.a)("customers/"+n+"/loupan_mdb_orders",t,"get")},getUserJson:function(t,n){return e.i(a.a)("customers/"+n+"/my_counts",t,"get")},getBrowsesJson:function(t,n){return e.i(a.a)("customers/"+n+"/footprints",t,"get")},getSmsJson:function(t,n){return e.i(a.a)("customers/"+n+"/informations",t,"get")},getYuecheJson:function(t){return e.i(a.a)("liuzi",t,"post")},getCityJson:function(t){return e.i(a.a)("cities/qualification",t,"get")},getQuestionsData:function(t){return e.i(a.a)("ziges/questions",t,"get")},getAnswerJson:function(t){return e.i(a.a)("ziges/answers",t,"get")},getResultsJson:function(t){return e.i(a.a)("ziges/results",t,"get")}}},T452:function(t,n,e){"use strict";function a(t,n,e){return new i.a(function(a,o){"post"==e?r.a.post(t,n).then(function(t){a(t.data)},function(t){o(t)}).catch(function(t){o(t)}):r.a.get(t,{params:n}).then(function(t){a(t.data)},function(t){o(t)}).catch(function(t){o(t)})})}n.a=a;var o=e("rVsN"),i=e.n(o),u=e("BMa3"),r=e.n(u),c=e("DEjr");e.n(c);r.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8",r.a.defaults.baseURL="http://webapi2.zeju.com/"},UGy7:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("BdG/"),o=e("l3e1"),i=e("X4nt"),u=i(a.a,o.a,!1,null,null,null);n.default=u.exports},UjVw:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"msg",function(){return a}),e.d(n,"customerId",function(){return o}),e.d(n,"customerLevel",function(){return i}),e.d(n,"cityName",function(){return u}),e.d(n,"fromPath",function(){return r}),e.d(n,"majorAdvisor",function(){return c}),e.d(n,"customerPhone",function(){return s}),e.d(n,"advisorId",function(){return l});var a=function(t){return t.msg},o=function(t){return t.customerId},i=function(t){return t.customerLevel},u=function(t){return t.cityName},r=function(t){return t.fromPath},c=function(t){return t.majorAdvisor},s=function(t){return t.customerPhone},l=function(t){return t.advisorId}},YaEn:function(t,n,e){"use strict";e.d(n,"a",function(){return it});var a=e("VCXJ"),o=e("cigS"),i=e("hgh4"),u=function(t){return e.e(3).then(function(){var n=[e("JXTs")];t.apply(null,n)}.bind(this)).catch(e.oe)},r=function(t){return e.e(48).then(function(){var n=[e("HPw/")];t.apply(null,n)}.bind(this)).catch(e.oe)},c=function(t){return e.e(32).then(function(){var n=[e("IlA3")];t.apply(null,n)}.bind(this)).catch(e.oe)},s=function(t){return e.e(26).then(function(){var n=[e("5xnI")];t.apply(null,n)}.bind(this)).catch(e.oe)},l=function(t){return e.e(50).then(function(){var n=[e("Jjq1")];t.apply(null,n)}.bind(this)).catch(e.oe)},p=function(t){return e.e(31).then(function(){var n=[e("IqEO")];t.apply(null,n)}.bind(this)).catch(e.oe)},h=function(t){return e.e(35).then(function(){var n=[e("rJov")];t.apply(null,n)}.bind(this)).catch(e.oe)},f=function(t){return e.e(46).then(function(){var n=[e("aHtC")];t.apply(null,n)}.bind(this)).catch(e.oe)},d=function(t){return e.e(49).then(function(){var n=[e("Y1/b")];t.apply(null,n)}.bind(this)).catch(e.oe)},m=function(t){return e.e(7).then(function(){var n=[e("zysJ")];t.apply(null,n)}.bind(this)).catch(e.oe)},g=function(t){return e.e(51).then(function(){var n=[e("ToUz")];t.apply(null,n)}.bind(this)).catch(e.oe)},v=function(t){return e.e(29).then(function(){var n=[e("l6vY")];t.apply(null,n)}.bind(this)).catch(e.oe)},y=function(t){return e.e(4).then(function(){var n=[e("rl6T")];t.apply(null,n)}.bind(this)).catch(e.oe)},w=function(t){return e.e(2).then(function(){var n=[e("WugV")];t.apply(null,n)}.bind(this)).catch(e.oe)},b=function(t){return e.e(0).then(function(){var n=[e("aa9/")];t.apply(null,n)}.bind(this)).catch(e.oe)},_=function(t){return e.e(1).then(function(){var n=[e("7lwP")];t.apply(null,n)}.bind(this)).catch(e.oe)},C=function(t){return e.e(52).then(function(){var n=[e("dH3/")];t.apply(null,n)}.bind(this)).catch(e.oe)},k=function(t){return e.e(5).then(function(){var n=[e("ZdhG")];t.apply(null,n)}.bind(this)).catch(e.oe)},S=function(t){return e.e(44).then(function(){var n=[e("JY40")];t.apply(null,n)}.bind(this)).catch(e.oe)},j=function(t){return e.e(14).then(function(){var n=[e("XVPK")];t.apply(null,n)}.bind(this)).catch(e.oe)},T=function(t){return e.e(6).then(function(){var n=[e("Hu5t")];t.apply(null,n)}.bind(this)).catch(e.oe)},L=function(t){return e.e(41).then(function(){var n=[e("BoK2")];t.apply(null,n)}.bind(this)).catch(e.oe)},J=function(t){return e.e(12).then(function(){var n=[e("QcQs")];t.apply(null,n)}.bind(this)).catch(e.oe)},F=function(t){return e.e(24).then(function(){var n=[e("OBpZ")];t.apply(null,n)}.bind(this)).catch(e.oe)},x=function(t){return e.e(43).then(function(){var n=[e("hq2h")];t.apply(null,n)}.bind(this)).catch(e.oe)},P=function(t){return e.e(45).then(function(){var n=[e("z9Aw")];t.apply(null,n)}.bind(this)).catch(e.oe)},E=function(t){return e.e(27).then(function(){var n=[e("Xlms")];t.apply(null,n)}.bind(this)).catch(e.oe)},M=function(t){return e.e(39).then(function(){var n=[e("HYuy")];t.apply(null,n)}.bind(this)).catch(e.oe)},A=function(t){return e.e(11).then(function(){var n=[e("od+m")];t.apply(null,n)}.bind(this)).catch(e.oe)},D=function(t){return e.e(18).then(function(){var n=[e("lQX7")];t.apply(null,n)}.bind(this)).catch(e.oe)},I=function(t){return e.e(10).then(function(){var n=[e("9dlY")];t.apply(null,n)}.bind(this)).catch(e.oe)},Y=function(t){return e.e(16).then(function(){var n=[e("bgqV")];t.apply(null,n)}.bind(this)).catch(e.oe)},z=function(t){return e.e(8).then(function(){var n=[e("dgUf")];t.apply(null,n)}.bind(this)).catch(e.oe)},N=function(t){return e.e(17).then(function(){var n=[e("Jagw")];t.apply(null,n)}.bind(this)).catch(e.oe)},O=function(t){return e.e(9).then(function(){var n=[e("T0sn")];t.apply(null,n)}.bind(this)).catch(e.oe)},B=function(t){return e.e(15).then(function(){var n=[e("WFvm")];t.apply(null,n)}.bind(this)).catch(e.oe)},H=function(t){return e.e(42).then(function(){var n=[e("4hZa")];t.apply(null,n)}.bind(this)).catch(e.oe)},$=function(t){return e.e(47).then(function(){var n=[e("nsT2")];t.apply(null,n)}.bind(this)).catch(e.oe)},R=function(t){return e.e(25).then(function(){var n=[e("dtCe")];t.apply(null,n)}.bind(this)).catch(e.oe)},U=function(t){return e.e(20).then(function(){var n=[e("mQB2")];t.apply(null,n)}.bind(this)).catch(e.oe)},q=function(t){return e.e(36).then(function(){var n=[e("NaZb")];t.apply(null,n)}.bind(this)).catch(e.oe)},X=function(t){return e.e(33).then(function(){var n=[e("xyuN")];t.apply(null,n)}.bind(this)).catch(e.oe)},V=function(t){return e.e(21).then(function(){var n=[e("i2zh")];t.apply(null,n)}.bind(this)).catch(e.oe)},Q=function(t){return e.e(40).then(function(){var n=[e("VrwF")];t.apply(null,n)}.bind(this)).catch(e.oe)},W=function(t){return e.e(37).then(function(){var n=[e("lewB")];t.apply(null,n)}.bind(this)).catch(e.oe)},Z=function(t){return e.e(34).then(function(){var n=[e("2r/i")];t.apply(null,n)}.bind(this)).catch(e.oe)},G=function(t){return e.e(13).then(function(){var n=[e("ooyc")];t.apply(null,n)}.bind(this)).catch(e.oe)},K=function(t){return e.e(30).then(function(){var n=[e("1o6c")];t.apply(null,n)}.bind(this)).catch(e.oe)},tt=function(t){return e.e(19).then(function(){var n=[e("+rVn")];t.apply(null,n)}.bind(this)).catch(e.oe)},nt=function(t){return e.e(23).then(function(){var n=[e("ZbFG")];t.apply(null,n)}.bind(this)).catch(e.oe)},et=function(t){return e.e(22).then(function(){var n=[e("xIfP")];t.apply(null,n)}.bind(this)).catch(e.oe)},at=function(t){return e.e(28).then(function(){var n=[e("cM+L")];t.apply(null,n)}.bind(this)).catch(e.oe)},ot=function(t){return e.e(38).then(function(){var n=[e("JJ+E")];t.apply(null,n)}.bind(this)).catch(e.oe)};a.a.use(o.a);var it=new o.a({mode:"history",routes:[{path:"/:city/login",name:"登录页",component:f},{path:"/:city/loupan/pic_lunbo/:id",name:"楼盘相册页",component:C},{path:"/:city",name:"首页",component:u,meta:{}},{path:"/:city/city",name:"选择城市页",component:d},{path:"/:city/loupan/list/:name",name:"楼盘列表页",component:m},{path:"/:city/loupan/search/:name",name:"搜索楼盘页",component:g},{path:"/:city/loupan/sale/:id",name:"特卖列表页",component:v},{path:"/:city/loupan/related_loupans/:loupan_id/:name",name:"相关楼盘列表页",component:y},{path:"/:city/loupan/loupan_detail/:id",name:"楼盘详情页",component:b},{path:"/:city/loupan/brand/brand_detail/:id",name:"品牌馆详情页",component:_},{path:"/:city/loupan/sale/:id/sale_detail",name:"特卖详情页",component:w},{path:"/:city/loupan/evaluate/:flag",name:"楼盘评测列表页",component:I},{path:"/:city/loupan/evaluate/evaluate_detail/:id",name:"楼盘评测详情页",component:Y},{path:"/:city/loupan/dongtai/:loupan_id",name:"楼盘动态列表页",component:A},{path:"/:city/loupan/:loupan_id/dynamics/:id",name:"楼盘动态详情页",component:D},{path:"/:city/tools/loan_caculator",name:"房贷计算器页",component:k},{path:"/:city/tools/purchase_qualification",name:"测试购房资格页",component:S},{path:"/:city/loupan/huxing/:id",name:"户型列表页",component:j},{path:"/:city/loupan/comment/:id",name:"楼盘点评列表页",component:T},{path:"/:city/loupan/write_comment/:id",name:"楼盘写点评页",component:L},{path:"/:city/loupan/loudong/:id",name:"楼栋详情页",component:J},{path:"/:city/loupan/loudong/:id/search",name:"楼栋详情筛选页",component:F},{path:"/:city/loupan/price/:id",name:"一房一价详情页",component:x},{path:"/:city/loupan/map_lookup",name:"地图找房页",component:E},{path:"/:city/loupan/map_detail/:id",name:"位置及周边地图页",component:P},{path:"/:city/loupan/map_peitao/:id",name:"位置及周边详情页",component:M},{path:"/:city/advisor",name:"顾问列表页",component:c},{path:"/:city/advisor/advisor_detail/:id",name:"顾问详情页",component:s},{path:"/:city/advisor/advisor_wu",name:"无专属顾问页",component:l},{path:"/:city/advisor/advisor_detail/:id/evaluate_list",name:"买房人评价列表页",component:p},{path:"/:city/advisor/advisor_detail/:id/service_dynamics",name:"顾问动态列表页",component:h},{path:"/:city/loupan/story/:id/:type",name:"故事列表页",component:z},{path:"/:city/loupan/story_detail/:id/",name:"故事详情页",component:N},{path:"/:city/wiki",name:"百科首页",component:W},{path:"/:city/wiki/wiki_list/:id",name:"百科列表页",component:Z},{path:"/:city/wiki/wiki_detail/:id",name:"百科详情页",component:G},{path:"/:city/loupan/feature",name:"特色频道列表页",component:O},{path:"/:city/loupan/feature/feature_detail/:id",name:"特色频道详情页",component:B},{path:"/:city/home/index",name:"个人中心首页",component:H},{path:"/:city/pay/mdb",name:"买到宝服务页",component:$},{path:"/:city/pay/mdbResult",name:"买到宝成功页",component:R},{path:"/:city/pay/mdbWait",name:"买到宝失败页",component:U},{path:"/:city/pay/member",name:"会员服务页",component:q},{path:"/:city/pay/memberResult/:clazz/:id/:trade",name:"购买会员成功页",component:X},{path:"/:city/pay/memberWait",name:"购买等待",component:V},{path:"/:city/home/sms",name:"我的消息页",component:Q},{path:"/:city/home/my_deals",name:"我的成交页",component:K},{path:"/:city/home/my_appointments",name:"我的带看页",component:tt},{path:"/:city/home/appointments_evaluate/:id",name:"带看评价页",component:nt},{path:"/:city/home/my_browses",name:"我的足迹页",component:et},{path:"/:city/home/attention_loupan",name:"关注楼盘页",component:at},{path:"/:city/home/evaluate_loupan/:id/:loupanid",name:"楼盘对比页",component:ot},{path:"*",name:"404页",component:r}],scrollBehavior:function(t,n,e){return{x:0,y:0}}});it.beforeEach(function(t,n,e){var a=null!=n.name?n.name:i.a.getCookieFn("sourcePage","用户直接输入");i.a.setCookieFn("sourcePage",a),e()})},ZLrO:function(t,n,e){"use strict";var a=e("hgh4"),o=(e("P9l9"),window.location.pathname.split("/")[1]),i=""!=o&&"404"!=o?o:"bj";a.a.setCookieFn("cityName",i);var u={msg:"我是原始数据",customerId:a.a.getCookieFn("customerId"),customerLevel:a.a.getCookieFn("customerLevel",0),cityName:i,fromPath:a.a.getCookieFn("fromPath","/"),majorAdvisor:a.a.getCookieFn("majorAdvisor"),customerPhone:a.a.getCookieFn("customerPhone"),advisorId:a.a.getCookieFn("advisorId")};n.a=u},hgh4:function(t,n,e){"use strict";var a={getQueryString:function(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(n);try{return decodeURI(e[2])}catch(t){try{return $URL.decode(e[2])}catch(t){return null}}},getCookieFn:function(t,n){var e,a=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(a))?decodeURI(e[2]):null!=n?n:null},setCookieFn:function(t,n,e){var a=new Date;a.setTime(a.getTime()+864e8),document.cookie=t+"="+encodeURI(n)+";expires="+a.toGMTString()+";domain = zeju.com;path=/"},delCookieFn:function(t){var n=new Date;n.setTime(n.getTime()-1);var e=this.getCookieFn(t);null!=e&&(document.cookie=t+"="+e+";expires="+n.toGMTString()+";domain = zeju.com;path=/")},getCanShu:function(t,n){var e=null!=this.getQueryString(t)?this.getQueryString(t):this.getCookieFn(t);return null!=this.getQueryString(t)&&this.setCookieFn(t,this.getQueryString(t)),null!=e?e:null!=n?n:""},setNumLing:function(t){return Number(t)<10?"0"+t:t},getZjfrom:function(){var t=this.getCookieFn("zjfrom","0");return t=this.setNumLing(t)}};n.a=a},l3e1:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",{class:t.slideClass},[t._t("default")],2)},o=[],i={render:a,staticRenderFns:o};n.a=i},mUbh:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"fun",function(){return a}),e.d(n,"setCookieFn",function(){return o}),e.d(n,"delCookieFn",function(){return i});var a=function(t){(0,t.commit)({type:"getMsg",msg:"我是修改后的数据..."})},o=function(t,n){(0,t.commit)({type:"setCookie",name:n[0],num:n[1]})},i=function(t,n){(0,t.commit)({type:"delCookie",name:n[0],num:n[1]})}},r1do:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"app",attrs:{id:"app"}},[e("keep-alive",[e("router-view",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:t.$route.meta.title,expression:"$route.meta.title"}]})],1)],1)},o=[],i={render:a,staticRenderFns:o};n.a=i},s15m:function(t,n,e){"use strict";n.a={name:"app"}},syvT:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("I522"),o=e("ADBz"),i=e("X4nt"),u=i(a.a,o.a,!1,null,null,null);n.default=u.exports},ukYY:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"getMsg",function(){return o}),e.d(n,"setCookie",function(){return i}),e.d(n,"delCookie",function(){return u});var a=e("hgh4"),o=function(t,n){t.msg=n.msg},i=function(t,n){a.a.setCookieFn(n.name,n.num),t[n.name]=n.num},u=function(t,n){a.a.delCookieFn(n.name),t[n.name]=n.num}},xH9w:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.fe540087a44ef3ca9c82.js.map