<template>
  <div class="fdjs_part">
    <div class="boxfdjs"  v-show="alertFalg">
      <ul>
        <li class="transverse_fen_center border">
          <div class="title">
            <span>贷款类别</span>
            <span class="qing" :class="{'on':itemObj.dklbText!='请选择贷款类别'}" :model="itemObj.dkllType" @click="clihide('dklbArr')">{{ itemObj.dklbText }}</span>
          </div>
          <i class="iconfont icon-jiantou2" @click="clihide('dklbArr')"></i>
        </li>
      </ul>
      <fdjs-zuhe v-if="itemObj.dklbText == '组合型贷款'" @zuhepart="zuhepartTotal" :datas = "itemObj"></fdjs-zuhe>
      <fdjs-shang v-else  @hidepart="hidepartTotal" :obj = "itemObj"></fdjs-shang>
    </div>
    <alert-part :totalArr="totalArr" :isFlag="!alertFalg" @increment="incrementTotal" ref="list"></alert-part>
    <div class="fixed_btn_fdjs border1 transverse_fen_center" v-show="alertFalg">
      <p class="transverse_center_center" @click="clearData">清空重填</p>
      <p class="transverse_center_center" @click="jisuan">开始计算</p>
    </div>
    <div class="fixedAlert transverse_center_center" v-show="wran">请确认是否填写完整！</div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import fdjsShang from '@/views/tools/loanPart/fdjs/fdjs_shang.vue';//商业，公积金贷款
import fdjsZuhe  from '@/views/tools/loanPart/fdjs/fdjs_zuhe.vue';//组合贷款
import alertPart from '@/views/tools/loanPart/alert_part.vue';//弹框
export default {
  // props :{
  //   jieguoFlag :{
  //     type: Boolean,
  //     default :function(){
  //       return true
  //     }
  //   }
  // },
  components :{
    fdjsShang,
    fdjsZuhe,
    alertPart,
  },
  data (){
    return {
      alertFalg : true,
      dklbAsync : false,
      wran      : false,
      bianNum   : '',//贷款利率
      anjiecsNum: '',//按揭成数
      sdlilvNum : '',//商贷利率
      gjjlilvNum: '',//公积金利率
      totalArr  : [],
      dklbText  : '请选择贷款类别',
      dklbArr : [
        {name: '商业贷款', value: '1', active:false, mark: 'dklbText'},
        {name: '公积金贷款', value: '2', active:false, mark: 'dklbText'},
        {name: '组合型贷款', value: '3', active:false, mark: 'dklbText'},
      ],
      //商业和公积金,组合
      itemObj : {
        jsfsText  : '请选择计算方式',
        dklbText  : '请选择贷款类别',
        ajcsText  : '请选择按揭成数',
        ajnsText  : '请选择按揭年数',
        dkllText  : '请选择基准利率',
        sdllText  : '请输入商贷利率',
        gjjllText : '请输入公积金利率',
        lilvNum   : '4.9',//贷款利率
        sdllNum   : '4.9',//商贷利率
        gjjllNum  : '3.25',//公积金利率
        anjieNum  : '',//按揭年数变量
        gmdj      : '',//购买单价
        gfmj      : '',//购房面积
        dkze      : '',//贷款总额
        sydked    : '',//商业贷款额度
        gjjdked   : '',//公积金贷款额度
        dkllType  : 0,//贷款类别值
        jsfsType  : 0,//计算方式类别值
        hkfsType  : 1,//还款方式
      }
    }
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods : {
    //点击出来弹框
    clihide (typeobj,name){
      this.totalArr  = this[typeobj];
      this.alertFalg = false;
    },
    incrementTotal (obj,str){
      if(obj.mark == "dklbText"){
        this.itemObj.dkllType = obj.value;
        if(obj.value == 2){
          this.itemObj.lilvNum = 3.25;
        }
      } else if(obj.mark == "jsfsText"){
        this.itemObj.jsfsType = obj.value;
      }
      this.alertFalg = obj.alertFalg;
      this.itemObj[str] = obj.name;
      this.ajcsChange(obj);//按揭成数
      this.ajnsChange(obj);//按揭年数
      this.lilvChange(obj);//贷款利率
      this.sdlilvChange(obj);//商贷利率
      this.gjjlilvChange(obj);//公积金利率
    },
    //商业公积金贷款
    hidepartTotal (obj){
      if(obj.hkfs == 'hkfsText'){
        this.itemObj.hkfsType = obj.type;
      } else{
        this.alertFalg = obj.alertFalg;
        this.totalArr  = obj.arr;
      }
    },
    //组合贷款
    zuhepartTotal (obj){
      if(obj.hkfs == 'hkfsText'){
        this.itemObj.hkfsType = obj.type;
      } else{
        this.alertFalg = obj.alertFalg;
        this.totalArr  = obj.arr;
      }
    },
    //按揭成数
    ajcsChange (obj){
      if(obj.mark == 'ajcsText'){
        this.anjiecsNum = obj.value;
      }
    },
    //按揭年数
    ajnsChange (obj){
      if(obj.mark == 'ajnsText'){
        this.anjieNum = obj.value;
        if(obj.value<=60 && obj.value>=24){
          //贷款利率
          this.itemObj.lilvNum = '4.75';
          this.itemObj.lilvNum = (this.bianNum * this.itemObj.lilvNum*0.1).toFixed(2);
          //商贷利率
          this.itemObj.sdllNum = '4.75';
          this.itemObj.sdllNum = (this.sdlilvNum * this.itemObj.sdllNum*0.1).toFixed(2);
          //公积金利率
          this.itemObj.gjjllNum= '3.25';
          this.itemObj.gjjllNum = (this.gjjlilvNum * this.itemObj.gjjllNum*0.1).toFixed(2);
        } else if(obj.value == 12){
          //贷款利率
          this.itemObj.lilvNum = '4.35';
          this.itemObj.lilvNum = (this.bianNum * this.itemObj.lilvNum*0.1).toFixed(2);
          //商贷利率
          this.itemObj.sdllNum = '4.35';
          this.itemObj.sdllNum = (this.sdlilvNum * this.itemObj.sdllNum*0.1).toFixed(2);
          //公积金利率
          this.itemObj.gjjllNum= '2.75';
          this.itemObj.gjjllNum = (this.gjjlilvNum * this.itemObj.gjjllNum*0.1).toFixed(2);
        }
      }
    },
    //利率
    lilvChange (obj){
      if(obj.mark == 'dkllText'){
        this.bianNum = obj.value;
        this.itemObj.lilvNum = (obj.value * 0.49).toFixed(2);
      }
    },
    //商贷利率
    sdlilvChange (obj){
      if(obj.mark == 'sdllText'){
        this.sdlilvNum = obj.value;
        this.itemObj.sdllNum = (obj.value * 0.49).toFixed(2);
      }
    },
    //公积金利率
    gjjlilvChange (obj){
      if(obj.mark == 'gjjllText'){
        this.gjjlilvNum = obj.value;
        this.itemObj.gjjllNum = (obj.value * 3.25).toFixed(2);
      }
    },
    //重置
    clearData (){
      this.$refs['list'].clearData();//清空选中的数据
      this.itemObj.jsfsText  = '请选择计算方式';
      this.itemObj.dklbText  = '请选择贷款类别';
      this.itemObj.ajcsText  = '请选择按揭成数';
      this.itemObj.ajnsText  = '请选择按揭年数';
      this.itemObj.dkllText  = '请选择基准利率';
      this.itemObj.sydkedText= '请输入商业贷款额度';
      this.itemObj.gjjllText = '请输入公积金贷款额';
      this.itemObj.sdllText  = '请输入商贷利率';
      this.itemObj.gjjllText = '请输入公积金利率';
      this.itemObj.lilvNum   = '4.9';
      this.itemObj.anjieNum  = '';//按揭年数变量
      this.itemObj.gmdj      = '';//购买单价
      this.itemObj.gfmj      = '';//购房面积
      this.itemObj.djze      = '';
      var name = '清空房贷计算器内容';
      zhuGe.resetFangData(name)
    },
    //计算
    jisuan (){
      var jiheObj = this.itemObj;
      var that  = this;
      
      if(jiheObj.dkllType == 0){//未选择贷款类别
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }
      if(jiheObj.dkllType == 1 || jiheObj.dkllType == 2){//贷款类别为商业和公积金
        if(jiheObj.jsfsType == 0){
          that.wran = true;
          var times = setTimeout(function(){
            that.wran = false;
          },2000)
          return false;
        } else if(jiheObj.jsfsType == 1){
          if(jiheObj.jsfsType == 0 || jiheObj.gmdj == '' || jiheObj.gfmj == '' || jiheObj.ajcsText == '请选择按揭成数' || jiheObj.ajnsText == '请选择按揭年数' || jiheObj.dkllText == '请选择基准利率'){
            that.wran = true;
            var times = setTimeout(function(){
              that.wran = false;
            },2000)
            return false;
          }
        } else if(jiheObj.jsfsType == 2){
          if(jiheObj.dkze == '' || jiheObj.ajnsText == '请选择按揭年数' || jiheObj.dkllText == '请选择基准利率'){
            that.wran = true;
            var times = setTimeout(function(){
              that.wran = false;
            },2000)
            return false;
          }
        }
      }
      if(jiheObj.dkllType == 3){//贷款类别为组合型
        if(jiheObj.sydked == '' || jiheObj.sdllText == '请输入商贷利率' || jiheObj.gjjdked == '' || jiheObj.gjjllText == '请输入公积金利率' || jiheObj.ajnsText == '请选择按揭年数'){
          that.wran = true;
          var times = setTimeout(function(){
            that.wran = false;
          },2000)
          return false;
        }
      }
      this.itemObj.sydked  = this.itemObj.sydked *10000;
      this.itemObj.gjjdked = this.itemObj.gjjdked *10000;
      var repaytype = this.itemObj.hkfsType;//1为等额本息--2为等额本金
      var loantype  = this.itemObj.dkllType;
      var caltype   = this.itemObj.jsfsType;
      var monthRepay;//月均还款
      var totalRepay;//还款总额
      var totalInterest;//支付利息
      var totalMoney;//贷款总额
      var resultData = {};
      var totalMoney;//贷款总额
      var totalCapital = this.itemObj.gmdj*this.itemObj.gfmj;
      if(caltype == 2){//根据贷款总额
        totalMoney = this.itemObj.dkze*1*10000;
      }else{//根据按揭比例
        totalMoney = this.anjiecsNum*totalCapital;
      }
      if(repaytype == 1){//等额本息
        if(loantype == 1 || loantype == 2){//公积金贷款或商业贷款
          var monthRate = this.itemObj.lilvNum/100/12;
          var money =  Math.pow(1+monthRate,this.anjieNum);
          /**
           * 等额本息月还款计算公式
           * 月还款额=〔贷款本金×月利率×（1+月利率）^还款月数〕÷〔（1+月利率）^还款月数－1〕
           *
           */
          monthRepay = totalMoney*monthRate*money/(money-1);
          totalRepay = (monthRepay * this.anjieNum);
          totalInterest = totalRepay - totalMoney;
          resultData.dkze = totalMoney.toFixed();//贷款总额
          resultData.hkze = totalRepay.toFixed();//还款总额
          resultData.zflx = totalInterest.toFixed();//支付利息
          resultData.dkys = this.anjieNum;//贷款月数
          resultData.yjhk = monthRepay.toFixed();//月均还款
          if(caltype == 2){//根据贷款总额
            resultData.type = 2;//结果呈现的类型---贷款总额
          }else{//根据按揭比例
            var downPayment = totalCapital-this.anjiecsNum*totalCapital;//首付款
            resultData.sfk  = downPayment.toFixed();//首付款
            resultData.type = 1;//结果呈现的类型----按面积，单价
          }
        }else{//组合贷

          var gjj_monthRate = this.itemObj.gjjllNum/100/12;//公积金月利率
          var biz_monthRate = this.itemObj.sdllNum/100/12;//商业贷款月利率
          var gjj_money =  Math.pow(1+gjj_monthRate,this.anjieNum);
          var biz_money =  Math.pow(1+biz_monthRate,this.anjieNum);
          var gjj_monthRepay = this.itemObj.gjjdked*gjj_monthRate*gjj_money/(gjj_money-1);//公积金月还款
          var biz_monthRepay = this.itemObj.sydked*biz_monthRate*biz_money/(biz_money-1);//公积金月还款
          monthRepay = gjj_monthRepay*1 + biz_monthRepay*1;//总共月还款
          totalRepay = (monthRepay * this.anjieNum);//还款总额
          totalInterest = totalRepay - (parseFloat(this.itemObj.gjjdked) + parseFloat(this.itemObj.sydked));//支付利息

          resultData.dkze = parseFloat(this.itemObj.gjjdked) + parseFloat(this.itemObj.sydked);//贷款总额
          resultData.hkze = totalRepay.toFixed();//还款总额
          resultData.zflx = totalInterest.toFixed();//支付利息
          resultData.dkys = this.anjieNum;//贷款月数
          resultData.yjhk = monthRepay.toFixed();//月均还款
          resultData.type = 2;//结果呈现的类型---组合贷款样式
        }
        
        this.$emit('resultPanel',resultData);
      }else{//等额本金
        /**
            等额本金计算方式
            设贷款额为a，月利率为i，还款月数为n
            支付利息=（n+1）*a*i/2
            还款总额=（n+1）*a*i/2+a
            计划月还款额=(贷款本金÷还款月数)+(贷款本金-累计已还本金)×月利率
            累计已还本金=已经归还贷款的月数×贷款本金/还款月数
        */
        var firstRepay;//首月还款
        var lastRepay;//末月还款

        if(loantype == 1 || loantype == 2){//公积金贷款或商业贷款
          var monthRate = this.itemObj.lilvNum/100/12;
          firstRepay = (totalMoney/this.anjieNum)+totalMoney*monthRate;
          totalInterest = ((parseInt(this.anjieNum)+1)*totalMoney*monthRate)/2;//总利息
          totalRepay = totalInterest + totalMoney;
          resultData.dkze = totalMoney.toFixed();//贷款总额
          resultData.hkze = totalRepay.toFixed();//还款总额
          resultData.dkys = this.anjieNum;//贷款月数
          resultData.yjhk = firstRepay.toFixed();//首月月供
          resultData.zflx = totalInterest.toFixed();//支付利息

          if(caltype == 2){//根据贷款总额
            resultData.type = 3;
          }else{//根据按揭比例
            var downPayment = totalCapital-this.anjiecsNum*totalCapital;//首付款
            resultData.sfk  = downPayment.toFixed();
            resultData.type = 4;
          }
        }else{//组合贷
          var gjj_monthRate = this.itemObj.gjjllNum/100/12;//公积金月利率
          var biz_monthRate = this.itemObj.sdllNum/100/12;//商业贷款月利率
          var gjj_firstRepay ;//公积金首月还款
          var gjj_lastRepay ;//公积金末月还款
          var biz_firstRepay ;//商业贷款首月还款
          var biz_lastRepay ;//商业贷款末月还款
          var gjj_totalInterest;//公积金总利息
          var biz_totalInterest;//商业贷款总利息

          gjj_firstRepay  = (this.itemObj.gjjdked/this.anjieNum)+this.itemObj.gjjdked*gjj_monthRate;
          biz_firstRepay  = (this.itemObj.sydked/this.anjieNum)+this.itemObj.sydked*biz_monthRate;
          gjj_lastRepay = (this.itemObj.gjjdked/this.anjieNum)+(this.itemObj.gjjdked-(parseInt(this.anjieNum)-1)*(this.itemObj.gjjdked/this.anjieNum))*gjj_monthRate;
          biz_lastRepay = (this.itemObj.sydked/this.anjieNum)+(this.itemObj.sydked-(parseInt(this.anjieNum)-1)*(this.itemObj.sydked/this.anjieNum))*biz_monthRate;
          gjj_totalInterest = ((parseInt(this.anjieNum)+1)*this.itemObj.gjjdked*gjj_monthRate)/2;
          biz_totalInterest = ((parseInt(this.anjieNum)+1)*this.itemObj.sydked*biz_monthRate)/2;
          totalInterest = gjj_totalInterest + biz_totalInterest;
          totalRepay = totalInterest*1 + this.itemObj.gjjdked*1 + this.itemObj.sydked*1;
          firstRepay = gjj_firstRepay + biz_firstRepay;
          lastRepay = gjj_lastRepay + biz_lastRepay;

          resultData.dkze = parseFloat(this.itemObj.gjjdked) + parseFloat(this.itemObj.sydked);//贷款总额
          resultData.hkze = totalRepay.toFixed();//还款总额
          resultData.zflx = totalInterest.toFixed();//支付利息
          resultData.dkys = this.anjieNum;//贷款月数
          resultData.yjhk = firstRepay.toFixed();//首月还款
          resultData.type = 3;
        }
        this.$emit('resultPanel',resultData);
      }
      let zhugeObj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '贷款类别' : this.itemObj.dklbText,
        '计算方式' : this.itemObj.jsfsText,
        '购买单价' : this.itemObj.gmdj,
        '房屋面积' : this.itemObj.gfmj,
        '按揭成数' : this.itemObj.ajcsText,
        '按揭年数' : this.itemObj.ajnsText,
        '贷款利率' : this.itemObj.lilvNum,
        '还款方式' : this.itemObj.hkfsType == 1?'等额本息':'等额本金'
      }
      let zhugeObj2 = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '贷款类别' : this.itemObj.dklbText,
        '商业贷款额度' : this.itemObj.sydked,
        '商贷利率' : this.itemObj.sdllNum,
        '公积金贷款额' : this.itemObj.gjjdked,
        '公积金利率' : this.itemObj.gjjllNum,
        '按揭年数' : this.itemObj.ajnsText,
        '还款方式' : this.itemObj.hkfsType == 1?'等额本息':'等额本金'
      }
      let zhugeObj3 = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '贷款类别' : this.itemObj.dklbText,
        '计算方式' : this.itemObj.jsfsText,
        '贷款总额' : this.itemObj.dkze,
        '按揭年数' : this.itemObj.ajnsText,
        '贷款利率' : this.itemObj.lilvNum,
        '还款方式' : this.itemObj.hkfsType == 1?'等额本息':'等额本金'
      }
      
      if(this.itemObj.dkllType == 1 || this.itemObj.dkllType == 2){ //商业贷款&&公积金贷款
        if(this.itemObj.jsfsType == 1){ //根据面积
          this.zhugeIo(zhugeObj);
        } else{ //根据总价
          this.zhugeIo(zhugeObj3);
        }
      } else{ //组合贷款
        this.zhugeIo(zhugeObj2);
      }
    },
    //诸葛——清空数据
    zhugeIo (dataObj){
      zhuge.track('提交房贷计算',dataObj);
    }
  },
}
</script>
<style lang="less" scoped>

</style>
