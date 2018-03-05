<template>
  <div class="wrap review">
		<div class="main">
			<!-- 楼盘吸顶1 -->
			<header-text name="楼盘评测"></header-text>
			<img src="/static/assets/images/tese-img.png" alt="">
			<div class="review_list">
				<itme-test :arr="listArr"></itme-test>
			</div>
			<!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
		</div>
		<!-- 引入footer -->
		<footer-btns :obj="footerObj" :async="false"></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//引用  公用页脚
import footerBtns    from '@/components/base/footer/footer_btns.vue';
import itmeTest   from '@/views/loupan/evaluate/evaluate_list.vue';
//引用 -- 加载更多
import loadMore   from '@/components/page/load/load_more.vue';	
export default {
  data(){
		return {
			page: 1,
			total_pages : 0,//总页数默认0
			listArr:[] ,//评测数据
			footerObj : {}
		}
	},
  computed : {...mapGetters(['customerId','cityName'])},
	components: {
		headerText,//楼盘吸顶
		itmeTest,
		loadMore,
		footerBtns
	},
	watch : {
	'$route' (to) {
		if(to.name == '楼盘评测列表页'){
				this.listArr = [] ;
				this.page    = 1;
				this.total_pages = 0;
				//获取评测列表数据
				this.getEvaluateJson();
			}
		}
	},
	methods:{
		//获取评测列表数据
		getEvaluateJson (){
      let obj = {
        page      : this.page,
				page_limit: 10,
				customer_id : this.customerId,
				list_type : this.$route.params.flag == 3?'3':'2',
				loupan_id : this.$route.params.flag == 3?'':this.$route.params.flag,
				city_abbr : this.cityName
      }
      api.getEvaluateJson(obj).then((res)=>{
				if(res.status==200){
					let obj = res.data;
					//footer
					this.footerObj = {
						id: obj.loupan.id,
						ext_phone:obj.loupan.ext_phone,
						host_phone:obj.loupan.host_phone,
						name : obj.loupan.name,//当前页名称
						type :1
					}
					//渲染数据
					this.listArr = this.listArr.concat(obj.evaluations);

					//诸葛埋点
					this.zhugeBury();
					if(obj.evaluations.length > 0){
						//页数
						this.total_pages = obj.page_info.total_pages;
						this.page = obj.page_info.current_page+1;
						//可以再次请求
						this.$refs.loadMore.requestFn();
					}
				} else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //加载更多 显示隐藏
    moreFn () {
      //获取评测列表数据
      this.getEvaluateJson();
    },
    //诸葛埋点
    zhugeBury () {
      zhuge.track('打开楼盘评测列表页', {
        '当前页面' : '楼盘评测列表页',
        '所属模块' : '楼盘评测',
        '查看次数' : this.page
      });
    }
	},
	mounted (){
		//获取评测列表数据
		this.getEvaluateJson();
	}
}
</script>
<style lang="less" scoped>
	.review{
		padding: 4.4rem 0 5rem;
		img{
			width: 100%;
			display: block;
		}
	}
	.shadow{
		box-shadow: 0 0 0 0 #eee!important;
	}
</style>
