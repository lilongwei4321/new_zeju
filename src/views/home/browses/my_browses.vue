<template>
  <div class="wrap browses">
    <div class="main">
      <!-- 楼盘吸顶1 -->
			<header-text name="我的足迹" :headFlag="false"></header-text>
      <div v-if="tuijianArr.length>0">
        <div class="public_detail">
          <!-- <div class="header border transverse_fen_ya">
            <span>2017.10.25</span>
          </div> -->
          <item-list :arr="tuijianArr"></item-list>
        </div>
      </div>
      <no-record v-else :obj="obj" ></no-record>
    </div>
  </div>
</template>
<script>
import api from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import globalFn from '@/assets/javascripts/globalFn';//历史
import headerText  from '@/components/base/header/header_text.vue';//头部吸顶
import itemList    from '@/components/base/items/loupan_list.vue';//楼盘列表
//引用  没有记录时 -- 布局
import noRecord     from '@/components/base/items/noRecord.vue';
export default {
  data (){
    return{
      tuijianArr : [],
      obj        : {
        str : '您暂时没有查看过任何楼盘～',
        async : true
      }
    }
  },
  components:{
    headerText,
    itemList,
    noRecord
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods :{
    //渲染数据
    getBrowsesData (){
      var id = this.customerId;
      var para = {
        'ids' : globalFn.getCookieFn('browse_items','')
      }
      api.getBrowsesJson(para,id).then((res)=>{
        if(res.status == 200){
          this.tuijianArr = res.data;
        } else if(res.status == 422){
          this.$route.push('*');
        }
      })
    },
    //诸葛
    zhugeBury (){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心'
      }
      zhuge.track(`打开我的足迹页`,obj);
    }
  },
  watch :{
    '$route' (to){
      if(to.name == '我的足迹页'){
        this.zhugeBury();
        this.getBrowsesData();
      }
    }
  },
  mounted (){
    this.zhugeBury();
    this.getBrowsesData();
  }
}
</script>
<style lang="less" scoped>
.browses{
  padding-top: 4.4rem;
  background: #F6F5F5;
  .main{
    .public_detail{
      .header{
        span{
          font-size: 1.6rem;
          color: #333;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
