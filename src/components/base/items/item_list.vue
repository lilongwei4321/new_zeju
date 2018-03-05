<template>
  <dl>
    <dt>
      <router-link :to="{path:`/${cityName}/loupan/sale/${temaiData.id}`,query:{num}}">
        <img :src="`http://imgs.zeju.cn${temaiData.img_url}`" class="img">
        <img src="/static/assets/images/icon-feng.png" class="logo">
        <div>
          <p><span class="title">{{ temaiData.name }}</span><span class="noodles">建面：{{ temaiData.building_area}}</span></p>
          <p class="address">楼盘地址：<span>{{ temaiData.address }}</span></p>
        </div>
      </router-link>
    </dt>
    <dd>
      <div>
        <p class="price"><span>{{ temaiData.price_name }}<b>{{ temaiData.price }}</b>{{ temaiData.price_unit }}</span></p>
        <p class="reason">
          <span :class="'text_back'+(ind+1)"  v-for="(items,ind) in temaiData.labels" :key="ind">{{ items}}</span>
        </p>
      </div>
      <div>
        <aside class="quota">
          <p><b>9</b>折抢购，不容错过</p>
          <p>特价房仅剩03套 | 限量12套</p>
        </aside>
        <aside class="count_down">
          <p>
            <span>{{daoDate.shi}}</span><b>:</b>
            <span>{{daoDate.fen}}</span><b>:</b>
            <span>{{daoDate.miao}}</span>
          </p>
          <p>距抢购结束倒计时</p>
        </aside>
      </div>
      <div>
        <h6>他们都在抢</h6>
        <ul class="rob_user_box">
          <li>
            <span>撒地方</span>
            <p class="text_ove1"> 136****5452 30分钟前 抢购了SDafdsafdsfsd该楼盘下商品</p>
          </li>
          <li>
            <span>撒地方</span>
            <p  class="text_ove1"> 136****5452 30分钟前 抢购了该楼盘下</p>
          </li>
        </ul>
      </div>
    </dd>
  </dl>
</template>

<script>
import {mapGetters} from 'vuex';
// 时间 方法
import GetDate from '@/assets/javascripts/date.js';
export default {
  name: 'Home',
  props : {
    temaiData : {
      type : Object,
      default : function(){
        var obj = {
          // name: '测试'
        }
        return obj;
      }
    },
    num : {
      type : Number,
      default : 1
    }
  },
  computed : {...mapGetters(['cityName'])},
  components: {
  },
  data () {
    return {
      daoDate : {
        shi : '00',
        fen : '00',
        miao: '00'
      }
    }
  },
  methods : {
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
    }
  },
  mounted () {
    this.daoDateFn()
  }
}
</script>
<style lang="less" scoped>
dl{
  border-radius:.6rem;
  box-shadow: 0px 4px 2px #eee;
  dt{
    position: relative;
    .img{
      border-radius:.6rem .6rem 0 0;
      display: block;
      width:100%;
    }
    .logo{
      position: absolute;
      top:1rem;
      width:8rem;
      left:-0.65rem;
    }
    div{
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
    padding:0 1rem 1.5rem;
    div{
      padding:.5rem 0;
      &:first-child{
        display: flex;
        align-items: center;
        .price{
          display: flex;
          align-items: center;
          white-space: nowrap;
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
          margin-left:1.4rem;
          span{
            display: block;
            display: flex;
            align-items: center;
            font-size: .8rem;
            height: 1.4rem;
            padding:0 .6rem;
            margin:0 .6rem;
            border-radius:.6rem;
          }
        }
      }
      &:nth-child(2){
        display: flex;
        justify-content: space-between;
        .quota{
          p{
            &:first-child{
              padding-bottom:.4rem;
              font-size: 1.4rem;
              color: #f63;
              b{
                font-size:2rem;
              }
            }
            &:last-child{
              font-size: 1.2rem;
              color: #FF3B30;
            }
          }
        }
        .count_down{
          P{
            display: flex;
            flex-direction: flex;
            justify-content: space-between;
            &:first-child{
              display: flex;
              align-items: center;
              padding-bottom:.4rem;
              span{
                background: #000;
                border-radius: .2rem;
                font-size: 1.2rem;
                color: #fff;
                display: block;
                padding:.4rem ;
              }
              b{
                display: block;
                font-size:2rem;
              }
            }
            &:last-child{
              font-size: 1.2rem;
              color:#666;
            }
          }
        }
      }
      &:last-child{
        h6{
          font-size: 1.4rem;
          color: #666;
          padding:1rem 0;
        }
        .rob_user_box{
          background:#F6F5F5;;
          padding:.4rem 1rem;
          li{
            display: flex;
            padding:.4rem 0;
            span{
              display: block;
              font-size: 1.2rem;
              color: #FF5A5F;
              padding-right:.4rem;
            }
            p{
              font-size: 1.2rem;
              color: #3F3f3f;
              flex:1;
            }
          }
        }
      }
    }
  }
}
</style>
