<template>
  <div class="peitao_wrap">
		<div class="main">
			<header-text :name="obj.name" msg="地图" :wordFlag="true" :url="`/${cityName}/loupan/map_detail/${this.obj.id}`"></header-text>
			<div id="map"></div>
			<!-- 分类列表 -->
			<item-type :typeArr = "typeArr"></item-type>
		</div>
		<!-- 页脚 - 免责声明 -->
		<div class="smBox">
			<p>免责声明： 本站楼盘信息旨在为用户提供更多信息的无偿服务，信息以政府部门登记备案为准，请谨慎核查。</p>
		</div>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//头部吸顶
import itemType from '@/views/loupan/map/items/item_type.vue';
export default {
	components: {
		headerText,//楼盘吸顶
		itemType
	},
	data (){
		return {
			typeArr : [], //所有分类
			obj : {}//楼盘基本坐标
		}
	},
  computed : {...mapGetters(['cityName'])},
	watch : {
		'$route' (to) {
			if(to.name == '位置及周边详情页'){
				//获取楼盘详细信息
				this.getLoupanData();
			}
		}
	},
	methods:{
		//创建地图
		mapFn(){
			let keywords=['公交','地铁','学校','医院','银行','购物','房屋','嫌恶'];
			var map = new BMap.Map("map");
			var point = new BMap.Point(this.obj.longitude,this.obj.latitude);//动态获取经纬度
			map.centerAndZoom(point, 14);
			var radius = 2000;
			// 百度地图API功能
			var local = new BMap.LocalSearch(map, {
				onSearchComplete:(results) =>{
					//可以得到搜索结果且搜索结果不为空 
					results.map( (m,i) => {
						if(m.yr.length > 0){
							
							//添加距离
							m.yr.map((itm,i) => {
								itm.mi = (map.getDistance(point,itm.point)).toFixed(0)
							})
							//把查询到的数据渲染到数组
							this.typeArr.push(m);
						}
					});
				}
			});
			local.searchNearby(keywords, point , radius);
		},
		returnFloat1(value){
			value = Math.round(parseFloat(value) * 10) / 10;
			if(value.toString().indexOf(".") < 0) {
				value = value.toString() + "";
			}
			return value;
		},
		//根据楼盘id ，获取基本信息
		getLoupanData () {
			var id  = this.$route.params.id;
				api.getLoupanData({},id).then((res) =>{
					if(res.status == 200){
						//楼盘信息
						this.obj = res.data;
						 //诸葛  --- 打开埋点
						this.zhugeBury();
						//创建地图
						this.mapFn();
					}
				});
		},
    //诸葛  --- 打开埋点
    zhugeBury () {
      zhuge.track('打开位置及周边详情页', {
        '当前页面' : '位置及周边详情页',
        '所属模块' : '楼盘',
        '楼盘ID'   : this.obj.id,
        '楼盘名称' : this.obj.name
      });
    }
	},
	mounted (){
		//根据楼盘id ，获取基本信息
		this.getLoupanData();
	}
}
	
</script>
<style lang="less" scoped>
.peitao_wrap{
	background: #F4F4F4;
	padding-top: 4.4rem;
	.smBox{
		padding: 1rem 1rem 0;
		font-size: .9rem;
		color: #83868f;
		line-height: 1.7rem;
		background: #F4F4F4;
		width:100%;
		height: 5rem;
	}
}
</style>
