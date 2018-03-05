<template>
  <div class="map_detail">
		<!-- 楼盘吸顶1 -->
		<header-text name="位置及周边" msg="详情" :wordFlag="true" :url="`/${cityName}/loupan/map_peitao/${$route.params.id}`"></header-text>
		<div class="bigbox">
			<!-- 地图box -->
			<div id="map" class="map"></div>
			<!-- 导航btn -->
			<div class="feiji">
				<a href="javascript:;" @click.prevent="daohangFn" class="iconfont icon-daohang1 transverse_center_center"></a>
			</div>
			<!-- 页脚所有点击项 -->
			<div class="footer border1">
				<a 
					class="transverse_center_center btn"
					:class="k.clsName" 
					href="javascript:;" 
					v-for="(k,index) in btnArr" 
					:key="k.id" 
					ref="btns" 
					@click="changeBtn(index,k.name)">
					<i></i>
					<span>{{ k.name }}</span>
				</a>
			</div>
		</div>
		<!-- 提示没有，搜索结果 -->
		<div class="search_alert_box" v-show="alertInfo != ''" >{{alertInfo}}</div>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
export default {
	components: {
		headerText//楼盘吸顶
	},
  computed : {...mapGetters(['cityName'])},
  data (){
		return {
			btnArr:[
				{id: 1, name: '公交', clsName: 'bus'},
				{id: 2, name: '地铁', clsName: 'subway'},
				{id: 3, name: '学校', clsName: 'school'},
				{id: 4, name: '医院', clsName: 'hospital'},
				{id: 5, name: '银行', clsName: 'bank'},
				{id: 6, name: '购物', clsName: 'shop'},
				{id: 7, name: '房屋', clsName: 'house'},
				{id: 8, name: '嫌恶', clsName: 'xiane'}
			],
			mapName : null,//map
			point : null, //中心标注位
			alertInfo: '', //提示语
			timer    : null,//倒计时句柄
			num      : 2,//倒计时时间
			obj : {} , //获取楼盘基本信息
			btnInd : 0 ,//当前点击btn
			labelArr : [], //判断底部有几个点中项
			labelClickObj : {}//用户是否点击相同label
		}
	},
	watch : {
		'$route' (to) {
			if(to.name == '位置及周边地图页'){
				//获取楼盘详细信息
				this.getLoupanData();
			}
		}
	},
	methods:{
		//底部btn切换
		changeBtn(index,name){
			let btns=this.$refs["btns"];
			btns[index].classList.toggle('active');
			let keywords = [],
					labelObj = {
						'bus'			:'公交' ,
						'subway' 	:'地铁' ,
						'school'	:'学校' ,
						'hospital':'医院' ,		
						'bank'		:'银行' ,
						'shop' 		: '购物' ,
						'house' 	:'房屋' ,
						'xiane'		:'嫌恶'  
					},
					arr = ['bus','subway','school','hospital','bank','shop','house','xiane'];

			//循环btns , 找到所有点击项
			btns.map( (m,i) => {		
				if(m.classList.value.indexOf('active') > -1){
					//根据缩写，找到相应中文；
					arr.map( (item,ind) => {
						if(m.classList.value.indexOf(item) > -1){
							keywords.push(labelObj[item]);
						}
					});
				}
			});

			this.btnInd = index;
			//删除图标
			this.deleteLabel(keywords,labelObj[arr[index]])
			//创建标注图标
			this.buildLabel(keywords);	
		},
		//调用百度地图
		mapFn (keywords) {
			//百度地图API功能
			this.mapName = new BMap.Map("map");
			//禁用双击放大。
			this.mapName.disableDoubleClickZoom() ;
			//创建中心点
			this.coreSpot();
			//创建标注图标
			this.buildLabel(keywords);
			this.mapName.addEventListener('touchend',function(){
				this.isAlertFlag = false;
			});
		},
		//创建中心点
		coreSpot () {
			//获取中心点
			this.point = new BMap.Point(this.obj.longitude,this.obj.latitude);//动态获取经纬度
			this.mapName.centerAndZoom(this.point, 15);
			//中心点图片
			var Icon = new BMap.Icon('/static/assets/images/map_picon.png', new BMap.Size(27,32),{
				imageSize:new BMap.Size(27,35)//设置显示图像的大小
			});
			// 创建标注
			var marker = new BMap.Marker(this.point,{icon:Icon});
			// 将标注添加到地图中
			this.mapName.addOverlay(marker);             
			//给中心点，添加label
			this.coreLabel(marker);
			// marker.addEventListener('click',() =>{
			// 	this.isAlertFlag = true;
			// });
		},
		//创建标注图标
		buildLabel (keywords) {
			//诸葛  --- 筛选
			this.zhugeShaiXuan(keywords);
			var radius = 2000;
			// 百度地图API功能
			var local = new BMap.LocalSearch(this.mapName , {
				renderOptions:{
					// map: this.mapName,//搜索结果不标注在地图上
					selectFirstResult: false,//是否选择第一个检索结果
					autoViewport: true//检索结束后是否自动调整地图视野
				},
				//检索完成后的回调函数,多关键字搜索，返回数组
				onSearchComplete: (results) =>{
					//如果没有搜索条件，直接返回
					if(results == undefined){return false};
					results.map( (m,i) => {
						if(m.yr.length > 0){
							//把查询到的数据渲染到页面
							this.searchCompletes(m.yr,m.keyword);
						} else{
							//搜索失败，提示没有搜索到相关信息
							let key = m.keyword;
							this.bigNum(key);
						}
					});
				}
			});
			local.searchNearby(keywords, this.point , radius);
		},
		//删除图标
		deleteLabel (arr,str) {
			//通过数组长度，判断显示还是隐藏
			if(this.labelArr.length >=arr.length){
				let arr=this.mapName.getOverlays();
						arr.map((m,i) =>{
							//判断遮盖物类型
							if(m.Mb == 'overlay'){
								//类型为 ，隐藏的类型
								if(m.getTitle() == str){
									this.mapName.removeOverlay(m);
									//判断删除label时，是否与提示框相同
									if(m.point.lat == this.labelClickObj.lat && m.point.lng == m.point.lng){
										//删除所有label
										this.shanLabel();
									}
								}
							}
						});
			} else{
				//增加显示时
				this.labelArr = arr;
			}
		},
		//给中心点添加信息框
		coreLabel (marker) {
			let html = `<div class="label_wrap">
										<div class="label_main transverse_center_center">
											<section class="lef">
												<h5 class="text_ove1">${this.obj.name}</h5>
												<p>地址：${this.obj.address}</p>
											</section>
											<section class="rig ">
												<a class="transverse_center_center" href="javascript:;">
												<i class="iconfont icon-daohang2"></i>导航</a>
											</section>
										</div>
									</div>`;
						var label = new BMap.Label(html,{position:this.point});

								label.setStyle({
									border: 'none',
									background: '#fff',
									width:'auto',
									height:'auto',
									whiteSpace:'normal'
								});
						//默认添加中心点的label
						this.mapName.addOverlay(label);
						this.labelClickObj = this.point;
						//添加label，点击事件
						this.clickLabel(marker,label);
						label.addEventListener('click',() => {
							this.daohangFn();
						});
		},
		//把查询到的label渲染到页面
		searchCompletes(arr,str){
			//动态改变 label的图片
			let iconImg = this.labelImg(str);
			arr.map( (m,i) => {
				//创建自定义标注
				let pt = new BMap.Point(m.point.lng, m.point.lat),
						myIcon = new BMap.Icon(iconImg, new BMap.Size(24,36),{
							imageSize:new BMap.Size(24,36)//设置显示图像的大小
						}),
				 		// 创建标注
						marker = new BMap.Marker(pt,{icon:myIcon}); 
						this.mapName.addOverlay(marker);
						//添加标注title,用作删除判断，必须有
						marker.setTitle(str);
						let html = `<div class="label_wrap">
													<div class="label_main">
														<h5 class="text_ove1">${m.title}</h5>
														<p>地址：${m.address}</p>
														<p>距离：距该小区直线距离${(this.mapName.getDistance(this.point,m.point).toFixed(0))}米</p>
													</div>
												</div>`;
												
						var point = marker.point;
						var label = new BMap.Label(html,{position:point});

								label.setStyle({
									border: 'none',
									background: '#fff',
									width:'auto',
									height:'auto',
									whiteSpace:'normal'
								});
						//添加label，点击事件
						this.clickLabel(marker,label);
			});
		},
		//点击标注
		clickLabel (marker,label){
			marker.addEventListener('click',(e) =>{
				//判断点击的label，新的还是当前的
			  if(this.labelClickObj.lat != marker.point.lat && this.labelClickObj.lng != marker.point.lng){
					this.labelClickObj = marker.point;
					//删除所有label
					this.shanLabel();
					//创建新的label
					this.mapName.addOverlay(label);
					//当前label，移动到中间位置
					this.mapName.panTo(new BMap.Point(marker.point.lng,marker.point.lat));
				} else {
					//删除所有label
					this.shanLabel(label);
					//重置
					this.labelClickObj = {};
				}
			});
		},
		//删除所有label
		shanLabel () {
			let allOverlay =this.mapName.getOverlays();
					allOverlay.map((m,i) => {
						if(m.toString() == '[object Label]' && m.point !=null){
							this.mapName.removeOverlay(m);
						}
					});
		},
		//动态改变 label的图片
		labelImg (str) {
			let labelObj = {
					'公交' : 'bus',
					'地铁' : 'subway',
					'学校' : 'school',
					'医院' : 'hospital',		
					'银行' : 'bank',
					'购物' : 'shop',
					'房屋' : 'house',
					'嫌恶' : 'xiane'
				}
			return `/static/assets/images/${labelObj[str]}.png`;
		},
		//搜索失败，提示没有搜索到相关信息
		bigNum (key){
			let btn = this.$refs['btns'];
			this.num =2;
			clearInterval(this.timer);
			//提示没有搜到结果
			this.alertInfo = `当前区域暂无${key}信息`;
			//删除当前btn的样式，没有检索结果
			btn[this.btnInd].classList.remove('active');
			//两秒后，关闭提醒
			this.timer = setInterval( () => {
				this.num -- ;
				if(this.num == 0){
					clearInterval(this.timer);
					this.alertInfo  = '';
				}
			},1000);
		},
		//根据楼盘id ，获取基本信息
		getLoupanData () {
			var id  = this.$route.params.id;
				api.getLoupanData({},id).then((res) =>{
					if(res.status == 200){
						this.obj = res.data;
						//诸葛  --- 打开埋点
						this.zhugeBury();
						//默认搜索公交
						let btns=this.$refs["btns"];
								btns[0].classList.toggle('active');
						//调用百度地图
						this.mapFn(['公交']);
					}
				});
		},
    //诸葛  --- 打开埋点
    zhugeBury () {
      zhuge.track('打开位置及周边地图页', {
        '当前页面' : '位置及周边地图页',
        '所属模块' : '楼盘',
        '楼盘ID'   : this.obj.id,
        '楼盘名称' : this.obj.name
      });
    },
    //诸葛  --- 筛选
    zhugeShaiXuan (arr) {
      zhuge.track('筛选位置及周边', {
        '当前页面' : '位置及周边地图页',
        '所属模块' : '楼盘',
        '楼盘ID'   : this.obj.id,
        '楼盘名称' : this.obj.name,
        '筛选内容' : arr.join('/')
      });
    },
    //诸葛  ---导航
    daohangFn () {
      zhuge.track('点击地图导航', {
        '当前页面' : '位置及周边地图页',
        '所属模块' : '楼盘',
				'导航到'   : this.obj.name
      }, () => {
				window.location.href = `http://api.map.baidu.com/geocoder?address=${this.obj.guide_address}&output=html&src=yourCompanyName|yourAppName`;
			});
    }
	},
	mounted () {
		//根据楼盘id ，获取基本信息
		this.getLoupanData();
	}
}
</script>
<style lang="less" scoped>
.map_detail{
	.bigbox{
		.map{
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.feiji{
			position: fixed;
			bottom: 5.5rem;
			left: 1.5rem;
			background: #FFF;
			width:3rem;
			height: 3rem;
			border-radius: 50%;
			box-shadow: 2px 3px 5px rgba(90,90,90,0.2);
			a{
				color: #B3B6BE;
				font-size: 2.5rem;
				height: 100%;
				padding-top: .4rem;
			}
		}
		.footer{
			width: 100%;
			height: 4.5rem;
			display: flex;
			position: fixed;
			bottom: 0;
			justify-content: center;
			align-items: center;
			z-index: 3;
			background: #FFF;
			.btn{
				flex: 1;
				color: #333;
				flex-direction: column;
				i{
					width: 2.5rem;
					height: 2.5rem;
					background: url('/static/assets/images/icon-vici2.png') no-repeat;
					background-size: auto 5rem;
					margin: 0 auto;
				}
			}
			.bus i{ background-position: 0 0;}
			.subway i{ background-position: -2.5rem 0;}
			.school i{ background-position: -5rem 0;}
			.hospital i{ background-position: -7.5rem 0;}
			.bank i{ background-position: -10rem 0;}
			.shop i{ background-position: -12.5rem 0;}
			.house i{ background-position: -15rem 0;}
			.xiane i{ background-position: -17.5rem 0;}
			.bus.active i{ background-position: 0 -2.5rem;}
			.subway.active i{ background-position: -2.5rem -2.5rem;}
			.school.active i{ background-position: -5rem -2.5rem;}
			.hospital.active i{ background-position: -7.5rem -2.5rem;}
			.bank.active i{ background-position: -10rem -2.5rem;}
			.shop.active i{ background-position: -12.5rem -2.5rem;}
			.house.active i{ background-position: -15rem -2.5rem;}
			.xiane.active i{ background-position: -17.5rem -2.5rem;}
		}
		.alert_box{
			position: absolute;
			padding: 1rem;
			width: 25rem;
			color: #fff;
			background: rgba(60,63,70,.9);
			border-radius: 4px;
			z-index: 999;
			left: 0;
			right: 0;
			margin: 0 auto;
			top: 27rem;
			display: flex;
			.left{
				border-right: 1px solid #b8b9bc;
				h3{
					font-size: 1.4rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 20rem;
				}
				p{
					font-size: 1.1rem;
					color: #cccfd8;
				}
			}
			.right{
				width: 7rem;
				margin-left: 1rem;
				a{
					width: 5rem;
					height: 2.3rem;
					background: #ff6666;
					color: #FFF;
					font-size: 1.3rem;

				}
			}
		}
	}
	// 提示搜索没有结果
	.search_alert_box{
		position: fixed;
		top: 50%;
		color: #FFF;
		display: flex;
		width: auto;
		left:50%;
		background: rgba(0, 0, 0,0.7);
		font-size:1.6rem;
		padding:1rem;
		transform: translate(-50%,-50%);
		border-radius: .6rem;
	}
}
</style>
<style lang="less" >
//地图标注自定义样式
.label_wrap{
	width:22rem;
	height:auto;
	background:rgba(0,0,0,0.8);
	color:#fff;
	border-radius:.6rem;
	position: absolute;
	bottom:0;
	transform: translate(-50%,-3rem);
	.label_main{
		position: relative;
		width:100%;
		height: 100%;
		padding:.6rem 1rem;
		.lef{
			border-right:1px solid #fff;
			padding-right:.4rem;
			flex:1;
		}
		.rig{
			background:#f63;
			height: 100%;
			width:6rem;
			height: 2.6rem;
			margin-left:1rem;
			a{
				width:100%;
				height: 100%;
				color:#fff;
				font-size:1.2rem;
				i{
					font-size:2rem;
					margin-right:.4rem;
				}
			}
		}
		&:after{
			content:'';
			position: absolute;
			width:0;
			height: 0;
			border-left: .5rem solid transparent;
			border-right: .5rem solid transparent;
			border-top: .8rem solid rgba(0,0,0,0.8);
			bottom:0;
			left: 50%;
			transform: translate(-50%,.8rem);
		}
		h5{
			font-size:1.6rem;
			margin-bottom:.6rem;
		}
		p{
			font-size:1.2rem;
			margin-bottom:.6rem;
		}
	}
}
</style>
