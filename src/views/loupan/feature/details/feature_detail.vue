<template>
  <div class="feature_wrap">
    <header-text name = "特色频道" :headFlag ="true" :async="false"></header-text>
    <main class="feature_main">
      <section>
        <dl>
          <dt><img :src="`http://imgs.zeju.cn/${obj.img_url}`"></dt>
          <dd class="portrait_center_ya border">
            <h4>{{obj.title}}</h4>
            <p>{{obj.lead}}</p>
          </dd>
        </dl>
      </section>
      <section class="main_text">
        <div class="houtai" v-html="obj.content"></div>
      </section>
    </main>
    <!-- 引入footer -->
    <footer-btns :obj="footerObj" :async="false"></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//引用头部
import headerText from '@/components/base/header/header_text.vue';
//引用楼盘
import itemList from '@/components/base/items/item_list_one.vue';
//引用  公用页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  name: 'list',
  components : {
    headerText,
    footerBtns,
    itemList
  },
  computed : {...mapGetters(['customerId','cityName'])},
  data () {
    return {
      obj : {},
      shoucangFlag : true,
      footerObj : {}
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '特色频道详情页'){
        //特色频道详情
        this.gitTeseChannelDetail();
      }
    }
  },
  methods : {
    //特色频道详情
    gitTeseChannelDetail () {
      api.gitTeseChannelDetail({},this.$route.params.id).then((res) =>{
        if(res.status==200){
          this.obj = res.data;
          //footer传参
          this.footerObj = {
            id: this.obj.id,
            ext_phone:this.obj.ext_phone,
            host_phone:this.obj.host_phone,
            name : this.obj.name,
            type :1
          }
          //诸葛埋点
          this.zhugeBury();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //诸葛埋点
    zhugeBury () {
      zhuge.track('打开特色频道详情页', {
        '当前页面' : '特色频道详情页',
        '所属模块' : '特色频道',
        '点击位置' : this.$route.query.num,
        '频道ID'   : this.obj.id,
        '频道名称' : this.obj.title
      });
    }
  },
  mounted () {
    //特色频道详情
    this.gitTeseChannelDetail();
  }
}
</script>
<style lang="less" scoped>
.feature_wrap{
  padding:4.4rem 0 5rem;
  .feature_main{
    &>section{
      &:first-child{
        dl{
          dt{
            img{
              display: block;
              width: 100%;
            }
          }
          dd{
            padding:1.5rem 0;
            margin: 0 1rem;
            color:#333;
            h4{
              font-size:1.8rem;
              padding-bottom:1rem;
            }
            p{
              font-size:1.6rem;
            }
          }
        }
      }
    }
  }
  .main_text{
    padding:0 1rem;
  }
}
</style>
<style lang="less">
.feature_wrap{
  .main_text{
    .houtai{
      padding-top:1rem;
      p{
        font-size:1.4rem;
        color:#333;
      }
      img{
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
