webpackJsonp([52],{"/a/u":function(n,e){e.f=Object.getOwnPropertySymbols},"1GTc":function(n,e,t){var a=t("MITN");a(a.S+a.F,"Object",{assign:t("nBsG")})},"4YfN":function(n,e,t){"use strict";e.__esModule=!0;var a=t("aA9S"),i=function(n){return n&&n.__esModule?n:{default:n}}(a);e.default=i.default||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])}return n}},C6Tu:function(n,e,t){"use strict";var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"lunbo"},[t("div",{staticClass:"header transverse_fen_center"},[t("a",{staticClass:"iconfont icon-jiantou4 goback",attrs:{href:"javascript:;",onclick:"window.history.go(-1)"}}),n._v(" "),t("p",{staticClass:"title"},[t("span",[n._v(n._s(n.btnText))]),n._v(" "),t("span",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})]),n._v(" "),n.phoneType?n._e():t("a",{staticClass:"download iconfont icon-xiazai",attrs:{href:"http://imgs.zeju.cn"+n.url,download:"图片.jpg"}})]),n._v(" "),t("swiper",{ref:"mySwiper",staticClass:"img_box",attrs:{options:n.swiperOption}},n._l(n.arr,function(n,e){return t("swiper-slide",{key:e},[t("img",{attrs:{src:"http://imgs.zeju.cn"+n.pic_file}})])})),n._v(" "),t("footer",{staticClass:"footer box_duo",class:{width:n.btnArr.length<=3}},n._l(n.btnArr,function(e,a){return t("p",{key:a,class:{on:n.btnText==e},on:{click:function(e){n.slideFn(a)}}},[t("span",{staticClass:"transverse_center_center"},[n._v(n._s(e))])])}))],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},"K0/C":function(n,e){e.f={}.propertyIsEnumerable},NRGc:function(n,e,t){"use strict";var a=t("4YfN"),i=t.n(a),o=t("P9l9"),r=t("9rMa"),A=t("41jX");t.n(A);e.a={data:function(){var n=this;return{arr:[],num:0,swiperOption:{notNextTick:!0,pagination:".swiper-pagination",paginationType:"custom",observer:!0,observeParents:!0,effect:"coverflow",centeredSlides:!0,onSlideChangeStart:function(e){n.url=n.arr[e.activeIndex].pic_file},paginationCustomRender:function(e,t,a){for(var i=1,o=0,r=0,A=0;A<n.numArr.length;A++)A<=n.numArrInd&&(r+=n.numArr[A]);return t>r&&0!=r?n.numArrInd++:0!=n.numArrInd&&t==r-n.numArr[n.numArrInd]&&n.numArrInd--,n.numArrInd>0?(o=n.numArr[n.numArrInd],i=t-r+o):(i=t,o=n.numArr[0]),n.btnText=n.btnArr[n.numArrInd],void 0==o&&(o=0),i+" / "+o},onTouchEnd:function(){n.num=n.num+1,0!=n.num&&n.zhugeHua()},slidesPerView:1.1,coverflow:{rotate:50,stretch:10,depth:100,modifier:1,slideShadows:!0}},url:"",numArr:[],numArrInd:0,btnText:"",btnArr:[],phoneType:!1,obj:{}}},components:{swiper:A.swiper,swiperSlide:A.swiperSlide},watch:{$route:function(n,e){"楼盘相册页"==n.name&&(this.btnArr=[],this.getImgList())}},computed:i()({},t.i(r.b)(["cityName"])),methods:{getImgList:function(){var n=this,e=this.$route.params.id;o.a.getImgList({},e).then(function(e){200==e.status?(n.arr=e.data.photos,n.url=n.arr[0].pic_file,n.numArr=e.data.count,n.obj=e.data.loupan,n.zhugeBury(),n.arr.map(function(e,t){-1==n.btnArr.indexOf(e.pic_type_name)&&n.btnArr.push(e.pic_type_name)}),n.btnText=n.btnArr[0]):422==e.status&&n.$router.push("/"+n.cityName+"/404")})},slideFn:function(n){this.numArrInd=n;for(var e=0,t=0;t<this.numArr.length;t++)t<this.numArrInd&&(e+=this.numArr[t]);this.$refs.mySwiper.swiper.slideTo(e,1e3,!1)},getPhoneType:function(){var n=navigator.userAgent,e=!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);this.phoneType=e},zhugeBury:function(){zhuge.track("打开楼盘相册页",{"当前页面":"楼盘相册页","所属模块":"楼盘","楼盘ID":this.obj.item_id,"楼盘名称":this.obj.item_name})},zhugeHua:function(){zhuge.track("滑动楼盘相册页",{"当前页面":"楼盘相册页","所属模块":"楼盘","楼盘ID":this.obj.item_id,"楼盘名称":this.obj.item_name,"相册类型":this.btnText,"划动次数":this.num})}},mounted:function(){this.getImgList(),this.getPhoneType()}}},YwFF:function(n,e,t){t("1GTc"),n.exports=t("UusJ").Object.assign},aA9S:function(n,e,t){n.exports={default:t("YwFF"),__esModule:!0}},"dH3/":function(n,e,t){"use strict";function a(n){t("jHFn")}Object.defineProperty(e,"__esModule",{value:!0});var i=t("NRGc"),o=t("C6Tu"),r=t("X4nt"),A=a,s=r(i.a,o.a,!1,A,"data-v-098ada8c",null);e.default=s.exports},ga2M:function(n,e,t){e=n.exports=t("I71c")(!0),e.push([n.i,".lunbo[data-v-098ada8c]{background:#000;position:fixed;width:100%;height:100%;z-index:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.lunbo .header[data-v-098ada8c]{height:4.4rem;width:100%;padding:0 1rem;margin-bottom:2rem}.lunbo .header .download[data-v-098ada8c],.lunbo .header .goback[data-v-098ada8c]{color:#fff;font-size:2rem}.lunbo .header .title[data-v-098ada8c]{width:0;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.lunbo .header .title span[data-v-098ada8c]{font-size:1.8rem;color:#fff}.lunbo .img_box[data-v-098ada8c]{z-index:1;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden}.lunbo .img_box img[data-v-098ada8c]{width:100%;display:block}.lunbo .swiper-pagination[data-v-098ada8c]{position:static}.lunbo .swiper-slide[data-v-098ada8c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.lunbo .footer[data-v-098ada8c]{padding:2rem 0;width:100%}.lunbo .footer.width[data-v-098ada8c]{padding:0 10%;-webkit-box-sizing:border-box;box-sizing:border-box}.lunbo .footer.width p[data-v-098ada8c]{width:33.3%}.lunbo .footer p[data-v-098ada8c]{width:25%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:2rem}.lunbo .footer p.on span[data-v-098ada8c]{background:#f63;border-color:#f63}.lunbo .footer p span[data-v-098ada8c]{height:3rem;width:7rem;color:#fff;border:1px solid #fff;border-radius:1.5rem;font-size:1.4rem}","",{version:3,sources:["D:/kaifa/web_zeju_m/src/components/page/swiper/swHuxing.vue"],names:[],mappings:"AACA,wBACE,gBAAiB,AACjB,eAAgB,AAChB,WAAY,AACZ,YAAa,AACb,UAAW,AACX,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,yBAA0B,AACtB,sBAAuB,AACnB,6BAA+B,CACxC,AACD,gCACE,cAAe,AACf,WAAY,AACZ,eAAgB,AAChB,kBAAoB,CACrB,AAKD,kFACE,WAAY,AACZ,cAAgB,CACjB,AACD,uCACE,QAAS,AACT,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,iBAAmB,CACpB,AACD,4CACE,iBAAkB,AAClB,UAAY,CACb,AACD,iCACE,UAAW,AACX,WAAY,AACZ,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,eAAiB,CAClB,AACD,qCACE,WAAY,AACZ,aAAe,CAChB,AACD,2CACE,eAAiB,CAClB,AACD,sCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CAC7B,AACD,gCACE,eAAgB,AAChB,UAAY,CACb,AACD,sCACE,cAAe,AACf,8BAA+B,AACvB,qBAAuB,CAChC,AACD,wCACE,WAAa,CACd,AACD,kCACE,UAAW,AACX,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,kBAAoB,CACrB,AACD,0CACE,gBAAiB,AACjB,iBAAmB,CACpB,AACD,uCACE,YAAa,AACb,WAAY,AACZ,WAAY,AACZ,sBAAuB,AACvB,qBAAsB,AACtB,gBAAkB,CACnB",file:"swHuxing.vue",sourcesContent:["\n.lunbo[data-v-098ada8c] {\n  background: #000;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.lunbo .header[data-v-098ada8c] {\n  height: 4.4rem;\n  width: 100%;\n  padding: 0 1rem;\n  margin-bottom: 2rem;\n}\n.lunbo .header .goback[data-v-098ada8c] {\n  color: #FFF;\n  font-size: 2rem;\n}\n.lunbo .header .download[data-v-098ada8c] {\n  color: #FFF;\n  font-size: 2rem;\n}\n.lunbo .header .title[data-v-098ada8c] {\n  width: 0;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: center;\n}\n.lunbo .header .title span[data-v-098ada8c] {\n  font-size: 1.8rem;\n  color: #FFF;\n}\n.lunbo .img_box[data-v-098ada8c] {\n  z-index: 1;\n  width: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  overflow: hidden;\n}\n.lunbo .img_box img[data-v-098ada8c] {\n  width: 100%;\n  display: block;\n}\n.lunbo .swiper-pagination[data-v-098ada8c] {\n  position: static;\n}\n.lunbo .swiper-slide[data-v-098ada8c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.lunbo .footer[data-v-098ada8c] {\n  padding: 2rem 0;\n  width: 100%;\n}\n.lunbo .footer.width[data-v-098ada8c] {\n  padding: 0 10%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.lunbo .footer.width p[data-v-098ada8c] {\n  width: 33.3%;\n}\n.lunbo .footer p[data-v-098ada8c] {\n  width: 25%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: 2rem;\n}\n.lunbo .footer p.on span[data-v-098ada8c] {\n  background: #f63;\n  border-color: #f63;\n}\n.lunbo .footer p span[data-v-098ada8c] {\n  height: 3rem;\n  width: 7rem;\n  color: #fff;\n  border: 1px solid #fff;\n  border-radius: 1.5rem;\n  font-size: 1.4rem;\n}\n"],sourceRoot:""}])},jHFn:function(n,e,t){var a=t("ga2M");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("8bSs")("0e749c83",a,!0)},nBsG:function(n,e,t){"use strict";var a=t("OtAM"),i=t("/a/u"),o=t("K0/C"),r=t("NUpW"),A=t("esCQ"),s=Object.assign;n.exports=!s||t("xVzf")(function(){var n={},e={},t=Symbol(),a="abcdefghijklmnopqrst";return n[t]=7,a.split("").forEach(function(n){e[n]=n}),7!=s({},n)[t]||Object.keys(s({},e)).join("")!=a})?function(n,e){for(var t=r(n),s=arguments.length,d=1,c=i.f,l=o.f;s>d;)for(var u,f=A(arguments[d++]),b=c?a(f).concat(c(f)):a(f),p=b.length,C=0;p>C;)l.call(f,u=b[C++])&&(t[u]=f[u]);return t}:s}});
//# sourceMappingURL=52.941c18e55c1edc73c0a4.js.map