<template>
  <div class="member_wrap"  @touchmove.prevent>
    <div class="member_main">
      <section class="header">
        <dl class="transverse_fen_center_ya border">
          <dt>
            <div class="transverse_center_center">
              <img :src="objImg">
            </div>
          </dt>
          <dd>
            <p class="price transverse_mo_center_ya">
              <span>￥{{obj.price}}</span>
              <i class="iconfont icon-jia" @click="showFn(false)"></i>
            </p>
            <p class="text text_ove2">您已经成为{{num == 1 ? '普通':'金卡'}}会员。成功升级会员，享受更多服务</p>
          </dd>
        </dl>
      </section>
      <main class="main" v-if="boxAsync">
        <!-- 会员级别btns -->
        <section class="btns transverse_fen_center_ya">
          <span 
            class="transverse_center_center"
            :class="{'on':obj.name == m.name}" 
            v-for="m in arr" 
            :key="m.ind" 
            @click="memberBtn(m)">{{m.name}}</span>
        </section>
        <!-- 会员特权介绍 -->
        <section class="texts" v-ScrollMove> 
          <p v-for="(m,key) in textArr" :key="key" v-if="key>obj.ind">{{m.name}}</p>
        </section>
        <!-- 确定按钮，显示会员提交页 -->
        <footer class="footer">
          <input 
            type="button" 
            @click="zhugeQue" 
            class="button transverse_center_center" 
            value="确定" 
            :disabled="btnAsync"
            :class="{'on':!btnAsync}"
            >
        </footer>
      </main>
      <main class="main main1" v-else>
        <section class="texts" v-ScrollMove> 
          <p v-for="(m,key) in textArr" :key="key" v-if="key>obj.ind">{{m.name}}</p>
        </section>
        <footer class="footer footer1">
          <span class="text transverse_center_center">择居{{obj.text}}&nbsp;&nbsp;<b>共￥{{obj.price}}</b></span>
          <span @click="zhugeTi" class="button transverse_center_center" :class="{'on':!btnAsync}">确定</span>
        </footer>
      </main>
    </div>
    <!-- 支付  弹层 -->
    <alert-pay v-if="payAsync" @alertBuy = "alertBuy" :price="obj.price" :level="obj.level"></alert-pay>
  </div>
</template>

<script>
import { mapActions,mapGetters} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
import zhuGe from '@/assets/javascripts/zhuGe';
//支付  弹层
import alertPay from '@/components/page/alert/alert_pay.vue';
export default {
  name: 'Home',
  components: {
    alertPay
  },
  data () {
    return {
      imgArr : [
        '/static/assets/images/vip-pu.png',
        '/static/assets/images/vip-jin.png', 
        '/static/assets/images/vip-zuan.png'
      ],
      arr : [
        {name : '普通会员' ,ind : 3 ,price :0,text:'普通会员',level:0},
        {name : '金卡会员(￥6.6)',ind : 2,price:6.6,text:'金卡会员',level:1},
        {name : '钻石会员(￥660)' ,ind : 0,price:660,text:'钻石会员',level:2}
      ],
      boxAsync : true , //会员 显示
      payAsync : false,//支付 弹层
      btnAsync : false,//是否可以点击
      textArr : [
        {name : '楼房验收：专家免费上门验房，免除后顾之忧，放心收房。'},
        {name : '楼盘跟踪：楼盘政策通知，工程进度，交房时间等全程信息跟踪。'},
        {name : '邻居社群活动：买房就是择居，择居帮您尽快融入社区生活。'},
        {name : '全程手续代办：让整个职业手续流程效率最高，省心省力入住称心好房。'},
        {name : '1V1买房顾问：政策解读、楼盘资讯、VIP陪看、房源跟踪、物业分析。'},
        {name : '免费看房专车：全程免费接送上门、1户1车、买方顾问全程服务。'}
      ],
      //当前会员级别参数
      obj : {},
      num : 0,//会员当前级别
      objImg : ''
    }
  },
  computed: {...mapGetters(['customerLevel'])},
  methods : {
    //隐藏 会员页
    showFn (async) {
      this.$emit("memberShow",async);
      this.boxAsync = true;
    },
    //隐藏 支付页
    alertBuy () {
      this.payAsync = false;
    },
    //选中 会员类型
    memberBtn (obj) {
      if(this.customerLevel == 0){
        if(obj.text == '普通会员'){
          this.btnAsync = true;
        } else {
          this.btnAsync = false;
        }
      } else if(this.customerLevel == 1){
        if(obj.text == '普通会员' || obj.text == '金卡会员'){
          this.btnAsync = true;
        } else {
          this.btnAsync = false;
        }
      }
      if(obj.text == '普通会员'){
        this.objImg = this.imgArr[0];
      } else if(obj.text == '金卡会员'){
        this.objImg = this.imgArr[1];
      } else{
        this.objImg = this.imgArr[2];
      }
      //是否可以点击确定按钮
      // this.btnAsync = obj.name == '普通会员';
      
      //当前点击项
      this.obj = obj;
    },
    //获取当前会员级别参数
    memberFn (num) {
      this.obj = this.arr[num];
      this.num = num;
      this.objImg = this.imgArr[num];
    },
    //诸葛  --- 确定会员
    zhugeQue () {
      this.boxAsync = false;
      zhuge.track('确定会员', {
        '当前页面' : this.$route.name,
        '所属模块' : zhuGe.theModular(this.$route.name)
      });
    },
    //诸葛  --- 提交会员
    zhugeTi () {
      this.payAsync = true;
      zhuge.track('提交会员', {
        '当前页面' : this.$route.name,
        '所属模块' : zhuGe.theModular(this.$route.name)
      });
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
      height: 35rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .btns{
        padding:0 1rem;
        height: 8rem;
        span{
          height: 4rem;
          width:0;
          flex:1;
          border: 1px solid #CBCBCB;
          border-radius: .2rem;
          font-size: 1.4rem;
          color: #666666;
          &:nth-child(2){
            margin:0 1rem;
          }
          &.on{
            border-color:#f63;
            color:#f63;
          }
        }
      }
      .texts{
        flex:1;
        padding:0 1rem .4rem;
        overflow-y: auto;
        p{
          font-size: 1.4rem;
          color: #666666;
          margin-bottom:2.2rem;
        }
      }
    }
    .main1{
      padding-top:2rem;
    }
    .footer{
      height: 5rem;
      .button{
        width:100%;
        height: 100%;
        color:#fff;
        background: #f63;
        font-size:1.6rem;
        border:none;
        opacity: .8;
        &.on{
          opacity: 1;
        }
      }
    }
    .footer1{
      display: flex;
      .button{
        width:14rem;
      }
      .text{
        flex:1;
        font-size:1.6rem;
        color:#333;
        background: #F6F5F5;
        b{
          color: #ff3335;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
