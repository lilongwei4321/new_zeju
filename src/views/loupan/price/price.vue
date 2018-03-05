<template>
  <div class="wrap fangjia">
		<div class="main">
			<!-- 楼盘吸顶1 -->
			<header-text :name="obj.name"></header-text>
			<!-- 楼号 -->
			<div class="louhao">
				<div class="nav">
					<div class="head transverse_center_center">
						<span 
							v-for="(m,ind) in markerArr" 
							:key="ind" 
							@click="active(ind)" 
							:class="{'active':activeFlag == ind}"
						>楼号{{ m.number }}</span>
					</div>
				</div>
			</div>
			<!-- 标注图 -->
			<section class="biaoji_box" ref="biaoji_box" >
				<div class="img_box">
					<img :src="obj.louapn_pic" ref="img_back">
					<!-- 标记 -->
					<div 
						class="fixed" 
						@click="markerBtn(index)" 
						ref="markerbtn"
						v-for="(m,index) in markerArr" 
						:key="m.id" 
						:class="[classFn(m.sale_status),index==3?'on':'']"
						:style="{'left':(m.leftm-20)+'px','top':(m.topm-30)+'px'}">
						<div class="zheng transverse_center_center">
							<span>{{ m.number }}#</span>
						</div>
						<div class="san"></div>
					</div>
				</div>
			</section>
			<!-- 楼层 -->
			<div class="louhao">
				<div class="nav">
					<div class="head transverse_center_center">
						<span 
							v-for="(k,index) in cengArr" 
							:key="k.id" 
							@click="active2(index)" 
							:class="{'active':cengFlag == index}">楼层{{ k.floor_no }}</span>
					</div>
				</div>
				<div class="huxing_img">
					<img :src="`http://imgs.zeju.cn/${cengImgURl}`" >
				</div>
			</div>
			<!-- 门牌号 -->
			<div class="louhao">
				<div class="nav">
					<div class="head transverse_center_center">
						<span 
							v-for="(k,index) in fangArr" 
							:key="k.hx_id" 
							@click="active3(index)" 
							:class="{'active':fangFlag == index}">{{ k.hx_number }}</span>
					</div>
				</div>
				<div class="huxing_img">
					<img :src="`http://imgs.zeju.cn/${fangObj.huxing_img_url}`" alt="">
				</div>
				<div class="huxing_Info">
					<div class="bg">
						<h3></h3>
						<div>
							<p><label>状态：</label><span>{{fangObj.sale_status}}</span></p>
							<p><label>价格：</label><span>{{fangObj.price}}元/㎡</span></p>
						</div>
						<div>
							<p><label>面积：</label><span>{{fangObj.building_area}}㎡</span></p>
							<p><label>户型：</label><span>{{fangObj.huxing}}</span></p>
						</div>
						<div>
							<p><label>朝向：</label><span>{{fangObj.toward}}</span></p>
							<p><label>得房率：</label><span>{{fangObj.room_rate*100}}%</span></p>
						</div>
						<p class="tejia" v-show="fangObj.discount_info!=null && fangObj.discount_info!=''"><label>特价：</label><span>{{fangObj.discount_info}}</span></p>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import api  from '@/api/api';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//移动标注图插件
import bigImgXY from '@/assets/javascripts/bigImgXY.js';
export default {
  data () {
		return {
			activeFlag: 3,
			cengFlag  : 0,
			fangFlag  : 0,
			cengImgURl: '',
			tejiaFlag :true,//有显示特卖价
			clickAsyncX : true,//横向是否滚动停止
			clickAsyncY : true,//纵向是否滚动停止
			cengArr : [],//楼层
			fangArr : [],//户型
			fangObj : {},//当前户型
			markerArr : [],//首层，标注点
			imgArr : [
				{src: '/static/assets/images/house-type.png'},
				{src: '/static/assets/images/loupan.jpg'},
				{src: '/static/assets/images/itemdong.png'},
				{src: '/static/assets/images/loupan.jpg'},
				{src: '/static/assets/images/house-type.png'},
				{src: '/static/assets/images/itemdong.png'},
			],
			arr : [],
			obj : {}
		}
	},
	components: {
		headerText,//楼盘吸顶
	},
	methods:{
		//点击楼号
		active(index){
			//是否可以再次点击
			if(!this.clickAsyncX && !this.clickAsyncY){return false}
			this.clickAsyncX = false;
			this.clickAsyncY = false;
			//点击楼号下标
			this.activeFlag = index;
			//改变楼层
			this.cengArr = this.markerArr[index].floors;
			//改变楼层immg
			this.cengImgURl = this.cengArr[0].house_url;
			//户型
			this.fangArr = this.cengArr[0].huxings;
			//当前户型
			this.fangObj = this.fangArr[0];
			//切换class
			let btn = this.$refs['markerbtn'];
			for(let itme of btn){
				itme.classList.remove('on');
			}
			btn[index].classList.add('on');

			//移动大图
			this.yidongImg(index);
		},
		//点击楼层
		active2(index){
			//当前楼层
			this.cengFlag = index;
			//改变楼层immg
			this.cengImgURl = this.cengArr[index].house_url;
			//户型
			this.fangArr = this.cengArr[index].huxings;
			//当前户型
			this.fangObj = this.fangArr[0];
		},
		//点击房号
		active3(index){
			this.fangFlag = index;
			//当前户型
			this.fangObj = this.fangArr[index];
		},
		//默认第一张图片
		moImg (){
			this.menImg = this.imgArr[0].src;
		},
		//点击marker
		markerBtn (index){
			let btn = this.$refs['markerbtn'];
			for(let itme of btn){
				itme.classList.remove('on');
			}
			btn[index].classList.add('on');
			this.activeFlag = index;
			this.menImg = this.imgArr[index].src;
		},
		//获取户型数据
		getYfyjData () {
			let id 	= this.$route.params.id ;
			api.getYfyjData({},id).then((res) =>{
				if(res.status == 200){
					this.obj = res.data.loupan_info;
					this.markerArr = res.data.buildings;
					//楼层
					this.cengArr = this.markerArr[3].floors;
					//改变楼层immg
					this.cengImgURl = this.cengArr[0].house_url;
					//户型
					this.fangArr = this.cengArr[0].huxings;
					//当前户型
					this.fangObj = this.fangArr[0];
					//移动大图
					this.yidongImg(3);
				} else if(res.status==422){
					this.$router.push(`/${this.$store.state.cityName}/404`);
				}				
			})
		},
		//动态渲染标注颜色
		classFn (str) {
			switch (str) {
				case '在售':
					return 'zs'
				break;
				case '待售':
					return 'ds'
				break;
				case '售罄':
					return 'sq'
				break;
			}
		},
		//移动大图
		yidongImg (num) {
			let clickObj = this.markerArr[num];
			// 调用移动js
			bigImgXY.init(this.$refs.biaoji_box,{'left':clickObj.leftm,'top':clickObj.topm},(nameStr)=>{
				if(nameStr == 'scrollTop'){
					this.clickAsyncY = true;
				} else{
					this.clickAsyncX = true;
				}
			});
		}
	},
	mounted (){
		//默认显示第一张图片
		this.moImg();
		//请求户型数据
		this.getYfyjData();
	}
}
</script>
<style lang="less" scoped>
.fangjia{
	background: #F6F5F5;
	padding-top: 4.4rem;
	img{
		width: 100%;
		display: block;
	}
	.biaoji_box{
		height: 28rem;
		overflow: auto;
		width:100%;
		&::-webkit-scrollbar {display:none}
		.img_box{
			position: relative;
			.fixed{
				width: 4rem;
				height: 2.8rem;
				position: absolute;
				.zheng{
					background: #F63;
					width: 4rem;
					height: 2.5rem;
					border-radius: 4px;
					position: relative;
					span{
						color: #FFF;
						font-size: 1.4rem;
					}
				}
				.san{
					position: absolute;
					left: 40%;
					width: 0;
					height: 0;
					border-left: .5rem solid transparent;
					border-right: .5rem solid transparent;
					border-top: .5rem solid #F63;
				}
				&.zs{
					.zheng{
						background: #F63;
					}
					.san{
						border-top: .5rem solid #F63;
					}
				}
				&.ds{
					.zheng{
						background: #4CA8EB;
					}
					.san{
						border-top: .5rem solid #4CA8EB;
					}
				}
				&.sq{
					.zheng{
						background: #b3b6be;
					}
					.san{
						border-top: .5rem solid #b3b6be;
					}
				}
				&.on{
					.zheng{
						background: red;
					}
					.san{
						border-top: .5rem solid red;
					}
				}
			}
			img{
				width:auto;
				display: block;
			}
		}
	}
	.louhao{
		.nav{
			height:4.4rem;
			overflow: hidden;
			width: 100%;
			.head{
				display:flex;
				flex-wrap:nowrap;
				justify-content:space-between;
				overflow-x: auto;
				height:100%;
				height:5.5rem;
				span{
					flex:1 0 auto;
					width: 6.8rem;
					// max-width: 6.8rem;
					height: 4.4rem;
					margin-bottom: 1rem;
					border-bottom: 2px solid transparent;
					font-size: 1.2rem;
					color: #909090;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.active{
					color: #F63;
					font-size: 1.6rem;
					border-bottom: 2px solid #F63;
				}
			}
		}
	}
	.huxing_img{
		background: #FFF;
		padding: 1.5rem 1rem;
	}
	.huxing_Info{
		background: #FFF;
		padding: 1.5rem 2rem;
		.bg{
			padding: 1.6rem 1.5rem;
			background: #F6F5F5;
			h3{
				font-size: 1.6rem;
				color: #333;
				height: 3rem;
			}
			p{
				font-size: 1.4rem;
				color: #333;
			}
			div{
				display: flex;
				p{
					flex: 1;
					font-size: 1.4rem;
					color: #333;
					height: 2.4rem;
				}
			}
			.tejia{
				font-size: 1.4rem;
				color: #FF3B30;
				height: 2.4rem;
			}
		}
	}
}
	.shadow{
		box-shadow: 0 0 0 0 #eee!important;
	}
</style>
