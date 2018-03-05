<template>
  <div class="guwen_main">
    <router-link :to="{path:`/${cityName}/advisor/advisor_detail/${m.id}`,query:{num:key+1}}" v-for="(m,key) in arr" :key="key" class="border">
      <dl class="guwen_list transverse_fen_ya">
        <!-- 如果顾问有头像 -->
        <dt class="back" :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.portrait})`}" v-if="m.portrait!=null">
        </dt>
        <!-- 没有使用默认-->
        <dt class="back" :style="{'backgroundImage':`url(/static/assets/images/empty.jpg)`}" v-else></dt>
        <dd>
          <div class="title_box">
            <h4>{{m.name}}</h4>
            <!-- 星状态 -->
            <guwen-level :levelObj= "{level:m.star_level,num:5}"></guwen-level>
          </div>
          <div class="zili transverse_fen_center">
            <p>从业{{m.year}}年 | 最近带看{{m.recent_appoint_count}}次</p>
          </div>
          <div class="liyou">
            <span :class="'text_back'+(ind+1)" v-for="(item,ind) in m.lable" :key="ind">{{item}}</span>
          </div>
          <div class="tel_box">
            <a href="javascript:;"  @click.prevent="phoneHref(m)">联系TA</a>
          </div>
        </dd>
      </dl>
    </router-link>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
import zhuGe from '@/assets/javascripts/zhuGe';
import guwenLevel from '@/components/page/level/level.vue';//评星
export default {
  name: 'Home',
  props : {
    arr : {
      type : Array,
      default :function () {
        return []
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
  components : {
    guwenLevel
  },
  methods : {
    phoneHref (m) {
      let zjfrom = m.ext_phone!=0?globalFn.getZjfrom():'';
      zhuge.track(`点击400`,{
        '当前页面' : this.$route.name,
        '所属模块' : zhuGe.theModular(this.$route.nam),
        '顾问ID'   : m.id,
        '顾问姓名' : m.name,
        '拨打分机号' : m.ext_phone,
        '分机号类型' : '顾问400'
      },() => {
        window.location.href = `tel:${m.host_phone},${m.ext_phone}${zjfrom}`
      });
    }
  }
}
</script>
<style lang="less" scoped>
.guwen_main{
  &>a{
    display: block;
    width: 100%;
    padding:1.5rem 1.5rem 1.5rem 1rem;
    &:last-child:after{
      height:0;
    }
    &:after{
      transform:translate(0%,0) scale(.94,1);
    }
  }
  .guwen_list{
    dt{
      width:11.8rem;
      height:13.6rem;
      background-position: center top;
    }
    dd{
      width:0;
      flex:1;
      height:13.6rem;
      padding-left:1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title_box{
        display: flex;
        align-items: center;
        h4{
          font-size: 1.6rem;
          color: #333;
        }
        p{
          display: flex;
          padding-left:1rem;
          align-items: center;
          i{
            font-size:1.4rem;
            color:#FFBB2A;
            padding:0 0.16rem;
            display: block;
          }
        }
      }
      .zili{
        p{
          font-size: 1.4rem;
          color: #666;
        }
        a{
          display: block;
          font-size:2.8rem;
          color:#f63;
          // position: relative;
          // z-index:100;
        }
      }
      .liyou{
        display: flex;
        span{
          height:2rem;
          margin-right:.5rem;
          padding:0 .5rem;
          display: flex;
          align-items: center;
          border-radius: 1rem;
          font-size:1rem;
        }
      }
      .tel_box{
        a{
          display: block;
          width: 10rem;
          background: #f63;
          color:#fff;
          font-size:1.2rem;
          height: 2.6rem;
          text-align: center;
          line-height: 2.6rem;
          border-radius: .3rem;
        }
      }
    }
  }
}
</style>
