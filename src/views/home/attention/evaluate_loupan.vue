<template>
  <div class="wrap">
    <div class="main duibi">
      <!-- 楼盘吸顶1 -->
			<header-text name="楼盘对比" :headFlag="false"></header-text>
      <div class="header transverse_fen_center">
        <span>{{loupan1}}</span>
        <span>{{loupan2}}</span>
      </div>
      <div class="box">
        <div class="tab">
          <div class="head transverse_fen_center">
            <span :class="index == 0?'spanCur':''" v-for="(k,index) in tabArr" :key="k.id" ref="imgName" @click="changeImg(index,k.indexId)">{{ k.name }}</span>
          </div>
        </div>
        <div class="small_box">
          <div class="left">
            <loupan-part :srcImg="srcImg" @imgFn="imgShow"></loupan-part>
          </div>
          <div class="right">
            <loupan-part :srcImg="srcImg2" @imgFn="imgShow"></loupan-part>
          </div>
        </div>
      </div>
    </div>
    <div class="zhezhao" @click="guanbi()" v-show="showFlag">
      <swiper class="details_box" :options="swiperOption"  ref="mySwiper" >
        <swiper-slide v-for="(n,index) in arr" class="list swiper-slide" :key="index">
          <img :src="'http://imgs.zeju.cn/' +n" alt="">
        </swiper-slide>
      </swiper>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
  </div>
</template>
<script>
import api from '@/api/api';
import headerText  from '@/components/base/header/header_text.vue';//头部吸顶
import loupanPart  from '@/views/home/attention/loupan_part.vue';//楼盘信息
export default {
  data(){
    return {
      loupan1 : '',
      loupan2 : '',
      tabArr : [
        {name: '效果图', indexId: 'xiaoguo'},
        {name: '交通图', indexId: 'jiaotong'},
        {name: '实景图', indexId: 'shijing'},
        {name: '样板间', indexId: 'yangban'},
        {name: '规划图', indexId: 'guihua'},
        {name: '配套图', indexId: 'peitao'},
        {name: '户型图', indexId: 'huxing'}
      ],
      srcImg : {},
      srcImg2: {},
      arr : [],
      showFlag : false,//图片放大弹框
      imgBtn : 'xiaoguo',//效果图小标切换
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
        notNextTick: true,  
        direction: 'horizontal',
        slidesPerView: 1.1, 
        centeredSlides : true,
        initialSlide :0, //第几张显示
        preventClicksPropagation:true,
        grabCursor:true, //小手
        effect:"coverflow", //3d
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
        // pagination : '.swiper-pagination',//分页
        // paginationType : 'fraction',
      }
    }
  },
  components:{
    headerText,
    loupanPart
  },
  methods :{
    imgShow (objId){
      this.showFlag = true;
      if(objId == 0){
        this.arr = this.srcImg.loupan_photos[this.imgBtn];
      } else{
        this.arr = this.srcImg2.loupan_photos[this.imgBtn];
      }
    },
    changeImg (index,name){
      this.imgBtn = name;
      var btn = this.$refs['imgName'];
      for(let itme of btn){
        itme.classList.remove('spanCur');
      }
      btn[index].classList.add('spanCur');
      this.srcImg.pic_file  = this.srcImg.loupan_photos[name][0];
      this.srcImg2.pic_file = this.srcImg2.loupan_photos[name][0];
    },
    getEvaluateData (){
      var para = {
        'ids' : this.$route.params.id +','+ this.$route.params.loupanid
      }
      api.getEvaluateDuibiJson(para).then((res)=>{
        if(res.status == 200){
          this.loupan1 = res.data[0].name;
          this.loupan2 = res.data[1].name;
          this.srcImg  = res.data[0];
          this.srcImg2 = res.data[1];
          //区分点击的左右图放大
          this.srcImg.indexId = 0;
          this.srcImg2.indexId = 1;
          this.srcImg.pic_file  = this.srcImg.loupan_photos[this.imgBtn][0];
          this.srcImg2.pic_file = this.srcImg2.loupan_photos[this.imgBtn][0];
          this.arr = res.data[0].loupan_photos.xiaoguo;
        }
      })
    },
    guanbi (){
      this.showFlag = false
    }
  },
  watch :{
    '$route' (to){
      if(to.name == '楼盘对比页'){
        this.getEvaluateData();
      }
    }
  },
  mounted (){
    this.getEvaluateData();
  }
}
</script>
<style lang="less" scoped>
.duibi{
  padding-top: 8.4rem;
  .header{
    height: 4rem;
    padding: 0 1rem;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    position: fixed;
    top: 4.4rem;
    left: 0;
    width: 100%;
    z-index: 1;
    span{
      flex: 1;
      display: flex;
      justify-content: center;
      font-size: 1.4rem;
      color: #333;
    }
  }
  .box{
    .tab{
      height: 6rem;
      overflow: hidden;
      width: 100%;
      display: flex;
      align-items: center;
      .head{
        overflow: auto;
        height:100%;
        height:7rem;
        margin: 0 .6rem;
        span{
          font-size: 1.4rem;
          padding: .7rem 1.4rem;
          background: #FFF;
          color: #909090;
          margin: 0 .45rem;
          white-space:nowrap;
          border-radius: .2rem;
          border: 1px solid #BBBBBB;
        }
        .spanCur{
          background: #F63;
          color: #FFF;
          border: none;
          border: 1px solid #F63;
        }
      }
    }
    .small_box{
      display: flex;
      div{
        flex: 1;
        padding: 0 .6rem;
      }
      .left{
        border-right: 1px solid #E5E5E5;
      }
    }
  }
}
.zhezhao{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 100%;
  }
}
</style>
