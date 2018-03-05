<template>
  <header class="header_icon">
    <div class="box transverse_center_center border">
      <img src="/static/assets/images/zeju-logo.png" alt="择居网">
      <div class="transverse_fen_center_ya">
        <aside class="transverse_fen_center">
          <a href="javascript:;" onclick="window.history.back(-1)" class="iconfont icon-jiantou4 return" ></a>
          <router-link  :to="`/${cityName}/city`" class="city">
            <span>{{cityObj.name}}</span>
            <i class="iconfont icon-jiantou3"></i>
          </router-link>
        </aside>
        <aside>
          <router-link :to="`/${cityName}/home/index`" class="iconfont icon-ren user"></router-link>
        </aside>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex';
import api from '@/api/api';
export default {
  name: 'Home',
  data () {
    return {
      cityObj : {
        name:'北京'
      }
    }
  },
  computed : {
    ...mapGetters(['cityName','customerId'])
  },
  watch : {
    cityName () {
      this.gitCityName();
    }
  },
  methods : {
    gitCityName () {
      api.gitCityName({},this.cityName).then((res) =>{
        if(res.status == 200){
          //城市相关
          this.cityObj = res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    }
  },
  mounted () {
    this.gitCityName();
  }
}
</script>
<style lang="less" scoped>
.header_icon{
  position: fixed;
  top:0;
  left:0;
  height:4.4rem;
  width:100%;
  background: #fff;
  z-index:200;
  .box{
    position: relative;
    width:100%;
    height: 100%;
    &>img{
      display: block;
      width:9.4rem;
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
          position: absolute;
          right: 0;
          top:.2rem;
        }
      }
      .user{
        font-size:2rem;
        color:#666;
        font-weight: bold;
        padding:0 .4rem 0 1rem;
      }
    }
  }
}
</style>
