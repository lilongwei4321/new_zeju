<template>
  <div class="dianping">
    <section class="describe">
      <div class="lef portrait_fen">
        <p>{{obj.average_score}}</p>
        <p>综合点评</p>
        <p></p>
        <!-- 高于78%同类新盘 -->
      </div>
      <div class="rig portrait_fen">
        <div class="list">
          <span>周边配套：</span>
          <!-- 星状态 -->
          <level-box :levelObj= "{level:obj.mating_score/2}" class="xing"></level-box>
        </div>
        <div class="list">
          <span>交通便利：</span>
          <!-- 星状态 -->
          <level-box :levelObj= "{level:obj.traffic_score/2}" class="xing"></level-box>
        </div>
        <div class="list">
          <span>绿化环境：</span>
          <!-- 星状态 -->
          <level-box :levelObj= "{level:obj.living_condition_score/2}" class="xing"></level-box>
        </div>
      </div>
    </section>
    <section class="main_box">
      <div class="box border1" v-for="(m,ind) in arr" :key="ind">
        <dl>
          <dt :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.customer_head_img_url})`}" class="back" v-if="m.customer_head_img_url!=''">
          </dt>
          <dt :style="{'backgroundImage':`url(/static/assets/images/zhanweitu.png)`}" class="back" v-else>
          </dt>
          <dd class="portrait_fen">
            <p class="title transverse_fen_center">
              <b>{{m.customer_name}}</b>
              <time>{{m.create_at}}</time>
            </p>
            <!-- 星状态 -->
            <level-box :levelObj= "{level:m.score/2}" class="xing"></level-box>
          </dd>
        </dl>
        <p class="text">{{m.remark}}</p>
      </div>
    </section>
  </div>
</template>
<script>
//评星
import levelBox  from '@/components/page/level/level.vue';
export default {
  props : {
    obj : {
      type : Object,
      default:function(){return {}}
    },
    arr : {
      type : Array,
      default:function(){return []}
    }
  },
  components: {
    levelBox
  }
}
</script>
<style lang="less" scoped>
.dianping{
  padding: 0 1rem;
  .describe{
    display: flex;
    padding:1.5rem 0;
    box-sizing: border-box;
    justify-content: space-around;
    .lef{
      width: 10rem;
      text-align: center;
      height: 8rem;
      p{
        &:first-child{
          font-size: 3.6rem;
          color: #FFBB2A;
        }
        &:nth-child(2){
          font-size: 1.4rem;
          color: #333;
        }
        &:last-child{
          font-size: 1.2rem;
          color: #999;
        }
      }
    }
    .rig{
      height: 8rem;
      .list{
        display: flex;
        span{
          font-size: 1.4rem;
          color: #333;
        }
      }
    }
  }
  .main_box{
    .box{
      padding-top:1.5rem;
      dl{
        display: flex;
        width:100%;
        dt{
          height: 4.4rem;
          width:4.4rem;
          border-radius: 100%;
        }
        dd{
          width:0;
          flex:1;
          height: 4.4rem;
          padding-left:1rem;
          .title{
            b{
              font-size:1.4rem;
              color:#333;
            }
            time{
              font-size:1.2rem;
              color:#999;
            }
          }
        }
      }
      .text{
        color: #333;
        font-size: 1.4rem;
        padding:1.5rem 0;
      }
    }
  }
}
</style>
