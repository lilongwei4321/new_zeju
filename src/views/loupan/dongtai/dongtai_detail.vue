<template>
  <div class="dynamic_detail_wrap">
    <header-city :name="name" :async = "false" ></header-city>
    <main class="main">
      <dl>
        <dt>
          <img src="/static/assets/images/loupan.jpg" >
          <p class="transverse_center_center">{{ dangtaidetArr.category }}</p>
        </dt>
        <dd>
          <h4 class="text_ove1">{{ dangtaidetArr.title }}</h4>
          <p class="box transverse_mo_center_ya">
            <router-link to="/">
              <span class="back img" :style="backFn(dangtaidetArr.user_portrait)"></span>
              <span>{{ dangtaidetArr.user_name }}</span>
            </router-link>
            <time class="time">{{ dangtaidetArr.created_at}}</time>
          </p>
          <p class="text">{{ dangtaidetArr.content}}</p>
        </dd>
      </dl>
    </main>
    <!-- 引入页脚 -->
    <footer-btns :obj="footerObj" :async="false"></footer-btns>
  </div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用  公用头部
import headerCity from '@/components/base/header/header_text.vue';
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  components: {
    headerCity,
    footerBtns
  },
  computed : {...mapGetters(['customerId','cityName'])},
  data () {
    return {
      msg: '',
      name : '',
      dangtaidetArr : [],
      footerObj : {}
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '楼盘动态详情页'){
        //楼盘动态详情页
        this.getDongtaidetData();
      }
    }
  },
  methods :{
    getDongtaidetData (){
      var id = this.$route.params.id;
      var loupan_id = this.$route.params.loupan_id;
      var para = {customer_id : this.customerId}
      api.getDongtaidetJson(para,id,loupan_id).then((res)=>{
        if(res.status == 200){
          //渲染数据
          this.dangtaidetArr = res.data.dynamic;

          let obj = res.data.loupan;
          //楼盘名称
          this.name = obj.name;
          //footer传参
          this.footerObj = {
            id   : obj.id,
            type :1,
            name : obj.name,//当前页名称
            ext_phone :obj.ext_phone,
            host_phone:obj.host_phone
          }
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }
      })
    },
    backFn (str){
      return str!=undefined && str!='' && str!=null ?`backgroundImage:url(http://imgs.zeju.cn/${str})`:'';
    }
  },
  mounted  () {
    //楼盘动态详情页
    this.getDongtaidetData();
  }
}
</script>
<style lang="less" scoped>
.dynamic_detail_wrap{
  padding:4.4rem 0 4.5rem;
  .main{
    dl{
      dt{
        position: relative;
        img{
          display: block;
          width:100%;
        }
        p{
          position: absolute;
          background: #f63;
          top:1.5rem;
          border-radius: 2.6rem 0 0 2.6rem;
          height: 2.6rem;
          color:#fff;
          font-size:1.4rem;
          padding-left:.2rem;
          width:8.2rem;
          right:0;
        }
      }
      dd{
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        padding:0 1rem;
        h4{
          height: 4.2rem;
          font-size: 1.8rem;
          color: #333;
          line-height: 4.6rem;
        }
        .box{
          margin-bottom:1.4rem;
          height: 1.5rem;
          font-size:1.4rem;
          a{
            display: block;
            display: flex;
            align-items: center;
            margin-right:1rem;
            color:#999;
            .img{
              width:1.6rem;
              height: 1.6rem;
              border-radius: 100%;
              display: block;
              margin-right:.5rem;
            }
          }
          .time{
            flex:1;
            color:#999;
          }
        }
        .text{
          line-height: 2.2rem;
          font-size:1.4rem;
          color:#666;
        }
      }
    }
  }
}
</style>
