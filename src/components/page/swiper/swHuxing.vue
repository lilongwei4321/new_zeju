<template>
  <!-- 轮播图 -->
  <div class="lunbo">
		<!-- 头部分类 - 数量展示 -->
		<div class="header transverse_fen_center">
			<a href="javascript:;" onclick="window.history.go(-1)" class="iconfont icon-jiantou4 goback"></a>
			<p class="title">
				<span>{{btnText}}</span>
				<span class="swiper-pagination" slot="pagination"></span>
			</p>
			<a class="download iconfont icon-xiazai" :href="'http://imgs.zeju.cn'+url" download="图片.jpg" v-if="!phoneType"></a>
			<!-- <a class="download iconfont icon-xiazai" href="javascript:;"  v-else @click.prevent="iosClick"></a> -->
		</div>
		<!-- 图片轮播 -->
		<swiper class="img_box" :options="swiperOption"  ref="mySwiper">
			<swiper-slide v-for="(m,key) in arr" :key="key">
    		<img :src="'http://imgs.zeju.cn'+m.pic_file" >
			</swiper-slide>
		</swiper>
		<!-- 图片分类 - 点击项 -->
		<footer class="footer box_duo" :class="{'width':btnArr.length <=3}">
			<p 
				v-for="(m,key) in btnArr" 
				:key="key" 
				:class="{'on':btnText == m}"
				@click = "slideFn(key)"
			>
				<span class="transverse_center_center">{{m}}</span>
			</p>
		</footer>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
	data () {
		return {
			arr:[],
			num : 0,
			swiperOption: {
				// speed : 1000, //切换速度
				notNextTick: true,
				pagination : '.swiper-pagination',//挂在到容器中
				paginationType : 'custom',//分页
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents:true,//修改swiper的父元素时，自动初始化swiper
				effect:"coverflow", //3d
      	centeredSlides: true,//居中
				onSlideChangeStart : (swiper) => {
					//当前图片路径
					this.url   = this.arr[swiper.activeIndex]['pic_file'];
				},
				paginationCustomRender:  (swiper, current, total) =>{
						var ind = 1,zongInd = 0,qianInd = 0;
						//当前分类 包括之前共多少分
						for(let i=0;i<this.numArr.length;i++){
							if(i<=this.numArrInd){
								qianInd       = qianInd + this.numArr[i]
							}
						}
						//判断 当前分类数据下标
						if(current > qianInd && qianInd !=0 ){
							this.numArrInd++; 	
						} else if(this.numArrInd!=0 && current == qianInd-this.numArr[this.numArrInd]){
							this.numArrInd--; 
						}
						//判断 所处分类下标及总数
						if(this.numArrInd > 0){
							zongInd = this.numArr[this.numArrInd];
							ind = current - 	qianInd + zongInd;			
						} else {
							ind = current ;
							zongInd = this.numArr[0] ;
						}
						this.btnText = this.btnArr[this.numArrInd];
						if(zongInd==undefined){zongInd = 0};
						return ind + ' / ' + zongInd;
				},
				onTouchEnd : () =>{
          this.num = this.num +1;
          if(this.num != 0){
						//诸葛  --- 滑动埋点
            this.zhugeHua();
          }
        },
				slidesPerView: 1.1, 
				coverflow: {
          rotate: 50,  //做3d旋转时Y轴的旋转角度
          stretch: 10, //每个slide之间的拉伸值
          depth: 100,  //slide的位置深度
          modifier: 1, //透明度
          slideShadows : true //开启slide阴影
        } 
			},
			url   : '' , //当前下载图片路径
			numArr : [],//图片类型数量
			numArrInd : 0 , //当前分类下标
			btnText : '' , //当前分类名称
			btnArr : [],//图片类型数组
			phoneType : false,
			obj      : {}
		}
	},
	components: {
		swiper,
		swiperSlide
	},
	watch : {
    '$route' (to,from) {
      if(to.name == '楼盘相册页'){
				this.btnArr = [];
        //获取--轮播arr
        this.getImgList();
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
	methods : {
		//获取--轮播arr
		getImgList () {
			var id = this.$route.params.id;
			api.getImgList({},id).then((res) =>{
				if(res.status == 200){
					this.arr = res.data.photos;
					//默认图片路径
					this.url   = this.arr[0]['pic_file'];
					this.numArr  = res.data.count;
					//赋值，埋点要用
					this.obj = res.data.loupan;

					//诸葛  --- 打开埋点
					this.zhugeBury();
		
					this.arr.map((m,i)=>{
						if(this.btnArr.indexOf(m.pic_type_name) == -1){
							this.btnArr.push(m.pic_type_name);
						}
					});
					this.btnText = this.btnArr[0];
				} else if(res.status == 422){
					this.$router.push(`/${this.cityName}/404`);
				}
			})
		},
		//通过点击按钮 ， 切换导航
		slideFn (ind) {
			this.numArrInd = ind;
			var qianInd = 0;
			//当前分类 包括之前共多少分
			for(let i=0;i<this.numArr.length;i++){
				if(i<this.numArrInd){
					qianInd       = qianInd + this.numArr[i]
				}
			}
			//切换到第一个slide，速度为1秒
			this.$refs.mySwiper.swiper.slideTo(qianInd, 1000, false);
		},
		//判断机型
		getPhoneType () {
			var u = navigator.userAgent;
			// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			this.phoneType = isiOS;
			// console.log('是否是Android：'+isAndroid);
			// console.log('是否是iOS：'+isiOS);
		},
    //诸葛  --- 打开埋点
    zhugeBury () {
      zhuge.track('打开楼盘相册页', {
        '当前页面' : '楼盘相册页',
				'所属模块' : '楼盘',
				'楼盘ID'   : this.obj.item_id,
				'楼盘名称' : this.obj.item_name
      });
    },
    //诸葛  --- 滑动埋点
    zhugeHua () {
      zhuge.track('滑动楼盘相册页', {
        '当前页面' : '楼盘相册页',
				'所属模块' : '楼盘',
				'楼盘ID'   : this.obj.item_id,
				'楼盘名称' : this.obj.item_name,
				'相册类型' : this.btnText,
				'划动次数' : this.num
      });
    }
	},
	mounted () {
		//获取--轮播arr
		this.getImgList();
		//判断手机机型
		this.getPhoneType();
	}
}
</script>
<style lang="less" scoped>
.lunbo{
	background: #000;
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.header{
		height: 4.4rem;
		width: 100%;
		padding: 0 1rem;
		margin-bottom: 2rem;
		.goback{
			color: #FFF;
			font-size: 2rem;
		}
		.download{
			color: #FFF;
			font-size: 2rem;
		}
		.title{
			width:0;
			flex:1;		
			text-align: center;
			span{
				font-size: 1.8rem;
				color: #FFF;
			}
		}
	}
	.img_box{
		z-index: 1;
		width: 100%;
		flex:1;
		overflow: hidden;
		img{
			width:100%;
			display: block;
		}
	}
	.swiper-pagination{
		position: static;
	}
	.swiper-slide{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer{
		padding:2rem 0;
		width: 100%;
		&.width{
			padding:0 10%;
			box-sizing: border-box;
			p{
				width:33.3%;
			}
		}
		p{
			width: 25%;
			display: flex;
			justify-content: center;
			margin-bottom:2rem;
			&.on{
				span{
					background:#f63;
					border-color:#f63;
				}
			}
			span{
				height: 3rem;
				width:7rem;
				color:#fff;
				border:1px solid #fff;
				border-radius: 1.5rem;
				font-size:1.4rem;
			}
		}
	}
}
</style>

