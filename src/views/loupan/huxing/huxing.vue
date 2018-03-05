<template>
  <div class="wrap huxinglist">
		<div class="main">
			<!-- 楼盘吸顶1 -->
			<header-text :name="name" :headFlag="false"></header-text>
			<section>
				<div class="huxing_info" v-for="(m,key) in arr" :key="key">
					<img :src="'http://imgs.zeju.cn'+m.house_url">
					<div class="info">
						<div class="border">
							<div class="huxing"><h4>{{m.name}}</h4><span v-show="m.sale_status_name!=undefined">{{m.sale_status_name}}</span></div>
							<p class="type">
								<span>{{m.family}}室{{m.office}}厅{{m.defend}}卫</span>
								<span>{{m.house_acreage}}</span>
								<span>{{m.house_direction}}</span>
							</p>
							<div class="dec">{{m.house_desc}}</div>
						</div>
					</div>
				</div>
				<!-- 加载更多 -->
        <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
			</section>
			<!-- 引入footer -->
			<footer-btns :obj="footerObj" :async="false"></footer-btns>
		</div>
  </div>
</template>
<script>
	import api  from '@/api/api';
	import {mapGetters} from 'vuex';
	import headerText from '@/components/base/header/header_text.vue';//楼栋信息
	import loadMore from '@/components/page/load/load_more.vue';	//引用 -- 加载更多
	import footerBtns    from '@/components/base/footer/footer_btns.vue';//引用  公用页脚
	export default {
		data (){
			return {
				name: '',
				arr:[],
				page  : 1 ,
				total_pages : 0,
				ajaxDate : 5,
				footerObj  : {},//页脚相关数据
			}
		},
		components:{
			headerText,
			loadMore,
			footerBtns
		},
		computed: {...mapGetters(['customerId','cityName'])},
		watch : {
			'$route' (to,from) {
				if(to.name == '户型列表页'){
					this.page = 1;
					this.total_pages=0;
					this.arr   = [];

					//户型列表页
					this.getHuxingData(true);
				}
			}
		},
		methods:{
			//获取户型数据
			getHuxingData (async) {
				let obj = {page_limit :10,page  : this.page,customer_id : this.customerId},
						id 	= this.$route.params.id ;
				api.getHuxingData(obj,id).then((res) =>{
					if(res.status == 200){
						let obj = res.data;
						this.name = obj.loupan.name;
						//合并数组
						this.arr = this.arr.concat(obj.huxings);
						//页脚相关数据
						this.footerObj = {
							id   : obj.loupan.id,
							name : obj.loupan.name,
							type :1,
							ext_phone :obj.loupan.ext_phone,
							host_phone:obj.loupan.host_phone
						}
						//诸葛  --- 打开埋点
						this.zhugeBury(async,obj.loupan);
						if(obj.huxings.length > 0){
							//当前页数
							this.total_pages = obj.page_info.total_pages;
							this.page        = obj.page_info.current_page+1;
							//可以再次请求
							this.$refs.loadMore.requestFn();
						}
					} else if(res.status==422){
						this.$router.push(`/${this.cityName}/404`);
					}				
				})
			},
			//加载更多 显示隐藏
			moreFn () {
				//请求户型数据
				this.getHuxingData(false);
			},
			//诸葛  --- 打开埋点
			zhugeBury (async,Obj) {
				let name = async ? '打开':'翻看',
						obj  = {
							'当前页面' : '户型列表页',
							'所属模块' : '楼盘',
							'楼盘ID'  : Obj.id,
							'楼盘名称' : Obj.name
						}
						if(!async){
							obj['翻看页数'] = this.page-1;
						}
						zhuge.track(`${name}户型列表页`, obj);
			}
		},
		mounted () {
			//请求户型数据
			this.getHuxingData(true);
		}
	}
</script>
<style lang="less" scoped>
	.huxinglist{
		section{
			padding: 4.4rem 0;
			.huxing_info{
				img{
					width: 100%;
					display: block;
				}
				.info{
					padding: .5rem 1rem 1.5rem;
					.border{
						padding-bottom: 1.5rem;
						&:last-child{
							border: none;
						}
						.huxing{
							display: flex;
							padding: 1rem 0 0;
							h4{
								font-size: 1.6rem;
								color: #333;
							}
							span{
								font-size: 1rem;
								color: #F37021;
								border: 1px solid #F37021;
								padding: 0 .5rem;
								border-radius: 29px;
								margin-left: .5rem;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.type{
							display: flex;
							font-size: 1.4rem;
							color: #666;
							padding: 1rem 0;
							span{
								padding-right: 1rem;
							}
						}
						.labels{
							display: flex;
							justify-content: space-between;
							padding-bottom: 1rem;
							font-size: 1.4rem;
							color: #333;
						}
						.dec{
							font-size: 1.4rem;
							line-height: 2rem;
							padding: .6rem 1rem;
							background: #F6F5F5;
							color: #999;
						}
					}
				}
			}
		}
	}
	.shadow{
		box-shadow: 0 0 0 0 #eee!important;
	}
</style>
