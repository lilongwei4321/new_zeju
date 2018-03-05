<!-- 特价楼盘详情 -->
<template>
	<div class="detail wrap">
		<div class="main"  v-ScrollDetail="dongFn"> 
			<header class="headerInfo public_detail">
				<div class="itme_img">
					<a href="javascript:;" onclick="window.history.go(-1)" class="goback"><i class="iconfont icon-jiantou4 return"></i></a>
					<span class="youhui">{{obj.discount_info}}</span>
					<router-link :to="`/${cityName}/loupan/pic_lunbo/${obj.id}`">
						<span class="moreimg2">查看图册(200)</span>
						<img src="/static/assets/images/loupan.jpg" alt="">
					</router-link>
				</div>
				<div class="itemName">
					<div class="louhao">
						<h3>{{obj.name}}</h3>
						<p><label>别&nbsp;&nbsp;&nbsp;&nbsp;名：</label><span>{{obj.item_alias}}</span></p>
					</div>	
					<div class="count_down">
						<p>距抢购结束倒计时</p>
						<p>
							<span>{{daoDate.shi}}</span><b>:</b>
							<span>{{daoDate.fen}}</span><b>:</b>
							<span>{{daoDate.miao}}</span>
						</p>
					</div>
				</div>
				<div class="dongtaiqiang">
					<swiper class="qiangdongtai" :options="swiperOption"  ref="mySwiper" v-show="qiangArr.length>0">
						<swiper-slide v-for="n in qiangArr" :key="n.name">
							<ul>
								<li>{{n.name}}</li>
							</ul>
						</swiper-slide>
					</swiper>
				</div>

				<div class="xiangqing" >
					<div class="transverse_fen tejia">
						<p class="price"><i class="iconfont icon-sale"></i><span class="money">7500</span>元/㎡</p>
						<p class="start">2017年09月10日13:00特价开抢</p>
					</div>
					<div class="address transverse_fen">
						<p><span>北京市朝阳区通惠河北路31号泰珍嘉大厦</span></p>
						<i class="iconfont icon-dingwei dingwei"></i>
					</div>
					<div class="transverse_fen">
						<div class="labels">
							<span :class="'text_back'+(key+1)" v-for="(m,key) in obj.labels" :key="key">{{m}}</span>
						</div>
					</div>
					<!-- <transition name="kenzo2"> -->
						<div v-show="flag">
							<div class="moreInfo border1">
								<p><label>装修状况</label>：<span>{{obj.decoration}}</span></p>
								<p><label>均价</label>：<span>{{obj.average_price}}</span></p>
								<p><label>总价</label>：<span>{{obj.total_price}}</span></p>
								<p><label>首付</label>：<span>{{obj.down_payment}}</span></p>
							</div>
							<div class="moreInfo border1">
								<p><label>车位数</label>：<span>{{obj.parking_count}}</span></p>
								<p><label>绿化率</label>：<span>{{obj.green_ratio}}</span></p>
								<p><label>容积率</label>：<span>{{obj.volume_ratio}}</span></p>
								<p><label>物业公司</label>：<span>{{obj.wuye_company}}</span></p>
								<p><label>产权年限</label>：<span>{{obj.year}}</span></p>
								<p><label>供暖方式</label>：<span>{{obj.supply_heat_way}}</span></p>
								<p><label>供电方式</label>：<span>{{obj.supply_power_way}}</span></p>
								<p><label>供水方式</label>：<span>{{obj.supply_water_way}}</span></p>
								<p><label>供气方式</label>：<span>{{obj.supply_gas_way}}</span></p>
								<p><label>建筑类型</label>：<span>{{obj.build_category}}</span></p>
								<p><label>占地面积</label>：<span>{{obj.covers_area}}</span></p>
								<p><label>规划户数</label>：<span>{{obj.house_count}}</span></p>
								<p><label>当前户数</label>：<span>{{obj.current_house_count}}</span></p>
							</div>
						</div>
        			<!-- </transition> -->
					<p class="button" @click="show">{{ btn }}</p>
				</div>
			</header>
			<!-- 户型 -->
			<div class=" public_detail" v-SrcollsShow="{fn:xifuFn,obj:{num:110}}">
				<div class="header border transverse_fen_ya">
					<span class="title">户型</span>
					<!-- <router-link to="/loupan/huxing">更多<i class="iconfont icon-right-shixin gengduo"></i></router-link> -->
				</div>
				<huxing-img :arr="huxingArr"></huxing-img>
			</div>
			<!-- 开发商品牌信息 -->
			<div class="layoutDeve public_detail" >
				<div class="header border transverse_fen_ya">
					<span class="title">开发商品牌信息</span>
					<!-- <a href="">更多<i class="iconfont icon-right-shixin gengduo"></i></a> -->
				</div>
				<developer-info></developer-info>
			</div>
			<!-- 位置及周边 -->
			<div class="layoutMap public_detail" >
				<div class="header border transverse_fen_ya">
					<span class="title">位置及周边</span>
					<div class="daohang">
						<a :href="daohang">导航</a>
						<router-link :to="`/${cityName}/loupan/map_detail`" class="gengduo">地图<i class="iconfont icon-right-shixin"></i></router-link>
					</div>
				</div>
				<map-zhou></map-zhou>
			</div>
			<!-- 谁在这里买房 -->
			<div class="layoutEchart public_detail" >
				<div class="header border">
					<span class="title">谁在这里买房</span>
				</div>
				<count-img></count-img>
			</div>
			<!-- 楼盘测评 -->
			<div class="layoutCeping public_detail" >
				<div class="header border transverse_fen_ya">
					<span class="title">楼盘评测</span>
					<router-link :to="`/${cityName}/loupan/evaluate`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<itme-test></itme-test>
			</div>
			<!-- 楼盘动态 -->
			<div class="layoutDongtai public_detail" >
				<div class="header border transverse_fen_ya">
					<span class="title">楼盘动态</span>
					<router-link :to="`/${cityName}/loupan/dongtai`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<itme-dongtai></itme-dongtai>
			</div>
			<!-- 点评 -->
			<div class="layoutDianping public_detail" >
				<div class="header border transverse_fen_ya">
					<span class="title">点评</span>
					<div class="daohang">
						<router-link :to="`/${cityName}/loupan/write_comment`">写点评</router-link>
						<router-link :to="`/${cityName}/loupan/comment`">全部<i class="iconfont icon-right-shixin gengduo"></i></router-link>
					</div>
				</div>
				<dian-ping></dian-ping>
			</div>
			<!-- 择居故事 -->
			<div class="layoutStory public_detail" >
				<div class="header border transverse_fen_ya">
					<span class="title">择居故事</span>
					<router-link :to="`/${cityName}/loupan/story`" class="gengduo">更多<i class="iconfont icon-right-shixin gengduo"></i></router-link>
				</div>
				<zeju-story></zeju-story>
			</div>
			<!-- 楼盘吸顶1 -->
			<header-text :name="name" :headFlag="true" v-show="xifuAsync"></header-text>
			<!-- 楼盘吸顶2 -->
			<div class="fixedHead" v-show="xifuAsync" id="fixedHead">
				<div id="nav">
					<a href="javascript:;" 
						v-for="(k,index) in homeArr"  
						:key="k.id" 
						@click="jump(index,k)" 
						:class="{'check':k.active}"
					>{{ k.name }}</a>
				</div>
			</div>
		</div>
		<footer-btns v-show="xifuAsync" loupanStyle="特卖房" :obj="footerObj"></footer-btns>
	</div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Weizhi } from '@/assets/javascripts/scroll.js';
import HistoryData   from '@/assets/javascripts/history.js';
// 时间 方法
import GetDate from '@/assets/javascripts/date.js';
import huxingImg     from '@/views/loupan/huxing/huxing_img.vue';
import developerInfo from '@/components/base/developer/developer_info.vue';
import mapZhou       from '@/views/loupan/map/map.vue';
import countImg      from '@/components/base/echarts/count_img.vue';
import itmeDongtai   from '@/views/loupan/dongtai/dongtai_list.vue';
import itmeTest      from '@/views/loupan/evaluate/evaluate_list.vue';
import dianPing      from '@/views/loupan/comment/comment_list.vue';
import zejuStory     from '@/views/loupan/story/story_anchor.vue';
import headerText    from '@/components/base/header/header_text.vue';//楼栋信息
import footerBtns from '@/components/base/footer/footer_btns.vue';//引用  公用页脚
export default {
	data () {
		return {
			huxingArr:[0],
			qiangArr: [
				{name : '石d女士（136****0809）也抢购该楼盘'},
				{name : '石q女士（136****0809）也抢购该楼盘'},
				{name : '石w女士（136****0809）也抢购该楼盘'}
			],
			swiperOption: {
				loop:true,//环路
				direction : 'vertical',//垂直
				autoplay  : 3000,//3秒切换
				speed     : 1000 //切换速度
			},
			flag: false,
			btn : '更多详情',
			name: '龙溪家园',
			daohang: '',//导航请求链接
			xifuAsync  : false,//吸附导航是否显示
			navText    : '户型',
			homeArr: [
				{id   : 'layoutHuxing',name : '户型',active:true},
				{id   : 'layoutDeve',name : '开发商品牌信息',active:false},
				{id   : 'layoutMap',name : '位置及周边',active:false},
				{id   : 'layoutEchart',name : '谁在这里买房',active:false},
				{id   : 'layoutCeping',name : '楼盘评测',active:false},
				{id   : 'layoutDongtai',name : '楼盘动态',active:false},
				{id   : 'layoutDianping',name : '点评',active:false},
				{id   : 'layoutStory',name : '择居故事',active:false}
			],
			indAsync : 0 ,
			clickAsync : false,
			daoDate : {
				shi : '00',
				fen : '00',
				miao: '00'
			},
			obj : {},//楼盘详情数据
			footerObj : {},//页脚数据
		}
	},
  computed : {...mapGetters(['cityName'])},
	components: {
		swiper,
		swiperSlide,
		huxingImg,//户型图
		developerInfo,//开发商信息
		mapZhou,//周边
		countImg,//eachart 在哪里买房
		itmeTest,//楼盘评测
		itmeDongtai,//楼盘动态
		dianPing,//点评
		zejuStory,//择居故事
		headerText,//楼盘吸顶
		footerBtns
	},
	methods : {
		show (){
			if(this.btn == '更多详情'){
				this.btn  = '收起详情';
				this.flag = true;
			}else{
				this.btn = '更多详情';
				this.flag = false;
			}
		},
		//重置 
		arrReset (obj) {
			this.homeArr.map((m)=>{
				if(m.name != obj.name){
					m.active =false;
				} else{
					m.active =true;
				}
			});
		},
		jump (index,obj) {			
			//判断是否点击相同位置
			if(index == this.indAsync){return false}
			this.clickAsync = true;
			this.indAsync = index;
			//点击 重置
			this.arrReset(obj);
			//滚动位置
			Weizhi(index,obj,() =>{
				this.clickAsync = false;
			});
		},
		xifuFn (async,scrollTop) {
			this.xifuAsync  = async;
		},
		//横向滚动、
		dongFn (ind) {
			if( this.indAsync == ind){return false}
			this.indAsync = ind;
			//重置
			if(ind >=0 && !this.clickAsync){
				this.arrReset(this.homeArr[ind])
			}
		},
		//倒计时
		daoDateFn () {
			let num = new Date()*1,
					obj = {
						now : num,
						end : num+2000000
					},
					timer = null;
					
					timer = setInterval(() => {
						let date = GetDate.init(obj);
						this.daoDate =date;
						obj.now = obj.now + 1000;
						if(obj.now > obj.end){
							clearInterval(timer)
						}
					},1000);
		},
		//请求楼盘详情数据
		getLoupanDetail () {
			var id  = this.$route.params.id;
			api.getLoupanDetail({},id).then((res) =>{
				if(res.status == 200){
					HistoryData.init(res.data.id);
					let obj = res.data;
					this.obj = obj;
					//地图导航
					this.daohang =  `http://api.map.baidu.com/geocoder?address=${obj.detail_addres}&output=html&src=yourCompanyName|yourAppName`;
					//地图数据
					this.mapObj = {
						addres :this.daohang,
						name : obj.name,
						lat : obj.latitude,
						lng : obj.longitude 
					};
					//页脚相关数据
					this.footerObj = {
						id: obj.id,
						ext_phone:obj.ext_phone,
						host_phone:obj.host_phone,
						nowName : this.$route.name,
						type : 2
					}
					//获取同价位楼盘数据
					// this.gitsamePriceData(obj.id);
				}
			});
		}
	},
	mounted () {
		this.daoDateFn();
		//请求楼盘详情数据
		this.getLoupanDetail();
	}
}
</script>
<style lang="less" scoped>
.detail{
	background: #F6F5F5;
	padding-bottom: 4.5rem;
	.headerInfo{
		background: #FFF;
		margin-bottom: 1.2rem;
		.itme_img{
			position: relative;
			.goback,.youhui,.moreimg2{
				position: absolute;
				text-align: center;
				color: #FFF;
			}
			.goback{
				width: 4.8rem;
				height: 5rem;
				top: 1rem;
				left: 0;
				.return{
					display: inline-block;
					width: 2.8rem;
					line-height: 2.8rem;
					border-radius: 50%;
					background: rgba(0, 0, 0, 0.5);
				}
			}
			.youhui{
				display: flex;
				align-items: center;
				height: 4.4rem;
				background: #FF3235;
				border-radius: 2rem 0 0 2rem;
				font-size: 2.4rem;
				padding: 0 1rem .3rem;
				top: 1rem;
				right: 0;
				background: linear-gradient(to right, #DA2AF4 , #FC4A4D); /* 标准的语法 */
			}
			.moreimg2{
				background: rgba(0, 0, 0, 0.5);
				padding: 0 1rem;
				line-height: 1.8rem;
				border-radius: 1.8rem;
				bottom: 1rem;
				right: 1rem;
			}
			img{
				width: 100%;
				display: block;
			}
		}
		.itemName{
			display: flex;
			height: 6.8rem;
			.louhao{
				flex: 1;
				background: red;
				padding: 1.3rem 1rem;
				align-items: center;
				background: linear-gradient(to right, #FF5A5F , #FF181F); /* 标准的语法 */
				h3{
					font-size: 2rem;
					color: #FFF;
					height: 3rem;
				}
				p{
					label,span{
						color: #FFF;
					}
				}
			}
			.count_down{
				background: #FFD1D2;
				padding: 1.3rem 1.6rem;
				justify-content: center;
				align-items: center;
				P{
					display: flex;
					flex-direction: flex;
					justify-content: space-between;
					&:last-child{
						display: flex;
						align-items: center;
						padding-bottom:.4rem;
						span{
							background: #000;
							border-radius: .2rem;
							font-size: 1.2rem;
							color: #fff;
							display: block;
							padding:.4rem ;
						}
						b{
							display: block;
							font-size:2rem;
						}
					}
					&:first-child{
						font-size: 1rem;
						color: #666;
						height: 2rem;
					}
				}
			}
		}
		.dongtaiqiang{
			.qiangdongtai{
				background: rgba(0, 0, 0, 0.05);
				width: 100%;
				height: 3.6rem;
				overflow: hidden;
				ul>li{
						font-size: 1.4rem;
						color: #666;
						line-height: 3.6rem;
						padding: 0 1rem;
				}
			}
		}
		.xiangqing{
			padding: 1.5rem 1rem;
			.tejia{
				.price{
					font-size: 1.4rem;
					color: #FF3B30;
					i{
						font-size: 2rem;
					}
					.money{
						font-size: 3rem;
					}
				}
				.start{
					font-size: 1.4rem;
					color: #FF3B30;
					display: flex;
					align-items: flex-end;
				}
			}
			p{
				font-size: 1.4rem;
				color: #151515;
				line-height: 2.4rem;
				label{
					color: #999999;
					display: inline-block;
				}
			}
			.moreInfo{
				padding: .7rem 0 .5rem;
				label{
					width: 6rem;
					text-align:justify;
					font-size: 1.4rem;
					line-height: 0rem;
				}
				label:after {//兼容IOS
					content: '';
					width: 100%;
					display: inline-block;
				}
			}
			.address{
				align-items: baseline;
				.dingwei{
					color: #FF6633;
					font-size: 1.4rem;
				}
				p{
					font-size: 1.6rem;
					color: #333333;
				}
			}
			.labels{
				display: flex;
				align-items: center;
				padding: .5rem 0;
				span{
					display: block;
					margin-right:.5rem;
					padding:.1rem .5rem;
					display: flex;
					align-items: center;
					border-radius: .6rem;
					font-size:1rem;
					justify-content: center;
				}
			}
			.button{
				font-size: 1.4rem;
				color: #FF6633;
				line-height: 3.2rem;
				background: #f9f9f9;
				text-align: center;
			}
		}
	}
}
.shadow{
	box-shadow: 0 0 0 0 #eee!important;
}
</style>
