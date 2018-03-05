<template>
  <div class="wrap">
    <header-city name = "选择城市"></header-city>
    <section class="from">
      <div class="current_city">当前城市</div>
      <div class="city">
        <!-- 当前城市 -->
        <ul>
          <li @click="cityText(currentCity.abbr)">{{currentCity.name}}</li>
        </ul>
      </div>
      <div class="current_city" >热门城市</div>
      <div class="city">
        <ul>
          <li v-for="itme in hotCity" :key="itme.id" @click="cityText(itme.abbr,itme.name)">{{ itme.name }}</li>
        </ul>
      </div>
      <!-- 普通城市渲染 -->
      <div class="city" v-for="(m,ind) in moreCity" :key="ind" ref="cityBox">
        <div class="current_city" :id="ind" >{{ m.name }}</div>
        <ul>
          <li v-for="(n,key) in m.cities" :key="key" @click="cityText(n.abbr,n.name)" v-if="cityId(n.id)">{{ n.name }}</li>
          <li v-else >
            <a :href="`http://m2.zeju.com/${n.abbr}`">{{n.name}}</a>
          </li>
        </ul>
      </div>
    </section>
    <!-- 右侧 城市字母缩写btn -->
    <div class="fixedRight">
      <ul>
        <li v-for="(m,ind) in moreCity" :key="ind" :class="{'on':ind==zimuNum}" @click="cityZimu(m.name,ind)" >{{m.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import api  from '@/api/api';
import {mapGetters, mapActions} from 'vuex';
  //引用  公用头部
import headerCity from '@/components/base/header/header_text.vue';
export default {
  data () {
    return {
      hotCity : [],
      moreCity : [],
      zimuNum : '',
      currentCity : {}
    }
  },
  components : {
    headerCity
  },
  computed : {...mapGetters(['cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '选择城市页'){
        this.init();
      }
    }
  },
  methods : {
    init () {
      //获取城市数据
      this.getCity();
      //获取城市名称
      this.gitCityName();
      //诸葛埋点
      this.zhuGeBury();
    },
    //设置storage
    ...mapActions(['setCookieFn']),
    //获取城市数据
    getCity () {
      api.getCity({}).then((res) =>{
        if(res.status==200){
          let obj = res.data;
          // 普通城市
          this.moreCity = obj.first_letter_cities;
          //热门城市
          this.hotCity = obj.hot_cities;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //获取城市名称
    gitCityName () {
      api.gitCityName({},this.cityName).then((res) =>{
        if(res.status==200){
          this.currentCity =res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //点击城市名
    cityText (id,name) {
      zhuge.track('选择城市', {
        '当前页面' : '选择城市页',
        '所属模块' : '首页',
        '新城市名称' : name
      }, () => {      
        //存城市缩写
        this.setCookieFn(['cityName',id]);
        this.$router.push(`/${id}`);
      });
    },
    //点击城市字母
    cityZimu (str,num) {
      let boxs = this.$refs.cityBox,
          scrollTop    = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset,
          y   = boxs[num].offsetTop;
      //显示字母class
      this.zimuNum = num;
      if(y > scrollTop + 50 ){
        //滚动距离增大
        let speed = (y - scrollTop-50 )/ 20;
        this.smoothDown(y,speed,scrollTop);       
      } else{
        let speed = (scrollTop+50 - y)/20;
        //滚动距离减小
        this.smoothUp(y,speed,scrollTop);
      }
    },
    //滚动距离增大
    smoothDown (y,speed,scrollTop) {
      if( scrollTop+50 < y ){
        scrollTop = scrollTop+speed;
        setTimeout ( () =>{
          //给scrooll赋值，移动滚动条
          this.scrllFn(scrollTop);
          this.smoothDown(y,speed,scrollTop);
        },10);
      } else{
        //给scrooll赋值，移动滚动条
        this.scrllFn(y-50);
      }    
    },
    //滚动距离减小
    smoothUp (y,speed,scrollTop) {
      if(y < scrollTop+50){
        scrollTop = scrollTop-speed;
        setTimeout ( () =>{
          //给scrooll赋值，移动滚动条
          this.scrllFn(scrollTop);
          this.smoothUp(y,speed,scrollTop);
        },10);
      } else{
        //给scrooll赋值，移动滚动条
        this.scrllFn(y-50);
      }
    },
    //给scrooll赋值，移动滚动条
    scrllFn (num) {
      document.documentElement.scrollTop= num;
      document.body.scrollTop =  num;
      window.pageYOffset      =  num;
    },
    //判断链接是否是新项目
    cityId (id) {
      let arr=[263804351010818,263804362735618,288405237291010,316027111000063,331561207717887],async= false;
      arr.map((m,i) => {
        if(id == m){
          async =true;
        }
      });
      return async;
    },
    //诸葛来源埋点
    zhuGeBury () {
      zhuge.track('打开选择城市页', {
        '当前页面' : '选择城市页',
        '所属模块' : '首页'
      });
    }
  },
  mounted () {
    this.init();
  }
}
</script>
<style lang="less"  scoped>
.wrap{
  padding-top:4.6rem;
  .from{
    .current_city{
      background: #F5F5F5;
      font-size: 1.2rem;
      color: #666666;
      line-height: 2.4rem;
      padding: 0 1rem;
    }
    .city{
      background: #FFFFFF;
      font-size: 1.4rem;
      color: #333333;
      line-height: 4.4rem;
      ul>li{
        border-bottom: .5px solid #E5E5E5;
        padding: 0 1rem;
        a{
          display: block;
          height: 100%;
          width:100%;
          color:#333;
        }
      }
    }
  }
  .fixedRight{
    position: fixed;
    right: 1rem;
    top: 5rem;
    ul{
      width:2rem;
      li{
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
        margin-bottom:.2rem;
        color:#666;
        &.on{
          color:#f63;
        }
      }
    }
  }
}
</style>