<!-- 特价楼盘详情 -->
<template>
	<swiper class="huxing-img" :options="swiperOption"  ref="mySwiper">
		<swiper-slide v-for="(m,ind) in arr" class="swiper-slide" :key="ind">
			<div class="huxing">
				<p><span class="type text_ove1">{{m.housetype_name}}</span>&nbsp;-&nbsp;<span class="status">{{m.sale_status}}</span></p>
				<img :src="`http://imgs.zeju.cn/${m.house_url}`" alt="">
				<p>{{m.family}}室{{m.office}}厅&nbsp;{{m.house_acreage}}</p>
			</div>
		</swiper-slide>
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default{
		props : {
			arr : {
				type :Array,
				default:function(){return []}
			}
		},
		data () {
			return {
				swiperOption: {
					notNextTick: true,  
					slidesPerView:2.2, 
					preventClicksPropagation:true,
					grabCursor:true//小手
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.huxing-img{
		margin-top: 1rem;
		padding: 0 .5rem 1.5rem;
		.huxing{
			p{
				display: flex;
				font-size: 1.6rem;
				justify-content: center;
				padding:0 .4rem;
				box-sizing: border-box;
				.type{
					color: #333;
					flex:1;
					text-align: center;
				}
				.status{
					color: #F63;
					width:4rem;
				}
			}
			img{
				padding: 1rem;
				width: 100%;
			}
		}
	}
</style>
