<template>
  <div class="search_wrap">
    <header class="header shadow">
      <div class="box transverse_fen_center_ya border">
        <aside class="return transverse_center_center">
          <a href="javascript:;" onclick="window.history.go(-1)" class="iconfont icon-jiantou4 " ></a>
        </aside>
        <aside class="text transverse_mo_center_ya">
          <input type="text" :placeholder="placeholder!=''?placeholder:'请输入楼盘名称'" ref="searchInput" v-model="text" @keyup.enter="searchLoupan">
          <i class="iconfont icon-sousuo" @click="searchLoupan"></i>
        </aside>
      </div>
    </header>
    <main class="search_main">
      <!-- 搜索楼盘链接 展示 -->
      <section v-if="arr.length >0" class="search_box">
        <ul>
          <li v-for="(m,i) in  arr" :key="i" class="border">
            <router-link :to="`/${cityName}/loupan/loupan_detail/${m.id}`">
              <div>
                <h5 v-html="gaoLian(m.name)" class="text_ove1"></h5>
                <p class="text_ove1">地址：{{m.address}}</p>
              </div>
              <i class="iconfont icon-jiantou2"></i>
            </router-link>
          </li>
        </ul>
      </section>
      <!-- 热门搜索 -->
      <section v-if="arr.length <=0"  class="rece_box">
        <h4><i class="iconfont icon-huoyan"></i>最近热搜</h4>
        <ul>
          <router-link :to="{path:`/${cityName}/loupan/list/${$route.params.name}`,query:{seach:m}}" v-for="(m,i) in reciArr" :key="i">{{m}}</router-link>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
export default {
  name: 'Home',
  data () {
    return {
      arr  : [] ,//楼盘数据
      text     : '' ,//搜索内容
      placeholder : '',
      async    : false ,
      page     : 1 ,
      reciArr  : []
    }
  },
  computed : {...mapGetters(['cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '搜索楼盘页'){
        this.arr = [];
        this.text = '';
        this.init();
      }
    },
    //输入内容时，请求参数
    text (val) {
      if(val !=''){
        //搜索楼盘
        this.getLoupanList();
      } else{
        this.arr = [];
      }
    }
  },
  methods :{
    init () {
      this.placeholder = globalFn.getQueryString('seach')!=null?globalFn.getQueryString('seach'):'';
      //input自动聚焦
      this.$refs.searchInput.focus();
      //获取热词
      this.getReciSearch();
      //诸葛埋点
      this.zhuGeBury();
    },
    //点击搜索
    searchLoupan () {
      //如果输入内容为空，没有效果
      if(this.text == ''){
        this.$refs.searchInput.focus();
        return false;
      } else{
        this.$router.push({path:`/${this.cityName}/loupan/list/${this.$route.params.name}`,query:{seach:this.text}});
      }
    },
    //获取楼盘列表
    getLoupanList () {
      let obj = {
        city_abbr   :  this.$store.state.cityName,
        action_name :  this.$route.params.name ,
        page : this.page,
        page_limit : 10,
        q : this.text
      }
      api.getLoupanList(obj).then((res) =>{
        if(res.status == 200){
          this.arr = res.data.loupans;
          //点击  --- 搜索埋点
          this.zhuGeClick(this.arr.length);
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //获取热词
    getReciSearch () {
      api.getReciSearch({city_abbr:this.$store.state.cityName}).then((res) =>{
        if(res.status == 200){
          this.reciArr = res.data;
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      });
    },
    //高亮楼盘名称
    gaoLian (name) {
      let arr = name.split(''),
          arr1= this.text.split(''),
          str = '';
      arr.map( (m,i) => {
        let async = false;
        arr1.map((n,ind) =>{
          if(n == m){
            async =true;
          }
        });

        if(async) {
          str += `<span style="color:#f63">${m}</span>`;
        } else{
          str+=m;
        }
      })
      return str;
    },
    //诸葛埋点
    zhuGeBury () {
      zhuge.track('打开搜索楼盘页', {
        '当前页面' : '搜索楼盘页',
        '所属模块' : '楼盘'
      });
    },
    //点击  --- 搜索埋点
    zhuGeClick (num) {
      zhuge.track('提交搜索楼盘', {
        '当前页面' : '搜索楼盘页',
        '所属模块' : '楼盘',
        '搜索内容' : this.text,
        '搜索返回楼盘量' : num
      });
    }
  },
  mounted () {
    this.init();
  }
}
</script>
<style lang="less" scoped>
.search_wrap{
  padding-top:4.6rem;
  .header{
    height:4.4rem;
    width:100%;
    position: fixed;
    top:0;
    left:0;
    z-index:200;
    background: #fff;
    &.shadow{
      box-shadow: 0px 1px 2px 2px #eee;
    }
    .box{
      position: relative;
      width:100%;
      height: 100%;
      padding:0 1rem;
      .return{
        width:2rem;
        padding-right:1rem;
        a{
          display: block;
          font-size:2rem;
          color:#666;
          font-weight: bold;
        }
      }
      .text{
        flex:1;
        height: 3rem;
        background: #F0F2F5;
        border-radius: .2rem;
        i{
          display: block;
          color:#999;
          padding:0 1rem;
        }
        input{
          display: block;
          flex:1;
          height: 100%;
          border:none;
          padding:0 1rem;
          font-size:1.3rem;
          color: #333333;
          background: transparent;
        }
      }
    }
  }
  .search_main{
    .search_box{
      ul{
        padding:0 1rem;
        box-sizing: border-box;
        li{
          a{
            padding:1rem 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color:#333;
            div{
              width:0;
              flex:1;
              h5{
                width:100%;
                font-size: 1.4rem;
              }
              p{
                color:#666;
                font-size: 1.2rem;
              }
            }
            &>i{
              display: block;
              color:#666;
              font-size: 1.4rem;
              width: 1rem;
            }
          }
        }
      }
    }
    .rece_box{
      padding:8rem 1rem 0;
      box-sizing: border-box;
      h4{
        line-height: 2rem;
        font-size: 1.4rem;
        color:#999;
        margin-bottom: 1rem;
        i{
          font-size: 1.6rem;
          color:#f63;
          margin-right:.4rem;
        }
      }
      ul{
        a{
          float: left;
          color: #565c67;
          background-color: #f8f8f8;
          padding:.4rem 1rem;
          margin-left:1rem;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          border-radius: .2rem;
        }
      }
    }
  }
}
</style>
