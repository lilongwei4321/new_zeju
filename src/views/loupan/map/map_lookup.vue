<template>
  <div class="map_wrap">
    <header-text name="地图找房" :async="false"></header-text>
		<main class="map_main" id="map_main">
      <!-- 引用菜单下拉组件 -->
      <nav-list @backShow="backShowFn" ref="navList" class="nav" @dataFn="dataFn"></nav-list>
      <!--  -->
      <div class="map_box">
        <div class="map_back"></div>
        <div id="mapimg" class="map_img" :class="{'map_back1':mapBackAsync}"></div>
      </div>
    </main>
    <!-- 弹框楼盘列表 -->
    <item-lookup :obj="loupanObj" @showFn="showFn" v-show="itemAsync"></item-lookup>
    <transition name="kenzo">
      <div class="back_black zhe" v-show="backAsync" @touchmove.prevent @click="backHideFn" ></div>
    </transition>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//搜索楼盘展示
import itemLookup from './items/item_lookup_alert.vue';
//下拉菜单页
import navList from '@/components/page/nav/nav_list.vue';
export default {
  data () {
    return {
      pointArr  : [] ,//标注
      labelArr  : [],
      map       : null ,
      itemAsync : false,
      moreAsync : true,
      backAsync : false,
      mapBackAsync : false,
      clickAsync : false,//是否点击过
      loupanArr : [],//储存所有楼盘数据
      loupanObj : {},//当前楼盘数据
      clickLabel : {},//当前点击label
      cityObj : {},

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
      allObj   : {
        area_ids : [],
        prices   : [],
        room_counts	: [],
        moreObj : {}
      },
      canMoreObj :{}
    }
  },
  components : {
    headerText,
    itemLookup,
    navList
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '地图找房页'){
        this.init();
        this.$refs.navList.init();
        //获取城市名称
        this.gitCityName();
      } else if(from.name == '地图找房页'){
        this.$refs.navList.init();
        this.backAsync = false;
        //菜单全部隐藏
        this.$refs.navList.asyncFalse('likai');
      }
    }
  },
  computed: {...mapGetters(['cityName'])},
  methods : {
    //重置筛选条件
    init () {
      this.min_area  = '';
      this.max_area  = '';
      this.fangyuan  = ''; 
      this.canRegion = [];
      this.canRegion = [];
      this.canType   = [];
      this.labels    = [];
      this.property_types   = [];
      this.min_total_price  = '';
      this.max_total_price  = '';
      this.pointArr = [];
      //储存页面总数据
      this.loupanArr = [];
      this.labelArr  = [];
      this.itemAsync = false;
      this.mapBackAsync = false;
      this.clickAsync = false;
      this.canMoreObj = {};
      this.allObj   = {
        area_ids : [],
        prices   : [],
        room_counts	: [],
        moreObj : {}
      };
    },
    //生成调用 地图
    mapfn () {
      //创建地图，boxID
      this.map = new BMap.Map("mapimg",{minZoom:13,maxZoom:17});
      //中心坐标
      let point = new BMap.Point(this.cityObj.lng,this.cityObj.lat);
      //调用高清地图 3~18
      this.map.centerAndZoom(point, 14);
      // this.map.disableDragging();//禁止拖拽
      this.map.disableDoubleClickZoom() //禁用双击放大。
      //创建中心坐标图案
      this.labelBack(point,false);
      //获取楼盘数据
      this.getMapLoupan();
      //拖动地图获取楼盘数据
      this.getPointXY();
    },
    //添加多个标注点
    Multiple (arr) {
      this.pointArr = [];
      //遍历所有数据，创建标注点
      arr.map( (m,i) => {
        var point = new BMap.Point(m.longitude, m.latitude);
                m['point'] = point;
            //渲染的数据
            this.pointArr.push(m);
            //储存页面总数据
            this.loupanArr.push(m);
      });
      //遍历坐标数据 -- 创建标注到地图
      this.setLabelBox();  
    },
    //改变标注样式 -- 改变背景
    labelBack (obj,async) {
      if(!this.clickAsync){
        var label = new BMap.Label(`<div class="label_back"><h6>${obj.name}</h6><p>${obj.price}${obj.price_unit}&nbsp;(${obj.sale_status})</p></div>`,{position:obj.point,offset:new BMap.Size(-4,12)});
      } else{
        var label = new BMap.Label(`<div class="label_back" style="display: block;"><h6>${obj.name}</h6><p>${obj.price}${obj.price_unit}&nbsp;(${obj.sale_status})</p></div>`,{position:obj.point,offset:new BMap.Size(-4,12)});
      }

      let url   = 'url(/static/assets/images/biaozhu1.png)';
          //中心点不改变
          if(!async){
            url = 'url(/static/assets/images/biaozhu.gif) ';
            label = new BMap.Label(``,{position:obj,offset:new BMap.Size(-10,-10)});
          }
          
          label.setStyle({
            border: 'none',
            background: url,
            width:'20px',
            height:'20px',
            backgroundSize:'cover'
          });

          //添加到地图
          this.map.addOverlay(label);
          //点击label，中心点没效果
          if(!async){return false}
          this.labelArr.push(label);
          this.labelClick(label);
          //点击过地图
          if(this.clickAsync){
            //标注--显示信息窗口
            this.styleFn(label)
          }
    },
    //遍历坐标数据 -- 创建标注到地图
    setLabelBox () {
      this.pointArr.map((m,i) => {
        this.labelBack(m,true);
      });
    },
    //点击label
    labelClick (label) {
      label.addEventListener("click", (el) =>{    
        this.clickLabel = label;
        this.clickAsync = true;
        //显示楼盘列表弹框
        this.itemAsync = true;
        this.mapBackAsync = true;
        //设置地图级别
        this.map.setZoom(14);
        //移动到当前坐标
        this.map.panTo(new BMap.Point(label.point.lng,label.point.lat));
        //标注--显示信息窗口
        this.showAlert();
      });
    },
    //子组件调用，关闭弹窗
    showFn () {
      this.itemAsync = false;
      this.mapBackAsync = false;
    },
    moreFn () {
      this.moreAsync = false;
    },
    //拖动地图获取楼盘数据
    getPointXY () {
      this.map.addEventListener("dragend", () =>{ 
        //获取楼盘数据
        this.getMapLoupan();
      });
    },
    //标注--显示信息窗口
    showAlert  () {
      let boxs= document.getElementsByClassName('label_back');
      this.labelArr.map((m,i) => {
          //显示标注弹框信息
          boxs[i].style.display = 'block';
          //更改label的 背景
          m.setStyle({
            border: 'none',
            background: 'none',
            padding: '0px',
            width:'auto',
            height:'auto'
          });

          //改变当前点击项的类
          if(this.clickLabel.point.lat == m.point.lat && this.clickLabel.point.lng == m.point.lng){
            boxs[i].className = "label_back label_back2";
            this.labelArr[i].type = '3';
            this.loupanObj = this.loupanArr[i];
          } else if( m.type == '3'){
            boxs[i].className = "label_back label_back3";
            this.labelArr[i].type = '3';
          } else{
            boxs[i].className = "label_back";
            this.labelArr[i].type = '1';
          }
      });
    },
    styleFn (label) {
      label.setStyle({
        border: 'none',
        background: 'none',
        padding: '0px',
        width:'auto',
        height:'auto'
      });
    },
    //关闭
    backHideFn () {
      this.backAsync = false;
      this.$refs.navList.boxAsyncFn();
      //子组件重置没有确定选项
      this.$refs.navList.xuanXiang(this.allObj);
    },
    //显示背景
    backShowFn (async,chongzhi){
      this.backAsync = async;
      //如果关闭背景
      if(chongzhi){
        //子组件重置没有确定选项
        this.$refs.navList.xuanXiang(this.allObj);
      }
    },
    //获取楼盘数据
    getMapLoupan () {
      let lb = this.map.getBounds().getSouthWest(),//左下角
          rt = this.map.getBounds().getNorthEast();//右上角

      let min_lng  = lb.lng,
          max_lng  = rt.lng,
          max_lat  = rt.lat,
          min_lat  = lb.lat;

      var obj = {
        city_abbr   :  this.cityName,
        action_name :  'house_map' ,
        area_ids    : this.canRegion,
        prices      : this.canPrice.join('|'),
        room_counts	: this.canType,
        property_types : this.property_types,
        labels : this.labels,
        min_total_price :this.min_total_price,
        max_total_price :this.max_total_price,
        min_area :this.min_area,
        max_area :this.max_area,
        min_lng,
        max_lng,
        min_lat,
        max_lat
      }

      api.getMapLoupan(obj).then((res) =>{
        if(res.status==200){
          //判断数据是否已存在
          this.setLoupan(res.data);
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //判断数据是否已存在
    setLoupan (arr) {
      let Arr = [];
      arr.map( (m,i) => {
        let async = false;
        this.loupanArr.map( (n,ind) => {
          if(n.id == m.id){
            async = true;
          }
        });

        if(!async){
          Arr.push(m);
        }
      });

      //创建多个标注
      this.Multiple(Arr);
    },
    //获取城市名称
    gitCityName () {
      api.gitCityName({},this.cityName).then((res) =>{
        if(res.status==200){
          this.cityObj = res.data;
          //生成调用 地图
          this.mapfn();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //筛选条件，请求
    dataFn (obj) {
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
      }
      //诸葛埋点 -- 筛选类型
      this.zhuGeShixuan();
      //删除地图上的标注
      this.shanChuLabel();
      //获取楼盘数据
      this.getMapLoupan();
    },
    //删除所有标注
    shanChuLabel () {
      this.pointArr = [];
      //储存页面总数据
      this.loupanArr = [];

      this.labelArr  = [];

      var overlays = this.map.getOverlays();
        overlays.map( (m) => {    
          if(m.point!=null && m.point!=undefined){
            if(m.point.lng != this.cityObj.lng && m.point.lat != this.cityObj.lat ){
              this.map.removeOverlay(m);
            }
          }   
      });
    },
    //诸葛埋点 -- 筛选类型
    zhuGeShixuan () {
      this.allObj = {
        area_ids : this.canRegionName,
        prices   : this.canPriceName,
        room_counts	: this.canTypeName,
        moreObj     : this.canMoreObj,
        thePage     : this.$route.name
      };
      zhuGe.clickShaixuan(this.allObj);
    }
  },
  mounted () {
    //获取城市名称
    this.gitCityName();
  }
}
</script>
<style lang="less" scoped>
.map_wrap{
  .map_main{
    position: relative;
    width:100%;
    .nav{
      position: absolute;
      top:4.3rem;
      left:0;
      width: 100%;
      height:4rem;
      background:#fff;
      z-index: 199;
    }
    .map_box{
      position: fixed;
      top:0;
      left: 0;bottom:0;
      right: 0;
      z-index:1;
      display: flex;
      flex-direction: column;
      .map_back{
        height: 8.2rem;
      }
      .map_img{
        width: 100%;
        height: 100%;
        flex:1;
      }
      .map_back1{
        transform: translate(0,-34%);
      }
    }
  }
}
</style>
<style lang="less" >
.label_back{
  background: rgba(255,89,91,.95);
  border: 1px solid rgba(255,66,69,.95);
  color: #f4f4f4;
  text-align: center;
  padding: 3px 8px;
  border-radius: 3px;
  box-shadow: 2px 4px 7px rgba(175,8,11,0.3);
  position: relative;
  display:none;
  &:after{
    content: '';
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -6px;
    width: 13px;
    height: 6px;
    background: url(/static/assets/images/jiao-red.png) no-repeat;
    background-size: 100%;
    opacity: .95;
  }
}
.label_back2{
  background: rgba(67,177,123,.9);
  border: 1px solid rgba(57,152,106,.9);
  box-shadow: 2px 4px 7px rgba(4,73,39,0.3);
  &:after{
    background: url(/static/assets/images/jiao-green.png) no-repeat;
    background-size: 100%;
    opacity: .9;
  }
}
.label_back3{
  background: rgba(252,182,183,.9);
  border: 1px solid rgba(255,165,165,.95);
  box-shadow: 2px 4px 7px rgba(213,84,84,0.3);
  &:after{
    background: url(/static/assets/images/jiao-pink.png) no-repeat;
    background-size: 100%;
    opacity: .9;
  }
}
</style>
