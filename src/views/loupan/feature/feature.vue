<template>
  <div class="tese_wrap">
    <header-text name = "特色频道" :headFlag ="true" :async="false"></header-text>
    <main class="tese_main">
      <header class="header">
        <img src="/static/assets/images/tese-img.png">
      </header>
      <feature-list :arr = "arr" ></feature-list>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </main>
    <!-- footer -->
    <footer-btns :async="false" :obj="footerObj"></footer-btns>
  </div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用头部
import headerText from '@/components/base/header/header_text.vue';
//引用布局
import featureList from './items/feature_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    loadMore,
    featureList,
    footerBtns
  },
  computed : {...mapGetters(['customerId','cityName'])},
  data () {
    return {
      arr     : [],
      footerObj : {},
      page :1,
      total_pages : 0
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '特色频道列表页'){
        this.page = 1;
        this.arr = [];
        this.total_pages = 0;
        //请求特色频道
        this.gitTeseChannel(true);
      }
    }
  },
  methods :{
    //请求特色频道
    gitTeseChannel (async) {
      let obj = {
        page : this.page,
        page_limit : 10,
        list_type:2,
        city_abbr : this.$store.state.cityName
      }
      api.gitTeseChannel(obj).then((res) =>{
        if(res.status==200){
          let obj = res.data.common;
          this.arr = this.arr.concat(res.data.channels);
          //footer传参
          this.footerObj = {
            id: obj.id,
            ext_phone:obj.ext_phone,
            host_phone:obj.host_phone,
            nowName : '特色频道列表页',
            type :1
          }
          
          //诸葛埋点
          this.zhugeBury(async);
          
          //数据为空不往下执行
          if(res.data.page_info == undefined){return false;}
          //页数
          this.total_pages = res.data.page_info.total_pages;
          this.page        = res.data.page_info.current_page+1;
          //可以再次请求
          this.$refs.loadMore.requestFn();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //加载更多 显示隐藏
    moreFn () {
      //请求特色频道
      this.gitTeseChannel(false);
    },
    //诸葛埋点
    zhugeBury (async) {
      let name = async?'打开':'翻看',
          obj  = {
            '当前页面' : '特色频道列表页',
            '所属模块' : '特色频道'
          };

          if(!async){
            obj['翻看页数'] = this.page - 1;
          }

          zhuge.track(`${name}特色频道列表`,obj);
    }
  },
  mounted () {
    //请求特色频道
    this.gitTeseChannel(true);
  }
}
</script>
<style lang="less" scoped>
.tese_wrap{
  padding:4.4rem 0 4.5rem;
  .tese_main{
    .header{
      img{
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
