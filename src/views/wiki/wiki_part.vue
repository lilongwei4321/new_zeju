<template>
  <div class="kiwi_part">
    <ul>
      <li class="border text_ove1" v-for="(k,ind) in arr" :key="ind">
        <router-link :to="{path:`/${cityName}/wiki/wiki_detail/${k.wiki_id}`,query:{num:ind+1}}">{{ k.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  props : {
    arr : {
      type : Array,
      default : function(){
        return []
      }
    }
  },
  computed: {...mapGetters(['cityName'])},
}
</script>
<style lang="less" scoped>
.kiwi_part{
  padding: 0 1rem;
  ul{
    li{
      font-size: 1.6rem;
      line-height: 4.5rem;
      &:last-child:after{
        height: 0;
      }
      a{
        color: #333;
      }
    }
  }
}
</style>
