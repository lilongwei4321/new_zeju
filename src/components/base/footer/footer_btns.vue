<template>
  <footer class="footer_btns">
    <!-- 样式1 -->
    <div class="box border1 transverse_fen_center_ya" v-if="obj.type == 1">
      <div class="list_box">
        <p class="portrait_center_ya list_item " @click="shouCangFn" :class="{'on':shouCangAsync,'hui':!async && customerId!=null}">
          <i class="iconfont" :class="{'icon-xin':!shouCangAsync,'icon-xin1':shouCangAsync }" ></i>
          <span>收藏</span>
        </p>
        <a href="javasvript:;" @click.prevent="zhugeZixun" class="portrait_center_ya list_item">
          <i  class="iconfont icon-kefu kefu"></i>
          <span>客服</span>
        </a>
      </div>
      <div class="list">
        <span class="item orange transverse_center_center" @click="clickMember()">{{customerId!=null?'升级会员':'会员服务'}}</span>
        <a href="javascripts:;" @click.prevent="phoneFn" class="item red transverse_center_center">售楼热线</a>
      </div>
    </div>
    <!-- 样式2 -->
    <div class="box border1 transverse_fen_center_ya" v-else-if="obj.type == 2">
      <div class="list_box">
        <p class="portrait_center_ya list_item" @click="shouCangFn" :class="{'on':shouCangAsync,'hui':async}">
          <i class="iconfont" :class="{'icon-xin':!shouCangAsync}" @click="shouCangFn"></i>
          <span>收藏</span>
        </p>
        <a href="javasvript:;" @click.prevent="zhugeZixun" class="portrait_center_ya list_item">
          <i class="iconfont icon-kefu kefu"></i>
          <span>客服</span>
        </a>
      </div>
      <div class="list">
        <span class="item yellow transverse_center_center" @click="clickMember()">{{customerId!=null?'升级会员':'会员服务'}}</span>
        <span  class="item orange transverse_center_center" @click="clickFn">立即订购</span>
        <a href="javascripts:;" @click.prevent="phoneFn" class="item red transverse_center_center">售楼热线</a>
      </div>
    </div>
    <!-- 样式3 -->
    <div class="box border1 transverse_fen_center_ya" v-else-if="obj.type == 3">
      <div  class="list_box">
        <p class="portrait_center_ya list_item" @click="shouCangFn" :class="{'on':shouCangAsync,'hui':async}">
          <i class="iconfont" :class="{'icon-xin':!shouCangAsync}" @click="shouCangFn"></i>
          <span>收藏</span>
        </p>
        <a href="javasvript:;" @click.prevent="zhugeZixun" class="portrait_center_ya list_item">
          <i  class="iconfont icon-kefu kefu"></i>
          <span>客服</span>
        </a>
      </div>
      <div class="list">
        <span  class="item orange1 transverse_center_center list" @click="adviserPhoneFn">联系您的专属顾问</span>
      </div>
    </div>
    <!-- 升级会员alert页 -->
    <member-box @memberShow = "memberShow" v-show="memberAsync" ref="memberBox"></member-box>
    <!-- 购买楼盘 -->
    <treasure-buy @treasureShow = "treasureShow" v-show="treasureAsync" :type="loupanStyle" ref="loupanBox"></treasure-buy>
    <!-- <room-confirm @roomConfirm = "roomConfirm" v-show="roomConfirmAsync" v-else-if="bao == 2"></room-confirm> -->
    <div class="fixedAlert transverse_center_center" v-show="wran">{{ msgText }}</div>
  </footer>
</template>

<script>
import api from '@/api/api';
import { mapActions,mapGetters} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
import zhuGe from '@/assets/javascripts/zhuGe';
//会员支付 
import memberBox from '@/views/pay/member/member_buy.vue';
//购买楼盘
import treasureBuy from '@/views/pay/treasure/treasure_buy.vue';
//购买特价房
// import roomConfirm from '@/views/pay/room_confirm.vue';
export default {
  name: 'Home',
  props : {
    loupanStyle : {
      type : String,
      default : '品牌馆'
    },
    obj : {
      type : Object,
      default : function(){
        return {
          type:1,
          async : true
        }
      }
    },
    async : {
      type : Boolean,
      default : true
    }
  },
  computed: {
    ...mapGetters(['customerId','cityName','customerLevel','majorAdvisor','customerPhone'])
  },
  components: {
    memberBox,
    treasureBuy
    // roomConfirm
  },
  data () {
    return {
      //会员显示隐藏
      memberAsync : false,
      //买到宝显示隐藏
      treasureAsync : false ,
      // roomConfirmAsync : true,
      bao : 0, 
      shouCangAsync : false,
      msgText : '',
      wran : false
    }
  },
  watch :{
    obj () {
      if(this.async){
        this.shouCangAsync = this.obj.is_favorited;
      }
      
      if(this.customerLevel == 2){
        this.obj.type = 3;
      }
    }
  },
  methods : {
    //显示 楼盘
    clickFn () {
      //是否登录，没有跳转到登录
      if(this.customerFn()){
        //显示相应购买楼盘类型
        this.treasureAsync = true;
        //调用支付楼盘--子组件方法
        this.$refs.loupanBox.gitSpecialData(this.obj.id);
      } 
    },
    //点击会员btn
    clickMember () {
      //是否登录，没有跳转到登录
      if(this.customerFn()){
        //显示会员升级alert页
        this.memberAsync = true;
        //执行会员页函数，改变会员级别
        this.$refs.memberBox.memberFn(this.customerLevel*1 + 1);
      }
    },
    //判断是否登录过
    customerFn () {
      if(this.customerId == null){
        this.$router.push(`/${this.cityName}/login`);
        return false;
      } else{
        return true
      }
    },
    //隐藏 会员页
    memberShow (async) {
      this.memberAsync = async;
    },
    //隐藏 买到宝
    treasureShow (async) {
      this.treasureAsync = async;
    },
    //隐藏 买到宝
    roomConfirm (async) {
      this.roomConfirmAsync = async;
    },
    //收藏点击
    shouCangFn (){ 
      if(this.customerFn()){
        if(!this.async){return false}
        //是否点击收藏按钮
        this.shouCangAsync = !this.shouCangAsync;
        //诸葛  --- 收藏
        this.zhugeBury();

        var status;
        this.shouCangAsync?status=1:status=2;
        var para = {
          'phone' : this.customerPhone,
          'item_id': this.obj.id,
          'status' : status,
          'customer_id' : this.customerId
        }
        api.getFavoritesJson(para).then((res)=>{
          if(res.status == 200){
            this.msgText = res.data.message;
            this.wran = true;
            var that = this;
            var times = setTimeout(function(){
              that.wran = false;
            },2000)
          } else if(res.status == 422){
            this.$route.push(`/${this.cityName}/404`);
          }
        });
      }
    },
    //拨打电话
    phoneFn () {
      let zjfrom = this.obj.ext_phone !=0?globalFn.getZjfrom():'',
          name   = zhuGe.theModular(this.$route.name),
          obj    = {
            '当前页面'  : this.$route.name,
            '所属模块'  : zhuGe.theModular(this.$route.name)
          }

          switch (name) {
            case '楼盘'  :
              obj['楼盘ID']    = this.obj.id;
              obj['楼盘名称']   = this.obj.name;
              obj['楼盘分机号'] = this.obj.ext_phone;
              obj['分机号类型'] = '楼盘400';
            break;
            case '择居百科' :
              obj['百科ID']     = this.obj.id;
              obj['百科名称']   = this.obj.name;
              obj['分机号类型'] = '客服400';
            break;
          }
      zhuge.track(`点击400`, obj,() =>{      
        window.location.href =`tel:${this.obj.host_phone},${this.obj.ext_phone}${zjfrom}`;
      });
    },
    //联系专属顾问
    adviserPhoneFn () {
      let phone = globalFn.getCookieFn('majorAdvisor'),
          zjfrom = obj.ext_phone!=0?globalFn.getZjfrom():'';
          
      api.getAdviserPhone({},phone).then((res)=>{
          if(res.status == 200){
            let obj = res.data;
            zhuge.track('点击400', {
              '当前页面'  : this.$route.name,
              '所属模块'  : zhuGe.theModular(this.$route.name),
              '顾问ID'    : obj.id,
              '顾问姓名'  : obj.name,
              '分机号类型' : '顾问400'
            },() =>{
              window.location.href =`tel:${obj.host_phone},${obj.ext_phone}${zjfrom}`;
            });
          } else if(res.status == 422){
            this.$route.push(`/${this.cityName}/404`);
          }
        });
    },
    //初始化条框
    alertFn (){
      this.memberAsync = false;
    },
    //诸葛  --- 收藏
    zhugeBury () {
      zhuge.track('点击收藏楼盘', {
        '当前页面' : this.$route.name,
        '所属模块' : '楼盘',
        '楼盘ID'   : this.obj.id,
        '楼盘名称' : this.obj.louName
      });
    },
    //诸葛  --- 点击会员
    zhugeDian () {
      zhuge.track('点击会员', {
        '当前页面' : this.$route.name,
        '所属模块' : zhuGe.theModular(this.$route.name)
      });
    },
    //诸葛  --- 在线咨询
    zhugeZixun () {
      zhuge.track('点击在线咨询', {
        '当前页面' : this.$route.name,
        '所属模块' : zhuGe.theModular(this.$route.name)
      },() =>{
        window.location.href =`http://m2.zeju.com/m/index.html?advisor_id=${this.majorAdvisor}&page_name=${this.$route.name}&cityName=${this.cityName}&customerId=${this.customerId}`;
      });
    }
  }
}
</script>
<style lang="less" scoped>
.footer_btns{
  position: fixed;
  height:4.5rem;
  bottom:0;
  background: #fff;
  width:100%;
  z-index:202;
  .box{
    height: 100%;
    width:100%;
    div{
      height: 100%;
    }
    .list_box{
      display: flex;
      // padding:0 1rem;
      .list_item{
        width:5rem;
        align-items: center;
        span{
          display: block;
          color:#666;
          font-size:1rem;
        }
        i{
          display: block;
          color:#999;
          font-size:2rem;
        }
        // 选中
        &.on{
          span,i{
            color:#f63;
          }
        }
        //置灰
        &.hui{
          opacity: .6;
        }
      }
    }
    .list{
      width:0;
      flex:1;
      height: 100%;
      display: flex;
      .item{
        font-size: 1.4rem;
        color: #fff;
        padding-top:.2rem;
        width:0;
      }
      .yellow{
        flex: .7;
        background: #F5A623;
      }
      .orange{
        flex: .7;
        background: #F37021;
      }
      .orange1{
        background: #F37021;
      }
      .red{
        flex: 1;
        background: #FF3B30;
      }
    }
  }
  .fixedAlert{
    position: fixed;
  }
}
</style>
