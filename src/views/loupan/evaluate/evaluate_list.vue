<template>
  <div class="pingce_main">
    <router-link 
      :to="{path:`/${cityName}/loupan/evaluate/evaluate_detail/${n.id}`,query:{num:ind+1}}" 
      v-for="(n,ind) in arr" 
      :key="ind" 
      class="border">
      <dl class="tuwen" >
        <dt 
          :style="{'backgroundImage':`url(http://imgs.zeju.cn/${n.img_url})`}" 
          class="back block">
          <h4 class="transverse_center_center">{{ n.loupan_name }}</h4>
        </dt>
        <dd class="portrait_fen">
          <h6 class="text_ove1">{{ n.title }}</h6>
          <p class="text_ove2">{{ n.lead }}</p>
        </dd>
      </dl>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'story_anchor',
  props : {
		arr : {
			type : Array,
      default :function () {
				return []
			}
		}
  },
  computed : {...mapGetters(['cityName'])}
}
</script>
<style lang="less" scoped>
//楼盘评测
.pingce_main{
  padding:0 1rem;
  box-sizing: border-box;
  a{
    display: block;
    &:after{
      transform:translate(0%,0) scale(.94,1);
    }
    &:last-child:after{
      height: 0;
    }
    dl{
      padding:1.5rem 0;
      height: 11.2rem;
      box-sizing:border-box;
      dt{
        width:11.2rem;
        height: 8.4rem;
        position: relative;
        h4{
          height: 2rem;
          position: absolute;
          bottom:0;
          background: rgba(0,0,0,0.5);
          font-size:1.2rem;
          color:#fff;
        }
      }
      dd{
        width:0;
        flex:1;
        padding-left:1rem;
        height: 100%;
        h6{
          font-size: 1.6rem;
          color:#333;
          line-height:2rem;
        }
        p{
          color:#666;
          font-size:1.4rem;
          -webkit-line-clamp: 3;
          line-height:2rem;
        }
      }
    }
  }
}
</style>
