<template>
  <div class="member_wrap">
    <header-text name = "择居会员" :headFlag ="false" :async="true"></header-text>
    <main class="member_main ">
      <section class="box detail">
        <h4 class="border title transverse_fen_center_ya"><span class="text">择居有道</span></h4>
        <div class="text text_top">
          <p>居有常,业无变<br/>居室所系者大，奉行唯谨，视己力所需而置之。</p>
          <p>天时：关于房子，人们常感叹“早买就好了。”<br/>
             地利：家是坐标，决定了你的生活和工作的空间范围。<br/>
             人和：不要觉得邻居跟你没关系，你的孩子要跟他们的孩子一起长大。
          </p>
          <p>房子关乎一个家庭的未来，买房是一个家庭在选择未来的生活方式，他决定了你未来的财产保值，教育医疗条件，工作生活方式，择一好居，兴家利业。</p>
          <p>择居，我们做的比你想的更多更远。</p>
        </div>
        <!-- <transition name="kenzo"> -->
        <div class="text text_hide" v-show="textAsync">
          <p>择居是怎么帮你选房的<br>
            1．广拓房源库：择居与100多家知名品牌开发商合作，建立广泛的房源库与房源追寻系统，为你提供全面的房源信息。<br/>
            2.私人定制房源跟踪服务：根据你的需求，紧盯房源信息，第一时间选到中意房源。<br/>
            3.私人定制选房方案：每个家庭的需求都不一样，几百万的支出，怎能组团消费？择居根据你的意向和需求私人定制看房策略，专业选房工具做评估，帮你找出最好的房子。<br/>
            4.私人定制看房行程，全程免费专车上门接送，专业顾问陪同，不把精力和时间浪费在看房的途中。<br/>
            5.特供渠道：依托择居影响力，为你提供房源绿色通道服务，保证优先买到您想要的房子。<br/>
            6.特卖房源：依托择居渠道优势，与各大开发商合作，不定期推出特价房源。
          </p>
        </div>
        <!-- </transition> -->
        <div class="btn transverse_center_center" @click="textAsync = !textAsync">
          <span v-html="textAsync ? '收起全文' : '展开全文'"></span>
          <i class="iconfont icon-jiantou1" :class="{'on':!textAsync}"></i>
        </div>
      </section>
      <!-- 普通会员 -->
      <section class="box usual">
        <h4 class="border title transverse_fen_center_ya"><span class="text">普通会员</span><span class="price">免费</span></h4>
        <div class="power">
          <ul class="border border_none">
            <li>
              <h6>【1V1买房顾问】</h6>
              <p>政策解读、楼盘资讯、VIP带看、房源跟踪、物业分析</p>
            </li>
            <li>
              <h6>【免费看房专车】</h6>
              <p>全城免费接送上门、1户1车、买方顾问全程服务</p>
            </li>
          </ul>
          <div class="btn_box transverse_mo_center_ya">
            <span 
              class="transverse_center_center" 
              v-if="customerId ==null"
              @click = "buyFn(0)">登录即可享受此服务</span>
            <span class="transverse_center_center on" v-else >您已享受此服务</span>
          </div>
        </div>
      </section>
      <!-- 金卡会员 -->
      <section class="box gold">
        <h4 class="border title transverse_fen_center_ya"><span class="text">金卡会员</span><span class="price">￥6.6元</span></h4>
        <div class="power">
          <ul class="border">
            <li>
              <h6>【全程手续代办】</h6>
              <p>让整个置业手续流程效率最高，省心省力入住称心好房</p>
            </li>
            <li>
              <h6>【1V1买房顾问】</h6>
              <p>政策解读、楼盘资讯、VIP带看、房源跟踪、物业分析</p>
            </li>
            <li>
              <h6>【免费看房专车】</h6>
              <p>全城免费接送上门、1户1车、买方顾问全程服务</p>
            </li>
          </ul>
          <div class="btn_box transverse_mo_center_ya">
            <span 
              class="transverse_center_center"
              v-if="customerLevel < 1 "
              @click = "buyFn(6.6,'金卡会员',1)">去购买</span>
            <span class="transverse_center_center on" v-else >您已享受此服务</span>
          </div>
        </div>
      </section>
      <!-- 钻石会员 -->
      <section class="box drill">
        <h4 class="border title transverse_fen_center_ya"><span class="text">钻石会员</span><span class="price">￥660元</span></h4>
        <div class="power">
          <ul class="border">
            <li>
              <h6>【楼房验收】</h6>
              <p>专家免费上门验房，免除后顾之忧，放心收房</p>
            </li>
            <li>
              <h6>【楼盘跟踪】</h6>
              <p>楼盘政策通知，工程进度，交房时间等全程信息跟踪</p>
            </li>
            <li>
              <h6>【邻居社群活动】</h6>
              <p>买房就是择居，择居帮您尽快融入社区生活</p>
            </li>
            <li>
              <h6>【全程手续代办】</h6>
              <p>让整个置业手续流程效率最高，省心省力入住称心好房</p>
            </li>
            <li>
              <h6>【1V1买房顾问】</h6>
              <p>政策解读、楼盘资讯、VIP带看、房源跟踪、物业分析</p>
            </li>
            <li>
              <h6>【免费看房专车】</h6>
              <p>全城免费接送上门、1户1车、买方顾问全程服务</p>
            </li>
          </ul>
          <div class="btn_box transverse_mo_center_ya">
            <span 
              class="transverse_center_center"
              v-if="customerLevel < 2"
              @click = "buyFn(660,'钻石会员',2)">
              去购买
            </span>
            <span class="transverse_center_center on" v-else >您已享受此服务</span>
          </div>
        </div>
      </section>
    </main>
    <!-- 去登陆提醒 -->
    <alert-state @showFn = "showFn" v-show="stateAsync"></alert-state>
    <!-- 支付接口 -->
    <alert-pay :price="price" v-if="zhiFuAsync" @alertBuy="alertBuy" :level="level"></alert-pay>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
//引用头部
import headerText from '@/components/base/header/header_text.vue';
//弹框 状态
import alertState from '@/components/page/alert/alert_state.vue';
//支付接口
import alertPay from '@/components/page/alert/alert_pay.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    alertState,
    alertPay
  },
  watch :{
    '$route' (to){
      if(to.name == '会员服务页'){
        this.textAsync = false;
        this.zhiFuAsync = false;
        //诸葛  --- 打开埋点
        this.zhugeBury();
      }
    }
  },
  computed: {...mapGetters(['customerId','customerLevel','customerPhone','cityName'])},
  data () {
    return {
      textAsync : false ,//全文隐藏
      stateAsync: false ,//登录提醒
      zhiFuAsync: false,//支付弹窗
      price     : 0 ,
      level     : 0
    }
  },
  methods : {
    //购买 ，判断状态
    buyFn (price,name,level) {
      //如果 普通会员点击进入登录页
      if(price == 0 ){
        this.$router.push({ path: `/${this.cityName}/login`,query:{name:'登录'}});
      } else if(this.customerId ==null){
        this.stateAsync = true;
      } else{
        this.zhiFuAsync = true;
        this.price = price;
        this.level = level;
        //诸葛  --购买
        this.zhugeMai(name);
      }
    },
    //子组件 隐藏弹框
    showFn () {
      this.stateAsync = false;
      this.$router.push({ path: `/${this.cityName}/login`,query:{name:'登录'}});
    },
    //隐藏登录接口
    alertBuy () {
      this.zhiFuAsync = false;
    },
    //诸葛  --- 打开埋点
    zhugeBury (){
      zhuge.track(`打开会员服务页面`,{
        '当前页面' : '会员服务页',
        '所属模块' : '会员服务'
      });
    },
    //诸葛  --购买
    zhugeMai (name) {
      zhuge.track('点击购买会员', {
        '当前页面' : '会员服务页',
        '所属模块' : '会员服务',
        '购买内容' : name
      });
    }
  },
  mounted (){
    //诸葛  --- 打开埋点
    this.zhugeBury();
  }
}
</script>
<style lang="less" scoped>
.member_wrap{
  padding:4.6rem 0 0;
  .member_main{
    background: #F6F5F5;
    .box{
      background: #fff;
      margin-bottom:1rem;
      &:last-child{
        margin-bottom: 0;
      }
      .title{
        height: 4.5rem;
        padding:0 1rem;
        .text{
          font-size:1.6rem;
          color:#333;
         font-weight: 600;
        }
        .price{
          font-size:1.4rem;
          color: #FF3235;
        }
      }
      &>.text{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding:0rem 1rem;
        color:#666;
        font-size:1.4rem;
        line-height:2.4rem;
        &.text_hide{
          transform-origin: center top;
        }
        p{
          padding-bottom:3rem;
          &:last-child{
            padding-bottom:0;
          }
        }
      }
      .text_top{
        padding-top:1.5rem;
      }
      &>.btn{
        height: 5.2rem;
        color:#f63;
        font-size:1.4rem;
        i{
          font-weight: bold;
          margin-left:.6rem;
          font-size:1.8rem;
          transform: translate(0,.2rem);
          &.on{
            transform: translate(0,0) rotate(180deg);
          }
        }
      }
      .power{
        padding:2rem 1rem 0;
        .border_none:after{
          height: 0;
        }
        ul{
          li{
            font-size:1.4rem;
            padding-bottom:1.6rem;
            h6{
              color:#f63;
              padding-bottom:.6rem;
            }
            p{
              color:#666;
            }
          }
        }
        .btn_box{
          height: 6.6rem;
          span{
            height: 3.6rem;
            color:#fff;
            background: #f63;
            font-size: 1.4rem;
            border-radius: .4rem;
            &.on{
              background: #E5E5E5;
              color:#999;
            }
          }
        }
      }
    }
  }
}
</style>

