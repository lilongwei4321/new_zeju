<template>
  <dl>
    <dt>
      <router-link :to="hrefFn(name)">
        <img :src="`http://imgs.zeju.cn/${obj.img_url}`" class="img">
        <logo-benefit class="logo_left"  v-if="async" :text="obj.discount_info"></logo-benefit>
        <div class="text">
          <p><span class="title">{{ obj.name }}</span><span class="noodles">建面：{{ obj.building_area}}</span></p>
          <p class="address">楼盘地址：<span>{{ obj.address }}</span></p>
        </div>
      </router-link>
    </dt>
    <!-- 显示开抢状态楼盘 -->
    <dd class="transverse_fen_center_ya" v-if="async">
      <section class="text_box portrait_fen_ya">
        <p class="price"><span>{{obj.price_name}}<b>{{obj.price}}</b>{{obj.price_unit}}</span></p>
        <!-- 楼盘推荐理由 -->
        <p class="reason">
          <span :class="'text_back'+(key+1)" v-for="(m,key) in obj.labels" :key="key">{{m}}</span>
        </p>
        <!-- 开抢时间 -->
        <time class="time" v-html="startDateFn()"></time>
      </section>
      <!-- 倒计时 -->
      <section class="count_down">
        <p class="daojishi" >
          <span>{{daoDate.shi}}</span><b>:</b>
          <span>{{daoDate.fen}}</span><b>:</b>
          <span>{{daoDate.miao}}</span>
        </p>
        <p class="text">距抢购结束倒计时</p>
      </section>
    </dd>
    <!-- 显示已抢楼盘状态 -->
    <dd class="portrait_center_ya lishi" v-else>
      <section>
        <p class="price"><span>{{ obj.price_name}}<b>{{ obj.price}}</b>{{ obj.price_unit}}</span></p>
        <p class="reason">
          <span :class="'text_back'+(ind+1)"  v-for="(items,ind) in obj.labels" :key="ind">{{ items}}</span>
        </p>
      </section>
      <section>
        <span class="text">赵女士（130****0908）已抢订</span>
      </section>
    </dd>
  </dl>
</template>

<script>
import {mapGetters} from 'vuex';
//引用 -- logo组件 --动态改变文字
import logoBenefit from '@/components/page/logo/logo_benefit.vue';
// 时间 方法
import GetDate from '@/assets/javascripts/date.js';
export default {
  name: 'Home',
  props : {
    //楼盘基本数据
    obj : {
      type : Object,
      default : function(){
        return {}
      }
    },
    async : {
      type : Boolean,
      default : true
    },
    name : {
      type : String ,
      default : null
    },
    num : {
      type : Number,
      default : 1
    }
  },
  computed : {...mapGetters(['cityName'])},
  components: {
    logoBenefit
  },
  data () {
    return {
      start   : '',
      daoDate : {
        shi : '00',
        fen : '00',
        miao: '00'
      }
    }
  },
  methods : {
    //开始时间
    startDateFn () {
    
      let num  = new Date()*1,
          obj  = GetDate.turn(num),
          str  = `${obj.year}年${obj.yue}月${obj.ri}日${obj.shi}:${obj.fen}特价开抢 `;
          return str;
    },
    //倒计时
    daoDateFn () {
      let num = new Date()*1,
          obj = {
            now : num,
            end : num+2000000
          },
          timer = null;
          
          timer = setInterval(() => {
            let date = GetDate.init(obj);
            this.daoDate =date;
            obj.now = obj.now + 1000;
            if(obj.now > obj.end){
              clearInterval(timer)
            }
          },1000);
    },
    hrefFn (name) {
      if(name == 'brand'){
        return {path:`/${this.cityName}/loupan/brand/brand_detail/${this.obj.id}`,query:{num:this.num}};
      } else{
        return {path:`/${this.cityName}/loupan/sale/${this.obj.id}/sale_detail`,query:{num:this.num}};
      }
    }
  },
  mounted () {
    //倒计时
    // this.daoDateFn();
  }
}
</script>
<style lang="less" scoped>
dl{
  dt{
    position: relative;
    .img{
      display: block;
      width:100%;
    }
    .logo_left{
      position: absolute;
      top:1.5rem;
      left:-0.7rem;
      height: 2.2rem;
    }
    .text{
      width:100%;
      position: absolute;
      bottom: 0;
      background:rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      flex-direction: column;
      color:#fff;
      height: 6rem;
      box-sizing: border-box;
      padding-left:1rem;
      p{
        padding:.2rem 0;
        display: flex;
        align-items: center;
        .title{
          font-size: 1.8rem;
          padding-right:1rem;
        }
        .noodles,&.noodles{
          font-size: 1.2rem;
        }
      }
    }
  }
  dd{
    padding-top:1rem;
    section{
      &.text_box{
        flex:1;
        p:nth-child(2){
          padding:.6rem 0;
        }
      }
      &.count_down{
        display: flex;
        flex-direction: column;
        justify-content: center;
        P{
          display: flex;
          flex-direction: flex;
          justify-content: space-between;
          &.text{
            font-size: 1.2rem;
            color: #666;
          }
          &.daojishi{
            align-items: center;
            padding-bottom:.6rem;
            span{
              background: #000;
              border-radius: .2rem;
              font-size: 1.2rem;
              color: #fff;
              display: block;
              padding:.4rem ;
              min-width: 2.2rem;
            }
            b{
              display: block;
              font-size:2rem;
            }
          }
        }
      }
      .price{
        display: flex;
        align-items: center;
        span,b{
          color: #FF3B30;
        }
        span{
          font-size: 1.4rem;
        }
        b{
          font-size:1.8rem;
          padding:0 .4rem;
        }
      }
      .reason{
        display: flex;
        align-items: center;
        span{
          display: block;
          display: flex;
          align-items: center;
          font-size: .8rem;
          height: 1.4rem;
          padding:0 .6rem;
          margin-right:.6rem;
          border-radius:.6rem;
        }
      }
      .time{
        font-size: 1.2rem;
        color: #FF3B30;
      }
    }
    &.lishi{
      padding-top:1.5rem;
      section{
        &:first-child{
          display: flex;
          .price{
            margin-right:1rem;
          }
        }
        .text{
          font-size: 1.2rem;
          color: #FF3B30;
          padding-top:.6rem;
          display: block;
        }
      }
    }
  }
}
</style>
