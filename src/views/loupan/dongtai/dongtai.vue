<template>
  <div class="wrap">
    <header-city :name = "obj.name"></header-city>
    <main class="main">
      <!-- 动态列表 -->
      <dong-list :arr = "arr" :obj="obj"></dong-list>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </main>
    <!-- 引入页脚 -->
    <footer-btns :obj="footerObj" :async="false"></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用  公用头部
import headerCity from '@/components/base/header/header_text.vue';
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
//引用  动态列表布局
import dongList from '@/views/loupan/dongtai/dongtai_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';	
export default {
  data () {
    return {
      arr : [],
      loadAsync: false,
      page: 1,
			total_pages : 0,//总页数默认0
      obj   : {},
      footerObj : {}
    }
  },
  components : {
    headerCity,
    dongList,
    loadMore,
    footerBtns
  },
  computed : {...mapGetters(['customerId','cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '楼盘动态列表页'){
        this.page =1;
        this.total_pages = 0;
        this.arr  = [];
        //楼盘动态列表页
        this.getDongtaiData(true);
      }
    }
  },
  methods : {
    //获取动态数据
    getDongtaiData (async){
      var obj = {
        page : this.page,
        page_limit : 10,
        customer_id : this.customerId
      }
      var id = this.$route.params.loupan_id;
      api.getDongtaiJson(obj,id).then((res)=>{
        if(res.status == 200){
          var objData = res.data;
          //获取故事数据
          this.obj = objData.loupan;
          //诸葛  --- 打开埋点
          this.zhugeBury(async);

          this.arr  = this.arr.concat(objData.dynamics);
          //页数
          this.total_pages = objData.page_info.total_pages;
          this.page        = objData.page_info.current_page+1;
          //footer传参
          this.footerObj = {
            id: this.obj.id,
            ext_phone:this.obj.ext_phone,
            host_phone:this.obj.host_phone,
            name : this.obj.name,//当前页名称
            type :1
          };
          //可以再次请求
          this.$refs.loadMore.requestFn();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }
      })
    },   
    //加载更多 显示隐藏
    moreFn () {
      //获取
      this.getDongtaiData(false);
    },
    //诸葛  --- 打开埋点
    zhugeBury (async) {
      let name = async ? '打开' : '翻看',
          obj  = {
            '当前页面' : '楼盘动态列表页',
            '所属模块' : '楼盘',
            '楼盘ID'   : this.obj.id,
            '楼盘名称' : this.obj.name
          };

          if(!async){
            obj['翻看页数']  = this.page-1;
          }
          zhuge.track(`${name}楼盘动态列表页`, obj);
    }
  },
  //获取评测列表数据
  mounted () {
    //楼盘动态列表页
    this.getDongtaiData(true);
  }
}
</script>
<style lang="less"  scoped>
.wrap{
  padding:4.6rem 0 4rem;
}
</style>