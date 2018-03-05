<template>
  <div class="member_wrap" @touchmove.prevent>
    <div class="member_main">
      <section class="header">
        <dl class="transverse_fen_center_ya border">
          <dt>
            <div>
              <img src="/static/assets/images/maidaobao.png" v-if="type != '特卖房'">
              <img src="/static/assets/images/temaifang.png" v-else>
            </div>
          </dt>
          <dd>
            <p class="price transverse_mo_center_ya">
              <span>￥{{type == '特卖房'  ?100:510}}</span>
              <i class="iconfont icon-jia" @click="showFn(false)"></i>
            </p>
            <!-- 判断是买到宝，还是特卖房 -->
            <p class="text text_ove2" v-if="type == '特卖房'">好机会不容犹豫，择居特卖板块超低价房源抢先预订！</p>
            <p class="text text_ove2" v-else>买到宝 —— 私人特供置业通道</p>
          </dd>
        </dl>
      </section>
      <main class="main" >
        <section class="box" > 
          <div class="scroll" v-ScrollMove>
            <h4 class="text" v-if="!async">{{obj.mdb_document}}</h4>
            <!-- 楼盘信息 -->
            <item-list :obj="obj"></item-list>
          </div>
        </section>
        <footer class="footer border1">
          <span @click="async = true"    class="button transverse_center_center" v-if="!async">确定</span>
          <span  class="transverse_fen_center_ya tijiao" v-else>
            <span class="text transverse_center_center">{{obj.name}}<i>共￥{{type == '特卖房'  ?100:510}}</i></span>
            <span class="button btn transverse_center_center" @click="payAsync = true">提交订单</span>
          </span>
        </footer>
      </main>
    </div>
    <!-- 支付  弹层 -->
    <alert-pay v-if="payAsync" :name = " type == '品牌馆'?'买到宝':type" @alertBuy="alertBuy" :price="type == '特卖房'  ?100:510" :id="String(obj.id)"></alert-pay>
  </div>
</template>

<script>
import api  from '@/api/api';
//支付  弹层
import alertPay from '@/components/page/alert/alert_pay.vue';
//楼盘 详情组件
import itemList from '@/components/base/items/item_list_one.vue';
export default {
  props : {
    type : {
      type :String,
      default : '品牌馆'
    }
  },
  components: {
    alertPay,
    itemList
  },
  data () {
    return {
      payAsync : false,//支付 弹层
      async    : false,//提交确定
      obj      : {},//楼盘详情数据
    }
  },
  methods : {
    //隐藏 会员页
    showFn (async) {
      this.$emit("treasureShow",async);
      this.async = false;
    },
    //隐藏 支付页
    alertBuy () {
      this.payAsync = false;
    },
    //获取同价位楼盘数据
    gitSpecialData (id) {
      api.gitSpecialData({},id).then((res) =>{
        if(res.status==200){
          this.obj = res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.$store.state.cityName}/404`);
        }	
      })
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
