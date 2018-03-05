<template>
  <div class="item_price">
    <swiper class="price" :options="swiperOption"  ref="mySwiper">
			<swiper-slide v-for="n in arr" class="swiper-slide" :key="n">
				<div class="price_info">
					<h3>1号楼1单元101房</h3>
					<div>
						<p><label>状态：</label><span>预售</span></p>
						<p><label>价格：</label><span>45000元/㎡</span></p>
					</div>
					<div>
						<p><label>状态：</label><span>预售</span></p>
						<p><label>价格：</label><span>45000元/㎡</span></p>
					</div>
					<div>
						<p><label>状态：</label><span>预售</span></p>
						<p><label>价格：</label><span>45000元/㎡</span></p>
					</div>
					<p class="tejia"><label>特价：</label><span>12000</span><span>元/㎡</span></p>
					<img src="/static/assets/images/huxing.png" alt="">
				</div>
			</swiper-slide>
		</swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default{
		data () {
			return {
				arr: [1, 2, 3, 4, 5],
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
						rotate: 50,
						stretch: 20,//间距数越大，间距越小
						depth: 100,
						modifier: 1,
						slideShadows : true
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.item_price{
		padding: 1rem 0;
		.price{
			.price_info{
				background: #F6F5F5;
				padding: 1.5rem;
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
				img{
					width: 100%;
				}
			}
		}
	}
</style>
