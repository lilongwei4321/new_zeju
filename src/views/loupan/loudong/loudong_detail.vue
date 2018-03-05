<template>
  <div class="loudong-info">
    <!-- 楼盘吸顶1 -->
		<header-text :name="banObj.name"></header-text>
    <!-- 标注图 -->
    <div class="loudong">
      <div class="biaoji_box" ref="biaoji_box">
        <div class="img_box">
          <img class="item-img" :src="banObj.pic" >
          <!-- 动态渲染标注 -->
          <div class="more-mark">
            <span 
              v-for="(k,index) in banArr" 
              :key="k.id" 
              :style="{'left':(k.leftm-25)+'px','top':(k.topm-30)+'px'}"
              :class="['fixed',statusStyle(k.sale_status_name),index==0?'marker':'']" 
              @click="markerFn(index)" ref="marker" 
              v-show="isMarker(k.sale_status_name)">
              <label>{{ k.number }}#</label>
            </span>
          </div> 
        </div>
      </div>
      <!-- 显示隐藏 标注类别 -->
      <div class="loudongTab">
        <div :class="['shaixuan','transverse_center_center',clickText =='筛选'?'curs':'']" @click="shouqi(clickText)" ref="shouqi">{{clickText}}</div><!--筛选，收起-->
        <ul class="shaixuanul transverse_fen_center_ya" v-show="clickText =='收起'">
          <li 
            v-for="m in statusArr" 
            :key="m.id" 
            :class="{'cur':classAsyncFn(m.asyncName)}" 
            @click="changeStatus(m.asyncName)">
            <p>{{ m.name }}</p>
            <span :class="m.classA">
              <i class="iconfont icon-duihao"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 轮播组件 -->
    <swiper class="loudongCon" :options="swiperOption"  ref="mySwiper" >
      <swiper-slide v-for="(m,ind) in banArr" class="swiper-slide" :key="ind">
        <div class="info">
          <section class="info_header portrait_center_ya border">
            <h3 class="huxing transverse_fen_center">
              <span>{{ m.number }}#</span>
              <router-link :to="`/${cityName}/loupan/loudong/${m.id}/search`" >
                <i class="iconfont icon-jiantou2"></i>
              </router-link>
            </h3>
            <div class="transverse_mo_center_ya flexbox">
              <p>近期开盘：<span>{{ m.open_at }}</span></p>
              <p>近期交房：<span>{{ m.deliver_at }}</span></p>
            </div>
          </section>
          <section class="danyuan">
            <ul>
              <li class="transverse_mo_center_ya">
                <p><label>单元：</label><span>{{ m.number }}单元</span></p>
                <p><label>户数：</label><span>{{ m.unit_count }}</span></p>
              </li>
              <li class="transverse_mo_center_ya">
                <p><label>层数：</label><span>{{ m.floor_count }}</span></p>
                <p><label>在售房源：</label><span>{{ m.selling_house_count }}</span></p>
              </li>
            </ul>
          </section>
        </div>
      </swiper-slide>
    </swiper>
    <!-- 页脚 -->
    <footer-btns></footer-btns>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//头部吸顶
import headerText from '@/components/base/header/header_text.vue';
//轮播插件
import { swiper, swiperSlide } from 'vue-awesome-swiper';
//标注插件
import bigImgXY from '@/assets/javascripts/bigImgXY.js';
//页脚
import footerBtns from '@/components/base/footer/footer_btns.vue';
export default {
  components: {
    headerText,//楼盘吸顶
    footerBtns
  },
  computed : {...mapGetters(['cityName'])},
  data (){
    return {
      zsFlag : true,
      dsFlag : true,
      swFlag : true,
      clickText : '收起',
      statusArr:[
        {name: '在售',classA: 'zs',asyncName:'zsFlag'},
        {name: '待售',classA: 'ds',asyncName:'dsFlag'},
        {name: '售完',classA: 'sw',asyncName:'swFlag'}
      ],
      swiperOption: {
        initialSlide :0,
        onSlideChangeStart: (swiper) =>{
          //swiper从当前slide开始过渡到另一个slide时执行
          let index = swiper.activeIndex;
          let dom   = this.$refs.marker;
          for(let i of dom){
            i.classList.remove('marker');
          }
          dom[index].classList.add('marker');
          //移动标注图
          this.handler(index);
        }
      },
      banObj :{},
      banArr : []
    }
  },
  methods:{
    //收起--展开--筛选
    shouqi (str){
      if(str == '收起'){
        this.clickText = "筛选";
      } else{
        this.clickText = '收起';
      }
    },
    //是否存在 class
    classAsyncFn (str) {
      return this[str]
    },
    //切换在售，代售状态
    changeStatus (str){
      this[str] = !this[str];
    },
    //根据状态添加marker样式
    statusStyle(status){
      if(status == '在售'){
        return 'z-sale';
      } else if(status == '待售'){
        return 'd-sale';
      } else if(status == '售罄'){
        return 'w-sale';
      }
    },
    //给marker添加点击事件
    markerFn (index){
      //跳转到对应的楼栋信息
      this.swiper.slideTo(index);
      //高亮当前标注
      let mk = this.$refs['marker'];
      for(let itme of mk){
        itme.classList.remove('marker');
      }
      mk[index].classList.add('marker');
    },
    //绑定 变量值用于显示隐藏
    isMarker (status){
      if(status == '在售'){
        return this.zsFlag;
      } else if(status == '待售'){
        return this.dsFlag;
      } else if(status == '售罄'){
        return this.swFlag;
      }
    },
    //获取楼栋数据
    getBanData () {
      let obj = {id : this.$route.params.id};
          api.getBanData(obj).then((res) =>{
            if(res.status==200){
              let data  = res.data;
              //基本信息 赋值到对象
              this.banObj = {
                name : data.loupan_name,
                id   : data.id,
                pic  : data.louapn_pic,
                ext_phone : data.ext_phone
              }
              //标注数组
              this.banArr = data.loupan_buildings;
              //移动标注图
              this.handler(0);
            } else if(res.status==422){
              this.$router.push(`/${this.cityName}/404`);
            }	
          })
    },
    //移动标注图
    handler (num) { 
      let obj  = {
            left : this.banArr[num].leftm,
            top  : this.banArr[num].topm
          };
      bigImgXY.init(this.$refs.biaoji_box,obj)
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
     //获取楼栋数据
    this.getBanData();
  }
}
</script>
<style lang="less" scoped>
  .loudong-info{
    padding: 4.4rem 0;
    .loudong{
      position: relative;
      width: 100%;
      height: 38rem;
      overflow: hidden;
      .biaoji_box{
        height: 100%;
        width:100%;
        overflow: auto;
        &::-webkit-scrollbar {display:none}
        .img_box{
          position: relative;
          .item-img{
            display: block;
          }
          .fixed{
            display: flex;
            width: 5rem;
            height: 2.7rem;
            background: #F63;
            position: absolute;
            border-radius: 4px;
            color: #FFF;
            font-size: 1.4rem;
            align-items: center;
            justify-content: center;
            &:after{
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border: 4px solid #F63;
              bottom: -0.8rem;
              left: 50%;
              margin-left: -0.4rem;
            }
            &.z-sale{
              background: #F63;
              &:after{
                border-color: #F63 transparent transparent;
              }
            }
            &.w-sale{
              background: #b3b6be;
              &:after{
                border-color: #b3b6be transparent transparent;
              }
            }
            &.d-sale{
              background: #7fb6ff;
              &:after{
                border-color: #7fb6ff transparent transparent;
              }
            }
            &.marker{
              background: green;
              &:after{
                border-color: green transparent transparent;
              }
            }
          }
        }
      }
      .loudongTab{
        height: 2.6rem;
        width: 100%;
        position: absolute;
        bottom: 2rem;
        left: 0;
        .shaixuan{
          position: absolute;
          right: .8rem;
          bottom: -0.5rem;
          width: 3.6rem;
          height: 3.6rem;
          border-radius:100%;
          background: #FFF;
          color: #565c67;
          font-size: 1.3rem;
          z-index:2;
          &.curs{
            background: #ff7575;
            color: #FFF;
          }
        }
        .shaixuanul{
          background: rgba(255,255,255,0.8);
          height: 100%;
          border-radius: 1.3rem;
          color: #83868f;
          font-size: 1.4rem;
          padding:0 2rem;
          margin:0 .8rem;
          li{
            flex:1;
            height: 100%;
            display: flex;
            align-items: center;
          }
          span{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.2rem;
            width:1.2rem;
            margin-left:.4rem;
            margin-top:.1rem;
            i{
              display: none;
              font-size: 1.2rem;
              color:#fff;
            }
          }
          .zs{
            background-color: #f63;
          }
          .ds{
            background-color: #7fb6ff;
          }
          .sw{
            background-color: #b3b6be;
          }
        }
        .cur{
          color: #0c0d0e;
          span{
            i{
              display: block;
            }
          }
        }
      }
    }
    .loudongCon{
      width: 100%;
      .swiper-wrapper{
        .info{
          padding: 0 1rem;
          .info_header{
            height: 7.2rem;
            .huxing{
              height: 2rem;
              margin-bottom:1rem;
              span{
                display: block;
                font-size: 1.8rem;
                color: #0c0d0e;
              }
              a{
                width: 1.4rem;
                height: 1.4rem;
                border-radius:100%;
                background: #F63;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                  display: block;
                  font-size: 1rem;
                  color: #FFF;
                }
              }
            }
            .flexbox{
              p{
                width:0;
                color: #83868f;
                font-size: 1.1rem;
                flex:1;
              }
            }
          }
          .danyuan{
            padding: 1.5rem 0;
            p{
              width:0;
              font-size: 1.3rem;
              flex:1;
              margin-bottom:1.4rem;
              label{
                color: #83868f;
              }
              span{
                color: #0c0d0e;
              }
            }
          }
        }
      }
      
    }
  }
</style>
