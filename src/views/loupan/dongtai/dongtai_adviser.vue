<template>
  <div class="dongtai_adviser">
    <div class="box border" v-for="(m,key) in arr" :key="key">
      <h5>
        <span class="red">「{{m.advisor_name}}」</span>
        <span class="time text_ove1">{{m.dk_at}}陪同客户{{m.customer_name}}完成看房</span>
      </h5>
      <div class="text_ove2" v-if="m.loupans.length > 0">
        择居顾问{{m.advisor_name}}陪同客户{{m.customer_name}}看了
        <span v-for="(k,ind) in m.loupans" :key="ind">
          （{{k.loupan_zone}}）
          <router-link :to="hrefFN(k.list_type,k.loupan_id,key+1)" >{{k.loupan_name}}</router-link>
          <!-- 增加 ， 分割符 -->
          {{m.loupans.length >0  && ind != m.loupans.length-1 ? ',':''}}
        </span>
        {{m.loupans.length}}个楼盘
      </div>
    </div>
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
  computed : {...mapGetters(['cityName'])},
  methods : {
    hrefFN (str,id,num) {
      switch (str) {
        case '品牌':
          return {path:`/${this.cityName}/loupan/brand/brand_detail/${id}`,query:{num}};
        break;
        case '特卖':
          return {path:`/${this.cityName}/loupan/sale/${id}/sale_detail`,query:{num}};
        break;
        default :
          return {path:`/${this.cityName}/loupan/loupan_detail/${id}`,query:{num}};
      }
    }
  }
}
</script>
<style lang="less" scoped>
.dongtai_adviser{
  padding: 0 1rem;
  .box{
    padding: 1.5rem 0 1rem;
    &:last-child:after{
      height: 0;
    }
    h5{
      font-size: 1.6rem;
      width:100%;
      margin-bottom:1rem;
      display: flex;
      height: 2.6rem;
      .red{
        color: #F63;
        display: block;
      }
      .time{
        display: block;
        width:0;
        color: #333;
        flex:1;
      }
    }
    div{
      width:100%;
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #666;
      a{
        color: #71B3FF;
      }
    }
  }
}
</style>
