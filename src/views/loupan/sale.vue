<template>
  <div class="sale_wrap">
    <header-text name = "达观别墅" :headFlag ="true" :async="false"></header-text>
    <main class="sale_main">
      <section class="btn_box">
        <div class="btns">
          <span class="quan transverse_center_center" :class="{'on':navBtnInd == '-1'}" @click="navBtnInd = '-1'">全部</span>
          <div class="nav_box">
            <div class="nav">
              <span v-for="m in navBtnArr" :key="m.value" :class="{'on':navBtnInd == m.value}" @click="navBtnInd = m.value">{{m.name}}</span>
            </div>
          </div>
        </div>
        <div class="status transverse_mo_center_ya">
          <span :class="{'transverse_center_center':1,'on':statusText=='疯抢中'}"   @click="statusFn('疯抢中')">疯抢中</span>
          <span :class="{'transverse_center_center':1,'on':statusText=='历史特卖'}" @click="statusFn('历史特卖')">历史特卖</span>
        </div>
      </section>
      <section class="main_box">
        <ul>
          <li v-for="(m,key) in louData" :key="key" class="border">
            <item-list :obj = "m" :async = "statusText == '疯抢中'"></item-list>
          </li>
        </ul>
      </section>
      <!-- 加载更多 -->
      <load-more v-show="loadAsync"  v-LoadMore = "loadMoreFn"></load-more>
    </main>
  </div>
</template>

<script>
//引用头部
import headerText from '@/components/base/header/header_text.vue';
//引用布局
import itemList from '@/components/base/items/item_list_one.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
export default {
  name: 'Home',
  components: {
    headerText,
    loadMore,
    itemList
  },
  data () {
    return {
      loadAsync   : false,//加载更多
      duoci       : false,//判断是否多次
      louData     : [{a:1}],
      statusText  : '疯抢中',
      navBtnInd  : '-1',
      navBtnArr   : [
        {name : '龙井花园',value : '1'},
        {name : '领袖翡翠城',value : '2'},
        {name : '领袖翡翠城',value : '3'},
        {name : '达观别墅',value : '4'},
        {name : '领袖翡翠城',value : '5'}
      ]
    }
  },
  methods :{
    //加载更多
    loadMoreFn (async) {
      if(!async) return false;
      if(!this.duoci){
        this.loadAsync = async;
        this.duoci = true;
        this.loupanAjax()
      }
    },
    //请求楼盘数据
    loupanAjax () {
      setTimeout (()=>{
        this.duoci = false;
        this.loadAsync = false;
        this.louData = this.louData.concat([{a:1},{b:1},{c:1}])
      },3000)
    },
    //切换 状态
    statusFn (name) {
      this.statusText = name;
    }
  }
}
</script>
<style lang="less" scoped>
.sale_wrap{
  padding-top:4.4rem;
  .sale_main{
    .btn_box{
      .btns{
        display:flex;
        height:4rem;
        box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
        span{
          font-size: 1.4rem;
          color: #909090;
          border-bottom:1px solid transparent;
          &.on{
            color:#f63;
            border-bottom:1px solid #f63;
          }
        }
        .quan{
          width:6.2rem;
          min-width:6.2rem;
          height:100%;
        }
        .nav_box{
          flex:1;
          height:100%;
          overflow:hidden;
          .nav{
            display:flex;
            flex-wrap:nowrap;
            justify-content:space-between;
            overflow-x:auto;
            overflow-y: hidden;
            height:4.2rem;
            span{
              flex:1 0 auto;
              height:4rem;
              padding:0 1.7rem;
              display:flex;
              align-items:center;
            }
          }
          .nav::-webkit-scrollbar {display:none}
        }
      }
      .status{
        padding:1.5rem 1rem 0;
        span{
          width:0;
          flex:1;
          color:#f63;
          background:#fff;
          height:3.6rem;
          border:1px solid #f63;
          font-size:1.4rem;
          &:first-child{
            border-right:none;
            border-radius:.4rem 0 0 .4rem;
          }
          &:last-child{
            border-left:none;
            border-radius:0 .4rem .4rem 0;
          }
          &.on{
            color:#fff;
            background:#f63;
          }
        }
      }
    }
    .main_box{
      &>ul{
        padding:0 1rem;
        li{
          padding:1.5rem 0;
          &:last-child:after{
            height: 0;
          }
        }
      }
    }
  }
}
</style>
