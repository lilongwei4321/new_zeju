<template>
<!-- 点评列表 -->
  <div class=" evaluate_wrap">
    <!-- 楼盘吸顶1 -->
    <header-text :url="`/loupan/write_comment/${footerObj.id}?name=${name}`" :name="name" :headFlag="false" :wordFlag="true" msg="写点评"></header-text>
    <div class="main">
      <comment-list :obj="obj" :arr="arr"></comment-list>
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
import {Token}    from '@/assets/javascripts/token.js';
//吸顶
import headerText  from '@/components/base/header/header_text.vue';
//点评列表
import commentList from '@/views/loupan/comment/comment_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';	
//引用  公用页脚
import footerBtns    from '@/components/base/footer/footer_btns.vue';
export default {
  data () {
    return {
      name: '      ',
      page : 1,
      total_pages:0,
      obj : {},
      arr : [],
      footerObj : {},
      loupanObj : {}
    }
  },
  watch : {
  '$route' (to) {
    if(to.name == '楼盘点评列表页'){
        this.page =1;
        this.total_pages = 0;
        this.arr = [];
        //获取点评数据
        this.gitCommentData(true);
      }
    }
  },
	computed : {...mapGetters(['customerId','customerPhone','cityName'])},
  components: {
    headerText,//楼盘吸顶
    commentList,
    loadMore,
    footerBtns
  },
  methods : {
    //获取点评数据
    gitCommentData (async) {
      var num = this.customerPhone;
      let obj = {
        page : this.page,
        page_limit:10,
        token : Token(num),
        customer_id : this.customerId
      };
      api.gitCommentData(obj,this.$route.params.id).then((res) =>{
        if(res.status == 200){
          let obj  = res.data;
          //评测数组
          this.arr  = this.arr.concat(obj.comments);
          //点评介绍
          this.obj  = obj.total_score;
          this.loupanObj = obj.loupan;
          //诸葛  --- 打开埋点
          this.zhugeBury(async);
          //页脚
          this.footerObj = {
            id   : this.loupanObj.id,
            name : this.loupanObj.name,//当前页名称
            type :1 ,
            ext_phone:this.loupanObj.ext_phone,
            host_phone:this.loupanObj.host_phone
          };
          this.name = obj.loupan.name;

          if(obj.comments.length>0){
            //页数
            this.total_pages = obj.page_info.total_pages;
            this.page        = obj.page_info.current_page+1;
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
      //获取故事列表
      this.gitCommentData(false);
    },
    //诸葛  --- 打开埋点
    zhugeBury (async) {
      let name = async ? '打开' : '翻看',
          obj  = {
            '当前页面' : '楼盘点评列表页',
            '所属模块' : '楼盘',
            '楼盘ID'   : this.loupanObj.id,
            '楼盘名称' : this.loupanObj.name
          };

          if(!async){
            obj['翻看页数']  = this.page-1;
          }
          zhuge.track(`${name}楼盘点评列表页`, obj);
    }
  },
  mounted () {
    //获取点评数据
    this.gitCommentData(true);
  }
}
</script>
<style lang="less" scoped>
.evaluate_wrap{
  padding-top: 4.4rem;
}
</style>
