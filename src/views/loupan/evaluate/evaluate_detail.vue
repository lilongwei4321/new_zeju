<template>
  <div class="evaluate_detail">
    <!-- 楼盘吸顶1 -->
		<header-text name="楼盘评测"></header-text>
		<div class="posi_re">
			<!-- <img :src="`http://imgs.zeju.cn/${obj.img_url}`" v-if="obj.img_url !=null"> -->
			<div class="posi_ab border">
				<p class="title">{{ obj.title }}</p>
				<p class="time">{{obj.updated_at}}</p>
			</div>
		</div>
		<div class="evaluate_info">
			<!-- <div class="border header"></div> -->
			<div class="decs" v-html="obj.content"></div>
		</div>
		<!-- 引入footer -->
		<footer-btns :obj="footerObj" :async="true"></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//引用  公用页脚
import footerBtns    from '@/components/base/footer/footer_btns.vue';
export default {
  components: {
		headerText,//楼盘吸顶
		footerBtns
	},
  computed : {...mapGetters(['customerId','cityName'])},
	data (){
		return {
			obj: {} ,
			footerObj : {}
		}
	},
	watch : {
		'$route' (to) {
			if(to.name == '楼盘评测详情页'){
				//评测详情
				this.getEvaluatedetData();
			}
		}
	},
	methods :{
		//评测详情
		getEvaluatedetData (){
			let id = this.$route.params.id;
			api.getEvaluatedetJson({},id).then((res)=>{
				if(res.status == 200){
					this.obj = res.data.evaluations;
					let obj = res.data.loupan;
					//footer传参
					this.footerObj = {
						id: obj.loupan_id,
						ext_phone:obj.ext_phone,
						host_phone:obj.host_phone,
						name : obj.name,//当前页名称
						type :1
					}
					//诸葛埋点
					this.zhuGeBury();
				} else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
			})
		},
    //诸葛埋点
    zhuGeBury () {
      zhuge.track('打开楼盘评测详情页', {
        '当前页面' : '楼盘评测详情页',
        '所属模块' : '楼盘评测',
        '来源链接位置' : this.$route.query.num,
        '评测ID' 	: this.obj.id,
        '评测标题' : this.obj.title
      });
    }
	},
	mounted (){
		//评测详情
		this.getEvaluatedetData();
	}
}
</script>
<style lang="less" scoped>
.evaluate_detail{
	padding: 4.4rem 0 5rem;
	.posi_re{
		position: relative;
		.posi_ab{
			padding: 1.5rem 1rem .2rem;
			&:after{
				transform:translate(0%,0) scale(.94,1);
			}
			.title{
				font-size: 1.7rem;
				line-height: 2rem;
			}
			.time{
				line-height: 2rem;
				font-size: 1.2rem;
			}
		}
	}
	.evaluate_info{
		padding: 0 1rem;
		.decs{
			padding: .5rem 0;
			font-size: 1.4rem;
			color: #666;
			line-height: 2.4rem;
		}
	}
}
</style>
<style lang="less">
.evaluate_detail{
	.evaluate_info{
		p{
			font-size:1.4rem;
			color:#333;
		}
		img{
			display: block;
			width:100%;
			margin:0 auto;
		}
	}
}
</style>
