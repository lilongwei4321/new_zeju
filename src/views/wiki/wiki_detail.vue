<template>
  <div class="wrap wiki_detail">
    <!-- 楼盘吸顶1 -->
		<header-text name="择居百科" :headFlag="false"></header-text>
    <div class="con_top">
      <img :src="`http://imgs.zeju.cn/${obj.img_url}`"  v-if="obj.img_url !=null && obj.img_url !=undefined">
      <div class="content">
        <p class="border text_ove1 title">{{obj.title}}</p>
        <div v-html="obj.content" class="main"></div>
      </div>
    </div>
    <footer-btns :async="false" :obj="footerObj" ref="footerBox"></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import headerText from '@/components/base/header/header_text.vue';//楼栋信息
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  data(){
    return {
      obj :{},
      footerObj : {},
    }
  },
  components:{
    headerText,
    footerBtns
  },
  computed : {...mapGetters(['customerId','cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '百科详情页'){
        //初始化升级会员弹框
        this.$refs['footerBox'].alertFn();
        //获取百科详情
        this.getWikiDetail();
      }
    }
  },
  methods : {
    //获取百科详情
    getWikiDetail () {
      var id  =this.$route.params.id;
          api.getWikiDetail({},id).then((res) =>{
            if(res.status == 200){
              let obj = res.data;
              //获取百科数据
              this.obj = obj.data;
              //footer传参
              this.footerObj = {
                id: this.obj.wiki_id,
                ext_phone:obj.common_info.ext_phone,
                host_phone:obj.common_info.host_phone,
                name : this.obj.title,//当前页名称
                type :1
              };
              //诸葛埋点
              this.zhugeBury();
            } else if(res.status==422){
              this.$router.push(`/${this.cityName}/404`);
            }	
          });
    },
    //诸葛埋点
    zhugeBury () {
      zhuge.track('打开百科详情页', {
        '当前页面' : '百科详情页',
        '所属模块' : '百科',
        '来源链接位置' : zhuGe.theModular(),
        '来源链接位置' : this.$route.query.num,
        '百科ID'   :this.obj.wiki_id,
        '百科标题' : this.obj.title
      });
    }
  },
  mounted () {
    //初始化升级会员弹框
    this.$refs['footerBox'].alertFn();
    //获取百科详情
    this.getWikiDetail();
  }
}
</script>
<style lang="less" scoped>
.wiki_detail{
  padding: 4.4rem 0;
  .con_top{
    img{
      width: 100%;
      display: inline-block;
    }
    .content{
      padding: 0 1rem;
      img{
        display: block;
        width:100%;
      }
      .title{
        line-height: 5rem;
        font-size: 1.8rem;
        color: #333;
        font-weight: bold;
      }
    }
  }
}
</style>
<style lang='less' >
.wiki_detail{
  .content{
    img{
      display:block;
      width:100%;
    }
    .main{
      padding-top: .5rem;
      p{
        text-indent: 0em!important;
        margin-bottom:1rem;
        font-size:1.4rem!important;
        color:#333!important;
        span{
          text-indent: 0em!important;
        }
      }
    }
  }
}
</style>
