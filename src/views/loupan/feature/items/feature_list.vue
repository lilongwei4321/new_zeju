<template>
  <div class="feature_box">
    <nav>
      <router-link :to="{path:`/${cityName}/loupan/feature/feature_detail/${m.id}`,query:{num:key+1}}" v-for="(m,key) in arr" :key="key">
        <dl class="border">
          <dt :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.img_url})`}"  class="back block">
          </dt>
          <dd class="portrait_fen_ya">
            <h4 class="title text_ove1">{{m.title}}</h4>
            <p class="title1 text_ove1">{{m.lead}}</p>
            <p class="text text_ove1">{{m.subtitle}}</p>
            <time class="time">{{m.time}}</time>
          </dd>
        </dl>
      </router-link>
    </nav>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'list',
  props : {
    arr : {
      type : Array,
      default : function(){
        return [];
      }
    }
  },
  computed : {...mapGetters(['cityName'])}
}
</script>
<style lang="less" scoped>
.feature_box{
  a{
    width:100%;
    display: flex;
    box-sizing: border-box;
    padding:0 1rem;
    &:last-child{
      dl:after{
        height: 0;
      }
    }
    dl{
      flex:1;
      display: flex;
      position: relative;
      padding:1.5rem 0;
      dt{
        width:11.2rem;
        height: 8.4rem;
        position: relative;
      }
    }
    dd{
      width:0;
      flex:1;
      padding-left:1rem;
      color: #333;
      .title{
        font-size: 1.6rem;
      }
      .title1{
        font-size:1.4rem;
      }
      .text{
        color:#666;
        font-size:1.2rem;
      }
      .time{
        font-size:1.2rem;
        color:#999;
      }
    }
  }
}
</style>
