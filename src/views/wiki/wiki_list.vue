<template>
  <div class="wrap">
    <!-- 楼盘吸顶1 -->
    <header-text :name="obj.category_name" :headFlag="false"></header-text>
    <div class="main wiki_list">
      <wiki-part :arr="arr"></wiki-part>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </div>
  </div>
</template>
<script>
import api  from '@/api/api';
import globalFn from '@/assets/javascripts/globalFn';
//头部组件
import headerText from '@/components/base/header/header_text.vue';
//百科组件
import wikiPart   from '@/views/wiki/wiki_part.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';	
export default {
  data (){
    return {
      page	 : 1,
      total_pages :0,
      arr : [],
      obj : {}
    }
  },
  components:{
    headerText,
    wikiPart,
    loadMore
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '百科列表页'){
        //获取百科列表
        this.getWikiFenList(true);
      }
    }
  },
  methods : {
    //获取百科列表
    getWikiFenList (async) {
      var obj = {
            id : this.$route.params.id ,
            page : this.page,
            page_limit : 10
          };
          api.getWikiFenList(obj).then((res) =>{
            if(res.status == 200){
              //获取百科数据
              this.arr  = this.arr.concat(res.data.wikis);
              this.obj  = res.data.wiki_category;
              //诸葛埋点
              this.zhugeBury(async);
              //页数
              this.total_pages = res.data.page_info.total_pages;
              this.page        = res.data.page_info.current_page+1;
              //可以再次请求
              this.$refs.loadMore.requestFn();
            } else if(res.status==422){
              this.$router.push(`/${this.$store.state.cityName}/404`);
            }	
          });
    },
    //加载更多 显示隐藏
    moreFn () {
      //获取故事列表
      this.getWikiFenList(false);
    },
    //诸葛埋点
    zhugeBury (async) {
      let name = async ? '打开' : '翻看',
          obj  = {
          '当前页面' : '百科列表页',
          '所属模块' : '百科',
          '筛选项' : this.obj.category_name
          };

          if(!async) {
            obj['翻看页数']  = this.page-1;
          }

          zhuge.track(`${name}百科列表页`, obj);
    }
  },
  mounted () {
    //获取百科列表
    this.getWikiFenList(true);
  }
}
</script>
<style lang="less" scoped>
.wrap{
  padding-top: 4.5rem;
}
.wiki_list{
  footer{
    display: flex;
    position: fixed;
    bottom: 0;
    height: 4.5rem;
    width: 100%;
    background: #FFF;
    div{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-right: 1px solid #EAEAEA;
      font-size: 1rem;
      color: #999;
      &:last-child{
        border-right:none;
      }
      i{
        font-size: 1.6rem;
      }
    }
    .cur{
      background: #F63;
      color: #FFF;
    }
  }
}
</style>
