<template>
  <dl>
    <dt>
      <router-link :to="{path:`/${cityName}/loupan/loupan_detail/${temaiData.id}`,query:{num}}">
        <div class="back back_box" :style="{'backgroundImage':`url(http://imgs.zeju.cn/${temaiData.img_url})`}"></div>
        <div class="header">
          <p class="title_box">
            <span class="title">{{ temaiData.name }}</span>
            <span class="time">{{ temaiData.open_at}}开盘</span>
          </p>
          <p class="address"><span>楼盘地址：</span><span class="text_ove1">{{ temaiData.address }}</span></p>
        </div>
      </router-link>
    </dt>
    <dd>
      <p class="price">
        <span v-if="temaiData.price_unit!='待定'">{{ temaiData.price_name }}<b>{{ temaiData.price }}</b>{{ temaiData.price_unit }}</span>
        <span v-else>均价：{{ temaiData.price_unit }}</span>
      </p>
      <p class="reason">
        <span :class="'text_back'+(ind+1)"  v-for="(items,ind) in temaiData.labels" :key="ind">{{ items}}</span>
      </p>
      <p class="mianji">
        <span v-if="temaiData.building_area!=''">建筑面积：{{temaiData.building_area}}</span>
        <span v-if="temaiData.min_shoufu > 0">最低首付：{{temaiData.min_shoufu}}万元</span>
      </p>
      <div class="youshi" v-if="temaiData.advantages!=null">
        <h6>项目优势</h6>
        <p class="youshi_text text_ove2">{{temaiData.advantages}}</p>
      </div>
    </dd>
  </dl>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  props : {
    temaiData : {
      type : Object,
      default : function(){
        return {};
      }
    },
    num : {
      type : Number,
      default : 1
    }
  },
  computed : {...mapGetters(['cityName'])},
}
</script>
<style lang="less" scoped>
dl{
  border-radius:.6rem;
  box-shadow: 0px 4px 2px #eee;
  dt{
    position: relative;
    .back_box{
      border-radius:.6rem .6rem 0 0;
      // display: block;
      width:100%;
      height: 21.5rem;
      width: 100%;
    }
    .logo{
      position: absolute;
      top:1rem;
      width:8rem;
      left:-0.65rem;
    }
    .header{
      width:100%;
      position: absolute;
      bottom: 0;
      background:rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      flex-direction: column;
      color:#fff;
      height: 6rem;
      box-sizing: border-box;
      padding-left:1rem;
      .title_box{
        display: flex;
        align-items: flex-end;
        margin-bottom: .4rem;
        .title{
          font-size: 1.8rem;
          padding-right:1rem;
        }
        .time{
          font-size: 1.2rem;
        }
      }
      .address{
        width:100%;
        display: flex;
        padding-right: 1rem;
        box-sizing: border-box;
        span{
          display: block;
          &:first-child{
            width:5.8rem;
          }
          &:last-child{
            width: 0;
            flex: 1;
          }
        }
      }
    }
  }
  dd{
    padding:1rem 1rem 1.5rem;
    box-sizing: border-box;
    .price{
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
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
      margin-bottom: 1.2rem;
      span{
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        height: 2rem;
        border-radius:1rem;
        margin-right:1rem;
        padding:0 1rem;
      }
    }
    .mianji{
      margin-bottom: 2rem;
      color:#666;
      font-size: 1.2rem;
      span{
        &:last-child{
          margin-left:1rem;
        }
      }
    }
    .youshi{
      h6{
        font-size:1.4rem;
        color:#666;
        margin-bottom:1rem;
      }
      .youshi_text{
        background: #F6F5F5;
        font-size: 1.2rem;
        color:#999;
        padding: .4rem 1rem;
        box-sizing: border-box;
        line-height: 2rem;
      }
    }
  }
}
</style>
<style lang="less">

</style>
