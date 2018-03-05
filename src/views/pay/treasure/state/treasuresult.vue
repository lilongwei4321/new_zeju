<template>
  <div class="state_wrap" >
    <header-text name = "支付结果" :async="true"></header-text>
    <main class="state_main">
      <!-- 成功状态 -->
      <state-dui></state-dui>
      <section class="promise_box kuai_box">
        <div class="box">
          <item-qiang :async = "false" :obj="obj"></item-qiang>
        </div>
      </section>
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
import globalFn from '@/assets/javascripts/globalFn';
//引用  公用头部
import headerText from '@/components/base/header/header_text.vue';
//引用  成功状态
import stateDui from '@/components/page/state/success.vue';
//引用  楼盘布局
import itemList from '@/components/base/items/item_list.vue';
//引用  楼盘布局
import itemQiang from '@/components/base/items/item_list_one.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    itemList,
    stateDui,
    itemQiang
  },
  data () {
    return {
      obj : {}
    }
  },
  methods : {
    //获取支付结果
    getZhifuChaxun () {
      let obj  = {
        clazz : globalFn.getQueryString('clazz'),
        order_id : globalFn.getQueryString('order_id'),
        out_trade_no : globalFn.getQueryString('out_trade_no')
      }
      api.getZhifuChaxun(obj).then((res) =>{
        if(res.status == 200){
          this.gitSpecialData();
        } else if(res.status==422){
          this.$router.push(`/${this.$store.state.cityName}/404`);
        }	
      });
    },
    //获取 楼盘数据
    gitSpecialData () {
      api.gitSpecialData({},'272129400459266').then((res) =>{
        if(res.status==200){
          this.obj = res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.$store.state.cityName}/404`);
        }	
      });
    }
  },
  mounted () {
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
