<template>
  <section class="more_wrap" @touchmove.prevent @click.self="hideFn">
    <main class="main portrait_fen_ya">
      <section class="box portrait_fen_ya" v-ScrollMove>
        <div class="list">
          <h4>类型</h4>
          <ul class="box_duo" >
            <li v-for="(m,ind) in obj.property_types" :key="ind" :class="{'transverse_center_center':true,' on':m.active}"  @click="clickCla(m)">
              <span>{{m.label}}</span>
            </li>
          </ul>
        </div>
        <div class="list">
          <h4>特色</h4>
          <ul class="box_duo" >
            <li v-for="m in obj.labels" :key="m.value" :class="{'transverse_center_center':true,' on':m.active}"  @click="clickCla(m)">
              <span>{{m.label}}</span>
            </li>
          </ul>
        </div>
        <!-- <div class="list">
          <h4>商圈</h4>
          <ul class="box_duo" >
            <li v-for="m in obj.shangQuan" :key="m.value" :class="{'transverse_center_center':true,' on':m.active}"  @click="clickCla(m)">
              <span>{{m.label}}</span>
            </li>
          </ul>
        </div> -->
        <div class="list">
          <h4>总价区间（万元）</h4>
          <div class="transverse_fen_center_ya">
            <p>
              <input type="number" placeholder="最低总价"  v-model="min_total_price" @input="numberFn('min_total_price')">
            </p>
            <i class="jian"></i>
            <p>
              <input type="number" placeholder="最高总价"  v-model="max_total_price" @input="numberFn('max_total_price')">
            </p>
          </div>
        </div>
        <div class="list">
          <h4>面积（㎡）</h4>
          <div class="transverse_fen_center_ya">
            <p>
              <input type="number" placeholder="最小面积" v-model="min_area" @input="numberFn('min_area')">
            </p>
            <i class="jian"></i>
            <p>
              <input type="number" placeholder="最大面积" v-model="max_area" @input="numberFn('max_area')">
            </p>
          </div>
        </div>
      </section>
      <section class="btn border1">
        <span class="transverse_center_center " @click= "noFn(true)">重置</span>
        <span class="transverse_center_center" @click= "yesFn('确定')">确定</span>
      </section>
    </main>
  </section>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'Home',
  data () {
    return {
      obj : {
        'property_types' : [
          {value :'-1', label: '住宅'  ,active : false},
          {value :'0',  label: '商铺'  ,active : false},
          {value :'1',  label: '别墅'   ,active : false},
          {value :'2',  label: '写字楼' ,active : false}
        ],
        'labels' : [
          {value :'-1', label: '小户型'   ,active : false},
          {value :'0',  label: '刚需住宅' ,active : false},
          {value :'1',  label: '低总价'   ,active : false},
          {value :'2',  label: '品牌房企' ,active : false},
          {value :'3',  label: '地铁沿线' ,active : false},
          {value :'4',  label: '现房'     ,active : false}
        ]
      },
      canObj : {},
      min_total_price : '',
      max_total_price : '',
      min_area   : '',
      max_area   : ''
    }
  },
  methods : {
    init () {
      this.noFn(false);
    },
    //通过点击 -- 选中下拉-改变class
    clickCla (obj) {
      this.$nextTick(() =>{
        Vue.set(obj,'active',!obj.active);
      });
    },
    //确定点击 
    yesFn (name) {
      this.canObj['property_types'] = this.xuanFn('property_types');
      this.canObj['labels']         = this.xuanFn('labels');
      this.canObj['total_price']    = [this.min_total_price,this.max_total_price];
      this.canObj['area']           = [this.min_area,this.max_area];
      this.$emit('btnClick',name,this.canObj);
    },
    //关闭 
    hideFn (){
      this.$emit('btnClick','关闭');
    },
    //重置点击 
    noFn (async) {
      //重置
      this.chongzhi('property_types');
      this.chongzhi('labels');
      this.min_total_price = ' ';
      this.max_total_price = ' ';
      this.min_area   = ' ';
      this.max_area   = ' ';
      this.canObj = {};
      if(async){
        this.yesFn('重置');
      }  
    },
    //重置 -- 所有选项
    chongzhi (name) {
      this.obj[name].map((m)=>{
        Vue.set(m,'active',false);
      });
    },
    //获取 -- 类别中 选中的选项
    xuanFn (name) {
      let label = [];
      this.obj[name].map((m) =>{
        if(m.active){
          label.push(m.label);
        }
      });
      return label;
    },
    //正则是否是数字
    numberFn (num,name) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(this[num])) {
        if(this[num].toString().length>6){
          this[num] = this[num].slice(0,6);
        }
      } else{
        this[num]  = ' ';
      }
    },
    //重置所有项
    chongZhiXuan (arr,name) {
      this.obj[name].map( (m,i) => {
        let async = false;
        arr.map( (n,ind) =>{
          if(n == m.label){
            async = true;
          }
        });
        //不符合条件都为false
        if(!async){
         this.chongXuan(m);
        }
      });
    },
    //不符合为false
    chongXuan (obj) {
      this.$nextTick(() =>{
        Vue.set(obj,'active',false);
      });
    },
    clickBackFn (obj) {
      if(JSON.stringify(obj) == "{}"){
        //所有选项为空
        this.noFn(false);
      } else {
        this.chongZhiXuan(obj.property_types,'property_types');
        this.chongZhiXuan(obj.labels,'labels');
        this.min_total_price = obj.total_price[0];
        this.max_total_price = obj.total_price[1];
        this.min_area   = obj.area[0];
        this.max_area   = obj.area[1];
      }
    }
  }
}
</script>
<style lang="less" scoped>
.more_wrap{
  position: fixed;
  right:0; 
  top:0;
  bottom:0;
  left: 0;
  background:rgba(0,0,0,0.4);
  height: 100%;
  z-index:201;
  transform-origin:right center;
  .main{
    width:30rem;
    background: #fff;
    height: 100%;
    float:right;
    &>.box{
      padding:5rem 1rem 5.2rem;
      justify-content:flex-start;
      overflow-y:auto;
      .list{
        padding-bottom:.5rem;
        h4{
          font-size:1.4rem;
          color:#333;
          height: 3.4rem;
          display: flex;
          align-items: center;
        }
        ul{
          justify-content: space-between;
          li{
            width:9rem;
            background: #F1F1F1;
            border-radius: .2rem;
            height: 2.4rem;
            margin:.5rem 0;
            color:#333;
            font-size: 1.2rem;
            &.on{
              border:1px solid #f63;
              color:#f63;
              background: transparent;
            }
          }
        }
        div{
          p{
            flex:1;
            // position: relative;
            // padding-bottom:1rem;
            // span{
            //   position: absolute;
            //   bottom:-.6rem;
            //   color:#f63;
            //   font-size:1.2rem;
            //   transform-origin:100% 0%;
            // }
          }
          input{
            display: block;
            width:100%;
            border:none;
            background: #F1F1F1;
            border-radius: .2rem;
            height: 2.4rem;
            margin:.5rem 0;
            color:#333; 
            text-align: center;
          }
          .jian{
            display: block;
            margin:0 .6rem;
            height: 0.2rem;
            width:1.6rem;
            background: #999999;
            border-radius: .8rem;
            overflow: hidden;
          }
        }
      }
    }
    &>.btn{
      display: flex;
      height:5rem;
      position: relative;
      span{
        flex:1;
        font-size:1.6rem;
        &:first-child{
          color:#333;
        }
        &:last-child{
          background: #f63;
          color:#fff;
        }
      }
    }
  }
}
</style>
