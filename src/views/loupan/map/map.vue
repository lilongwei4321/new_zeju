<template>
  <div class="map">
		<router-link :to="`/${cityName}/loupan/map_detail/${obj.id}`">
			<div id="mapimg"></div>
		</router-link>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
	export default {
		props : {
			obj : {
				type : Object,
				default : function(){
					return {}
				}
			}
		},
  	computed : {...mapGetters(['cityName'])},
		methods :{
			//创建百度地图
			init () {
				// 百度地图API功能
				var map = new BMap.Map("mapimg");
				var point = new BMap.Point(this.obj.lng,this.obj.lat);
				map.centerAndZoom(point, 15);
				//禁止拖拽
				map.disableDragging();
				//禁用双击放大。
				map.disableDoubleClickZoom() ;
				// 创建标注
				var marker = new BMap.Marker(point);  
				// 将标注添加到地图中
				map.addOverlay(marker);
				//创建label             
				this.createlabel(marker);
				//map 点击事件
				this.mapClickFn(map);
			},
			//创建label
			createlabel (marker) {
				var label = new BMap.Label(this.obj.name,{offset:new BMap.Size(20,-10)});
				label.setStyle({
					fontSize: '14px',
					border: 'none',
					background: 'rgba(64,64,64,.7)',
					color: '#FFF',
					padding: '4px 10px',
					borderRadius: '4px'
				})
				marker.setLabel(label);
			},
			//map 点击事件
			mapClickFn (map) {
				map.addEventListener("click", (e) =>{
					//是否点击 地图空白，还是label
					if(e.overlay){  
						window.location.href = this.obj.addres;
					}  
				})
			}
 		},
		watch : {
			obj () {
				//obj 有数据是 创建
				this.init()
			}
		},
		mounted () {
			//初始化创建
			this.init()
		}
	}
</script>
<style lang="less" scoped>
	.map{
		#mapimg{
			height: 25rem;
		}
	}
</style>
