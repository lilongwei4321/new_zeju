<template>
  <div class="xuan_box transverse_fen_center border border1 ">
    <div class="box">
      <p class="select" @click="cliHide('regionAsync','regionArr','canRegion',true)">
        <span>区域</span>
        <i :class="{'iconfont':true ,'icon-sortC':!regionAsync ,'icon-sortA':regionAsync,'on':regionAsync}"></i>
      </p>
    </div>
    <div class="box">
      <p class="select"  @click="cliHide('priceAsync','priceArr','canPrice',true)">
        <span>价格</span>
        <i :class="{'iconfont':true ,'icon-sortC':!priceAsync ,'icon-sortA':priceAsync,'on':priceAsync}"></i>
      </p>
    </div>
    <div class="box">
      <p class="select" @click="cliHide('typeAsync','typeArr','canType',true)">
        <span>户型</span>
        <i :class="{'iconfont':true ,'icon-sortC':!typeAsync ,'icon-sortA':typeAsync,'on':typeAsync}"></i>
      </p>
    </div>
    <div class="box">
      <p class="select" @click="cliHide('moreAsync','moreArr','canMore',false)">
        <span>更多</span>
        <i :class="{'iconfont':true ,'icon-sortC':!moreAsync ,'icon-sortA':moreAsync,'on':moreAsync}"></i>
      </p>
    </div>
    <!-- c菜单内容 -->
    <transition name="kenzo">
      <div v-show="boxAsync" class="option_main option_main1" >
        <ul class="box_duo" @touchmove.prevent v-ScrollMove>
          <li 
            v-for="(m,ind) in arr" 
            :key="ind" 
            @click="clickCla(m)"
            :class="{'transverse_fen_center_ya':true,'on':m.active,'border':m.active}">
            <span>{{m.label}}</span>
            <i class="iconfont icon-duihao"></i>
          </li>
        </ul>
        <div class="btn">
          <span class="transverse_center_center" @click="yesNoFn(btnText,false,arrText,canArrText)">重置</span>
          <span class="transverse_center_center" @click="yesNoFn(btnText,true,arrText,canArrText)" >确定</span>
        </div>
      </div>
    </transition>
    <!-- 更多 -->
    <transition name="kenzo1">
      <list-more v-show="moreAsync" @btnClick = "moreFn" ref="listMore"></list-more>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import api  from '@/api/api';
//更多侧边栏页
import listMore from '@/components/base/asides/list_more.vue';
export default {
  name: 'Home',
  components: {
    listMore
  },
  data () {
    return {
      regionAsync : false,//区域
      priceAsync  : false,//价格
      typeAsync   : false,//户型
      moreAsync   : false,//更多
      boxAsync    : false,//菜单是否显示
      btnText     : '',//当前菜单 显示 哪一类的内容
      arrText     : '',//当前数组 名称
      canArrText  : '',//传参数组 名称
      arr : [] , //当前需要渲染的数据
      //价格数组
      priceArr : [],//{value : '50000-' , label:'5万元/㎡以上', active:false}
      //户型数组
      typeArr : [
        {value : 1, label:'一居室', active:false},
        {value : 2 , label:'二居室', active:false},
        {value : 3 , label:'三居室', active:false},
        {value : 4 , label:'四居室', active:false},
        {value : 5 , label:'五居及以上', active:false}
      ],
      //区域数组
      regionArr : [],
      moreObj : {}
    }
  },
  methods : {
    init () {
      this.boxAsync = false;
      this.arr      = [];
      // this.yesNoFn('',false,'regionArr');
      // this.yesNoFn('',false,'priceArr');
      // this.yesNoFn('',false,'typeArr');
      this.$refs.listMore.init();
      //获取区域下拉菜单 选项
      this.getRegionList();
      this.getPriceData();
    },
    //确定点击 ----- 重置点击
    yesNoFn (name,async,arrName,canArrName) {
      let obj ={
            area_ids : this.allXuanxiang('regionArr'),
            prices   : this.allXuanxiang('priceArr'),
            room_counts : this.allXuanxiang('typeArr')
          };
      if(async){
        //当前下拉，关闭false
        this[name] = false;
        //背景是否显示
        this.backAsyncFn('确定');
        //关闭下拉，发送给父组件，请求数据
        this.boxAsync = this[name];
        this.$emit('dataFn',{obj,name:'前三分类',async:true});
      } else{
        //重置
        this[arrName].map(function(m){
          Vue.set(m,'active',false);
        });
        let str = '';
        switch (arrName) {
          case 'priceArr' :
            str = 'prices'
          break;
          case 'regionArr' :
            str = 'area_ids'
          break;
          case 'typeArr' :
            str = 'room_counts'
          break;
        };
        obj[str] = {label:[],value : []};

        this.$emit('dataFn',{obj,name:'前三分类',async:true});
      }
    },
    //遍历所有项
    allXuanxiang (name) {
      let value = [],label = [];
      this[name].map((m) =>{
        if(m.active){
          value.push(m.value);
          label.push(m.label);
        }
      });
      return {value,label};
    },
    //通过点击 -- 选中下拉-改变class
    clickCla (obj) {
      this.$nextTick(() =>{
        Vue.set(obj,'active',!obj.active);
      });
    },
    //点击菜单按钮 -- 显示隐藏;
    cliHide (name,objName,arrName,async) {
      //btn  name 名称
      this.btnText    = name;
      this.arrText    = objName;
      this.canArrText = arrName;
      // 当前渲染 数组
      this.arr  = this[objName];
      //判断显示隐藏  菜单
      this[name] = !this[name];
      //下拉菜单是否显示，更多时隐藏
      if(async){
        this.boxAsync = this[name];
      } else{
        this.boxAsync = false;
      }
      // 除当前菜单 --全部隐藏
      this.asyncFalse(name);
      //背景是否显示
      this.backAsyncFn('按钮');
    },
    //显示async 全为false
    asyncFalse (name){
      let arr = ['regionAsync','priceAsync','typeAsync','moreAsync'];
      arr.map( (m) => {
        if(name != m ){
          this[m] = false;
        }
      })
    },
    //背景遮罩
    backAsyncFn (name) {
      let arr   = [this.regionAsync,this.priceAsync,this.typeAsync],
          async = false,
          chongZhi = false;
          arr.map((m)=>{
            if(m){
              async = true;
            }
          });
      
      chongZhi = name == '按钮' ? !async :  false; 
      //点击下拉时，显示隐藏背景
      this.$emit('backShow',async,chongZhi);
    },
    //父组件调用函数，用于关闭下拉box
    boxAsyncFn () {
      this.boxAsync = false;
      //全部为false
      this.asyncFalse('false');
    },
    //获取区域下拉菜单 选项
    getRegionList () {
      var obj = {
        city_abbr : this.$store.state.cityName
      }
      api.getRegionList(obj).then((res) =>{
        if(res.status == 200){
          this.regionArr = res.data;
        } else if(res.status == 422){
          this.$router.push(`/${this.$store.state.cityName}/404`);
        }
      });
    },
    //获取价格下拉值
    getPriceData (){
      var obj = {
        type : 3,
        city_abbr : this.$store.state.cityName
      }
      api.getPriceJson(obj).then((res) =>{
        if(res.status == 200){
          this.priceArr = res.data;
        } else if(res.status == 422){
          this.$router.push(`/${this.$store.state.cityName}/404`);
        }
      })
    },
    //判断是否 显示更多
    moreFn (name,obj) {
      //重置确定改变数据
      if(name == '重置' || name == '确定'){
        //向父组件，传参
        this.$emit('dataFn',{obj:obj,name:'canMore',async:true}); 
      } 
      //确定，关闭--隐藏侧边栏
      if(name == '确定' || name == '关闭'){
        this.moreAsync = false;
      }
      //关闭
      if(name == '关闭') {
        //调用父组件关闭背景接口，获取储存参数
        this.$parent.backHideFn();
      }
    },
    //重置没有确定选项
    xuanXiang (obj){
      //如果没有选项，不重置
      if(JSON.stringify(obj) == "{}"){return false};
      
      this.chongZhiXuan(obj.area_ids,'regionArr');
      this.chongZhiXuan(obj.prices,'priceArr');
      this.chongZhiXuan(obj.room_counts,'typeArr');
      //侧边栏
      this.$refs.listMore.clickBackFn(obj.moreObj);
    },
    //重置所有项
    chongZhiXuan (arr,name) {
      this[name].map( (m,i) => {
        let async = false;
        arr.map( (n,ind) =>{
          if(n == m.label){
            async = true;
          }
        });
        //不符合条件都为false
        if(!async){
         this.chongzhi(m);
        }
      });
    },
    //不符合为false
    chongzhi (obj) {
      this.$nextTick(() =>{
        Vue.set(obj,'active',false);
      });
    }
  },
  mounted () {
    this.getPriceData();
    //获取区域下拉菜单 选项
    this.getRegionList();
  }
}
</script>
<style lang="less" scoped>
.xuan_box{
  position: relative;
  height: 100%;
  .box{
    width:0;
    flex:1;
    display: flex;
    justify-content: center;
    border-right: 1px solid #eee;
    &:last-child{
      border:none;
    }
  }
  .select{
    span{
      font-size:1.4rem;
      color:#666;
      &.on{
        color:#f63;
      }
    }
    i{
      color:#999;
      font-size:1.4rem;
      transform: translate(.2rem,0rem);
      display: inline-block;
      transform-origin:center center;
      width:2rem;
      &.on{
        color:#f63;
      }
    }
  }
}
  
</style>
