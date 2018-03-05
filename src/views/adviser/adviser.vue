<template>
  <div class="wrap">
    <header-city name = "择居顾问"></header-city>
    <main class="main">
      <adviser-list  :arr="arr"></adviser-list>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </main>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用  公用头部
import headerCity from '@/components/base/header/header_text.vue';
//引用  动态列表布局
import adviserList from './items/adviser_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
export default {
  data () {
    return {
      arr : [] ,
      page  : 1 ,
			total_pages : 0
    }
  },
  components : {
    headerCity,
    adviserList,
    loadMore
  },
  computed : {...mapGetters(['cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '顾问列表页'){
        this.page =1;
        this.arr  = [];
        this.total_pages = 0;
        //获取顾问列表
        this.getAdviserList(true);
      }
    }
  },
  methods : {
    //获取顾问列表
    getAdviserList (async) {
      var obj = {
        city_abbr : this.cityName,
        page      : this.page ,
        page_limit : 10 ,
        list_type : 2
      }
      api.getAdviserList(obj).then((res) =>{
        if(res.status == 200){
          let obj = res.data;
          //合并数组
          this.arr = this.arr.concat(obj.advisors);
          //诸葛埋点
          this.zhuGeBury(async);
          //当前页数
          this.total_pages = obj.page_info.total_pages;
          this.page        = obj.page_info.current_page+1;
          //可以再次请求
          this.$refs.loadMore.requestFn();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }
      })
    },
    //加载更多 显示隐藏
    moreFn () {
      this.getAdviserList(false);
    },
    //诸葛埋点
    zhuGeBury (async) {
      let name = async ? '打开':'翻看',
          obj  = {
            '当前页面' : '顾问列表页',
            '所属模块' : '顾问'
          };
          
          if(!async){
            obj['翻看页数']=this.page-1;
          };
          zhuge.track(`${name}顾问列表页`, obj);
    }
  },
  mounted () {
    //获取顾问列表
    this.getAdviserList(true);
  }
}
</script>
<style lang="less"  scoped>
.wrap{
  padding-top:4.6rem;
}
</style>