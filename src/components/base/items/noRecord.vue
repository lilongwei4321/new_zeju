<template>
  <div>
    <section class="box404">
      <div class="portrait_center_ya box_img" :class="{'box_img1':!obj.async}">
        <span v-if="!obj.async"></span>
        <img src="/static/assets/images/img404.png">
        <div class="text transverse_center_center" :class="{'text_back':!obj.async}">{{obj.str}}</div>
      </div>
      <router-link :to="`/${cityName}/loupan/list/index`" class="itme_list transverse_center_center" v-if="obj.async">楼盘列表</router-link>
    </section>
    <!-- <section class="main">
      <h4>推荐楼盘</h4>
      <div class="box">
        <ul>
          <li>
            <item-list></item-list>
          </li>
        </ul>
      </div>
    </section> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
// 时间 方法
// import GetDate from '@/assets/javascripts/date.js';
//引用  楼盘渲染 -- 布局
import itemList from '@/components/base/items/item_list.vue';
export default {
  props : {
    obj : {
      type : Object ,
      default : function(){
        return {str :'换个搜索条件试试吧～',async:false}
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
  components: {
    itemList
  },
  data () {
    return {
     
    }
  },
  methods : {
   
  }
}
</script>
<style lang="less" scoped>
.box404{
  padding:0 1rem 1.5rem;
  background:#fff;
  .box_img{
    height: 20.5rem;
    align-items: center;
    justify-content: space-around;
    img{
      display: block;
      width:10rem;
    }
    .text{
      height: 3.6rem;
      border-radius: .2rem;
      font-size: 1.4rem;
      color: #999999;
    }
    .text_back{
      background: #F8F8F8;
    }
  }
  .box_img1{
    justify-content: space-between;
  }
  .itme_list{
    background: #FF6633;
    border-radius: .2rem;
    height: 3.6rem;
    font-size:1.4rem;
    color:#fff;
  }
}
.main{
  background: #f6f5f5;
  &>h4{
    font-size: 2rem;
    color: #333333;
    height: 3.8rem;
    padding:1rem 1rem 0;
  }
  &>.box{
    padding:.8rem 1rem 0;
  }
}
</style>
