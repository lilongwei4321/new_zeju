<template>
  <div class="sale_wrap">
    <header-text :name = "`${name} - ${titleName}楼盘`" :headFlag ="true" :async="false"></header-text>
    <main class="sale_main">
      <loupan-list :arr = "louData"></loupan-list>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </main>
    <!-- footer -->
    <footer-btns :obj="footerObj" :async="false"></footer-btns>
  </div>
</template>

<script>
import api from '@/api/api';
import {mapGetters} from 'vuex';
//引用头部
import headerText from '@/components/base/header/header_text.vue';
//引用布局
import loupanList from '@/components/base/items/loupan_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    loadMore,
    loupanList,
    footerBtns
  },
  watch : {
  '$route' (to) {
    if(to.name == '相关楼盘列表页'){
        //重置
        this.init();
      }
    }
  },
  data () {
    return {
      louData     : [],
      page: 1,
			total_pages : 0,//总页数默认0
      name : '',
      footerObj : {},//吸底数据
      titleName  : '同价位'
    }
  },
  computed : {...mapGetters(['customerId','customerPhone','cityName'])},
  methods :{
    init () {
      this.page = 1;
      this.louData = [];
      this.total_pages = 0;
      if(this.$route.params.name=='same_price'){
        //获取同价数据
        this.getSamepriceData();
        this.titleName = '同价位';
      } else{
        this.titleName = '周边';
        //获取周边数据
        this.getAroundsData();
      }
    },
    //获取同价数据
    getSamepriceData (){
      var id = this.$route.params.loupan_id;
      var para = {
        page : this.page,
        page_limit : 10,
        customer_id : this.customerId
      }
      api.gitsamePriceData(para,id).then((res)=>{
        if(res.status == 200){
          let obj = res.data;
          this.louData = this.louData.concat(obj.loupans);
          this.name = obj.loupan.name;
          //诸葛埋点
          this.zhugeBury('同价');
          if(this.louData.length > 0){
            //页数
            this.total_pages = obj.page_info.total_pages;
            this.page = obj.page_info.current_page+1;
					  //可以再次请求
				  	this.$refs.loadMore.requestFn();
          }
          this.footerObj = {
            id: obj.loupan.id,
            ext_phone:obj.loupan.ext_phone,
            host_phone:obj.loupan.host_phone,
            name : obj.loupan.name,
            type :1
          }
        } else if(res.status == 422){
          this.$route.push(`/${this.cityName}/404`);
        }
      });
    },
    //获取周边数据
    getAroundsData (){
      var id = this.$route.params.loupan_id;
      let obj = {
        page : this.page,
        page_limit : 10
      }
      api.getAroundsJson(obj,id).then((res)=>{
        if(res.status == 200){
          let obj = res.data;
          this.louData = this.louData.concat(obj.loupans);
          this.name = obj.loupan.name;
          //诸葛埋点
          this.zhugeBury('周边');

          if(this.louData.length > 0){
            //页数
            this.total_pages = obj.page_info.total_pages;
            this.page = obj.page_info.current_page+1;
					  //可以再次请求
				  	this.$refs.loadMore.requestFn();
          }
          this.footerObj = {
            id: obj.loupan.id,
            ext_phone:obj.loupan.ext_phone,
            host_phone:obj.loupan.host_phone,
            nowName : this.$route.name,
            type :1
          }
        } else if(res.status == 422){
          this.$router.push(`/${this.cityName}/404`);
        }
      });
		},
    //加载更多 显示隐藏
    moreFn () {
      if(this.$route.params.name=='same_price'){
        //获取同价数据
        this.getSamepriceData();
      } else{
        //获取周边数据
        this.getAroundsData();
      }
    },
    //诸葛埋点
    zhugeBury (str) {
      zhuge.track(`打开${str}楼盘列表`, {
        '当前页面' : `${str}楼盘列表页`,
        '所属模块' : '楼盘',
        '查看次数' : this.page
      });
    }
  },
  mounted (){
    //判断是同价还是周边
    this.init(); 
  }
}
</script>
<style lang="less" scoped>
.sale_wrap{
  padding:4.4rem 0 4.5rem;
}
</style>
