<template>
  <div class="adviser_evaluate">
    <dl class="describe border1" v-for="(m,key) in arr" :key="key">
      <dt class="transverse_fen">
        <div>
          <img :src="`http://imgs.zeju.cn/${m.customer_head_img_url}`" v-if="m.customer_head_img_url != null">
          <img src="/static/assets/images/zhanweitu.png" v-else>
          <div class="pingjia">
            <p class="name">{{m.customer_phone}}</p>
            <level-box  class="star" :levelObj = "{level:m.score/2}"></level-box>
          </div>
        </div>
        <p class="right">{{m.appointment_at}}看房</p>
      </dt>
      <dd class="dec">{{m.eval}}</dd>
    </dl>
  </div>
</template>
<script>
import levelBox from '@/components/page/level/level.vue';
export default {
  props : {
    arr : {
      type :Array ,
      default :function(){
        return []
      }
    }
  },
  components : {
    levelBox
  }
}
</script>
<style lang="less" scoped>
.adviser_evaluate{
  padding: 0 1.5rem;
  .describe{
    padding: 1rem 0;
    &:first-child:before{
      height: 0;
    }
    dt{
      padding: 0 0 .5rem;
      div{
        display: flex;
        img{
          width: 4.4rem;
          height: 4.4rem;
          border-radius: 50%;
          display: inline-block;
        }
        .pingjia{
          padding: 0 0 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name{
            font-size: 1.4rem;
            color: #333;
          }
          .star>i{
            color: #FFBB2A;
          }
        }
      }
      .right{
        font-size: 1.2rem;
        color: #999;
        display: inline-block;
      }
    }
    .dec{
      color: #333;
      font-size: 1.4rem;
    }
  }
}

</style>
