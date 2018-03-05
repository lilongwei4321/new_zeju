<template>
  <div class="treasure_wrap">
    <header-text name = "买到宝服务" ></header-text>
    <main class="treasure_main">
      <!-- 订购链接 -->
      <div class="nav_box" v-if="async">
          <nav>
            <router-link 
              :to="loupanUrl(m.cooperate_type_name,m.loupan_id)" 
              class="transverse_center_center" 
              v-for="(m,key) in arr"
              :key="key"
              :style="{'backgroundImage':'url(/static/assets/images/back-a'+((key%3)+1)+'.png)'}"
            >{{m.loupan_name}}</router-link>
          </nav>
          <p class="btn">
            <a href="tel:4006561188,0" class="transverse_center_center" @click.prevent ="zhugeCallPhone">
              <i class="iconfont icon-dianhuaji"></i><span>400-656-1188转0</span>
            </a>
          </p>
      </div>
      <!-- 买到宝介绍  -->
      <div class="text_box" v-else >
        <p>现在您尚未订购买到宝服务。</p>
        <p>择居与众多知名房地产厂商建立深度合作，能够拿到特价特供限量好房，并且有特殊通道优先购买优质房源。</p>
        <p>在择居特卖中，我们将定期限量放出低价好房，欢迎在线订购（需缴纳部分订金）。如订购后因公司原因购房失败，我们将全款退回。</p>
        <p>在品牌馆楼盘中，如果您找到称心好房并发现该楼盘房源难以订购，请在线购买 买到宝 服务，我们将为您提供特殊购买通道。如订购后因公司原因购房失败，我们将全款退回。</p>
        <p class="btn">
          <a href="tel:4006561188,0" class="transverse_center_center" @click.prevent ="zhugeCallPhone">
            <i class="iconfont icon-dianhuaji"></i><span>400-656-1188转0</span>
          </a>
        </p>
      </div>
    </main>
  </div>
</template>
<script>
import api from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
  //引用  公用头部
import headerText from '@/components/base/header/header_text.vue';
export default {
  name: 'Home',
  components: {
    headerText
  },
  data () {
    return {
      async : true,
      arr   : []
    }
  },
  computed: {...mapGetters(['customerId','customerPhone','cityName'])},
  methods :{
    //买到宝列表
    getTreasureData (){
      var id = this.customerId;
      if(id==null){
        this.async = false;
        return false;
      };
      api.getTreasureJson({},id).then((res)=>{
        if(res.status == 200){
          this.arr = res.data;
          if(res.data.length > 0){
            this.async = true;
          } else{
            this.async = false;
          }
        } else if(res.status == 422){
          this.$router.push(`/${this.cityName}/404`);
        }
      })
    },
    loupanUrl (name,id){
      if(name == '品牌'){
        return '/'+this.cityName+'/loupan/brand/brand_detail/'+id;
      } else if(name == '特卖'){
        return '/'+this.cityName+'loupan/sale/'+id+'/sale_detail';
      } else{
        return '/'+this.cityName+'/loupan/loupan_detail/'+id;
      }
    },
    //诸葛
    zhugeBury (){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心'
      }
      zhuge.track(`打开买到宝服务页`,obj);
    },
    zhugeCallPhone (){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心'
      }
      zhuge.track(`点击买到宝服务电话`,obj,() => {
        location.href = 'tel:400-656-1188,0';
      });
    }
  },
  watch :{
    '$route' (to){
      if(to.name == '买到宝服务页'){
        this.zhugeBury();
        this.getTreasureData();
      }
    }
  },
  mounted (){
    this.zhugeBury();
    this.getTreasureData();
  }
}
</script>
<style lang="less" scoped>
.treasure_wrap{
  padding-top:4.4rem;
  .treasure_main{
    padding-top:1.5rem;
    .text_box{
      padding:0 1rem;
      p{
        font-size:1.6rem;
        color:#333;
        padding-bottom:3rem;
      }
    }
    .nav_box{
      padding:0 1rem;
      nav{
        padding-top:1.5rem;
        a{
          display: flex;
          height: 10rem;
          font-size:2rem;
          color:#fff;
          margin-bottom: 1.5rem;
          background-size: 100%;
          background-position: left top;
          border-radius: .4rem;
        }
      }
    }
    .btn{
      a{
        display: flex;
        width: 100%;
        height: 4.4rem;
        background: #f63;
        color:#fff;
        font-size: 1.6rem;
        border-radius: .4rem;
        i{
          margin-right:.6rem;
          font-size:2.2rem;
        }
      }
    }
  }
}
</style>

