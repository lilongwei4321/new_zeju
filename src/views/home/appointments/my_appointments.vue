<template>
  <div class="wrap appointments">
    <div class="main">
      <!-- 楼盘吸顶1 -->
			<header-text name="看房记录" :headFlag="false"></header-text>
      <div v-if="daikanArr.length>0" v-show="isDataFlag">
        <div class="public_detail" v-for="(k,ind) in daikanArr" :key="ind">
          <div class="header border transverse_fen_ya">
            <strong class="title">{{ k.appoint_at }} 看房记录</strong>
            <!-- <span class="red">未评价</span> -->
          </div>
          <item-list :arr="k.appoint_items"></item-list>
          <div class="border1 fenge"></div>
        </div>
        <div class="pingjia" v-show="!pingjiaFlag">
          <router-link :to="goPingjia()" class="transverse_center_center">去评价</router-link>
        </div>
        <div class="pingjia_show" v-show="pingjiaFlag">
          <p class="border1">
            <label>您的评价：</label>
            <xing-ji :levelObj="xingjiObj"></xing-ji>
          </p>
          <div class="dec">{{dec}}</div>
        </div>
      </div>
      <no-record v-else :obj="obj"></no-record>
    </div>
  </div>
</template>
<script>
import api from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import headerText  from '@/components/base/header/header_text.vue';//头部吸顶
import itemList    from '@/components/base/items/loupan_list.vue';//楼盘列表
//引用  没有记录时 -- 布局
import noRecord    from '@/components/base/items/noRecord.vue';
import xingJi      from '@/components/page/level/level.vue';
export default {
  data(){
    return {
      dec : '',
      pingjiaFlag : false,
      daikanArr : [],
      xingjiObj : {},
      obj    : {
        str : '您暂时没有带看过任何楼盘～',
        async : true
      },
      appointment_id : '',
      isDataFlag : false
    }
  },
  components:{
    headerText,
    itemList,
    noRecord,
    xingJi
  },
  computed: {...mapGetters(['customerId','customerPhone','cityName'])},
  watch :{
    '$route' (to){
      if(to.name == '我的带看页'){
        //调用诸葛
        this.zhugeBury();
        this.getAppointData();
      }
    }
  },
  methods :{
    goPingjia (){
      return '/home/appointments_evaluate/'+this.appointment_id;
    },
    //请求看房记录数据
    getAppointData (){
      var id = this.customerId;
      api.getAppointJson({},id).then((res)=>{
        if(res.status == 200){
          let dataObj = res.data;
          this.daikanArr = dataObj.appointments;//数据渲染

          if(this.daikanArr.length > 0){
            this.isDataFlag = true;
          } else{
            return false;
          }
          this.xingjiObj = {
            level:dataObj.eval_content.score/2
          };
          this.dec = dataObj.eval_content.eval;
          this.appointment_id = dataObj.eval_content.appointment_id;
          this.pingjiaFlag = dataObj.eval_content.eval_status;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //诸葛
    zhugeBury (){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心',
      }
      zhuge.track(`打开看房记录`,obj);
    }
  },
  mounted () {
    //调用诸葛
    this.zhugeBury();
    this.getAppointData();
  }
}
</script>
<style lang="less" scoped>
.appointments{
  padding-top: 4.4rem;
  background: #F6F5F5;
  .public_detail{
    // padding-bottom: 1.5rem;
    .header{
      .title{
        font-size: 1.6rem;
        color: #333;
      }
      .red{
        font-size: 1.4rem;
        color: #F63;
      }
      .hui{
        font-size: 1.4rem;
        color: #999;
      }
    }
    .fenge{
      margin: 0 1rem;
    }
  }
  .pingjia{
    margin: 1.5rem 1rem;
    border-radius: 2px;
    a{
      height: 3.6rem;
      color: #FFF;
      font-size: 1.4rem;
      background: #F63;
    }
  }
  .pingjia_show{
    padding: 0 1rem 1rem;
    background: #FFF;
    p{
      height: 4rem;
      display: flex;
      align-items: center;
      label{
        font-size: 1.6rem;
        color: #333;
      }
      .iconfont{
        color: #FFBB2A;
        padding-right: .8rem;
      }
    }
    .dec{
      font-size: 1.4rem;
      color: #666;
      background: #F6F5F5;
      padding: 1rem;
      line-height: 2.1rem;
    }
  }
}
</style>
