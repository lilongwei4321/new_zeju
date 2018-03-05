<!-- 特价楼盘详情 -->
<template>
	<swiper class="huxing-img" :options="swiperOption"  ref="mySwiper">
		<swiper-slide v-for="(m,key) in arr" class="swiper-slide img_box" :key="key">
			<div class="back_img">
				<router-link :to="`/${cityName}/loupan/huxing/${obj.id}`" :style="{'backgroundImage':`url(http://imgs.zeju.cn${m.house_url})`}" class="back"></router-link>
			</div>
			<div class="labels transverse_center_center">
				<span class="shi text_ove2">{{m.housetype_name}}&nbsp;&nbsp;&nbsp;{{m.house_acreage}}</span>
				<span class="text_back1">{{m.house_direction}}</span>
			</div>
		</swiper-slide>
	</swiper>
</template>

<script>
	import {mapGetters} from 'vuex';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default{
		props:{
			arr : {
				type : Array,
				default : function(){
					return [];
				}
			},
			obj : {
				type : Object,
				default : function(){
					return {};
				}
			}
		},
  	computed : {...mapGetters(['cityName'])},
		data () {
			return {
				num : 0,
				swiperOption: {
					notNextTick: true,  
					direction: 'horizontal',
					slidesPerView: 1.1, 
					centeredSlides : true,
					initialSlide :0, //第几张显示
					preventClicksPropagation:true,
					grabCursor:true, //小手
					effect:"coverflow", //3d
					coverflow: {
						rotate: 40,
						stretch: 24,//间距数越大，间距越小
						depth: 0,
						modifier: 1.2,
						slideShadows : false
					},
					onTouchEnd : () =>{
						this.num = this.num +1;
						if(this.num != 0){
							//诸葛  --- 滑动埋点
							this.zhugeHua();
						}
					} 
				}
			}
		},
		methods : {
			//诸葛  --- 滑动埋点
			zhugeHua () {
				zhuge.track('滑动查看户型', {
					'当前页面' : '楼盘详情页',
					'所属模块' : '楼盘',
					'楼盘ID'   : this.obj.id,
					'楼盘名称' : this.obj.name,
					'划动次数' : this.num
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.huxing-img{
		margin-top: 1rem;
		.img_box{
  		box-shadow: 0px 4px 2px #eee;
			height: 31rem;
			margin-bottom: 2rem;
			border-radius: 0 0 .4rem .4rem;
		}
		.back_img{
			width: 100%;
			display: block;
			height: 24.6rem;
			a{
				display: block;
				height: 100%;
				width: 100%;
			}
		}
		.labels{
			height:6rem;
			align-items: flex-start;
			justify-content: space-between;
			padding:1rem;
			box-sizing: border-box;
			.shi{
				width:0;
				font-size: 1.6rem;
				flex:1;
			}
			.text_back1{
				display: block;
				width:auto;
				padding:.3rem 1rem;
				text-align: center;
				border-radius: .8rem;
				font-size:1rem;
				margin-left:.5rem;
			}
		}
	}
</style>
