<template>
  <div class="state_wrap" >
    <header-text name = "等待支付" :async="false"></header-text>
    <main class="state_main">
      <!-- 成功状态 -->
      <state-etc></state-etc>
      <section class="promise_box kuai_box">
        <h4 class="title border transverse_mo_center_ya">订单信息</h4>
        <div class="box">
          <loupan-list :arr = "[1]"></loupan-list>
        </div>
      </section>
      <section class="tui_loupan kuai_box">
        <h4 class="title transverse_mo_center_ya">为您推荐</h4>
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
  data () {
    return {
      
    }
  },
  computed: {...mapGetters(['cityName'])},
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
    font-size: 1.6rem;
    width:100%;
    a{
      height: 100%;
      width:100%;
      background: #f63;
      color:#fff;
    }
  }
}
</style>
