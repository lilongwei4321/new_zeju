<template>
  <div class="loudong_search">
    <!-- 楼盘吸顶1 -->
		<header-text :name="`${listObj.name}${listObj.building_no}栋房源信息`"></header-text>
    <div class="main">
      <div class="search search_nav">
        <div class="xuan_box border">
          <div class="box transverse_center_center">
              <p class="select" @click="cliHide('huxingAsync','huxingArr')">
              <span :class="{'on':huxingAsync}">{{ huxingText }}</span>
              <i :class="{'iconfont':true ,'icon-sortC':!huxingAsync ,'icon-sortA':huxingAsync,'on':huxingAsync}"></i>
            </p>
          </div>
          <div class="box transverse_center_center">
            <p class="select" @click="cliHide('cengAsync','cengArr')">
              <span :class="{'on':cengAsync}">{{ cengText }}</span>
              <i :class="{'iconfont':true ,'icon-sortC':!cengAsync ,'icon-sortA':cengAsync,'on':cengAsync}"></i>
            </p>
          </div>
          <div class="box transverse_center_center">
            <p class="select" @click="cliHide('chaoAsync','chaoArr')">
              <span :class="{'on':chaoAsync}">{{ chaoText }}</span>
              <i :class="{'iconfont':true ,'icon-sortC':!chaoAsync ,'icon-sortA':chaoAsync,'on':chaoAsync}"></i>
            </p>
          </div>
          <div class="box transverse_center_center">
            <p class="select" @click="cliHide('statusAsync','statusArr')">
              <span :class="{'on':statusAsync}">{{ statusText }}</span>
              <i :class="{'iconfont':true ,'icon-sortC':!statusAsync ,'icon-sortA':statusAsync,'on':statusAsync}"></i>
            </p>
          </div>
          <transition name="kenzo">
            <div v-show="boxAsync" class="option_main">
              <ul class="box_duo" >
                <li 
                  v-for="m in arr" 
                  :key="m.value" 
                  @click="clickFenCla(m)"
                  class="transverse_fen_center_ya"
                  :class="{'on':m.active}">
                  <span>{{m.name}}</span>
                  <i class="iconfont icon-duihao"></i>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      <div class="list">
        <section v-if="!noRecordAsync">
          <huxing-list :listArr="listArr"></huxing-list>
          <!-- 加载更多 -->
          <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
        </section>
        <section>
          <no-record v-if="noRecordAsync"></no-record>
        </section>
      </div>
    </div>
    <!-- 遮罩层 -->
    <transition name="kenzo">
      <div class="back_black zhe" v-show="backAsync" @touchmove.prevent @click="backHideFn"></div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue';
import api  from '@/api/api';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//户型列表
import huxingList from '@/views/loupan/huxing/huxing_list.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';	
//引用  没有记录时 -- 布局
import noRecord from '@/components/base/items/noRecord.vue';
export default {
  components: {
    headerText,//楼盘吸顶
    huxingList,
    loadMore,
    noRecord
  },
  data (){
    return {
      huxingAsync : false,//户型
      cengAsync   : false,//楼层
      chaoAsync   : false,//朝向
      statusAsync : false,//状态
      boxAsync    : false,//菜单是否显示
      backAsync   : false,//背景遮罩
      noRecordAsync:false,//没有数据时
      huxingText  : '户型',
      cengText    : '楼层',
      chaoText    : '朝向',
      statusText  : '状态',
      arr       : [],//当前下拉数据
      huxingArr : [
        {value: '', name: '不限', active: true, mark: 'hx'},
        {value: '一', name: '一居', active: false, mark: 'hx'},
        {value: '二', name: '二居', active: false, mark: 'hx'},
        {value: '三', name: '三居', active: false, mark: 'hx'},
        {value: '四', name: '四居', active: false, mark: 'hx'},
        {value: '五', name: '五居', active: false, mark: 'hx'},
        {value: '五居以上', name: '五居以上', active: false, mark: 'hx'},
      ],
      cengArr : [
        {value: '', name: '不限', active: true, mark: 'lc'},
        {value: '1', name: '7层以下', active: false, mark: 'lc'},
        {value: '2', name: '7-14层', active: false, mark: 'lc'},
        {value: '3', name: '15-22层', active: false, mark: 'lc'},
        {value: '4', name: '22层以上', active: false, mark: 'lc'},
      ],
      chaoArr : [
        { name: '不限', active: true, mark: 'cx'},
        { name: '东', active: false, mark: 'cx'},
        { name: '南', active: false, mark: 'cx'},
        { name: '西', active: false, mark: 'cx'},
        { name: '北', active: false, mark: 'cx'},
        { name: '东南', active: false, mark: 'cx'},
        { name: '东北', active: false, mark: 'cx'},
        { name: '西南', active: false, mark: 'cx'},
        { name: '西北', active: false, mark: 'cx'},
        { name: '东西', active: false, mark: 'cx'},
      ],
      statusArr : [
        {value: '', name: '不限', active: true, mark: 'zt'},
        {value: '0', name: '待售', active: false, mark: 'zt'},
        {value: '1', name: '在售', active: false, mark: 'zt'},
        {value: '2', name: '售罄', active: false, mark: 'zt'},
        {value: '3', name: '已锁定', active: false, mark: 'zt'},
        {value: '4', name: '不可售', active: false, mark: 'zt'}
      ],
      listArr : [],
      listObj : {},
      page : 1 , //当前页
      total_pages :0,//总页数，默认0
      bedroom : '',//户型
      floors : '', // 楼层
      toward : '', //朝向
      sale_status : '',//销售状态
    }
  },
  watch : {
    '$route' (to,from) {
      if(to.name == '楼栋详情筛选页'){
        //获取楼栋数据,重置数组
        this.page = 1;
        this.listArr = [];
        this.getBanList();
      }
    }
  },
  methods : {
    //点击菜单按钮 -- 显示隐藏;
    cliHide (name,objName) {
      // 当前渲染 数组
      this.arr  = this[objName];
      //当前显示  菜单
      this[name] = !this[name];
      //下拉菜单是否显示
      this.boxAsync = this[name];
      //除当前菜单 --全部隐藏
      this.asyncFalse(name);
      //背景是否显示
      this.backAsyncFn();
    },
    //通过点击 -- 选中下拉-改变class
    clickCla (obj) {
      if(obj.mark == 'hx'){
        this.huxingAsync = false;
        obj.name == '不限'?this.huxingText = '户型':this.huxingText = obj.name;
        this.bedroom = obj.value;
      } else if(obj.mark == 'lc'){
        this.cengAsync = false;
        obj.name == '不限'?this.cengText = '楼层':this.cengText = obj.name;
        this.floors = obj.value;
      } else if(obj.mark == 'cx'){
        this.chaoAsync = false;
        obj.name == '不限'?this.chaoText = '朝向':this.chaoText = obj.name;
        this.toward = obj.name=='不限'?'':obj.name;
      } else if(obj.mark == 'zt'){
        this.statusAsync = false;
        obj.name == '不限'?this.statusText = '状态':this.statusText = obj.name;
        this.sale_status = obj.value;
      }
      this.$nextTick(() =>{
        Vue.set(obj,'active',!obj.active);
      });

      //获取楼栋数据,重置数组
      this.page = 1;
      this.listArr = [];
      this.getBanList();
    },
    //显示async 全为false
    asyncFalse (name){
      let arr = ['huxingAsync','cengAsync','chaoAsync','statusAsync'];
      arr.map( (m) => {
        if(name != m){
          this[m] = false;
        }
      });
    },
    //背景遮罩
    backAsyncFn () {
      let arr = [this.huxingAsync,this.cengAsync,this.chaoAsync,this.statusAsync],
          async = false;
      arr.map((m)=>{
        if(m){
          async = true;
        }
      })
      this.backAsync = async;
    },
    //关闭
    backHideFn () {
      this.backAsync = false;
      this.boxAsync  = false;
      // 除当前菜单 --全部隐藏
      this.asyncFalse();
    },
    //选中
    clickFenCla (obj) {
      this.arr.map(function(m){
        m.active = false;
      });
      //更改下拉name
      this.clickCla(obj);
      //隐藏背景，下拉
      this.backAsync = false;
      this.boxAsync  = false;
    },
    //获取楼栋数据
    getBanList () {
      this.noRecordAsync=false;
      var obj = {
            id : this.$route.params.id,
            bedroom : this.bedroom,
            floors : this.floors,
            toward : this.toward,
            sale_status : this.sale_status,
            page : this.page,
            page_limit:6,
          }
          api.getBanList(obj).then((res) =>{
            if(res.status==200){
              let data  = res.data;
              //arr 数据
              this.listArr = this.listArr.concat(data.houses);
              this.listObj = data.common_info;

              //如果筛选 结果为空
              if(this.listArr.length <=0){
                this.noRecordAsync=true;
              }

              //页数
              this.total_pages = res.data.page_info.total_pages;
              this.page        = res.data.page_info.current_page+1;
              //可以再次请求
              this.$refs.loadMore.requestFn();
            } else if(res.status==422){
              this.$router.push(`/${this.$store.state.cityName}/404`);
            }	
          })
    },
    //加载更多 显示隐藏
    moreFn () {
      //获取故事列表
      this.getBanList();
    }
  },
  mounted () {
    //获取楼栋数据
    this.getBanList()
  }
}
</script>
<style lang="less" scoped>
  .loudong_search{
    padding-top: 4.4rem;
    .search_nav{
      position: fixed;
      z-index: 199;
      background: #FFF;
      width:100%;
      top:4.4rem;
      .xuan_box{
        display: flex;
        height: 4.5rem;
        .box{
          flex: 1;
          .select{
            span{
              font-size:1.4rem;
              color:#666;
              &.on{
                color:#f63;
              }
            }
            i{
              color:#999;
              font-size:1.4rem;
              transform: translate(.2rem,0rem);
              display: inline-block;
              transform-origin:center center;
              width:2rem;
              &.on{
                color:#f63;
              }
            }
          }
          .cur{
            span,i{
              color: #F63;
            }
          }
        }
        .option_main{
          top:4.5rem;
          .box_duo{
            li{
              width: 100%;
            }
          }
        }
      }
    }
    .list{
      padding:4.5rem 1rem 0;
    }
  }
</style>
