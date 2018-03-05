<template>
  <div class="sms_wrap">
    <header-text name = "我的消息"  :async="false"></header-text>
    <main class="sms_main">
      <nav class="nav">
        <!-- <span class="transverse_center_center" :class="{'on':btnText=='1'}" @click="clickFn('1')">未读</span> -->
        <!-- <span class="transverse_center_center" :class="{'on':btnText==''}" @click="clickFn('')">全部</span> -->
        <!-- <router-link to="/home/sms/unread" class="" active-class="on" exact></router-link>
        <router-link to="/home/sms/all" class="transverse_center_center" active-class="on" exact></router-link> -->
      </nav>
      <div class="sms_box">
        <ul>
          <li v-for="(m,key) in arr" :key ="key">
            <router-link :to="urlPage(m.loupan_type,m.detail_id)" v-if="m.title !='在线咨询'">
              <dl class="transverse_fen_center">
                <dt class="iconfont icon-weixin" v-if="m.category ==2"></dt>
                <dt class="back" v-else :style="{'backgroundImage':'url(/static/assets/images/loupan.jpg)'}"></dt>
                <dd class="border portrait_center_ya">
                  <h4 class="transverse_fen_center"><span>{{m.title}}</span><time>{{m.created_at}}</time></h4>
                  <p class="text_ove1">{{m.content}}</p>
                </dd>
              </dl>
            </router-link>

            <a :href="m.src" v-else>
              <dl class="transverse_fen_center">
                <dt class="iconfont icon-weixin" v-if="m.category ==2"></dt>
                <dt class="back" v-else :style="{'backgroundImage':'url('+m.url+')'}"></dt>
                <dd class="border portrait_center_ya">
                  <h4 class="transverse_fen_center"><span>{{m.title}}</span><time>{{m.created_at}}</time></h4>
                  <p class="text_ove1">{{m.content}}</p>
                </dd>
              </dl>
            </a>
          </li>
        </ul>
        <!-- 加载更多 -->
        <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
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
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
export default {
  components : {
    headerText,
    loadMore
  },
  computed: {...mapGetters(['customerId','cityName'])},
  data () {
    return {
      arr : [],
      btnText : '1',
      page  : 1 ,
			total_pages : 0
    }
  },
  watch :{
    '$route' (to){
      if(to.name == '我的消息页'){
        this.arr = [];
        //当前页数
        this.total_pages = 0;
        this.page        = 1;
        //获取消息数据
        this.getSmsData(true);
      }
    }
  },
  methods : {
    urlPage (loupan_type,id){
      if(loupan_type == '特卖'){
        return `/${this.cityName}/loupan/sale/`+ id +'/sale_detail';
      } else if(loupan_type == '品牌'){
        return `/${this.cityName}/loupan/brand/brand_detail/`+ id;
      } else{
        return `/${this.cityName}/loupan/loupan_detail/`+ id;
      }
    },
    //获取消息数据
    getSmsData(async){
      var id = this.customerId;
      var para = {
        'status' : '',
        'page'   : this.page,
        'page_limit' : 7
      }
      api.getSmsJson(para,id).then((res)=>{
        if(res.status == 200){
          this.arr = this.arr.concat(res.data.informations);
          //诸葛埋点
          this.zhugeBury(async);
          //当前页数
          this.total_pages = res.data.page_info.total_pages;
          this.page        = res.data.page_info.current_page+1;
          //可以再次请求
          this.$refs.loadMore.requestFn();
        }
      })
    },
    //诸葛埋点
    zhugeBury (async){ 
      let name = async ? '打开' : '翻看',
          obj  = {
          '当前页面' : '我的消息页',
          '所属模块' : '个人中心'
          }   
          if(!async){
            obj['翻看页数'] = this.page -1;
          };
          zhuge.track(`${name}我的消息页`,obj);
    },
    //加载更多 显示隐藏
    moreFn () {
      this.getSmsData(false);
    }
  },
  mounted (){
    //获取消息数据
    this.getSmsData(true);
  }
}
</script>
<style lang="less" scoped >
.sms_wrap{
  padding-top:4.4rem;
  .sms_main{
    .nav{
      display: flex;
      box-sizing: border-box;
      box-shadow: 0 1px 1px 2px #eee;
      span{
        height: 4rem;
        width: 0;
        flex:1;
        font-size:1.4rem;
        color: #909090;
        border-bottom: 2px solid transparent;
        &.on{
          color:#f63;
          border-color:#f63;
        }
      }
    }
    .sms_box{
      ul{
        padding:0 1rem;
        li{
          height: 8rem;
          a{
            display: block;
            height: 100%;
            dl{
              height: 100%;
              dt{
                width: 5.4rem;
                height: 5.4rem;
                margin-right: 1rem;
                font-size:5.4rem;
                color:#FF9977;
                border-radius: 100%;
              }
              dd{
                width: 0;
                flex:1;
                height: 100%;
                h4{
                  padding-bottom: 1.2rem;
                  span{
                    font-size: 1.6rem;
                    color:#333;
                  }
                  time{
                    font-size: 1.2rem;
                    color:#999;
                  }
                }
                p{
                  font-size: 1.4rem;
                  color:#666;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>