<template>
  <div class="story_detail_wrap wrap">
    <header-city :name="obj.loupan_name" :async = "false" ></header-city>
    <main class="main">
      <dl>
        <dt class="back" :style="{'backgroundImage':`url(http://imgs.zeju.cn/${obj.img_url})`}"></dt>
        <dd>
          <div class="title_box border">
            <aside class="text portrait_fen_ya">
              <p><span>择居客户：</span><span>{{obj.customer_name}}</span></p>
              <p><span>购房日期：</span><span>{{obj.deal_at}}</span></p>
              <p><span>楼盘：</span><span>{{obj.loupan_name}}</span></p>
            </aside>
            <aside class="guwen">
              <router-link :to="`/${cityName}/advisor/advisor_detail/${obj.advisor_id}`" class="portrait_fen_center_ya">
                <span 
                  class="back img" 
                  :style="{'background-image':`url(http://imgs.zeju.cn/${obj.advisor_img_url})`}"></span>
                <span class="span">{{obj.advisor_name}}</span>
              </router-link>
            </aside>
          </div>
          <p class="text_box" v-html="obj.content"></p>
        </dd>
      </dl>
    </main>
    <footer-btns :obj="footerObj" :async="true"></footer-btns>
  </div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用  公用头部
import headerCity from '@/components/base/header/header_text.vue';
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
//引用  诸葛埋点
import zhuGe from '@/assets/javascripts/zhuGe.js';
export default {
  name: 'Home',
  components: {
    headerCity,
    footerBtns
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '故事详情页'){
        //获取故事详情
        this.getStoryDetail();
      }
    }
  },
  data () {
    return {
      obj : {} ,
      footerObj : {}
    }
  },
  computed : {...mapGetters(['customerId','cityName'])},
  methods : {
    //获取故事详情
    getStoryDetail () {
      var id  = this.$route.params.id;
      var para = {
        customer_id : this.customerId
      }
      api.getStoryDetail(para,id).then((res) =>{
        if(res.status == 200){
          var objData = res.data;
          //获取故事数据
          this.obj  = objData.story;
          //footer传参
          this.footerObj = {
            id: objData.common_info.id,
            ext_phone:objData.common_info.ext_phone,
            host_phone:objData.common_info.host_phone,
            name : objData.common_info.name,
            type :1
          };
          //诸葛埋点
          this.zhuGeBury();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //诸葛埋点
    zhuGeBury () {
      zhuge.track('打开故事详情页', {
        '当前页面' : '故事详情页',
        '所属模块' : '故事',
        '来源链接模块' : zhuGe.theModular(),
        '来源链接位置' : this.$route.query.num,
        '故事ID' : this.$route.params.id
      });
    }
  },
  mounted () {
    //获取故事详情
    this.getStoryDetail();
  }
}
</script>
<style lang="less" scoped>
.story_detail_wrap{
  padding:4.4rem 0 4.5rem;
  .main{
    dl{
      dt{
        height: 28rem;
        width: 100%;
        background-position: center top;
        position: relative;
      }
      dd{
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        padding:0 1rem;
        .title_box{
          display: flex;
          justify-content: space-between;
          padding:1.6rem 0;
          height: 9.4rem;
          .text{
            flex:1;
            padding-right:1rem;
            p{
              font-size:1.4rem;
              color:#333;
            }
          }
          .guwen{
            width:6rem;
            height: 100%;
            a{
              height: 100%;
              width:100%;
              align-items: flex-end;
              .img{
                width:4rem;
                height: 4rem;
                border-radius: 100%;
              }
              .span{
                font-size:1.4rem;
                color:#333;
              }
            }
          }
        }
        .text_box{
          padding:1.6rem 0;
          line-height: 2.2rem;
          font-size:1.4rem;
          color:#666;
        }
      }
    }
  }
}
</style>
