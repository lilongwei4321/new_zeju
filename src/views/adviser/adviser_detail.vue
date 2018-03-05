<template>
  <div class="adviser_wrap">
    <header-city name="我的顾问" v-show="isFlag"></header-city>
    <main class="adviser_main">
      <section class="box resume">
        <dl>
          <dt>
            <img :src="`http://imgs.zeju.cn/${obj.detail_img_url}`" alt="暂无顾问头像" v-if="obj.detail_img_url!=undefined">
            <img src="" alt="暂无顾问头像" v-else>
            <div class="header transverse_fen_center_ya">
              <a href="javascript:;" onclick="window.history.back(-1)" class="iconfont icon-jiantou4 return" ></a>
              <router-link  :to="customerId !=''?`/${cityName}/home/index`:`/${cityName}/login`" class="iconfont icon-ren user" ></router-link>
            </div>
          </dt>
          <dd>
            <div class="big_box">
              <div class="title_box">
                <h4>{{obj.name}}</h4> 
                <!-- 星状态 -->
                <guwen-level :levelObj= "{level:obj.star_level,num:5}"></guwen-level>
              </div>
              <p class="ft">从业{{obj.year}}年 | 服务{{obj.recent_appoint_count}}人</p>
              <div class="person">
                <p class="ft"><label>家乡：</label><span>{{obj.hometown}}</span></p>
                <p class="ft"><label>年龄：</label><span>{{obj.advisor_age}}岁</span></p>
              </div>
              <div class="liyou">
                <span :class="`text_back${key+1}`" v-for="(m,key) in obj.labels" :key="key">{{m}}</span>
              </div>
            </div>
          </dd>
          <dd class="jilu" v-SrcollsShow="xifuFn">
            <div>
              <p>{{obj.deal_count}}</p>
              <p>历史成交</p>
            </div>
            <div>
              <p>{{obj.recent_appoint_count}}</p>
              <p>最近带看</p>
            </div>
            <div>
              <p>{{obj.service_customer_count}}</p>
              <p>服务客户</p>
            </div>
          </dd>
        </dl>
      </section>
      <!-- 买房人评价 -->
      <div class="mt" v-if="evalObj.length>=1">
        <div class="header border transverse_fen_ya">
					<span class="title">买房人评价</span>
          <router-link :to="`/${cityName}/advisor/advisor_detail/${obj.id}/evaluate_list`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
        <adviser-evaluate :arr = "evalObj"></adviser-evaluate>
      </div>
      <!-- 择居故事 -->
      <div class="mt" v-if="storyObj.length >=1">
        <div class="header border transverse_fen_ya">
					<span class="title">择居故事</span>
          <router-link :to="`/${cityName}/loupan/story/${obj.id}/advisor`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
        <zeju-story :arr="storyObj"></zeju-story>
      </div>
      <!-- 服务动态 -->
      <div class="mt bottom">
        <div class="header border transverse_fen_ya">
					<span class="title">服务动态</span>
          <router-link :to="`/${cityName}/advisor/advisor_detail/${obj.id}/service_dynamics`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
        <dongtai-adviser :arr="dongObj"></dongtai-adviser>
      </div>
      <!-- 联系TA -->
      <div class="lianxi border1">
        <a href="javascripts:;" @click.prevent="phoneFn(obj)" class="transverse_center_center">联系TA</a>
      </div>
    </main>
  </div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
import globalFn from '@/assets/javascripts/globalFn';
//引用  公用头部
import headerCity      from '@/components/base/header/header_text.vue';
import adviserEvaluate from '@/views/adviser/evaluate/adviser_evaluate.vue';//买房人评价
import zejuStory       from '@/views/loupan/story/story_anchor.vue';//择居故事
import dongtaiAdviser  from '@/views/loupan/dongtai/dongtai_adviser.vue';//服务动态
import guwenLevel      from '@/components/page/level/level.vue';//评星
export default {
  name: 'Home',
  components: {
    headerCity,
    adviserEvaluate,//买房人评价
    zejuStory,//择居故事
    dongtaiAdviser,//服务动态
    guwenLevel 
  },
  data () {
    return {
      isFlag : false ,
      obj : {} ,
      evalObj : [],//评价
      dongObj : [],//动态
      storyObj: []//故事
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '顾问详情页'){
        //获取顾问详情信息
        this.getAdviserDetail();
      }
    }
  },
  computed : {...mapGetters(['customerId','cityName'])},
  methods :{
    //获取顾问详情信息
    getAdviserDetail () {
      var id  = this.$route.params.id;
      api.getAdviserDetail({},id).then((res) =>{
        if(res.status == 200){
          //获取顾问数据
          this.obj      = res.data.advisor;
          //评价
          this.evalObj  = res.data.appointment_eval;
          //动态
          this.dongObj  = res.data.appointments;
          //故事数据
          this.getStoryList(this.obj.id);
          //诸葛埋点
          this.zhuGeBury(this.obj);
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //故事数据
    getStoryList (id) {
      let obj ={
        action_name : 'advisor',
        page : 1,
        page_limit :2,
        id   
      }
      api.getStoryList(obj).then((res) =>{
        if(res.status == 200){
          this.storyObj = res.data.stories;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //头部显示隐藏
    xifuFn (async){
      this.isFlag  = async;
    },
    //诸葛埋点
    zhuGeBury (obj) {
      zhuge.track('打开顾问详情页', {
        '当前页面' : '顾问详情页',
        '所属模块' : '顾问',
        '来源链接位置' : this.$route.query.num,
        '顾问ID'   : obj.id,
        '顾问姓名' : obj.name
      });
    },
    //拨打电话
    phoneFn (obj) {
      let zjfrom = obj.ext_phone!=0?globalFn.getZjfrom('zjfrom'):'';
      zhuge.track('点击400', {
        '当前页面' : '顾问详情页',
        '所属模块' : '顾问',
        '顾问姓名' : obj.name,
        '分机号类型' : '顾问400'
      },() =>{
        window.location.href =`tel:${obj.host_phone},${obj.ext_phone}${zjfrom}`;
      });
    }
  },
  mounted () {
    //获取顾问详情信息
    this.getAdviserDetail();
  }
}
</script>
<style lang="less" scoped>
.adviser_wrap{
  background: #F6F5F5;
  padding-bottom: 5.5rem;
  .adviser_main{
    &>.box{
      margin-bottom:1rem;
    }
    .resume{
      dl{
        background: #FFF;
        padding-bottom: 1.5rem;
        dt{
          position: relative;
          img{
            display: block;
            width: 100%;
            min-height: 10rem;
            background:rgba(0,0,0,0.2);
            line-height: 10rem;
            text-align: center;
          }
          .header{
            position: absolute;
            top:0;
            left: 0;
            height: 4.4rem;
            width: 100%;
            padding: 0 1rem;
            a{
              width: 2.8rem;
              height: 2.8rem;
              display: flex;
              color: #FFF;
              background: rgba(0, 0, 0, .5);
              border-radius: 50%;
              justify-content: center;
              align-items: center;
            }
          }
        }
        dd{
          padding: 1rem 1rem;
          .big_box{
            &>div{
              margin-bottom: .5rem;
            }
            .title_box{
              display: flex;
              height: 3rem;
              align-items: center;
              h4{
                font-size: 2.4rem;
                color: #333;
                padding-right: 1rem;
              }
            }
            .person{
              display: flex;
              p{
                flex: 1;
              } 
            }
            .ft{
              font-size: 1.4rem;
              color: #666;
              height: 2rem;
              line-height: 2rem;
              margin-bottom: .5rem;
            }
            .liyou{
              display: flex;
              align-content: center;
              padding-top: .5rem;
              span{
                height: 1.6rem;
                margin-right: .5rem;
                padding: .3rem .5rem;
                display: flex;
                align-items: center;
                border-radius: 1rem;
                font-size: 1rem;
              }
            }
          }
        }
        .jilu{
          display: flex;
          height: 9rem;
          background: #F6F5F5;
          align-items: center;
          margin: 0 1rem;
          padding: 0;
          div{
            flex: 1;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            align-items: center;
            p{
              &:first-child{
                font-size: 2.4rem;
                color: #666;
                height: 3rem;
              }
              &:last-child{
                font-size: 1.2rem;
                color: #999;
              }
            }
          }
        }
      }
    }
    .mt{
      margin-top: 1rem;
      background: #FFF;
      .header{
        height: 4.5rem;
        align-items: center;
        padding: 0 1rem;
        width: 100%;
        box-sizing: border-box;
        span,a{
          display: block;
        }
        .title{
          font-size: 1.8rem;
          color: #333;
        }
      }
    }
    .lianxi{
      height: 4.5rem;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      a{
        color: #FFF;
        font-size: 1.6rem;
        height: 100%;
        background: #F63;
      }
    }
  }
}
</style>
