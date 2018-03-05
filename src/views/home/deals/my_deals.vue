<template>
  <div class="wrap my_deals">
    <div class="main">
      <!-- 楼盘吸顶1 -->
			<header-text name="我的成交" :headFlag="false"></header-text>
      <div v-if="detailArr.length>0">
        <div class="public_detail" v-for="k in detailArr" :key="k.id">
          <div class="header border transverse_fen_ya">
            <strong class="title">{{k.loupan_name}}</strong>
            <span class="red">{{k.step_status}}</span>
          </div>
          <deal-part :dealPart="k"></deal-part>
        </div>
      </div>
      <no-record v-else :obj="obj"></no-record>
    </div>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import headerText from '@/components/base/header/header_text.vue';//楼栋信息
import dealPart   from '@/views/home/deals/deal_part.vue';//成交组件
//引用  没有记录时 -- 布局
import noRecord    from '@/components/base/items/noRecord.vue';
export default {
  data (){
    return {
      detailArr : [{}],
      loadAsync: false,
      obj : {
        str : '您暂时没有成交过任何楼盘～',async : true
      },
    }
  },
  components:{
    headerText,
    dealPart,
    noRecord
  },
  computed: {...mapGetters(['customerId','customerPhone'])},
  methods :{
    //加载更多 显示隐藏
    moreFn () {
      this.getdealData();
    },
    //请求成交数据
    getdealData (){
      var id = this.customerId;
      var para = {};
      api.gerdealJson(para,id).then((res)=>{
        if(res.status == 200){
          this.detailArr = res.data;
        }
      })
    },
    //诸葛
    zhugeBury (){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心'
      }
      zhuge.track(`打开我的成交页`,obj);
    }
  },
  watch :{
    '$route' (to){
      if(to.name == '我的成交页'){
        this.zhugeBury();
        this.getdealData();
      }
    }
  },
  mounted (){
    this.zhugeBury();
    this.getdealData();
  }
}
</script>
<style lang="less" scoped>
  .my_deals{
    background: #F6F5F5;
    .main{
      padding-top: 4.4rem;
      .public_detail{
        .header{
          .title{
            font-size: 1.6rem;
            color: #333;
          }
          .red{
            font-size: 1.4rem;
            color: #F63;
          }
        }
      }
    }
  }
</style>
