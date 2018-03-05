<template>
  <div class="state_wrap" >
    <header-text name = "支付结果" :async="true" :pageUrl="`/${cityName}`"></header-text>
    <main class="state_main">
      <!-- 成功状态 -->
      <state-dui :async="async"></state-dui>
      <section class="promise_box kuai_box">
        <h4 class="title border transverse_mo_center_ya">服务承诺</h4>
        <div class="box">
          <ul>
            <li v-for="(m,ind) in textArr" :key="ind" v-if="ind <num">
              <h6>【{{m.title}}】</h6>
              <p>{{m.cont}}</p>
            </li>
          </ul>
        </div>
      </section>
      <!-- 特卖楼盘 -->
      <section class="tui_loupan kuai_box" v-if="false">
        <h4 class="title transverse_mo_center_ya">特卖楼盘</h4>
        <div class="box">
          <item-list></item-list>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters,mapActions} from 'vuex';
//引用  公用头部
import headerText from '@/components/base/header/header_text.vue';
//引用  成功状态
import stateDui from '@/components/page/state/success.vue';
//引用  楼盘布局
import itemList from '@/components/base/items/item_list.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    itemList,
    stateDui
  },
  computed : {...mapGetters(['customerId','cityName'])},
  watch :{
    '$route' (to){
      if(to.name == '购买会员成功页'){
        this.vip_level = 0;
        this.num       = 2;
        this.async     = false;
        this.vip_name  = '普通会员';
        //获取支付结果
        this.getZhifuChaxun();
      }
    }
  },
  data () {
    return {
      async : false,
      vip_level :0,
      vip_name  : '普通会员',
      num  : 2,
      textArr : [
        {title : '1V1买房顾问',cont:'政策解读、楼盘资讯、VIP陪看、房源跟踪、物业分析。'},
        {title : '免费看房专车',cont:'全程免费接送上门、1户1车、买方顾问全程服务。'},
        {title : '全程手续代办',cont:'让整个职业手续流程效率最高，省心省力入住称心好房。'},
        {title : '楼盘跟踪',cont:'楼盘政策通知，工程进度，交房时间等全程信息跟踪。'},
        {title : '楼房验收',cont:'专家免费上门验房，免除后顾之忧，放心收房。'},
        {title : '邻居社群活动',cont:'买房就是择居，择居帮您尽快融入社区生活。'}
      ]
    }
  },
  methods : {
    //设置storage
    ...mapActions(['setCookieFn']),
    //获取支付结果
    getZhifuChaxun () {
      let obj  = {
        clazz : this.$route.params.clazz,
        order_id : this.$route.params.id,
        out_trade_no : this.$route.params.trade
      }
      api.getZhifuChaxun(obj).then((res) =>{
        if(res.status == 200){
          this.async = res.data.is_successful;
          this.vip_level = res.data.vip_level;

          if(this.vip_level ==1){
            this.num = 3;
            this.vip_name = '金卡会员';
          } else if(this.vip_level ==2){
            this.num = 10;
            this.vip_name = '钻石会员';
          }
          //成功 会员级别
          this.setCookieFn(['customerLevel',this.vip_level]);
          //诸葛  -埋点
          this.zhugeBury(res.data);
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //诸葛  -埋点
    zhugeBury (obj) {
      zhuge.track('会员购买结果页', {
        '当前页面' : '会员服务购买结果页',
        '所属模块' : '会员服务',
        '购买内容' : this.vip_name,
        '支付方式' : obj.pay_way,
        '支付金额' : obj.money,
        '购买结果' : obj.is_successful
      });
    }
  },
  mounted () {
    //请求支付接口
    this.getZhifuChaxun();
  }
}
</script>
<style lang="less" scoped>
.state_wrap{
  padding-top:4.4rem;
  .state_main{
    background: #F6F5F5;
    .kuai_box{
      background: #fff;
      margin-bottom: 1rem;
      .title{
        font-size:1.6rem;
        color:#333;
        height: 4.5rem;
        padding-left:1rem;
      }
    }
    .promise_box{
      .box{
          padding:2rem 1rem;
        ul{
          li{
            h6{
              font-size:1.6rem;
              color:#f63;
              margin-bottom: 1rem;
            }
            p{
              font-size:1.4rem;
              color:#666;
              margin-bottom: 2rem;
            }
            &:last-child{
              p{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    .tui_loupan{
      .box{
        padding:0 1rem 1rem;
      }
    }
  }
}
</style>
