<template>
<!-- 择居百科 -->
  <div class="wrap">
    <!-- 楼盘吸顶1 -->
    <header-text name="择居百科" :headFlag="false"></header-text>
    <div class="main wiki_main">
      <!-- 分类 -->
      <div class="public_detail" v-for="(m,ind) in arr" :key="ind">
				<div class="header border transverse_fen_ya">
					<span class="title">{{m.title}}</span>
					<router-link :to="`/${cityName}/wiki/wiki_list/${m.category_id}`" class="gengduo">更多<i class="iconfont icon-right-shixin"></i></router-link>
				</div>
        <wiki-part :arr="m.data"></wiki-part>
			</div>
    </div>
    <footer class="border1 footer">
      <div :class="index==0?'cur':''" v-for="(k,index) of tabArr" :key="k.id" ref="wikiTab" @click="changewiki(index,k.num)">
        <i class="iconfont" :class="k.classA"></i>
        <p>{{ k.name }}</p>
      </div>
    </footer>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import globalFn from '@/assets/javascripts/globalFn';
//楼栋信息
import headerText from '@/components/base/header/header_text.vue';
//百科组件
import wikiPart   from '@/views/wiki/wiki_part.vue';
export default {
  data (){
    return {
      num : '500',
      tabArr : [
        {name:'准备买房', classA: 'icon-home',num:'500'},
        {name:'看房选房', classA: 'icon-yan2',num:'501'},
        {name:'签约订房', classA: 'icon-qianyue',num:'502'},
        {name:'办理贷款', classA: 'icon-daikuan',num:'503'},
        {name:'物业交割', classA: 'icon-wuye',num:'504'},
      ],
      arr : []
    }
  },
  components:{
    headerText,
    wikiPart
  },
  computed: {...mapGetters(['cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '百科首页'){
        //获取百科首页
        this.getWikiList();
        //诸葛埋点
        this.zhugeBury();
      }
    }
  },
  methods : {
    //获取百科首页
    getWikiList () {
      var obj = {
            id : this.num
          };
          api.getWikiList(obj).then((res) =>{
            if(res.status == 200){
              //获取百科数据
              this.arr = res.data.data;
            } else if(res.status==422){
              this.$router.push(`/${this.cityName}/404`);
            }	
          });
    },
    //点击切换 选项
    changewiki (index,num){
      let wikibtn = this.$refs['wikiTab'];
      for(let itme of wikibtn){
        itme.classList.remove('cur');
      }
      this.num = num;
      wikibtn[index].classList.add('cur');
      //获取百科首页
      this.getWikiList();
    },
    //诸葛埋点
    zhugeBury () {
      zhuge.track('打开百科首页', {
        '当前页面' : '百科首页',
        '所属模块' : '百科'
      });
    }
  },
  mounted () {
    //获取百科首页
    this.getWikiList();
    //诸葛埋点
    this.zhugeBury();
  }
}
</script>
<style lang="less" scoped>
.wrap{
  padding: 4.8rem 0 4.4rem;
  .wiki_main{
    background: #F6F5F5;
    .public_detail{
      &:last-child{
        margin:0;
      }
      .header>.title{
        color: #F63;
      }
    }
  }
  .footer{
    display: flex;
    position: fixed;
    bottom: 0;
    height: 4.5rem;
    width: 100%;
    background: #FFF;
    left:0;
    div{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-right: 1px solid #EAEAEA;
      font-size: 1rem;
      color: #999;
      &:last-child{
        border-right:none;
      }
      i{
        font-size: 1.6rem;
      }
    }
    .cur{
      background: #F63;
      color: #FFF;
    }
  }
}
</style>
