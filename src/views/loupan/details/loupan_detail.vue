<template>
<!-- 普通楼盘详情 -->
  <div class="detail_wrap wrap">
		<div class="main" v-ScrollDetail="dongFn">
			<header class="headerInfo public_detail">
				<div class="item_img">
					<a v-if="homeFlag" href="javascript:;" onclick="window.history.go(-1)" class="goback"><i class="iconfont icon-jiantou4 return"></i></a>
					<router-link v-else :to="`/${cityName}`" class="goback"><i class="iconfont icon-shouye return"></i></router-link>
					<!-- <span class="zhongxin"><i class="iconfont icon-ren"></i></span> -->
					<router-link :to="`/${cityName}/home/index`" class="zhongxin"><i class="iconfont icon-ren"></i></router-link>
					<router-link :to="`/${cityName}/loupan/pic_lunbo/${obj.id}`">
						<span class="moreimg">查看图册( {{obj.pictures_count}} )</span>
						<img :src="'http://imgs.zeju.cn'+obj.pic_file" alt="楼盘实景图">
					</router-link>
				</div>
				<div class="xiangqing">
          <h3>{{obj.name}}</h3>
          <div class="itemInfo transverse_fen_center">
            <div class="itemName">
							<p>
								<!-- 实勘为0 ， 隐藏 -->
								<label v-if="obj.appoint_count!=0">实勘：<span>{{obj.appoint_count}}</span></label>
								<!-- 成交为0 ，隐藏 -->
								<label class="on" v-if="obj.deal_count != 0">成交：<span class="red">{{obj.deal_count}}</span></label>
							</p>
							<!-- 如果实勘，成交为0，别名隐藏 -->
              <p v-if="(obj.appoint_count != 0 || obj.deal_count != 0)  && obj.item_alias!=''" class="text text_ove1">别名：<span>{{obj.item_alias}}</span></p>
              <p v-else-if="obj.appoint_count == 0 || obj.deal_count == 0" class="text text_ove1">地址：<span>{{obj.detail_addres}}</span></p>

              <p class="labels">
                <span :class="'text_back'+(key+1)" v-for="(m,key) in obj.labels" :key="key">{{m}}</span>
              </p>
            </div>
            <div class="price">
							<p class="money"><span>{{obj.price_unit == '待定'?'待定':obj.price + obj.price_unit}}</span></p>
              <p>{{obj.price_updated_at}}更新</p>
            </div>
          </div>
          <div class="moreInfo border1">
            <p><label>开盘时间</label>：<span>{{obj.open_at}}</span></p>
            <p><label>交房时间</label>：<span>{{obj.task_at}}</span></p>
            <p><label>开发商</label>：<span>{{obj.developer}}</span></p>
            <div class="address transverse_fen">
              <p class=""><label>位置</label>：<span >{{obj.detail_addres}}</span></p>
              <i class="iconfont icon-iconfontdingwei dingwei"></i>
            </div>
            <p><label>物业类型</label>：<span>{{obj.property_type}}</span></p>
          </div>
					<!-- <transition name="kenzo2"> -->
						<div v-show="flag">
							<div class="moreInfo border1">
								<p><label>装修状况</label>：<span>{{obj.decoration}}</span></p>
								<p><label>均价</label>：<span>{{obj.price_unit == '待定'?'待定':obj.price + obj.price_unit}}</span></p>
								<p><label>总价</label>：<span>{{obj.total_price == 0?'待定':obj.total_price+'万元'}}</span></p>
								<p><label>最低首付</label>：<span>{{obj.min_shoufu > 0 ?obj.min_shoufu+'万元':'待定'}}</span></p>
							</div>
							<div class="moreInfo border1">
								<p><label>占地面积</label>：<span>{{obj.covers_area}}</span></p>
								<p><label>电梯</label>：<span>{{obj.elevator}}</span></p>
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
								<p><label>规划户数</label>：<span>{{obj.house_count}}</span></p>
								<p><label>当前户数</label>：<span>{{obj.current_house_count}}</span></p>
								<!-- <p><label>周边设施</label>：<span>住宅</span></p> -->
							</div>
						</div>
					<!-- </transition> -->
          <p class="button" @click="show">{{ btn }}</p>
          <!-- <div class="func transverse_fen">
            <span class="transverse_center_center" @click="fangdaiFn">房贷计算器</span>
            <span class="transverse_center_center" @click="routeHref">测试购房资格</span>
						未登录有，已登陆没有约车
						<span class="transverse_center_center" @click="yuecheFn">{{ isyueche }}</span>
          </div> -->
				</div>
				<!-- 活动入口 -->
				<div class="tuiguang">
					<a href="javascript:;" @click.prevent="huodongHref">
						<img src="/static/assets/images/active.png" alt="">
					</a>
				</div>
			</header>
			<!-- 择居服务 -->
			<div class="public_detail" v-SrcollsShow="{headerFn,navigationFn}">
				<div class="header border transverse_fen_ya">
					<span class="title">择居服务</span>
				</div>
				<div class="zejufuwu">
					<div class="transverse_fen_ya fuwu_dec">
						<p class="left"><i class="iconfont icon-youhui"></i><span>购房优惠 不要错过！</span></p>
						<p class="right transverse_center_center" @click="yuecheFn(6)">领取优惠</p>
					</div>
					<div class="transverse_fen_ya fuwu_dec" v-if="yuecheFlag">
						<p class="left"><i class="iconfont icon-yuyue"></i><span>预约看房 免费专车</span></p>
						<p class="right transverse_center_center" @click="yuecheFn(4)">立即预约</p>
					</div>
					<div class="transverse_fen_ya fuwu_dec" v-else>
						<p class="left"><i class="iconfont icon-tongzhi"></i><span>开盘通知我</span></p>
						<p class="right transverse_center_center" @click="yuecheFn(7)">立即开通</p>
					</div>
				</div>
			</div>
			<!-- 户型 -->
			<div class="layoutHuxing public_detail" v-SrcollsShow="{headerFn,navigationFn}">
				<div class="header border transverse_fen_ya">
					<span class="title">户型</span>
					<router-link :to="{path:`/${cityName}/loupan/huxing/${obj.id}`}" class="gengduo" v-if="huxingArr.length>0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<huxing-img :arr="huxingArr" v-if="huxingArr.length>0" :obj="obj"></huxing-img>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 楼栋信息 -->
			<!-- <div class="layoutIfon public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">楼栋信息</span>
					<router-link :to="`/loupan/loudong/${obj.id}`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<lou-dong :id="Number(obj.id)"></lou-dong>
			</div> -->
			<!-- 位置及周边 -->
			<div class="layoutMap public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">位置及周边</span>
					<div class="daohang">
						<a href="javascript:;" @click.prevent="daohangFn">导航</a>
						<router-link :to="`/${cityName}/loupan/map_detail/${obj.id}`" class="gengduo">地图<i class="iconfont icon-right-shixin"></i></router-link>
					</div>
				</div>
				<map-zhou :obj = "mapObj"></map-zhou>
			</div>
			<!-- 楼盘动态 -->
			<div class="layoutDongtai public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">楼盘动态</span>
					<router-link :to="`/${cityName}/loupan/dongtai/${obj.id}`" class="gengduo" v-if="dongtaiArr.length > 0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<item-dongtai :arr="dongtaiArr" v-if="dongtaiArr.length > 0" :obj="obj"></item-dongtai>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 点评 -->
			<div class="layoutDianping public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">点评</span>
					<div class="daohang">
						<router-link :to="{path:`/${cityName}/loupan/write_comment/${obj.id}`,query:{name:obj.name}}">写点评</router-link>
						<router-link 
							:to="`/${cityName}/loupan/comment/${obj.id}`" 
							class="gengduo" 
							v-if="commentArr.length >0">全部<i class="iconfont icon-right-shixin"></i></router-link>
					</div>
				</div>
				<dian-ping :obj="commentObj.total_score" :arr="commentArr"></dian-ping>
			</div>
			<!-- 谁在这里买房 -->
			<div class="layoutEchart public_detail">
				<div class="header border">
					<span class="title">谁在这里买房</span>
				</div>
				<count-img :echartsArr="echartsArr" v-if="echartsArr.age && tongjiFlag" ref="echartList"></count-img>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 楼盘评测 -->
			<div class="layoutCeping public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">楼盘评测</span>
					<router-link :to="`/${cityName}/loupan/evaluate/${obj.id}`" class="gengduo" v-if="pingceArr.length > 0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<item-test :arr="pingceArr" v-if="pingceArr.length > 0"></item-test>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 择居故事 -->
			<div class="layoutStory public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">择居故事</span>
					<router-link :to="`/${cityName}/loupan/story/${obj.id}/loupan`" class="gengduo" v-if="storyArr.length > 0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<zeju-story :arr="storyArr" v-if="storyArr.length > 0"></zeju-story>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 择居顾问 -->
			<div class="layoutAdviser public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">择居顾问</span>
					<router-link :to="`/${cityName}/advisor`" class="gengduo" v-if="guwenArr.length > 0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<adviser-swiper v-if="guwenArr.length>2" :arr = "guwenArr"></adviser-swiper>
				<adviser-list v-else-if="guwenArr.length<=2 && guwenArr.length>0" :arr="guwenArr"></adviser-list>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 周边楼盘 -->
			<div class="zhouItem public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">周边楼盘</span>
					<router-link :to="`/${cityName}/loupan/related_loupans/${obj.id}/around`" class="gengduo" v-if="tuijianArr.length>0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<item-list :arr="tuijianArr" v-if="tuijianArr.length>0"></item-list>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 同价位楼盘 -->
			<div class="tongjiaItem public_detail">
				<div class="header border transverse_fen_ya">
					<span class="title">同价位楼盘</span>
					<router-link :to="`/${cityName}/loupan/related_loupans/${obj.id}/same_price`" class="gengduo" v-if="samePriceObj.length>0">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
				<item-list :arr="samePriceObj" v-if="samePriceObj.length>0"></item-list>
				<div class="noData" v-else>暂无</div>
			</div>
			<!-- 楼盘吸顶1 -->
			<header-text :name="name" :headFlag="true" v-show="headerAsync" :homeFlag="homeFlag"></header-text>
			<!-- 楼盘吸顶2 -->
			<div class="fixedHead" v-show="navAsync" id="fixedHead">
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
		<!-- 引入footer -->
		<footer-btns v-show="footerAsync" :obj="footerObj"></footer-btns>
		<!-- 留资  专车，开盘 -->
		<alert-liuzi v-if="liuziAsync" :name="titleBtn" @liuziFn="liuziFn" :liuObj="liuziObj"></alert-liuzi>
		<div class="fixedAlert transverse_center_center" v-show="wranFlag">{{ yuecheText }}</div>
  </div>
</template>
<script>
  import api  from '@/api/api';
	import zhuGe from '@/assets/javascripts/zhuGe';
	import globalFn from '@/assets/javascripts/globalFn';
	import {mapGetters} from 'vuex';
	import {Token}    from '@/assets/javascripts/token.js'  ;
	import { Weizhi } from '@/assets/javascripts/scroll.js';
	import HistoryData   from '@/assets/javascripts/history.js';
	import huxingImg     from '@/views/loupan/huxing/huxing_img.vue';//户型图
	import mapZhou       from '@/views/loupan/map/map.vue';//地图
	import countImg      from '@/components/base/echarts/count_img.vue';//统计图
	import itemDongtai   from '@/views//loupan/dongtai/dongtai_list.vue';//动态
	import itemTest      from '@/views/loupan/evaluate/evaluate_list.vue';//评测
	import dianPing      from '@/views/loupan/comment/comment_list.vue';//点评
	import zejuStory     from '@/views/loupan/story/story_anchor.vue';//择居故事
	import adviserSwiper from '@/views/adviser/items/adviser_swiper.vue';//三个以上 -- 顾问
	import adviserList   from '@/views/adviser/items/adviser_list.vue';	//三个以下 -- 顾问
	import itemList      from '@/components/base/items/loupan_list.vue';//楼盘列表
	import louDong       from '@/views/loupan/loudong/loudong.vue';//楼栋信息

	import alertLiuzi    from '@/components/page/alert/alert_liuzi.vue';//引用  公用页脚
	
  import footerBtns    from '@/components/base/footer/footer_btns.vue';//引用  公用页脚
	import headerText    from '@/components/base/header/header_text.vue';//头部
	export default {
		components: {
			huxingImg,//户型图
			mapZhou,//周边
			countImg,//eachart 在哪里买房
			itemTest,//楼盘评测
			itemDongtai,//楼盘动态
			dianPing,//点评
			zejuStory,//择居故事
			adviserSwiper,//择居顾问
			adviserList,//择居顾问
			itemList,//楼盘
			louDong,//楼栋信息
			headerText,//楼盘吸顶
			footerBtns,
			alertLiuzi
		},
		computed: {...mapGetters(['customerId','customerPhone','cityName'])},
		data () {
			return {
				name: '',
				btn : '更多详情',
				daohang: '',
				flag: false,
				guwenArr : [1,2],
				headerAsync  : false,
				footerAsync  : false,
				navAsync  : false,
				homeArr: [
					{id   : 'layoutHuxing',name : '户型',active:true},
					// {id   : 'layoutIfon',name : '楼栋信息',active:false},
					{id   : 'layoutMap',name : '位置及周边',active:false},
					{id   : 'layoutDongtai',name : '楼盘动态',active:false},
					{id   : 'layoutDianping',name : '点评',active:false},
					{id   : 'layoutEchart',name : '谁在这里买房',active:false},
					{id   : 'layoutCeping',name : '楼盘评测',active:false},
					{id   : 'layoutStory',name : '择居故事',active:false},
					{id   : 'layoutAdviser',name : '择居顾问',active:false},
					{id   : 'layoutZhoubian',name : '周边楼盘',active:false},
					{id   : 'layoutTongjia',name : '同价楼盘',active:false}
				],
				indAsync : 0,
				clickAsync : false,
				obj : {} ,//楼盘相关数据
				mapObj :{} ,//地图相关数据
				footerObj : {},//页脚相关数据
				tuijianArr : [],//周边楼盘
				samePriceObj : [] ,//同价楼盘
				storyArr : [],//故事数据
				commentObj : {},//点评数据
				commentArr : [],
				dongtaiArr : [],//楼盘动态
				echartsArr :{},//统计图谁在这里买房
				pingceArr  : [],//楼盘评测
				huxingArr  : [],//户型图
				wranFlag : false,//弹框提示框
				yuecheText : '',
				homeFlag : true,
				tongjiFlag : false,
				isyueche : '预约看房 免费专车',
				isyuecheBtn : '立即预约',
				yuecheFlag  : true,
				clue_type_id : 4,
				liuziAsync : false,
				liuziObj   : {}
			}
		},
		watch : {
    '$route' (to) {
			if(to.name == '楼盘详情页'){
					this.homeFlag = true;
					this.liuziAsync = false;
					//获取楼盘详细信息
					this.getLoupanDetail();
				}
			}
		},
		methods :{
			show (){
				if(this.btn == '更多详情'){
					this.btn  = '收起详情';
					this.flag = true;
					this.zhugeDetailShow('打开');
				}else{
					this.btn = '更多详情';
					this.flag = false;
					this.zhugeDetailShow('关闭');
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
				this.indAsync = index;
				this.clickAsync = true;
				//点击 重置
				this.arrReset(obj);
				//滚动位置
				Weizhi(index,obj,() =>{
					this.clickAsync = false;
				});
			},
			headerFn (async) {
				this.headerAsync = async;
				this.footerAsync = async;
			},
			navigationFn (async) {
				this.navAsync = async;
			},
			//横向滚动、
			dongFn (ind) {
				if( this.indAsync == ind){return false}
				this.indAsync = ind;
				//重置
				if(ind >=0 && !this.clickAsync){
					this.arrReset(this.homeArr[ind]);
				}
			},
			//获取楼盘详细信息
			getLoupanDetail () {
				var id  = this.$route.params.id;
				var para = {
					'customer_id' : this.customerId!=null? this.customerId :''
				}
				api.getLoupanDetail(para,id).then((res) =>{
					if(res.status == 200){
						HistoryData.init(res.data.id);
						let obj   = res.data;
						this.obj  = obj;
						this.name = obj.name;
						//未开盘显示开盘通知我———开盘显示预约专车
						if(obj.is_opened){
							this.yuecheFlag = true;
						} else{
							this.yuecheFlag = false;
						}
						//赋值给 留资组件
						this.liuziObj = {
							id : obj.id,
							name : obj.name
						}

						//地图导航
						this.daohang =  `http://api.map.baidu.com/geocoder?address=${obj.guide_address}&output=html&src=yourCompanyName|yourAppName`;
						//地图数据
						this.mapObj = {
							addres :this.daohang,
							name : obj.name,
							lat  : obj.latitude,
							lng  : obj.longitude,
							id   : obj.id
						};
						//页脚相关数据
						this.footerObj = {
							id   : obj.id,
							type : 1,
							ext_phone  : obj.ext_phone,
							host_phone : obj.host_phone,
							name       : obj.name,
							is_favorited : obj.is_favorited
						}
						
						//楼盘 -- 关联数据
						this.loupanInit(obj.id);
						//判断谁在这里买房是否有数据
						let echartFlag = obj.loupan_deals;
						if(echartFlag.age.is_hidden || echartFlag.age.favorites || echartFlag.age.trade){
							this.tongjiFlag = true;
							//谁在这里买房
							this.echartsArr = obj.loupan_deals;
							//统计图
							this.tongji();
						}
						
						//诸葛  --- 打开埋点
						this.zhugeBury(obj);
					}
				});
			},
			//统计图
			tongji (){
				var that = this;
				this.$nextTick(function(){
					that.$refs['echartList'].echartsFn();
				})
				
			},
			//约车
			yuecheFn (typeId){
				this.clue_type_id = typeId;
				//显示 留资弹框
				this.liuziAsync = true;
				let name = '预约专车';
				if(typeId == 6){
					this.titleBtn = '领取优惠';
					name = '领取优惠';
				} else if(typeId == 4){
					this.titleBtn = '立即预约';
					name = '预约专车';
				} else if(typeId == 7){
					this.titleBtn = '立即开通';
					name = '开盘通知我';
				}
				this.liuziObj['clue_type_id'] = typeId;
				//点击预约专车和开盘通知诸葛
				zhuge.track(`点击${name}`, {
					'当前页面' : '楼盘详情页',
					'所属模块' : '楼盘',
				})
			},
			//楼盘 -- 关联数据
			loupanInit (id) {
				//获取周边楼盘数据
				this.getAroundsData(id);
				//获取同价位楼盘数据
				this.gitsamePriceData(id);
				//获取择居故事数据
				this.getStoryList(id);
				//获取点评数据
				this.gitCommentData(id);
				//获取楼盘动态
				this.getItemDynamicsData(id);
				//楼盘评测
				this.getEvaluatData(id);
				//择居顾问
				this.getAdvisorsData(id);
				//户型图
				this.getHuxingData(id);
				this.btn  = '更多详情';
				this.flag = false;
			},
			//获取周边楼盘数据
			getAroundsData (id){
				let obj = {
					page : 1,
					page_limit : 5
				}
				api.getAroundsJson(obj,id).then((res)=>{
					if(res.status == 200){
						this.tuijianArr = res.data.loupans;
					} else if(res.status == 422){
						this.$router.push(`/${this.cityName}/404`);
					}
				});
			},
			//获取同价位楼盘数据
			gitsamePriceData (id) {
				let obj = {
					page : 1,
					page_limit : 5
				}
				api.gitsamePriceData(obj,id).then((res) =>{
					if(res.status==200){
						this.samePriceObj = res.data.loupans;
					} else if(res.status==422){
						this.$router.push(`/${this.cityName}/404`);
					}	
				});
			},
			//获取择居故事数据
			getStoryList (id) {
				let obj = {
							page : 1,
							page_limit:2 ,
							action_name :'loupan',
							id
						};
						api.getStoryList(obj).then((res) =>{
							if(res.status == 200){
								this.storyArr = res.data.stories;
							} else if(res.status==422){
								this.$router.push(`/${this.cityName}/404`);
							}	
						});
			},
			//获取点评数据
			gitCommentData (id) {
				var num = this.customerPhone;
				let obj = {
					page : 1,
					page_limit : 2,
					token : Token(num),
					customer_id : this.customerId
				};
				api.gitCommentData(obj,id).then((res) =>{
					if(res.status == 200){
						this.commentObj = res.data;
						this.commentArr = res.data.comments;
					} else if(res.status==422){
						this.$router.push(`/${this.cityName}/404`);
					}	
				});
			},
			//获取楼盘动态
			getItemDynamicsData (id){
				var para = {
					page : 1,
					page_limit : 3
				}
				api.getDongtaiJson(para,id).then((res)=>{
					if(res.status == 200){
						this.dongtaiArr = res.data.dynamics;
					} else if(res.status==422){
						this.$router.push(`/${this.cityName}/404`);
					}	
				})
			},
			//楼盘评测
			getEvaluatData (id){
				var para = {
					'page' : 1,
					'page_limit' : 2,
					'list_type'  : '2',
					'loupan_id' : id
				}
				api.getEvaluateJson(para).then((res)=>{
					if(res.status == 200){
						this.pingceArr = res.data.evaluations;
					} else if(res.status ==422){
						this.$router.push(`/${this.cityName}/404`);
					}
				})
			},
			//择居顾问
			getAdvisorsData (id){
				var para = {
					'city_abbr' : this.$store.state.cityName,
					'page' : '1',
					'page_limit' : '5'
				}
				api.getAdviserList(para).then((res)=>{
					if(res.status == 200){
						this.guwenArr = res.data.advisors;
					} else if(res.status == 422){
						this.$router.push(`/${this.cityName}/404`);
					}
				})
			},
			//户型图
			getHuxingData (id){
				api.getHuxingJson({},id).then((res)=>{
					if(res.status == 200){
						this.huxingArr = res.data;
					} else if(res.status == 422){
						this.$router.push(`/${this.cityName}/404`);
					}
				})
			},
			//诸葛  --- 打开埋点
			zhugeBury (obj) {
				zhuge.track('打开楼盘详情页', {
					'当前页面' : '楼盘详情页',
					'所属模块' : '楼盘',
					'来源链接模块' : zhuGe.theModular(),
					'来源链接位置' : this.$route.query.num,
					'楼盘ID'  : obj.id,
					'楼盘名称' : obj.name
				});
			},
			//活动入口链接
			huodongHref () {
				zhuge.track('打开活动页', {
					'当前页面' : '活动页',
					'所属模块' : '活动'
				},() => {
					window.location.href = 'http://hd.zeju.com/homebuyers/m.html';
				});
			},
			//导航 链接 
			daohangFn () {
				zhuge.track('点击地图导航', {
					'当前页面' : '楼盘详情页',
					'所属模块' : '楼盘',
					'导航到'   : this.obj.name
				},() => {
					window.location.href = this.daohang;
				});
			},
			//诸葛  --- 打开，关闭更多楼盘详情
			zhugeDetailShow (name) {
				zhuge.track(`${name}更多楼盘详情`, {
					'当前页面' : '楼盘详情页',
					'所属模块' : '楼盘',
					'楼盘ID'  : this.obj.id,
					'楼盘名称' : this.obj.name
				});
			},
			//关闭留资弹框
			liuziFn (str,async) {
				//判断是否 只是执行关闭
				if(str == '关闭'){
					this.liuziAsync = false;
					return false;
				}
				//成功 隐藏留资弹框
				if(async){this.liuziAsync = false;}

				let status = async ?'成功': '失败';
				if(this.clue_type_id == 4){
					this.yuecheText = `预约专车${status}`;
				} else if(this.clue_type_id ==7){
					this.yuecheText = `开盘通知提醒${status}`;
				} else if(this.clue_type_id ==6){
					this.yuecheText = `领取优惠${status}`;
				}

				this.wranFlag = true;
				var times = setTimeout(() =>{
					this.wranFlag = false;
				},2000);
			}
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
				if(from.path == '/'){
					vm.homeFlag = false;
				}
			})
		},
		mounted () {
			this.homeFlag = true;
			//获取楼盘详细信息
			this.getLoupanDetail();
		}
	}
</script>
<style lang="less" scoped>
	.detail_wrap{
		background: #F6F5F5;
		padding-bottom: 4.5rem;
		.headerInfo{
			background: #F6F5F5;
			margin-bottom: 1.2rem;
			.item_img{
				background: #FFF;
				position: relative;
				.goback,.zhongxin,.moreimg{
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
				.zhongxin{
					border-radius: 50%;
					top: 1rem;
					right: 1rem;
					width: 2.8rem;
					line-height: 2.8rem;
					background: rgba(0, 0, 0, 0.5);
					i{
						font-size: 1.5rem;
					}
				}
				.moreimg{
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
			.xiangqing{
				padding: 1.5rem 1rem;
				margin-bottom: 1.2rem;
				background: #FFF;
				h3{
					font-size: 2.4rem;
					color: #333;
				}
				p{
					font-size: 1.4rem;
					color: #151515;
					line-height: 2.4rem;
					label{
						color: #666;
						display: inline-block;
					}
					.on{
						margin-left: 1.5rem;
						color: #F37021;
					}
				}
				.itemInfo{
					padding-bottom: .5rem;
					align-items: flex-end;
					.itemName{
						width:60%;
						.text{
							color:#666;
						}
						.labels{
							display: flex;
							align-items: center;
							padding: .5rem 0;
							box-sizing: border-box;
							span{
								display: block;
								margin-right:.5rem;
								padding:0 .5rem;
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: .6rem;
								font-size:1rem;
							}
						}
					}
					.price{
						flex:1;
						text-align: right;
						.money{
							font-size: 1.4rem;
							color: #FF3235;
							span{
								font-size: 2.2rem;
								white-space: nowrap;
							}
						}
						p{
							font-size: 1.2rem;
							color: #999;
						}
					}
				}
				.moreInfo{
					padding: .7rem 0 .5rem;
					label{
						width: 6rem;
						display: inline-block;
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
					display: flex;
					align-items: baseline;
					.dingwei{
						color: #FF6633;
						font-size: 1.4rem;
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
			.tuiguang{
				img{
					display: block;
					width: 100%;
				}
			}
		}
		.active{
			img{
				width: 100%;
			}
		}
		.fixedAlert{
			position: fixed;
			z-index: 203;
		}
	}
	.shadow{
		box-shadow: 0 0 0 0 #eee!important;
	}
</style>
