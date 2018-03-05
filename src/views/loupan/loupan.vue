<template>
  <div class="loupan_wrap wrap">
    <header-icon ref="header_box" ></header-icon>
    <main class="loupan_main main">
      <section class="screen">
        <aside class="sou ">
          <router-link :to="{path:`/${cityName}/loupan/search/${fenName}`,query:{seach:seachText}}">
            <input type="text" placeholder="请输入楼盘名称" :value="seachText">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </aside>
        <aside class="xuan" v-Srcolls="{'cls':'xuan','cls1':'xuan_fixed'}">
          <!-- 引用菜单下拉组件 -->
          <nav-list @backShow="backShowFn" ref="navList" @dataFn="dataFn"></nav-list>
        </aside>
        <aside class="xuan_back"  id="xuan"></aside>
        <!-- 类型菜单 -->
        <aside class="fenlei transverse_fen_center">
          <div class="box first">
            <p class="transverse_center_center select" @click="cliHide">
              <span>{{fenText}}</span>
              <i :class="{'iconfont':true ,'icon-sortC':!leiAsync ,'icon-sortA':leiAsync,'on':leiAsync}"></i>
            </p>
          </div>
          <div  class="box last transverse_center_center" >共为您找到{{ fangyuan }}个房源</div>
          <!-- 菜单渲染区域 -->
          <transition name="kenzo">
            <div v-show="leiAsync" class="option_main">
              <ul class="box_fen" >
                <li 
                  v-for="m in leiArr" 
                  :key="m.value" 
                  @click="clickFenCla(m)"
                  class="transverse_fen_center_ya"
                  :class="{'on':m.active}">
                  <!-- <router-link :to="'/loupan?name='+m.name" class=""> -->
                    <span>{{m.label}}</span>
                    <i class="iconfont icon-duihao"></i>
                  <!-- </router-link> -->
                </li>
              </ul>
            </div>
          </transition>
        </aside>
      </section>
      <section class="main_box">
        <!-- 特卖楼盘 -->
        <ul class="brand_box" v-if="fenName=='temai'">
          <li v-for="(k,ind) in louData" :key="ind">
            <item-list :temaiData = 'k'></item-list>
          </li>
        </ul>
        <!-- 品牌馆 -->
        <ul class="brand_box" v-else-if="fenName=='brand'">
          <li v-for="(m,ind) in louData" :key="ind">
            <brand-list  :async="false" :name = "fenName" :data = 'm'></brand-list>
          </li>
        </ul>
        <!-- 普通楼盘 -->
        <loupan-list :arr = "louData" v-else></loupan-list>
        <!-- 加载更多 -->
        <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
      </section>
      <transition name="kenzo">
        <div class="back_black zhe" v-show="backAsync" @touchmove.prevent @click="backHideFn"></div>
      </transition>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import globalFn from '@/assets/javascripts/globalFn';
//引用头部
import headerIcon from '@/components/base/header/header_icon.vue';
//渲染内容 -- 普通
import loupanList from '@/components/base/items/loupan_list.vue';
//渲染内容 -- 特卖
import itemList from '@/components/base/items/item_list.vue';
//渲染内容 -- 品牌
import brandList from '@/components/base/items/item_list_one.vue';
//下拉菜单页
import navList from '@/components/page/nav/nav_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
export default {
  name: 'Newhoue',
  components: {
    headerIcon,
    loupanList,
    loadMore,
    itemList,
    brandList,
    navList
  },
  computed : {...mapGetters(['cityName'])},
  data () {
    return {
      fangyuan    : 0,
      seachText   : '',
      leiAsync    : false,//楼盘分类
      backAsync   : false,//背景遮罩
      fenName     : '',//当前分类项 英文
      fenText     : '全部楼盘',//当前分类项中文
      leiArr   : [
        {value :'-1', label: '全部楼盘' ,active : true ,name : 'index'},
        {value :'0',  label: '近期开盘' ,active : false,name : 'recent_kaipan'},
        {value :'1',  label: '热门楼盘' ,active : false,name : 'hot'},
        {value :'2',  label: '热销楼盘' ,active : false,name : 'sellwell'},
        {value :'3',  label: '即将开盘' ,active : false,name : 'unkaipaned'},
        {value :'4',  label: '精品楼盘' ,active : false,name : 'jingpin'},
        {value :'5',  label: '精选楼盘' ,active : false,name : 'jingxuan'},
        {value :'6',  label: '小户型推荐'   ,active : false,name : 'xiaohuxing'},
        // {value :'5',  label: '品牌馆'   ,active : false,name : 'brand'},
        // {value :'7',  label: '特卖房源' ,active : false,name : 'temai'}
      ],
      louData : [],
      page    : 1,
      total_pages : 0,
      canRegion   : [],//区域选中项
      canPrice    : [],//价格选中项
      canType     : [],//房型选中项
      canRegionName   : [],//区域选中项名称
      canPriceName    : [],//价格选中项名称
      canTypeName     : [],//房型选中项名称

      property_types : [],//类型
      labels  : [],//特色
      min_total_price :'',
      max_total_price :'',
      min_area :'',
      max_area :'',
      canMoreObj : {},
      allObj   : {
        area_ids : [],
        prices   : [],
        room_counts	: [],
        moreObj : {}
      },
      areaId : '' //默认区域id为空
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '楼盘列表页'){
        //重置筛选条件
        this.init();
        this.$refs.navList.init();
        //默认分类
        this.fenName = this.$route.params.name;
        //重置 当前页，总页，arr数据
        this.resetFn();
        //分类菜单选项 
        this.radioClick();
        //获取默认数据
        this.getLoupanData();
      } else if(from.name == '楼盘列表页'){
        this.$refs.navList.init();
        this.backAsync = false;
        this.leiAsync  = false;
        //菜单全部隐藏
        this.$refs.navList.asyncFalse('likai');
      }
    }
  },
  methods :{
    //重置筛选条件
    init () {
      this.page      = 1;
      this.min_area  = '';
      this.max_area  = '';
      this.fangyuan  = 0;
      this.louData   = [];
      this.canRegion = [];
      this.canRegion = [];
      this.canType   = [];
      this.labels    = [];
      this.total_pages      = 0;
      this.property_types   = [];
      this.min_total_price  = '';
      this.max_total_price  = '';
      this.canMoreObj = {} ;
      this.seachText = globalFn.getQueryString('seach')!=null?globalFn.getQueryString('seach'):'';
      this.allObj   = {
        area_ids : [],
        prices   : [],
        room_counts	: [],
        moreObj : {}
      };
    },
    //通过点击 -- 选中下拉-改变class
    clickCla (obj) {
      this.$nextTick(() =>{
        Vue.set(obj,'active',!obj.active);
      });
    },
    //分类点击
    clickFenCla (obj) {
      //重置所有项都取消
      this.leiArr.map(function(m){
        m.active = false;
      });
      //选中当前项
      this.clickCla(obj);
      //重置 当前页，总页，arr数据
      this.resetFn();
      //关闭背景和选项盒子
      this.backAsync = false;
      this.leiAsync  = false;
      //分类显示文字
      this.fenName   = obj.name;
      this.fenText   = obj.label;
      //诸葛埋点 -- 楼盘分类
      this.zhuGeLei();

      this.total_pages = 0;
      this.page        = 1;
      this.louData     = [];
      this.fangyuan    = 0;
      //获取默认数据 -- 只有分类项
      this.getLoupanData();
    },
    //点击菜单按钮 -- 显示隐藏;
    cliHide () {
      this.leiAsync = !this.leiAsync;
      this.backAsync = this.leiAsync;
    },
    //分类菜单选项 
    radioClick () {
      this.leiArr.map((m) =>{
        m.active = false;
        if(m.name == this.fenName){
          this.clickCla(m);    
          this.fenText = m.label;
          //打开 楼盘 埋点
          this.zhuGeBury();
        }
      });
    },
    //获取楼盘列表 -- 楼盘数据
    getLoupanList (obj) {
      api.getLoupanList(obj).then((res) =>{
        if(res.status==200){
          //楼盘数据
          this.louData =this.louData.concat( res.data.loupans);

          if(this.louData <=0){return false};
          //房源条数
          this.fangyuan = res.data.page_info.total_count;
          //页数
          this.total_pages = res.data.page_info.total_pages;
          this.page        = res.data.page_info.current_page+1;
          //可以再次请求
          this.$refs.loadMore.requestFn();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //选项传参
    dataFn (obj){
      this.page        = 1;
      this.total_pages = 0;
      this.louData     = [];
      this.fangyuan    = 0;
      //给当前项，赋值
      if(obj.name!='canMore'){
        let Obj = obj.obj;
        this.canRegion   = Obj.area_ids.value;
        this.canPrice    = Obj.prices.value;
        this.canType     = Obj.room_counts.value;
        this.canRegionName   = Obj.area_ids.label;
        this.canPriceName    = Obj.prices.label;
        this.canTypeName     = Obj.room_counts.label;
      } else{
        //更多侧边栏，传参详细赋值
        let Obj = obj.obj;
        this.canMoreObj = Obj;
        this.min_total_price  = Obj.total_price[0];
        this.max_total_price  = Obj.total_price[1];
        this.min_area         = Obj.area[0];
        this.max_area         = Obj.area[1];
        this.property_types   = Obj.property_types.join(' ');
        this.labels           = Obj.labels.join(' ');
      };
      //诸葛埋点 -- 筛选类型
      this.zhuGeShixuan();
      if(this.$route.name != '搜索楼盘页'){
        if(obj.async){
          //获取楼盘数据
          this.getLoupanData();
        }
      }
    },
    //获取楼盘数据
    getLoupanData () {
      var obj = {
        city_abbr   :  this.cityName,
        action_name :  this.fenName ,
        page : this.page,
        page_limit : 10,
        area_ids : this.canRegion,
        prices   : this.canPrice.join('|'),
        room_counts	 : this.canType,
        property_types : this.property_types,
        labels : this.labels,
        min_total_price :this.min_total_price,
        max_total_price :this.max_total_price,
        min_area : this.min_area,
        max_area : this.max_area,
        q        : this.seachText
      };
      //获取楼盘列表 -- 楼盘数据
      this.getLoupanList(obj);
    },
    //加载更多
    moreFn () {
      //获取楼盘列表 -- 楼盘数据
      this.getLoupanData();
    },
    //点击背景，关闭下拉和背景
    backHideFn () {
      //隐藏背景
      this.backAsync = false;
      //当分类是true时，隐藏分类 else 隐藏其他下拉项
      if(this.leiAsync){
        this.leiAsync  = false;
      } else{
        //关闭子组件下拉菜单
        this.$refs.navList.boxAsyncFn();
        //子组件重置没有确定选项
        this.$refs.navList.xuanXiang(this.allObj);
      }
    },
    //显示背景
    backShowFn (async,chongzhi){
      this.backAsync = async;
      this.leiAsync  = false;
      //如果关闭背景
      if(chongzhi){
        //子组件重置没有确定选项
        this.$refs.navList.xuanXiang(this.allObj);
      }
    },
    //重置 当前页，总页，arr数据
    resetFn () {
      //默认当前页 为1
      this.page = 1;
      //当前数据为[]
      this.louData = [];
      //总页
      this.total_pages = 0;
    },
    //诸葛埋点 -- 打开
    zhuGeBury () {
      zhuge.track('打开楼盘列表页', {
        '当前页面' : '楼盘列表页',
        '所属模块' : '楼盘',
        '来源链接名称' : this.fenText
      });
    },
    //诸葛埋点 -- 楼盘分类
    zhuGeLei () {
      zhuge.track('选择楼盘列表类型', {
        '当前页面' : '楼盘列表页',
        '所属模块' : '楼盘',
        '列表类型' : this.fenText
      });
    },
    //诸葛埋点 -- 筛选类型
    zhuGeShixuan () {
      this.allObj = {
        area_ids : this.canRegionName,
        prices   : this.canPriceName,
        room_counts	: this.canTypeName,
        moreObj     : this.canMoreObj,
        thePage     : '楼盘列表页'
      };
      zhuGe.clickShaixuan(this.allObj);
    }
  },
  mounted () {
    this.fenName = this.$route.params.name;
    this.seachText = globalFn.getQueryString('seach')!=null?globalFn.getQueryString('seach'):'';
    //分类菜单选项 
    this.radioClick();
    //获取默认数据
    this.getLoupanData();
  }
}
</script>
<style lang="less" scoped>
.loupan_wrap{
  display: flex;
  flex-direction: column;
  padding-top:4.4rem;
  .loupan_main{
    .select{
      span{
        font-size:1.4rem;
        color:#666;
        &.on{
          color:#f63;
        }
      }
      i{
        color:#999;
        font-size:1.4rem;
        transform: translate(.2rem,0rem);
        display: inline-block;
        transform-origin:center center;
        width:2rem;
        &.on{
          color:#f63;
        }
      }
    }
    .screen{
      position: relative;
      z-index:120;
      background: #fff;
      .sou{
        padding:0 1rem;
        height: 4rem;
        box-sizing: border-box;
        align-items: center;
        display: flex;
        a{
          display: block;
          width:100%;
          height: 3rem;
          position: relative;
          input{
            display: block;
            width:100%;
            background: #F0F2F5;
            border:none;
            height: 3rem;
            padding-left:3.1rem;
            border-radius: .2rem;
            line-height: 3rem;
          }
          i{
            position: absolute;
            left:1rem;
            color:#999;
            font-size:1.8rem;
            top:.6rem;
            line-height: 1.6rem;
          }
        }
      }
      .xuan_back{
        height: 4rem;
      }
      .xuan{
        height: 4rem;
        position: absolute;
        width:100%;
        top:4rem;
        background: #fff;
      }
      .xuan_fixed{
        position: fixed;
        top:4.3rem;
        z-index:102;
      }
      .fenlei{
        height: 5rem;
        padding:0 1rem;
        position: relative;
        .box{
          background: #F0F2F5;
          width: 0;
          height: 3rem;
          flex:1;
        }
        .box_fen{
          li{
            width:100%;
            flex:1;
            a{
              width: 100%;
              color:#666;
              height: 100%;
            }
          }
        }
        .first{
          margin-right:.5rem;
          position: relative;
          z-index:100;
          p{
            width:100%;
            height: 100%;
            span{
              color:#f63;
              font-size:1.4rem;
            }
          }
        }
        .last{
          margin-left:.5rem;
          font-size: 1.2rem;
          color: #999;
        }
      }
    }
    .main_box{
      flex:1;
      overflow-y:auto;
      box-shadow: 0 1.7rem 1rem -.8rem #eee inset;  
      .brand_box{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding:0 1.5rem ;
        padding-top:1.7rem;
        li{
          padding-bottom:1.5rem;
        }
      }  
    }
  }
}
</style>
