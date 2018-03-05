<template>
  <div class="home-wrap wrap">
    <div class="main">
      <header class="header">
        <!-- 活动 -->
        <section class="banner"> 
          <!-- 阴影 -->
          <div class="yinying"></div>
          <!-- 活动多个 -->
          <div v-if="bannerArr.length >1">
            <sw-banner :arr="bannerArr"></sw-banner>
          </div>
          <!-- 活动 只有一个时 -->
          <div v-else class="img_box">
            <a :href="bannerArr.description" class="back" :style="{'backgroundImage':`url(${bannerArr.img_url})`}"></a>
          </div>
        </section>
        
        <!-- 个人中心入口 -->
        <router-link :to="`/${cityName}/home/index`" class="iconfont icon-ren user"></router-link>
        <!-- 输入框 ，城市入口 -->
        <section class="input_box">
          <div class="transverse_fen_center_ya">
            <router-link :to="`/${cityName}/city`" class="city transverse_center_ya">
              <span>{{currentCity.name}}</span>
              <i class="iconfont icon-jiantou3"></i>
            </router-link>
            <router-link :to="`/${cityName}/loupan/search/index`" class="loupan transverse_center_ya">
              <i class="iconfont icon-sousuo"></i>
              <input type="text" placeholder="请输入楼盘名称" >
            </router-link>
          </div>
        </section>
      </header>
      <main class="home-main">
        <!-- 图标导航 -->
        <section class="icon_box">
          <div class="icon_nav">
            <nav >
              <router-link :to="`/${cityName}/loupan/list/index`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/whole-loupan.png)"></i>
                <span>全部楼盘</span>
              </router-link>
              <router-link :to="`/${cityName}/loupan/list/hot`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/hot-loupan.png)"></i>
                <span>热门楼盘</span>
              </router-link>
              <router-link :to="`/${cityName}/loupan/list/sellwell`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/selling-loupan.png)"></i>
                <span>热销楼盘</span>
              </router-link>
              <router-link :to="`/${cityName}/loupan/list/recent_kaipan`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/date-kaipan.png)"></i>
                <span>近期开盘</span>
              </router-link>
            </nav>
            <nav>
              <router-link :to="`/${cityName}/loupan/list/xiaohuxing`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/hu-recommend.png)"></i>
                <span>小户型推荐</span>
              </router-link>
              <router-link :to="`/${cityName}/advisor`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/guwen-home.png)"></i>
                <span>择居顾问</span>
              </router-link>
              <router-link :to="`/${cityName}/loupan/map_lookup`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/map-room.png)"></i>
                <span>地图找房</span>
              </router-link>
              <router-link :to="`/${cityName}/loupan/story/0/index`" class="portrait_center_ya">
                <i style="background-image:url(/static/assets/images/zeju_story.png)"></i>
                <span>择居故事</span>
              </router-link>
            </nav>
          </div>
          <!-- 滚动推广 -->
          <div class="lunbo_nav transverse_center_ya" v-if="zejuTuiArr.length > 0">
            <div class="tuijian_box"> 
              <h6><span>择居</span><i>推荐</i></h6>
              <!-- 推荐滚动 - 数组不为空时创建 -->
              <swiper-up :arr="zejuTuiArr" ></swiper-up>
            </div>
          </div>
        </section>
        <!-- 择居精选 -->
        <section class="sale_box" v-if="jingXuanArr.length > 0">
          <h4 class="sale_title transverse_fen_ya">
            <span>择居精选</span>
            <router-link :to="`/${cityName}/loupan/list/jingxuan`" class="gengduo gengduo1">更多<i class="iconfont icon-right-shixin"></i></router-link>
          </h4>
          <div class="sale_main">
            <sw-loupan :arr="jingXuanArr"></sw-loupan>
          </div>
        </section>
        <!-- 特色频道 -->
        <section class="box tese_box" v-if="teseArr.length >0">
          <h4 class="title">
            <img src="/static/assets/images/zeju-tese.png" alt="">
            <router-link :to="`/${cityName}/loupan/feature`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
          </h4>
          <div class="tese_main">
            <!-- 特色swiper -->
            <sw-feature :arr="teseArr"></sw-feature>
            <!-- <nav>
              <router-link :to="{path:`/loupan/feature/feature_detail/${m.id}`,query:{num:ind+1}}" class="portrait_fen" v-for="(m,ind) in teseArr" :key="ind">
                <img :src="`http://imgs.zeju.cn/${m.img_url}`" alt="低首付">
                <span>{{m.title}}</span>
              </router-link>
            </nav> -->
          </div>
        </section>
        <!-- 择居服务 -->
        <section class="box fuwu_box">
          <h4 class="title">
            <img src="/static/assets/images/zeju-fuwu.png" alt="">
            <!-- <router-link to="/" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link> -->
          </h4>
          <div class="fuwu_main">
            <router-link :to="`/${cityName}/pay/member`">
              <img src="/static/assets/images/banner1.png">
            </router-link>
          </div>
        </section>
        <!-- 择居百科 -->
        <section class="box baike_box" v-if="baikeArr.length >0">
          <h4 class="title">
            <img src="/static/assets/images/zeju-baike.png" alt="">
            <router-link :to="`/${cityName}/wiki`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
          </h4>
          <div class="baike_main" >
            <router-link :to="{path:`/${cityName}/wiki/wiki_detail/${m.wiki_id}`,query:{num:ind+1}}" v-for="(m,ind) in baikeArr" :key="ind" class="border">
              <dl >
                <dt :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.img_url})`}" class="back"></dt>
                <dd>
                  <h4 class="text_ove2">{{m.title}}</h4>
                  <time>{{m.updated_at}}</time>
                </dd>
              </dl>
            </router-link>
          </div>
        </section>
        <!-- 择居故事 -->
        <section class="box story_box" v-if="storyArr.length > 0">
          <h4 class="title">
            <img src="/static/assets/images/zeju-story.png" alt="">
            <router-link :to="`/${cityName}/loupan/story/0/index`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
          </h4>
          <div class="story_main">
            <story-anchor :arr="storyArr"></story-anchor>
          </div>
        </section>
        <!-- 楼盘评测 -->
        <section class="box pingce_box" v-if="evaluateData.length > 0">
          <h4 class="title">
            <img src="/static/assets/images/zeju-pingce.png" alt="">
            <router-link :to="`/${cityName}/loupan/evaluate/3`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
          </h4>
          <!-- 渲染评测列表 -->
          <evaluate-anchor :arr="evaluateData"></evaluate-anchor>
        </section>
        <!-- 择居顾问 -->
        <section class="box guwen_box" v-if="guwenarr.length > 0">
          <h4 class="title">
            <img src="/static/assets/images/zeju-guwen.png" alt="">
            <router-link :to="`/${cityName}/advisor`" class="gengduo" >更多<i class="iconfont icon-right-shixin"></i></router-link>
          </h4>
          <!-- 超过两个用swiper -->
          <sw-guwen v-if="guwenarr.length>2" :arr = "guwenarr"></sw-guwen>
          <!-- 低于两个 竖着排练 -->
          <guwen-list v-else  :arr = "guwenarr"></guwen-list>
        </section>
        <!-- 为您推荐 -->
        <section class="box tuijian_box" v-if="tuijianArr.length > 0 ">
          <h4 class="title">
            <img src="/static/assets/images/zeju-tuijian.png" alt="">
          </h4>
          <loupan-tui :arr = "tuijianArr"></loupan-tui>
          <!-- 加载更多 -->
          <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore" ></load-more>
        </section>
      </main>
      <!-- footer -->
      <footer-text></footer-text>
    </div>
  </div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import globalFn from '@/assets/javascripts/globalFn';
//页脚
import footerText from '@/components/base/footer/footer_text.vue';
//活动banner
import swBanner from '@/components/page/swiper/swBanner.vue';
//特卖--楼盘轮播
import swLoupan from '@/components/page/swiper/swLoupan.vue';
//择居推荐位--向上推荐
import swiperUp from '@/components/page/swiper/swiperUp.vue';
//特色频道
import swFeature from '@/views/loupan/feature/items/swFeature.vue';
//择居故事
import storyAnchor from '@/views/loupan/story/story_anchor.vue';
//择居故事
import evaluateAnchor from '@/views/loupan/evaluate/evaluate_list.vue';
//择居顾问 -- 显示三个以上
import swGuwen from '@/views/adviser/items/adviser_swiper.vue';
//择居顾问 -- 显示几个
import guwenList from '@/views/adviser/items/adviser_list.vue';
//推荐楼盘
import loupanTui from '@/components/base/items/loupan_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';	
export default {
  name: 'Home',
  components: {
    footerText,
    swLoupan,
    storyAnchor,
    evaluateAnchor,
    swGuwen,
    guwenList,
    loupanTui,
    loadMore,
    swiperUp,
    swBanner,
    swFeature
  },
  data () {
    return {
      bannerArr:[],//活动banner
      guwenarr:[],//顾问数据
      tuijianArr : [],//推荐楼盘
      jingXuanArr : [],//推荐楼盘
      evaluateData : [],//楼盘评测
      teseArr      : [],//特色频道
      storyArr    : [],//择居故事
      baikeArr    : [],//择居百科
      zejuTuiArr  : [],//择居推荐
      total_pages : 0,
      page :1,
      currentCity : {
        name:'北京'
      }
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '首页'){
        this.tuijianArr =  [] ;
        this.total_pages =  0 ;
        this.page = 1 ;
        //获取首页数据
        this.init();
      }
    }
  },
  computed : {...mapGetters(['cityName','customerId'])},
  methods : {
    //首页获取数据，并初始化
    init () {
      //获取城市名称
      this.gitCityName ();
      //获取-- 精选楼盘数据
      this.gitJingxuanLoupan();

      this.page       = 1;
      this.total_pages= 0;
      this.tuijianArr = [];
      //获取推荐列表
      this.getLoupanList();

      //获取楼盘评测
      this.getEvaluateJson();
      //请求特色频道
      this.gitTeseChannel();
      //获取故事列表
      this.getStoryList();
      //获取择居百科
      this.getIndexBaike();
      //顾问
      this.getAdviserList();
      //择居推荐
      this.getXejuTuijian();
      //获取焦点图
      this.getBanners();
      //诸葛埋点
      this.zhugeBury();
    },
    //获取 -- 精选楼盘数据
    gitJingxuanLoupan () {
      let  obj = {
            action_name : 'jingxuan',
            city_abbr   :  this.cityName
          };
      api.getLoupanList(obj).then((res)=>{
        if(res.status == 200){
          this.jingXuanArr= res.data.loupans;
        } else if(res.status == 422){
          this.$router.push('/404');
        }
      });
    },
    //获取推荐列表
    getLoupanList () {
      var obj = {
        page : this.page,
        page_limit:10 ,
        action_name : 'recommend',
        city_abbr   :  this.cityName
      };
      api.getLoupanList(obj).then((res) =>{
        if(res.status == 200){
          //获取推荐数据
          this.tuijianArr  = this.tuijianArr.concat(res.data.loupans);
          if(res.data.loupans <= 0){return false};

          //页数
          this.total_pages = res.data.page_info.total_pages;
          this.page        = res.data.page_info.current_page+1;
          
          if(this.$refs.loadMore !=undefined){
            //可以再次请求
            this.$refs.loadMore.requestFn();
          }
        } else if(res.status==422){
          this.$router.push('/404');
        }	
      });
    },
    //楼盘评测
    getEvaluateJson (){
      let para = {
        city_abbr : this.$store.state.cityName,
        list_type : 1,//首页
        loupan_id : ''
      }
      api.getEvaluateJson(para).then((res)=>{
        if(res.status == 200){
          //评测数据渲染
          this.evaluateData = res.data.evaluations;
        } else if(res.status==422){
          this.$router.push('/404');
        }	
      });
    },
    //获取城市名称
    gitCityName () {
      api.gitCityName({},this.cityName).then((res) =>{
        if(res.status==200){
          this.currentCity =res.data;
        } else if(res.status==422){
          this.$router.push('/404');
        }	
      })
    },
    //请求特色频道
    gitTeseChannel () {
      let obj ={list_type:1,city_abbr : this.$store.state.cityName};
      api.gitTeseChannel(obj).then((res) =>{
        if(res.status==200){
          this.teseArr = res.data.channels;
        } else if(res.status==422){
          this.$router.push('/404');
        }	
      })
    },
    //获取故事列表
    getStoryList () {
      let obj = {
        action_name:'home',
        id : '',
        city_abbr : this.$store.state.cityName
      };
      api.getStoryList(obj).then((res) =>{
        if(res.status == 200){
          this.storyArr = res.data.stories;
        } else if(res.status==422){
          this.$router.push('/404');
        }	
      });
    },
    //获取择居百科
    getIndexBaike () {
      api.getIndexBaike({city_abbr : this.cityName}).then((res) =>{
        if(res.status == 200){
          this.baikeArr = res.data.data;
        } else if(res.status==422){
          this.$router.push('/404');
        }	
      });
    },
    //获取顾问列表
    getAdviserList () {
      var obj = {
            city_abbr : this.cityName,
            list_type : 1
          }
      api.getAdviserList(obj).then((res) =>{
        if(res.status == 200){
          this.guwenarr = res.data.advisors;
        } else if(res.status==422){
          this.$router.push('/404');
        }
      })
    },
    //择居推荐
    getXejuTuijian () {
      api.getXejuTuijian({city_abbr : this.cityName}).then((res) =>{
        if(res.status == 200){
          this.zejuTuiArr = res.data;
        } else if(res.status==422){
          this.$router.push('/404');
        }
      });
    },
    //获取焦点图
    getBanners () {
      api.getBanners({city_abbr : this.cityName}).then((res) =>{
        if(res.status == 200){
          
          if(res.data.length <=1){      
            if(res.data[0] != undefined){
              this.bannerArr = res.data[0];
            }else{
              this.bannerArr = {description:'http://hd.zeju.com/homebuyers/',img_url:'/static/assets/images/banner1.jpg'};
            }
          } else{
            this.bannerArr = res.data;
          };
        } else if(res.status==422){
          this.$router.push('/404');
        }
      });
    },
    //加载更多 显示隐藏
    moreFn () {
      //获取推荐列表
      this.getLoupanList();
    },
    //诸葛  --- 打开埋点
    zhugeBury () {
      zhuge.track('打开首页', {
        '当前页面' : '首页',
        '所属模块' : '首页'
      });
    }
  },
  mounted() {
    //首页获取数据，并初始化
    this.init();
  }
}
</script>
<style lang="less" scoped src="./index.less"></style>
