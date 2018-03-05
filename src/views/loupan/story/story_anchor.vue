<template>
  <div class="story_list">
    <router-link :to="{path:`/${cityName}/loupan/story_detail/${m.id}`,query:{num:key+1}}"  v-for="(m,key) in arr" :key="key" class="border">
      <dl class="tuwen">  
        <dt class="back" :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.img_url})`}" v-if="m.img_url!=''"></dt>
        <dt class="back" :style="{'backgroundImage':`url(/static/assets/images/empty.jpg)`}" v-else></dt>
        <dd class="portrait_fen">
          <p class="text_ove2" v-html="m.contents"></p>
          <time>{{m.story_at}}</time>
        </dd>
      </dl>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'story_anchor',
  computed : {...mapGetters(['cityName'])},
  props : {
    arr : {
      type : Array,
      default :function () {
				return []
			}
    }
  }
}
</script>
<style lang="less" scoped>
.story_list{
  a{
    display: block;
    &:after{
      transform:translate(0%,0) scale(.94,1);
    }
    &:last-child:after{
      height: 0;
    }
  }
  dl{
    height: 11.5rem;
    dt{
      width:11.2rem;
      height: 8.4rem;
      background-position: center top;
    }
    dd{
      flex:1;
      padding-left:1rem;
      height: 8.4rem;
      a{
        flex:1;
        width:100%;
        height: 100%;
      }
      p{
        line-height:2.1rem;
        font-size:1.4rem;
        color:#333;
        -webkit-line-clamp: 3;
      }
      time{
        color:#999;
        font-size:1.2rem;
      }
    }
  }
}
</style>
