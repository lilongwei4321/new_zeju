<template>
  <div class="wrap">
    <div class="main">
      <header-city :name="obj.name"></header-city>
      <div class="evaluate_list">
        <adviser-evaluate :arr ="arr"></adviser-evaluate>
        <!-- 加载更多 -->
        <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
      </div>
      <div class="lianxi">
        <a href="javascript:;" class="transverse_center_center" @click.prevent="phoneFn">联系TA</a>
      </div>
    </div>
  </div>
</template>
<script>
import api  from '@/api/api';
import globalFn from '@/assets/javascripts/globalFn';
import zhuGe from '@/assets/javascripts/zhuGe';
//引用  公用头部
import headerCity      from '@/components/base/header/header_text.vue';
import adviserEvaluate from './adviser_evaluate.vue';//买房人评价
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
export default {
  data (){
    return {
      arr : [],
      obj : {},
      page :1 ,
      total_pages :0
    }
  },
  components: {
    headerCity,
    adviserEvaluate,//买房人评价
    loadMore
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '买房人评价列表页'){
        this.page = 1;
        this.arr  = [];
        this.total_pages = 0;
        //获取顾问评价列表
        this.getAdviserEval(true);
      }
    }
  },
  methods : {
   //获取顾问评价列表
    getAdviserEval (async) {
      let id  = this.$route.params.id,
          obj = {
            page : this.page,
            page_limit : 10
          };
      api.getAdviserEval(obj,id).then((res) =>{
        if(res.status == 200){
          //列表数据
          this.arr      = this.arr.concat(res.data.appointment_evals);
          //座机
          this.obj      = res.data.advisor;
          //诸葛埋点
          this.zhuGeBury(async);
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
      //获取顾问评价列表
      this.getAdviserEval(false);
    },
    //拨打电话
    phoneFn () {
      let zjfrom = this.obj.ext_phone!=0?globalFn.getZjfrom():'';
      zhuge.track('点击400', {
        '当前页面' : '买房人评价列表页',
        '所属模块' : '顾问',
        '顾问ID'   : this.$route.params.id,
        '顾问姓名' : this.obj.name,
        '顾问分机' : this.obj.ext_phone,
        '分机号类型' : '顾问400'
      },() => {
        window.location.href = `tel:${this.obj.host_phone},${this.obj.ext_phone}${zjfrom}`;
      });
    },
    //诸葛埋点
    zhuGeBury (async) {
      let name = async ? '打开' : '翻看',
          obj  = {
        '当前页面' : '买房人评价列表页',
        '所属模块' : '顾问',
        '顾问ID'   : this.$route.params.id,
        '顾问姓名' : this.obj.name
      };

      if(!async) {
        obj['翻看页数'] = this.page -1;
      };
      
      zhuge.track(`${name}买房人评价列表页`, obj);
    }
  },
  mounted () {
    //获取顾问评价列表
    this.getAdviserEval(true);
  }
}
</script>
<style lang="less" scoped>
.evaluate_list{
  padding: 4.5rem 0;
}
.lianxi{
  height: 4.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  a{
    width: 100%;
    color: #FFF;
    font-size: 1.6rem;
    background: #F63;
    height: 100%;
  }
}
</style>
