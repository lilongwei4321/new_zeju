<template>
  <div class="fuwu_wrap">
    <header-text :name = "obj.name"  :async="false"></header-text>
    <div class="mian service">
      <dongtai-adviser :arr="arr" ></dongtai-adviser>
      <!-- 加载更多 -->
      <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
    </div>
    <footer class="footer">
      <a href="javascript:;" @click.prevent="zhuGePhone">联系TA</a>
    </footer>
  </div>
</template>
<script>
import api  from '@/api/api';
import globalFn from '@/assets/javascripts/globalFn';
//引用  公用头部
import headerText     from '@/components/base/header/header_text.vue';
import dongtaiAdviser from '@/views/loupan/dongtai/dongtai_adviser.vue';//服务动态
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
export default {
  components: {
    headerText,
    dongtaiAdviser,
    loadMore
  },
  data (){
    return {
      arr : [],
      obj : {} ,
      page :1,
      total_pages :0
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '顾问动态列表页'){
        //获取顾问动态列表
        this.getAdviserDong(true);
      }
    }
  },
  methods :{
    //获取顾问动态列表
    getAdviserDong (async) {
      var id  = this.$route.params.id,
          obj = {
            page : this.page,
            page_limit : 10
          }
      api.getAdviserDong(obj,id).then((res) =>{
        if(res.status == 200){
          //获取顾问数据
          let obj = res.data;
          this.obj      = obj.advisor;
          this.arr      = this.arr.concat(obj.appointments);

          //诸葛埋点
          this.zhuGeBury(async);
          //页数
          this.total_pages = obj.page_info.total_pages;
          this.page        = obj.page_info.current_page+1;
          //可以再次请求
          this.$refs.loadMore.requestFn();
        } else if(res.status==422){
          this.$router.push(`/${this.$store.state.cityName}/404`);
        }	
      })
    },
    //加载更多 显示隐藏
    moreFn () {
      this.getAdviserDong(false);
    },
    //诸葛埋点
    zhuGeBury (async) {
      let name = async ? '打开' : '翻看',
          obj  = {
            '当前页面' : '顾问动态列表页',
            '所属模块' : '顾问',
            '顾问ID'   : this.$route.params.id,
            '顾问姓名' : this.obj.name
          }
          if(!async){
            obj['翻看页数'] = this.page-1;
          }
          zhuge.track(`${name}顾问动态页`, obj);
    },
    //诸葛  打电话埋点
    zhuGePhone () {
      let zjfrom = this.obj.ext_phone!=0?globalFn.getZjfrom():'';
      zhuge.track('点击400', {
        '当前页面' : '顾问动态列表页',
        '所属模块' : '顾问',
        '顾问ID'   : this.$route.params.id,
        '顾问姓名' : this.obj.name,
        '顾问分机' : this.obj.ext_phone,
        '分机号类型' : '顾问400'
      },() => {
        window.location.href = `tel:${this.obj.host_phone},${this.obj.ext_phone}${zjfrom}`;
      });
    }
  },
  mounted () {
    //获取顾问动态列表
    this.getAdviserDong(true);
  }
}
</script>
<style lang="less" scoped>
.fuwu_wrap{
  padding: 4.4rem 0 5rem;
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
