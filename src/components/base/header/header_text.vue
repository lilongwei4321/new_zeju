<template>
  <header :class="{'header_icon':true,'shadow':async}" id="header_icon">
    <div class="box transverse_center_center border">
      <span class="title text_ove1">{{name}}</span>
      <div class="transverse_fen_center_ya">
        <aside class="transverse_fen_center">
          <router-link :to="`/${cityName}`" class="iconfont icon-shouye return" v-if="!homeFlag"></router-link>
          <a href="javascript:;" onclick="window.history.back(-1)" class="iconfont icon-jiantou4 return" v-else-if="pageUrl=='' && homeFlag"></a>
          <router-link :to="pageUrl" class="iconfont icon-jiantou4 return" v-else></router-link>
        </aside>
        <aside class="zhongxin">
          <router-link :to="`/${cityName}/home/index`"  class="iconfont icon-ren" v-show="headFlag" ></router-link>
          <router-link :to="url" class="dianping" v-show="wordFlag">{{ msg }}</router-link>
        </aside>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  props : {
    name : {
      type : String,
      default : ''
    },
    async : {
      type : Boolean,
      default : true
    },
    headFlag : {
      type : Boolean,
      default : false
    },
    wordFlag: {
      type : Boolean,
      default : false
    },
    msg : {
      type : String,
      default : ''
    },
    url : {
      type : String,
      default : ''
    },
    pageUrl : {
      type : String,
      default : ''
    },
    homeFlag : {
      type : Boolean,
      default : true
    }
  },
  computed : { ...mapGetters(['cityName','customerId'])},
}
</script>
<style lang="less" scoped>
.header_icon{
  height:4.4rem;
  width:100%;
  position: fixed;
  top:0;
  left:0;
  background: #fff;
  z-index:200;
  &.shadow{
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
  }
  .box{
    position: relative;
    width:100%;
    height: 100%;
    .title{
      font-size: 1.8rem;
      color: #333;
      display: block;
      width:76%;
      text-align: center;
    }
    div{
      height: 100%;
      width:100%;
      position: absolute;
      padding:0 1rem;
      left:0;
      .return{
        font-size:2.4rem;
        color:#666;
        margin-right:.2rem;
        padding-right:1rem;
        font-weight: bold;
      }
      .city{
        display: flex;
        margin-left:.2rem;
        padding:0 2rem 0 .5rem;
        align-items: center;
        height: 100%;
        position: relative;
        span{
          font-size: 1.4rem;
          color:#333;
        }
        i{
          font-size:1.6rem;
          color:#666;
          font-weight: bold;
          padding-left:.5rem;
          position: absolute;
          right: 0;
          top:.4rem;
        }
      }
      .user{
        font-size:2rem;
        color:#666;
        padding:0 .4rem 0 1rem;
      }
      .zhongxin{
        a{
          color: #666;
          font-size:2.3rem;
        }
        .dianping{
          color: #F63;
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
