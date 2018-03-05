<template>
  <div class="member_wrap" @touchmove.prevent>
    <div class="member_main">
      <section class="header">
        <dl class="transverse_fen_center_ya border">
          <dt>
            <div>
              <img src="/static/assets/images/maidaobao.png">
            </div>
          </dt>
          <dd>
            <p class="price transverse_mo_center_ya">
              <span>￥100</span>
              <i class="iconfont icon-jia" @click="showFn(false)"></i>
            </p>
            <p class="text text_ove2">{{ baoMsg }}</p>
          </dd>
        </dl>
      </section>
      <main class="main" >
        <section class="box"> 
          <div class="scroll" v-ScrollMove>
            <!-- <h4 class="text" v-if="!async">恒大山水城项目已经与择居网建立深度合作。购买买到宝服务后，择居网将依托自身渠道资源，专门为您个人定制房源绿色通道服务，保证优先买到您想要的房子。</h4> -->
            <item-list></item-list>
          </div>
        </section>
        <footer class="footer border1">
          <span @click="sure"    class="button transverse_center_center" v-if="!async">确定</span>
          <span  class="transverse_fen_center_ya tijiao" v-else>
            <span class="text transverse_center_center">林馨家园1栋101<i>共￥100</i></span>
            <span class="button btn transverse_center_center" @click="payAsync = true">提交订单</span>
          </span>
        </footer>
      </main>
    </div>
    <!-- 支付  弹层 -->
    <alert-pay v-if="payAsync" name = "买到宝" @alertBuy="alertBuy"></alert-pay>
  </div>
</template>

<script>
import Vue from 'vue';
//支付  弹层
import alertPay from '@/components/page/alert/alert_pay.vue';
//楼盘 详情组件
import itemList from '@/components/base/items/item_list_one.vue';
export default {
  name: 'Home',
  components: {
    alertPay,
    itemList
  },
  data () {
    return {
      payAsync : false,//支付 弹层
      async    : false,//提交确定
      baoMsg   : '好机会不容犹豫，择居特卖板块超低价房源抢先预订！',
    }
  },
  methods : {
    //隐藏 会员页
    showFn (async) {
      this.$emit("roomConfirm",async);
      this.async = false;
    },
    //隐藏 支付页
    alertBuy () {
      this.payAsync = false;
    },
    sure (){
      this.async = true;
      this.baoMsg= '100元线上订房，即可抢购！';
    }
  }
}
</script>
<style lang="less" scoped>
.member_wrap{
  position: fixed;
  left: 0;
  top:0;
  bottom:0;
  right: 0;
  background: rgba(0,0,0,0.4);
  z-index:202;
  .member_main{
    height: 100%;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .header{
      background: #fff;
      dl{
        width:100%;
        height: 8.5rem;
        padding:0 .8rem 0 2rem;
        dt{
          width:8.8rem;
          background: #fff;
          position: relative;
          left:0;
          height: 100%;
          margin-right:1.6rem;
          div{
            position: absolute;
            top:-2rem;
            height: 8.8rem;
            width: 100%;
            background: #fff;
            border-radius: .4rem;
            box-shadow: 0px 2px 2px 2px #eee;
            img{
              display: block;
              width:6.3rem;
              margin:0 auto;
            }
          }
        }
        dd{
          flex:1;
          height: 100%;
          display: flex;
          flex-direction: column;
          .price{
            justify-content: space-between;
            height: 3.3rem;
            padding-top:.4rem;
            span{
              font-size: 2rem;
              font-weight: bold;
              color: #FF3235;
            }
            i{
              transform:rotate(45deg);
              font-size:2rem;
              color:#BFBFBF;
            }
          }
          .text{
            line-height: 1.6rem;
            padding-right:1.4rem;
            font-size:1.2rem;
            color:#666;
          }
        }
      }
    }
    .main{
      background: #fff;
      .box{
        padding:1rem 1rem;
        .scroll{
          max-height: 34rem;
          overflow-y: scroll;
        }
        .text{
          font-size:1.4rem;
          color:#666;
          padding-bottom:1rem;
          line-height: 2.4rem;
        }
      }
      .footer{
        height: 5rem;
        .button{
          width:100%;
          height: 100%;
          color:#fff;
          background: #f63;
          font-size:1.6rem;
        }
        .tijiao{
          height: 100%;
          .btn{
            width:14rem;
          }
          .text{
            flex:1;
            font-size:1.4rem;
            color:#333;
            background: #F6F5F5;
            height: 100%;
            i{
              color: #FF3235;
              font-style: normal;
              margin-left:1rem;
            }
          }
        }
      }
    }
  }
}
</style>
