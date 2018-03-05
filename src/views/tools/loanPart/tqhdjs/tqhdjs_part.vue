<template>
  <div class="tqhdjs">
    <div class="boxfdjs" v-show="alertFalg">
      <div class="box">
        <ul>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>还款类型</span>
              <span class="qing" :class="{'on':hklxText!='请选择贷款类别'}" @click="clihide('hklxArr')">{{ hklxText }}</span>
            </div>
            <i class="iconfont icon-jiantou2" @click="clihide('hklxArr')"></i>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>房贷金额</span>
              <input type="number" placeholder="请输入原房贷金额" v-model.number="fdje">
              <span class="red">万元</span>
            </div>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>房贷年限</span>
              <span class="qing" :class="{'on':fdnxText!='请选择房贷年限'}" @click="clihide('fdnxArr')">{{ fdnxText }}</span>
            </div>
            <i class="iconfont icon-jiantou2" @click="clihide('fdnxArr')"></i>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>利率</span>
              <!-- <span class="qing" :class="{'on':lilvText!='请选择利率'}" @click="clihide('lilvArr')">{{ lilvText }}</span> -->
              <div class="shuilv" style=""><input type="number" v-model="lilvZhiSD"> <span>%</span></div>
            </div>
            <!-- <i class="iconfont icon-jiantou2" @click="clihide('lilvArr')"></i> -->
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>首日还款</span>
              <span class="qing" :class="{'on':srhkText!='请选择首次还款时间'}" @click="srhkHide('tqyearArr','monthArr','首日还款')">{{ srhkText }}</span>
            </div>
            <i class="iconfont icon-jiantou2" @click="srhkHide('tqyearArr','monthArr','首日还款')"></i>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>提前还款</span>
              <span class="qing" :class="{'on':tqhkText!='请选择预计提前还款时间'}" @click="srhkHide('tqyearArr','monthArr','提前还款')">{{ tqhkText }}</span>
            </div>
            <i class="iconfont icon-jiantou2" @click="srhkHide('tqyearArr','monthArr','提前还款')"></i>
          </li>
          <li class="transverse_fen_center border">
            <div class="title">
              <span>还款方式</span>
              <div class="hkfs transverse_fen_center">
                <p class="pt" v-for="(k,index) in dengArr" :key="index" ref="dengName" @click="dengFunc(k.value)" :class="hkfsType == k.value?'cur':''">
                  <i class="iconfont icon-duihao"></i>
                  <span>{{ k.name }}</span>
                </p>
              </div>
            </div>
          </li>
          <li class="transverse_fen_center border" v-show="dengeFalg">
            <div class="title">
              <span>还款金额</span>
              <input type="number" placeholder="请输入提前还款额" v-model.number="hkje">
              <span class="red">元</span>
            </div>
          </li>
          <li class="transverse_fen_center border" v-show="dengeFalg">
            <div class="title">
              <span>处理方式</span>
              <div class="hkfs transverse_fen_center">
                <p class="pt" v-for="(k,index) in clfsArr" :key="index" ref="dengName" @click="chuliFunc(k.value)" :class="clfsType == k.value?'cur':''">
                  <i class="iconfont icon-duihao"></i>
                  <span>{{ k.name }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <alert-part :totalArr="totalArr" :isFlag="!alertFalg" @increment="incrementTotal" ref="list"></alert-part>
    <div class="fixed_btn_fdjs border1 transverse_fen_center" v-show="alertFalg">
      <p class="transverse_center_center" @click="clearData">清空重填</p>
      <p class="transverse_center_center" @click="jisuan">开始计算</p>
    </div>
    <div class="fixedAlert transverse_center_center" v-show="wran">{{ msgText }}</div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import alertPart from '@/views/tools/loanPart/alert_part.vue';//弹框
export default {
  components :{
    alertPart,
  },
  data (){
    return {
      fdje      : '',
      hkje      : '',
      hkfsType  : 1,
      clfsType  : 1,
      alertFalg : true,
      wran      : false,
      dengeFalg : false,
      hklxNum   : 0,
      fdnxNum   : '',
      lilvNum   : '',
      totalArr  : [],
      lilvZhiSD : 4.9,
      msgText   : '请确认是否填写完整！',
      hklxText  : '请选择贷款类别',
      fdnxText  : '请选择房贷年限',
      lilvText  : '请选择利率',
      srhkText  : '请选择首次还款时间',
      tqhkText  : '请选择预计提前还款时间',
      hklxArr   : [
        {name: '商业贷款', value: '1', mark: 'hklxText'},
        {name: '公积金贷款', value: '2', mark: 'hklxText'},
      ],
      fdnxArr   : [
        {name: '2年(24期)', value: '24', mark: 'fdnxText'},
        {name: '3年(36期)', value: '36', mark: 'fdnxText'},
        {name: '4年(48期)', value: '48', mark: 'fdnxText'},
        {name: '5年(60期)', value: '60', mark: 'fdnxText'},
        {name: '6年(72期)', value: '72', mark: 'fdnxText'},
        {name: '7年(84期)', value: '84', mark: 'fdnxText'},
        {name: '8年(96期)', value: '96', mark: 'fdnxText'},
        {name: '9年(108期)', value: '108', mark: 'fdnxText'},
        {name: '10年(120期)', value: '120', mark: 'fdnxText'},
        {name: '11年(132期)', value: '132', mark: 'fdnxText'},
        {name: '12年(144期)', value: '144', mark: 'fdnxText'},
        {name: '13年(156期)', value: '156', mark: 'fdnxText'},
        {name: '14年(168期)', value: '168', mark: 'fdnxText'},
        {name: '15年(180期)', value: '180', mark: 'fdnxText'},
        {name: '20年(240期)', value: '240', mark: 'fdnxText'},
        {name: '25年(300期)', value: '300', mark: 'fdnxText'},
        {name: '30年(360期)', value: '360', mark: 'fdnxText'},
      ],
      lilvArr   : [
        {value: "110", name: '15年08月26日利率7折', mark: "lilvText"},
        {value: "109", name: '15年08月26日利率8.5折', mark: "lilvText"},
        {value: "108", name: '15年08月26日利率9折', mark: "lilvText"},
        {value: "107", name: '15年08月26日基准利率', mark: "lilvText"},
        {value: "106", name: '15年08月26日利率1.05倍', mark: "lilvText"},
        {value: "105", name: '15年08月26日利率1.1倍', mark: "lilvText"},
        {value: "104", name: '15年08月26日利率1.2倍', mark: "lilvText"},
        {value: "103", name: '15年06月28日利率7折', mark: "lilvText"},
        {value: "102", name: '15年06月28日利率8.5折', mark: "lilvText"},
        {value: "101", name: '15年06月28日利率9折', mark: "lilvText"},
        {value: "100", name: '15年06月28日基准利率', mark: "lilvText"},
        {value: "99", name: '15年06月28日利率1.05倍', mark: "lilvText"},
        {value: "98", name: '15年06月28日利率1.1倍', mark: "lilvText"},
        {value: "97", name: '15年06月28日利率1.2倍', mark: "lilvText"},
        {value: "96", name: '15年05月11日利率7折', mark: "lilvText"},
        {value: "95", name: '15年05月11日利率8.5折', mark: "lilvText"},
        {value: "94", name: '15年05月11日利率9折', mark: "lilvText"},
        {value: "93", name: '15年05月11日基准利率', mark: "lilvText"},
        {value: "92", name: '15年05月11日利率1.05倍', mark: "lilvText"},
        {value: "91", name: '15年05月11日利率1.1倍', mark: "lilvText"},
        {value: "90", name: '15年05月11日利率1.2倍', mark: "lilvText"},
        {value: "89", name: '15年03月01日利率1.2倍', mark: "lilvText"},
        {value: "88", name: '15年03月01日利率1.1倍', mark: "lilvText"},
        {value: "87", name: '15年03月01日利率1.05倍', mark: "lilvText"},
        {value: "86", name: '15年03月01日基准利率', mark: "lilvText"},
        {value: "85", name: '15年03月01日利率9折', mark: "lilvText"},
        {value: "84", name: '15年03月01日利率8.5折', mark: "lilvText"},
        {value: "83", name: '15年03月01日利率7折', mark: "lilvText"},
        {value: "82", name: '14年11月22日利率1.2倍', mark: "lilvText"},
        {value: "81", name: '14年11月22日利率1.1倍', mark: "lilvText"},
        {value: "80", name: '14年11月22日利率1.05倍', mark: "lilvText"},
        {value: "79", name: '14年11月22日基准利率', mark: "lilvText"},
        {value: "78", name: '14年11月22日利率9折', mark: "lilvText"},
        {value: "77", name: '14年11月22日利率8.5折', mark: "lilvText"},
        {value: "76", name: '14年11月22日利率7折', mark: "lilvText"},
        {value: "75", name: '12年07月06日利率上限(1.2倍)', mark: "lilvText"},
        {value: "74", name: '12年07月06日利率上限(1.1倍)', mark: "lilvText"},
        {value: "73", name: '12年07月06日利率上限(1.05倍)', mark: "lilvText"},
        {value: "72", name: '12年07月06日基准利率', mark: "lilvText"},
        {value: "71", name: '12年07月06日利率下限(9折)', mark: "lilvText"},
        {value: "70", name: '12年07月06日利率下限(85折)', mark: "lilvText"},
        {value: "69", name: '12年07月06日利率下限(7折)', mark: "lilvText"},
        {value: "68", name: '12年06月08日利率上限(1.2倍)', mark: "lilvText"},
        {value: "67", name: '12年06月08日利率上限(1.1倍)', mark: "lilvText"},
        {value: "66", name: '12年06月08日利率上限(1.05倍)', mark: "lilvText"},
        {value: "65", name: '12年06月08日基准利率', mark: "lilvText"},
        {value: "64", name: '12年06月08日利率下限(9折)', mark: "lilvText"},
        {value: "63", name: '12年06月08日利率下限(85折)', mark: "lilvText"},
        {value: "62", name: '12年06月08日利率下限(7折)', mark: "lilvText"},
        {value: "61", name: '11年07月07日利率上限(1.2倍)', mark: "lilvText"},
        {value: "60", name: '11年07月07日利率上限(1.1倍)', mark: "lilvText"},
        {value: "59", name: '11年07月07日利率上限(1.05倍)', mark: "lilvText"},
        {value: "58", name: '11年07月07日基准利率', mark: "lilvText"},
        {value: "57", name: '11年07月07日利率下限(9折)', mark: "lilvText"},
        {value: "56", name: '11年07月07日利率下限(85折)', mark: "lilvText"},
        {value: "55", name: '11年07月07日利率下限(7折)', mark: "lilvText"},
        {value: "54", name: '11年04月06日利率上限(1.2倍)', mark: "lilvText"},
        {value: "53", name: '11年04月06日利率上限(1.1倍)', mark: "lilvText"},
        {value: "52", name: '11年04月06日基准利率', mark: "lilvText"},
        {value: "51", name: '11年04月06日利率下限(85折)', mark: "lilvText"},
        {value: "50", name: '11年04月06日利率下限(7折)', mark: "lilvText"},
        {value: "49", name: '11年02月09日利率上限(1.2倍)', mark: "lilvText"},
        {value: "48", name: '11年02月09日利率上限(1.1倍)', mark: "lilvText"},
        {value: "47", name: '11年02月09日基准利率', mark: "lilvText"},
        {value: "46", name: '11年02月09日利率下限(85折)', mark: "lilvText"},
        {value: "45", name: '11年02月09日利率下限(7折)', mark: "lilvText"},
        {value: "44", name: '10年12月26日利率上限(1.2倍)', mark: "lilvText"},
        {value: "43", name: '10年12月26日利率上限(1.1倍)', mark: "lilvText"},
        {value: "42", name: '10年12月26日基准利率', mark: "lilvText"},
        {value: "41", name: '10年12月26日利率下限(85折)', mark: "lilvText"},
        {value: "40", name: '10年12月26日利率下限(7折)', mark: "lilvText"},
        {value: "39", name: '10年10月20日利率上限(1.1倍)', mark: "lilvText"},
        {value: "38", name: '10年10月20日基准利率', mark: "lilvText"},
        {value: "37", name: '10年10月20日利率下限(85折)', mark: "lilvText"},
        {value: "36", name: '10年10月20日利率下限(7折)', mark: "lilvText"},
      ],
      tqyearArr : [
        {id: '2005', value: '2005年'},
        {id: '2006', value: '2006年'},
        {id: '2007', value: '2007年'},
        {id: '2008', value: '2008年'},
        {id: '2009', value: '2009年'},
        {id: '2010', value: '2010年'},
        {id: '2011', value: '2011年'},
        {id: '2012', value: '2012年'},
        {id: '2013', value: '2013年'},
        {id: '2014', value: '2014年'},
        {id: '2015', value: '2015年'},
        {id: '2016', value: '2016年'},
        {id: '2017', value: '2017年'},
        {id: '2018', value: '2018年'},
        {id: '2019', value: '2019年'},
        {id: '2020', value: '2020年'},
        {id: '2021', value: '2021年'},
        {id: '2022', value: '2022年'},
        {id: '2023', value: '2023年'},
        {id: '2024', value: '2024年'},
        {id: '2025', value: '2025年'},
        {id: '2026', value: '2026年'},
        {id: '2027', value: '2027年'},
        {id: '2028', value: '2028年'},
        {id: '2029', value: '2029年'},
        {id: '2030', value: '2030年'},
        {id: '2031', value: '2031年'},
        {id: '2032', value: '2032年'},
        {id: '2033', value: '2033年'},
        {id: '2034', value: '2034年'},
        {id: '2035', value: '2035年'},
        {id: '2036', value: '2036年'},
        {id: '2037', value: '2037年'},
        {id: '2038', value: '2038年'},
        {id: '2039', value: '2039年'},
        {id: '2040', value: '2040年'},
        {id: '2041', value: '2041年'},
        {id: '2042', value: '2042年'},
        {id: '2043', value: '2043年'},
        {id: '2044', value: '2044年'},
        {id: '2045', value: '2045年'},
        {id: '2046', value: '2046年'},
        {id: '2047', value: '2047年'}
      ],
      monthArr  : [
        {value: '01月', id: '01'},
        {value: '02月', id: '02'},
        {value: '03月', id: '03'},
        {value: '04月', id: '04'},
        {value: '05月', id: '05'},
        {value: '06月', id: '06'},
        {value: '07月', id: '07'},
        {value: '08月', id: '08'},
        {value: '09月', id: '09'},
        {value: '10月', id: '10'},
        {value: '11月', id: '11'},
        {value: '12月', id: '12'},
      ],
      dengArr   : [
        {name: '一次性还清', value: '1'},
        {name: '部分提前还款', value: '2'},
      ],
      clfsArr   : [
        {name: '缩短还款期限，月还款额基本不变', value: '1'},
        {name: '减少月还款额，还款期限不变', value: '2'},
      ],
      //商贷利率 3-5年  5-30年
      houseLoanBuzzRate : [
        {
          title	: "08年11月27日利率下限",
          rate	: [ 0.0416, 0.0428]
        },
        {
          title	: "08年11月27日利率上限",
          rate	: [ 0.0653, 0.0673]
        },
        {
          title	: "08年11月27日基准利率",
          rate	: [ 0.0594, 0.0673]
        },	
        {
          title	: "08年11月27日第二套房",
          rate	: [ 0.0653, 0.0673]
        },
        {
          title	: "08年12月23日利率下限(7折)",
          rate	: [ 0.0403, 0.0416]
        },
        {

          title	: "08年12月23日利率下限(8折)",
          rate	: [ 0.0461, 0.0475]
        },	
        {
          title	: "08年12月23日利率下限(85折)",
          rate	: [ 0.0490, 0.0505]
        },
        {
          title	: "08年12月23日利率上限(1.1倍)",
          rate	: [ 0.0634, 0.0653]
        },
        {
          title	: "08年12月23日基准利率",
          rate	: [ 0.0576, 0.0594]
        },
        {
          title	: "08年12月23日第二套房(1.1倍)",
          rate	: [ 0.0634, 0.0653]
        },
        {
          title	: "10年10月20日基准利率",
          rate	: [ 0.0596, 0.0614]
        },
        {
          title	: "10年12月26日基准利率",
          rate	: [ 0.0614, 0.0640]
        },
        {
          title	: "11年02月09日基准利率",
          rate	: [ 0.0645, 0.066]
        },
        {
          title	: "11年04月06日基准利率",
          rate	: [ 0.0665, 0.068]
        },
        {
          title	: "11年07月07日基准利率",
          rate	: [ 0.0690, 0.0705]
        },
        {
          title	: "12年06月08日基准利率",
          rate	: [ 0.0650, 0.0680]
        },
        {
          title	: "12年07月06日基准利率",
          rate	: [ 0.0640, 0.0655]
        },		
        {
          isdefault: true,
          title	: "14年11月22日基准利率",
          rate	: [ 0.06, 0.0615]
        },
        {
          isdefault: true,
          title	: "15年3月1日基准利率",
          rate	: [ 0.0575, 0.0590]
        },
        {
          isdefault: true,
          title	: "15年5月11日基准利率",
          rate	: [ 0.0550, 0.0565]
        },
        {
          isdefault: true,
          title	: "15年6月28日基准利率",
          rate	: [ 0.0525, 0.0540]
        },   
        {
          isdefault: true,
          title	: "15年8月26日基准利率",
          rate	: [ 0.0500, 0.0515]
        }, 
        {
          isdefault: true,
          title	: "15年10月24日基准利率",
          rate	: [ 0.0475, 0.0490]
        }, 
      ],
    }
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods : {
    //点击出来弹框
    clihide (typeobj){
      this.totalArr  = this[typeobj];
      this.alertFalg = false;
    },
    //选择日期
    srhkHide (year,month,biaoti){
      var that = this;
      var obj = {data : this[year]};
      var obj2 = {data : this[month]};
      var bankSelect = new IosSelect(2, [obj.data,obj2.data],{
        container: '.container',
        title: biaoti,
        itemHeight: 50,
        itemShowCount: 3,
        callback: function (selectOneObj) {
          var str = '';
          for(var i = 0; i < selectOneObj.length; i++){
            str += selectOneObj[i].value;
          }
          if(biaoti == '首日还款'){
            that.srhkText = str;
          } else{
            that.tqhkText = str;
          }
        }
      });
    },
    //还款方式
    dengFunc (index){
      this.hkfsType = index;
      if(index == 2){
        this.dengeFalg = true;
      } else{
        this.dengeFalg = false;
      }
    },
    //处理方式
    chuliFunc (index){
      this.clfsType = index;
    },
    incrementTotal (obj){
      this.alertFalg = obj.alertFalg;
      this[obj.mark] = obj.name;
      if(obj.mark == "hklxText"){
        this.hklxNum = obj.value;
        if(obj.value == 1){
          this.lilvZhiSD = 4.9;
        } else{
          this.lilvZhiSD = 3.25;
        }
      } else if(obj.mark == "fdnxText"){
        this.fdnxNum = obj.value
      }
    },
    //重置
    clearData (){
      this.$refs['list'].clearData();//清空选中的数据
      this.fdje = '';
      this.hkje = '';
      this.hklxText = '请选择贷款类别';
      this.fdnxText = '请选择房贷年限';
      this.lilvText = '请选择利率';
      this.srhkText = '请选择首次还款时间';
      this.tqhkText = '请选择预计提前还款时间';
      var name = '清空提前还贷计算内容';
      zhuGe.resetFangData(name);
    },
    //计算
    jisuan (){
      var that = this;
      this.msgText = '请确认是否填写完整！';
      if(this.hklxNum == 0 || this.fdje == ''||this.fdnxText == '请选择房贷年限'||this.lilvZhiSD == ''|| this.srhkText == '请选择首次还款时间' || this.tqhkText == '请选择预计提前还款时间'){
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }
      if(this.hkfsType == 2){
        if(this.hkje == ''){
          that.wran = true;
          var times = setTimeout(function(){
            that.wran = false;
          },2000)
          return false;
        }
      }
      var Time;//NLD
      this.fdje = this.fdje * 10000;
      var A = parseFloat(this.fdje),
        W = parseFloat(this.hkje),
        N = this.fdnxNum,
			
        payType = this.hkfsType,//还款方式
        dealType = this.clfsType,//处理方式
        
        firstYear  = parseInt( this.srhkText.split('年')[0] ),
        firstMonth = parseInt( this.srhkText.split('年')[1].split('月')[0] ),
        earlyYear  = parseInt( this.tqhkText.split('年')[0] ),
        earlyMonth = parseInt( this.tqhkText.split('年')[1].split('月')[0] ),
        //buzzRate.val() 商贷利率 默认4.9 
        //counRate.val() 公积金   默认3.25
        BR = parseFloat( this.lilvZhiSD ) /100 /12,
        CR = parseFloat( this.lilvZhiSD ) /100 /12,
        R = this.hklxNum == 1 ? BR : CR;
		
      // var totalInt = totalAmt = buzzIntAmt = counIntAmt = 0,
        // T = SIA = Time = CMA = NMA = PIA = PSA = PCA =0 ;
      var totalInt = 0,T = 0,SIA = 0,Time = 0,CMA = 0,NMA = 0,PIA = 0,PSA = 0,PCA =0;
      var n = (earlyYear - firstYear) * 12 + earlyMonth - firstMonth - 1;
      if (n > N) {
        this.msgText = '您输入的预计提前还款时间有误，请检查。';
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }
      //LIST  [偿还利息,偿还本金,偿还本息,剩余本金]	
      var list = [];
      var C = A* R * Math.pow( 1 + R, N ) / ( Math.pow( 1+R, N ) -1 ), D = 0;
      if (isNaN(C)) C = 0;
      for (var i=0; i< N ; i++) {
        // I = 剩余本金 × 月利率
        var D = i == 0 ? A: list[ i-1 ][3]; //剩余本金
        var I = D * R ;
        list.push( [ I, C-I, C, D-( C-I )] );	
      }
      var List = list;
      for (var i=0; i<=n; i++) {
        PIA += List[i][0];
        PCA += List[i][1];
        PSA += List[i][2];
      }
      if(n<-1){
        this.msgText = '预计提前还款时间与第一次还款时间有矛盾，请查实';
        that.wran = true;
        var times = setTimeout(function(){
          that.wran = false;
        },2000)
        return false;
      }
      for (var i=n+2; i<List.length; i++) {
        SIA +=  List[i][0];
      }
      if ( payType == 1){
        //一次性还清
        Time = earlyYear + '年' + earlyMonth + '月';
        CMA = A - (PSA - PIA) + List[ n+1 ][ 0 ];
      }else{
        //部分提前还款
        CMA = W + List[ n+1 ][ 2 ];
        var J = A - PCA - W - List[ n+1 ][ 1 ] ;
        if ( dealType == 1){
          //缩短还款期限,月还款额不变
          NMA = List[ n+1 ][ 2 ];
          //T=Log（1+ r ％）[A÷（A－J×r％）] A为月还款额
          T = Math.ceil( Math.log( NMA / ( NMA - J * R ) ) / Math.log( 1+ R ) );
          var d = 0;
          var All = [];
          //Ci= M×（R％÷12）×（1+ R％÷12）N÷[（1+ R％÷12）N—1]
          var C = J * R * Math.pow( 1 + R, T ) / ( Math.pow( 1+R, T ) -1 ), D = 0;
          if (isNaN(C)) C = 0;
          for (var i=0; i< T ; i++) {
            // I = 剩余本金 × 月利率
            var D = i == 0 ? J : All[ i-1 ][3]; //剩余本金
            var I = D * R ;
            All.push( [ I, C-I, C, D-( C-I )] );	
          }
          var arr = All;
          NMA = arr[0][2];
          for (var i=0; i<arr.length; i++) {
            d += arr[i][0];
          }
          SIA = SIA - d;	
          var tm =  earlyMonth + T % 12;
          var y  =  earlyYear + parseInt(T / 12) + parseInt( tm / 12 );
          //(还款年*12 + 还款月 + 贷款期数-2) + '年' + (还款年*12 + 还款月 + 贷款期数-2) % 12 + 1+'月'
          
          Time = y + '年'+ (tm % 12==0?'1':tm % 12) + '月';
         
          // console.log(earlyMonth + '--'+T)
        }else{
          //减少月还款额,还款期限不变
          Time = Math.floor( firstYear + N / 12) + '年'+ (firstMonth-1 % 12) + '月';
          T = N - n - 2;
          var d = 0;

          var Arr = [];
          //Ci= M×（R％÷12）×（1+ R％÷12）N÷[（1+ R％÷12）N—1]
          var C = J* R * Math.pow( 1 + R, T ) / ( Math.pow( 1+R, T ) -1 ), D = 0;
          if (isNaN(C)) C = 0;
          for (var i=0; i< T ; i++) {
            // I = 剩余本金 × 月利率
            var D = i == 0 ? J: Arr[ i-1 ][3]; //剩余本金
            var I = D * R ;
            Arr.push( [ I, C-I, C, D-( C-I )] );	
          }
          var arr = Arr;
          NMA = arr[0][2];
          for (var i=0; i<arr.length; i++) {
            d += arr[i][0];
          }					
          SIA = SIA - d;			
        }
      }
      var yhlxPrice = PIA.toFixed(2),
        yhkzePrice  = PSA.toFixed(2),
        jslxzcPrice = SIA.toFixed(2),
        xdhkTime    = Time,
        gyhkePrice  = CMA.toFixed(2),
        xyqhkePrice = NMA.toFixed(2);
      
      //BR 商贷利率 5.65 原月还款额
      var yhk = (this.fdje * (BR * Math.pow((1 + BR), this.fdnxNum)) / (Math.pow((1 + BR), this.fdnxNum) - 1)).toFixed(2);
      //原最后还款期限=(第一次还款日期年*12+第一次还款日期月+原还款年数-2)/12年  （第一次还款日期年*12+第一次还款日期月+原还款期数-2）%12+1月
      var yhkjssj = Math.floor((parseInt(firstYear) * 12 + parseInt(firstMonth) + this.fdnxNum*1 - 2) / 12) + '年' + ((parseInt(firstYear) * 12 + parseInt(firstMonth) + this.fdnxNum*1 - 2) % 12 + 1) + '月'; 

      var resultData = {
        yyhk : yhk,
        zhhkq: yhkjssj,//最后还款期
        yhke : yhkzePrice,//已还款额
        yhlx : yhlxPrice,//已还利息
        gyhke: gyhkePrice,//该月一次还款
        xyqyhke : xyqhkePrice,
        jslx : jslxzcPrice,//节省利息
        xhkq : xdhkTime,//新还款期
        type : 6
      }
      this.$emit('resultPanel',resultData);
      let zhugeObj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '还款类型' : this.hklxText,
        '房贷金额' : this.fdje,
        '房贷年限' : this.fdnxText,
        '利率'     : this.lilvZhiSD,
        '首日还款' : this.srhkText,
        '提前还款' : this.tqhkText,
        '还款方式' : '一次性还款'
      }
      let zhugeObj2 = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '还款类型' : this.hklxText,
        '房贷金额' : this.fdje,
        '房贷年限' : this.fdnxText,
        '利率'     : this.lilvZhiSD,
        '首日还款' : this.srhkText,
        '提前还款' : this.tqhkText,
        '还款方式' : '部分提前还款',
        '还款金额' : this.hkje,
        '处理方式' : this.clfsType == 1?'缩短还款期限，月还款额基本不变':'减少月还款额，还款期限不变'
      }
      if(this.hkfsType == 1){
        this.zhugeIo(zhugeObj);
      } else{
        this.zhugeIo(zhugeObj2);
      }
    },
    zhugeIo (dataObj){
      zhuge.track('提交提前还贷计算',dataObj)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
