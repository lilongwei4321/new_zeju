<template>
  <div class="state_wrap" >
    <header-text name = "等待支付" :async="false"></header-text>
    <main class="state_main">
      <!-- 成功状态 -->
      <state-etc></state-etc>
      <section class="promise_box kuai_box">
        <h4 class="title border transverse_mo_center_ya">服务承诺</h4>
        <div class="box">
          <ul>
            <li>
              <h6>【楼盘跟踪】</h6>
              <p>楼盘政策通知，工程进度，交房时间等全程信息跟踪</p>
            </li>
            <li>
              <h6>【楼房验收】</h6>
              <p>专家免费上门验房，免除后顾之忧，放心收房</p>
            </li>
            <li>
              <h6>【邻居社群活动】</h6>
              <p>买房就是择居，择居帮您尽快融入社区生活</p>
            </li>
            <li>
              <h6>【全程手续代办】</h6>
              <p>让整个职业手续流程效率最高，省心省力入住称心好房</p>
            </li>
            <li>
              <h6>【1V1买房顾问】</h6>
              <p>政策解读、楼盘资讯、VIP带看、房源跟踪、物业分析</p>
            </li>
            <li>
              <h6>【免费看房专车】</h6>
              <p>全程免费接送上门、1户1车、买方顾问全程服务</p>
            </li>
          </ul>
        </div>
      </section>
      <section class="tui_loupan kuai_box">
        <h4 class="title transverse_mo_center_ya">特卖楼盘</h4>
        <div class="box">
          <item-list></item-list>
        </div>
      </section>
    </main>
    <footer class="footer">
      <router-link :to="`/${cityName}/memberYes`" class="transverse_center_center">支付</router-link>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
//引用  公用头部
import headerText from '@/components/base/header/header_text.vue';
//引用  成功状态
import stateEtc from '@/components/page/state/etc.vue';
//引用  楼盘布局
import itemList from '@/components/base/items/item_list.vue';
//引用  楼盘布局
import loupanList from '@/components/base/items/loupan_list.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    itemList,
    stateEtc,
    loupanList
  },
  computed: {...mapGetters(['cityName'])},
  data () {
    return {
      
    }
  },
  methods : {
    
  }
}
</script>
<style lang="less" scoped>
.state_wrap{
  padding:4.4rem 0 5.2rem;
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
  .footer{
    position: fixed;
    bottom:0;
    height: 5rem;
    width:100%;
    left:0;
    a{
      align-items: center;
      height: 100%;
      color:#fff;
      font-size: 1.6rem;
      background: #f63;
    }
  }
}
</style>
