<template>
  <div class="brand wrap">
		<!-- 楼盘吸顶1 -->
		<header-text :name="obj.name" :headFlag="true" v-show="xifuAsync"></header-text>
		<div class="main">
			<div class="head" id="head">
				<img src="/static/assets/images/brand-detail.png" alt="">
				<p class="absolute">
					<a href="javascript:;" onclick="window.history.go(-1)" class="goback"><i class="iconfont icon-jiantou4 return transverse_center_center"></i></a>
					<span class="zhongxin transverse_center_center"><i class="iconfont icon-ren"></i></span>
				</p>
				<div class="detail" v-SrcollsShow="xifuFn">
					<div class="item-name">
						<p class="title"><span class="name">{{obj.name}}</span><span class="status transverse_center_center">代售</span></p>
						<p><label>别名：</label><span>{{obj.item_alias}}</span></p>
						<p><label>指导价：</label><span>12888元/㎡</span><span class="time">（{{obj.price_updated_at}}更新）</span></p>
						<p>
							<router-link to="/loupan/sale" class="special">特卖房5套，去抢购！</router-link>
						</p>
						<p class="labels">
							<span class="transverse_center_center" v-for="(m,ind) in obj.labels" :key="ind">{{m}}</span>
							<!-- <span class="transverse_center_center">住宅</span> -->
						</p>
					</div>
					<div class="item-detail">
						<p><label>主力户型：</label><span>二居（89㎡）、三居（117㎡）</span></p>
						<p><label>开盘时间：</label><span>{{obj.open_date}}</span></p>
						<p><label>交房时间：</label><span>{{obj.task_date}}</span></p>
						<p><label>开发商：</label><span>{{obj.developer}}</span></p>
						<div class="address transverse_fen">
						<p><label>位置</label>：<span>{{obj.detail_addres}}</span></p>
						<i class="iconfont icon-iconfontdingwei dingwei"></i>
					</div>
					<p class="button slipeBtn" @click="showFn">{{ btn }}</p>
					</div>
				</div>
			</div>
			<div class="border biaoji"></div>
			<!-- 更多详情 -->
			<div class="item_info" v-show="detailFlag">
				<transition name="kenzo2">
					<div v-show="flag">
						<div class="moreInfo border1">
							<p><label>物业类型</label>：<span>{{obj.property_type}}</span></p>
							<p><label>装修状况</label>：<span>{{obj.decoration	}}</span></p>
							<p><label>均价</label>：<span>{{obj.average_price}}</span></p>
							<p><label>总价</label>：<span>{{obj.total_price}}</span></p>
							<p><label>首付</label>：<span>{{obj.down_payment}}</span></p>
							<p><label>占地面积</label>：<span>{{obj.covers_area}}</span></p>
							<p><label>电梯</label>：<span>北京京城广厦房地产</span></p>
						</div>
						<div class="moreInfo border1">
							<p><label>车位数量</label>：<span>{{obj.parking_count}}</span></p>
							<p><label>绿化率</label>：<span>{{obj.green_ratio}}</span></p>
							<p><label>容积率</label>：<span>{{obj.volume_ratio}}</span></p>
							<p><label>物业公司</label>：<span>{{obj.wuye_company}}</span></p>
							<p><label>产权年限</label>：<span>{{obj.year}}</span></p>
							<p><label>供暖方式</label>：<span>{{obj.supply_heat_way}}</span></p>
							<p><label>供电方式</label>：<span>{{obj.supply_power_way	}}</span></p>
							<p><label>供水方式</label>：<span>{{obj.supply_water_way}}</span></p>
							<p><label>供气方式</label>：<span>{{obj.supply_gas_way}}</span></p>
							<p><label>建筑类别</label>：<span>{{obj.build_category}}</span></p>
							<p><label>规划户数</label>：<span>{{obj.house_count}}</span></p>
							<p><label>当期户数</label>：<span>{{obj.current_house_count}}</span></p>
							<p><label>周边设施</label>：<span>北京京城广厦房地产</span></p>
						</div>
					</div>
				</transition>
			</div>
			<!-- 计算器 -->
			<div class="jisuanqi transverse_fen_center">
				<span class="transverse_center_center">房贷计算器</span>
				<span class="transverse_center_center">测试购房资格</span>
				<!-- 未登录有，已登陆没有约车 -->
				<span class="transverse_center_center">预约看房专车</span>
			</div>
			<!-- 开发商 -->
			<div class="layoutDeve public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">开发商品牌信息</span>
					<!-- <a href="">更多<i class="iconfont icon-right-shixin gengduo"></i></a> -->
				</div>
				<developer-info></developer-info>
			</div>
			<!-- 活动入口 -->
			<div class="active public_detail">
				<img src="/static/assets/images/active.png" alt="">
			</div>
			<!-- 户型 -->
			<div class="layoutHuxing public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">户型</span>
					<router-link :to="`/${cityName}/loupan/huxing/${obj.id}`" class="gengduo">全部<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<huxing-img :arr="huxingArr"></huxing-img>
			</div>
			<div class="layoutFangjia public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">一房一价</span>
					<router-link :to="`/${cityName}/loupan/price/${obj.id}`" class="gengduo">全部<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<item-price></item-price>
			</div>
			<!-- 位置及周边 -->
			<div class="layoutMap public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">位置及周边</span>
					<div class="daohang">
						<a :href="daohang">导航</a>
						<router-link :to="`/${cityName}/loupan/map_detail/${obj.id}`" class="gengduo">地图<i class="iconfont icon-right-shixin"></i></router-link>
					</div>
				</div>
				<map-zhou :obj="mapObj"></map-zhou>
			</div>
			<!-- 楼盘评测 -->
			<div class="layoutCeping public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">楼盘评测</span>
					<!-- <router-link to="/loupan/evaluate/2" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link> -->
				</div>
				<item-test :arr="[0]"></item-test>
			</div>
			<!-- 楼盘动态 -->
			<div class="layoutDongtai public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">楼盘动态</span>
					<router-link :to="`/${cityName}/loupan/dongtai`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<item-dongtai></item-dongtai>
			</div>
			<!-- 点评 -->
			<div class="layoutDianping public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">点评</span>
					<div class="daohang">
						<a href="">写点评</a>
						<router-link :to="`/${cityName}/loupan/comment`" class="gengduo">全部<i class="iconfont icon-right-shixin"></i></router-link>
					</div>
				</div>
				<dian-ping></dian-ping>
			</div>
			<!-- 谁在这里买房 -->
			<div class="layoutEchart public_detail">
				<div class="header border">
					<span class="title">谁在这里买房</span>
				</div>
				<count-img></count-img>
			</div>
			<!-- 择居顾问 -->
			<div class="layoutAdviser public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">择居顾问</span>
					<router-link :to="`/${cityName}/loupan/dongtai`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<adviser-swiper v-if="guwenArr.length>2" :arr = "guwenArr"></adviser-swiper>
				<adviser-list v-else :arr="guwenArr"></adviser-list>
			</div>
			<!-- 择居故事 -->
			<div class="layoutStory public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">择居故事</span>
					<router-link :to="`/${cityName}/loupan/story`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<zeju-story></zeju-story>
			</div>
			<!-- 楼盘吸顶2 -->
			<!-- <div class="fixedHead" v-show="xifuAsync">
				<div id="nav">
					<a href="javascript:;" v-for="(k,index) in homeArr"  :key="k.id" @click="jump(index,k)" :class="{'check':navText == k.name}">{{ k.name }}</a>
				</div>
			</div> -->
		</div>
		<footer-btns v-show="xifuAsync" :type="2"></footer-btns>
	</div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import HistoryData   from '@/assets/javascripts/history.js';
import developerInfo from '@/components/base/developer/developer_info.vue';//开发商
import huxingImg     from '@/views/loupan/huxing/huxing_nav.vue';//户型图
import itemPrice		 from '@/views/loupan/price/item_price.vue';//一房一价
import mapZhou       from '@/views/loupan/map/map.vue';//地图
import itemTest      from '@/views/loupan/evaluate/evaluate_list.vue';//评测
import itemDongtai   from '@/views/loupan/dongtai/dongtai_list.vue';//动态
import dianPing      from '@/views/loupan/comment/comment_list.vue';//点评
import countImg      from '@/components/base/echarts/count_img.vue';//统计图
import adviserSwiper from '@/views/adviser/items/adviser_swiper.vue';//三个以上 -- 顾问
import adviserList   from '@/views/adviser/items/adviser_list.vue';	//三个以下 -- 顾问
import zejuStory     from '@/views/loupan/story/story_anchor.vue';//择居故事
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
import headerText    from '@/components/base/header/header_text.vue';
export default {
	components: {
		developerInfo,
		huxingImg,
		itemPrice,
		mapZhou,
		itemTest,
		itemDongtai,
		dianPing,
		countImg,
		adviserSwiper,
		adviserList,
		zejuStory,
		footerBtns,
		headerText,//楼盘吸顶
	},
  computed : {...mapGetters(['cityName'])},
  data (){
		return {
			btn : '更多详情',
			flag: true,
			daohang: '',
			detailFlag: false,
			navText  : '户型',
			xifuAsync: false,
			guwenArr : [1,2],
			obj : {},//接收楼盘详情数据
			swiperOption: {
				direction : 'vertical',//垂直
			},
			huxingArr : [] ,
			mapObj  : {}
		}
	},
	watch : {
	'$route' (to) {
		if(to.name == '品牌馆详情页'){
				//获取楼盘详细信息
				this.getLoupanDetail();
			}
		}
	},
	methods :{
		showFn (){
			if(this.btn == '更多详情'){
				this.btn = '收起详情';
				this.detailFlag = true;
				let total = document.getElementsByClassName('jisuanqi')[0].offsetTop;
				let total2 = document.getElementsByClassName('jisuanqi')[0].scrollHeight;
				// 获取当前滚动条与窗体顶部的距离
				let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				let total3 = total - total2 - 15;
				let step = total / 40
				if (total > distance) {
					smoothDown()
				}
				function smoothDown (){
					if(distance < total3) {
						distance += step
						document.body.scrollTop = distance;
						document.documentElement.scrollTop = distance;
						window.pageYOffset = distance;
						setTimeout(smoothDown, 5)
					} else {
						document.body.scrollTop = total3
						document.documentElement.scrollTop = total3
						window.pageYOffset = total3
					}
				}
			}else{
				this.btn = '更多详情';
				this.detailFlag = false;
			}
		},
		xifuFn (async,scrollTop) {
			this.xifuAsync  = async;
		},
		//获取楼盘详细信息
		getLoupanDetail () {
			var id  = this.$route.params.id;
			api.getLoupanDetail({},id).then((res) =>{
				if(res.status == 200){
					HistoryData.init(res.data.id);
					this.obj = res.data;
					//户型数据
					this.huxingArr = res.data.house_types;
					//地图数据
					this.mapObj = {
						lat : this.obj.longitude,
						lng : this.obj.latitude,
						name:this.obj.name
					}
					//导航链接
					this.daohang = `http://api.map.baidu.com/geocoder?address=${this.obj.name}&output=html&src=yourCompanyName|yourAppName`;


				}
			})
		}
	},
	mounted () {
		//获取楼盘详细信息
		this.getLoupanDetail()
	}
}
</script>
<style lang="less" scoped>
	.brand{
		background: #F6F5F5;
		padding-bottom: 4.5rem;
		.head{
			position: relative;
			img{
				width: 100%;
				display: block;
			}
			.absolute{
				text-align: center;
				.goback,.zhongxin{
					position: absolute;
					color: #FFF;
				}
				.goback{
					width: 4.8rem;
					height: 5rem;
					top: 1rem;
					left: 1rem;
					.return{
						width: 2.8rem;
						height: 2.8rem;
						border-radius: 50%;
						background: rgba(0, 0, 0, 0.5);
					}
				}
				.zhongxin{
					border-radius: 50%;
					top: 1rem;
					right: 1rem;
					width: 2.8rem;
					height: 2.8rem;
					background: rgba(0, 0, 0, 0.5);
					i{
						font-size: 1.5rem;
					}
				}
			}
			.detail{
				position: absolute;
				bottom: 0;
				color: #FFF;
				padding: 0 1rem;
				width: 100%;
				.item-name{
					.title{
						display: flex;
						align-items: center;
						height: 4rem;
						.name{
							font-size: 2.4rem;
							color: #FFF;
							padding-right: .8rem;
						}
						.status{
							width: 3.7rem;
							height: 2rem;
							border: 1px solid #F63;
							border-radius: 2.9rem;
							font-size: 1.2rem;
							color: #F63;
						}
					}
					p{
						height: 2.5rem;
						label,span{
							font-size: 1.4rem;
							color: #FFF;
						}
						.time{
							font-size: 1.2rem;
						}
					}
					.special{
						font-size: 1.4rem;
						color: #F63;
						text-decoration:underline ;
					}
					.labels{
						display: flex;
						align-items: center;
						justify-content: flex-start;
						span{
							height: 2.2rem;
							font-size: 1.2rem;
							border: 1px solid #FFF;
							border-radius: 10rem;
							width:auto;
							padding:0 .6rem;
							margin-right:1rem;
							box-sizing: border-box;
							&:first-child{
								margin-right: .6rem;
							}
						}
					}
					.address{
						font-size: 1.4rem;
						color: #FFF;
					}
				}
				.item-detail{
					margin-top: 2.5rem;
					p{
						font-size: 1.4rem;
						color: #FFF;
						height: 2.3rem;
					}
					.button{
						display: flex;
						color: #F63;
						// text-align: center;
						align-items: center;
						justify-content: center;
						height: 4rem;
						padding-bottom: 1rem;
					}
				}
			}
		}
		.item_info{
			padding: 0 1rem;
			background: #FFF;
			margin-bottom: 1rem;
			.moreInfo{
				padding: .7rem 0 .5rem;
				p{
					height: 2.5rem;
					label{
						width: 6rem;
						display: inline-block;
						text-align:justify;
						font-size: 1.4rem;
						line-height: 0rem;
						color: #999;
						font-size: 1.4rem;
					}
					label:after {//兼容IOS
						content: '';
						width: 100%;
						display: inline-block;
					}
					span{
						font-size: 1.4rem;
						color: #151515;
					}
				}
			}
		}
		.jisuanqi{
			display: flex;
			background: #FFF;
			padding: 1.5rem 1rem;
			margin-bottom: 1.2rem;
			span{
				flex: 1;
				color: #F63;
				font-size: 1.4rem;
				border: 1px solid #F63;
				background: #FFF7F4;
				height: 3.6rem;
				&:first-child{
					margin-right: .5rem;
				}
				&:last-child{
					margin-left: .5rem;
				}
			}
		}
		.active{
			img{
				width: 100%;
			}
		}
	}
	.shadow{
		box-shadow: 0 0 0 0 #eee!important;
	}
</style>
