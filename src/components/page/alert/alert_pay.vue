<template>
  <div class="alert_back transverse_center_center" @click.self="guanFn">
    <section class="box portrait_center_ya">
      <h4>支付方式</h4>
      <div class="btns transverse_center_center">
        <p class="portrait_center_ya" @click="zhiFu('微信')">
          <i class="iconfont icon-weixin green"></i>
          <span>微信</span>
        </p>
        <p class="portrait_center_ya" @click="zhiFu('支付宝')">
          <i class="iconfont icon-zhifubao blue"></i>
          <span>支付宝</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import api  from '@/api/api';
import zhuGe from '@/assets/javascripts/zhuGe';
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  props : {
    price  : {
      type : Number,
      default : 0
    },
    name : {
      type :String,
      default :'升级会员'
    },
    id : {
      type :String,
      default :''
    },
    level : {
      type :Number,
      default :0
    }
  },
  computed : {...mapGetters(['customerId','cityName'])},
  methods : {
    //关闭弹窗
    guanFn () {
      this.$emit('alertBuy');
    },
    //支付 请求
    zhiFu (str) {
      let order_type = this.name == '升级会员' ? 2:1,
          loupan_id  = order_type == 1?this.id:'',
          vip_level  = this.level;

      let obj ={
        money    : this.price,
        page_url : this.$route.fullPath,
        subject  : this.name,
        order_type ,
        loupan_id ,
        vip_level ,
        customer_id : this.customerId,
        city_abbr   : this.cityName
      }

      if(str == '支付宝') {
        this.zhugeMai('支付宝');
        this.getAlipay(obj);
      } else{
        this.zhugeMai('微信');
        this.getWeixinAlipay(obj);
        // if(this.asyncWeixin()){
        //   this.getWeixinH5();
        // } else{
          
        // } 
      }
    },
    //支付宝
    getAlipay (obj) {
      api.getAlipay(obj).then((res) =>{
        if(res.status==200){
          location.href = res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //微信支付
    getWeixinAlipay (obj) {
      api.getWeixinAlipay(obj).then((res) =>{
        if(res.status==200){
          location.href = res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //判断是否在微信打开
    asyncWeixin () {
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
      }else{
        return false;
      }
    },
    //微信支付
    getWeixinH5 () {
      function onBridgeReady(){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
            "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
            "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
            "package":"prepay_id=u802345jgfjsdfgsdg888",     
            "signType":"MD5",         //微信签名方式：     
            "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
          },
          function(res){     
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              console.log('aaaa')
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          }
        ); 
      }
      if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      }else{
        onBridgeReady();
      }
    },
    //诸葛  --购买
    zhugeMai (name) {
      zhuge.track('选择购买会员支付方式', {
        '当前页面' : this.$route.name,
        '所属模块' : '会员服务',
        '支付方式' : name
      });
    }
  }
}
</script>
<style lang="less" scoped>
.alert_back{
  position: fixed;
  top:0;
  left: 0;
  bottom:0;
  right: 0;
  z-index:202;
  background: rgba(0,0,0,0.4);
  .box{
    background: #fff;
    border-radius: .4rem;
    width:30rem;
    height: 22rem;
    align-items: center;
    position:relative;
    .guan{
      position:absolute;
      top:1rem;
      right:1rem;
      transform:rotate(45deg);
      font-size:2.6rem;
      color:#BFBFBF;
    }
    h4{
      font-size:2rem;
      color:#333;
      padding-bottom:3rem;
    }
    .btns{
      padding:0 2rem;
      height: 11rem;
      p{
        align-items: center;
        width:0;
        flex:1;
        height: 100%;
        justify-content: space-between;
        // &:first-child{
        //   opacity: .5;
        // }
        i{
          display: block;
          font-size:8rem;
          padding-bottom:1rem;
          &.green{
            color:#3cb034;
          }
          &.blue{
            color:#00a9f2;
          }
        }
        span{
          display: block;
          font-size:1.4rem;
          color:#666;
        }
      }
    }
  }
}
</style>
