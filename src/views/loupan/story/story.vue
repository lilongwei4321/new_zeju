<template>
  <div class="wrap">
    <header-city :name = "obj.name"></header-city>
    <main class="mina">
      <story-list :arr="arr"></story-list>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </main>
    <!-- footer -->
    <footer-btns :obj="footerObj"  :async="false"></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用  公用头部
import headerCity from '@/components/base/header/header_text.vue';
//引用  动态列表布局
import storyList from '@/views/loupan/story/story_anchor.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';	
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  data () {
    return {
      arr: [],
      obj : {},
      page :1,
      total_pages : 0,
      footerObj : {}
    }
  },
  components : {
    headerCity,
    storyList,
    loadMore,
    footerBtns
  },
  computed : {...mapGetters(['customerId','cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '故事列表页'){
        this.page = 1;
        this.arr  = [];
        this.total_pages =0;
        //获取故事列表
        this.getStoryList(true);
      }
    }
  },
  methods : {
    //获取故事列表
    getStoryList (async) {
      let action_name  = this.$route.params.type=='index'?'':this.$route.params.type,
          id   = this.$route.params.id==0?'':this.$route.params.id,
          customer_id = this.customerId,
           obj = {
            city_abbr : this.cityName,
            page : this.page,
            page_limit:10 ,
            action_name,
            id,
            customer_id
          };
          api.getStoryList(obj).then((res) =>{
            if(res.status == 200){
              let objData = res.data;
              //获取故事数据
              this.arr  = this.arr.concat(objData.stories);
              this.obj  = objData.common_info;
              //footer 传参
              this.footerObj = {
                id: objData.common_info.id,
                ext_phone:objData.common_info.ext_phone,
                host_phone:objData.common_info.host_phone,
                name : objData.common_info.name,
                type :1
              };
 
              //诸葛埋点  
              this.zhuGeBury(async);
              
              if(objData.stories.length > 0){
                //页数
                this.total_pages = objData.page_info.total_pages;
                this.page        = objData.page_info.current_page+1;
              }
              //可以再次请求
              this.$refs.loadMore.requestFn();
            } else if(res.status==422){
              this.$router.push(`/${this.cityName}/404`);
            }	
          });
    },
    //加载更多 显示隐藏
    moreFn () {
      //获取故事列表
      this.getStoryList(false);
    },
    //诸葛埋点
    zhuGeBury (async) {
      let name = async ? '打开' :'翻看',
          obj  = {
            '当前页面' : '故事列表页',
            '所属模块' : '故事'
          };

          if(!async){
            obj['翻看页数'] = this.page - 1;
          }

        zhuge.track(`${name}故事列表页`,obj);
    }
  },
  mounted () {
    //获取故事列表
    this.getStoryList(true);
  }
}
</script>
<style lang="less"  scoped>
.wrap{
  padding:4.6rem 0 5rem;
  .footer{
    position: fixed;
    bottom: 0;
    left:0;
    width:100%;
    a{
      display: block;
      line-height: 4.6rem;
      background: #f63;
      color:#fff;
      font-size: 1.6rem;
      width:100%;
      text-align: center;
    }
  }
}
</style>