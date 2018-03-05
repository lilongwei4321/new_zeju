<template>
  <div class="list-jian">
    <dl class="list-arr border" v-for="(m,ind) in listArr" :key="ind">
      <!-- 判断图片路径是否为空，添加占位图 -->
      <dt 
        class="left back" 
        v-if="m.huxing_img_url==null ||  m.huxing_img_url==''" 
        :style="{'backgroundImage':'url(/static/assets/images/empty.jpg)'}"></dt>
      <!-- 拼接图片路径 -->
      <dt 
        class="left back" 
        v-else 
        :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.huxing_img_url})`}" 
        @click="backFn(`http://imgs.zeju.cn/${m.huxing_img_url}`)"></dt>
      <dd class="right">
        <h3>{{m.name}}</h3>
        <p class="huxing">{{m.huxing}}&nbsp;&nbsp;{{m.building_area}}㎡</p>
        <p class="label">{{m.sale_status_name}}</p>
      </dd>
    </dl>
    <!-- 户型图放大 -->
    <div class="zhezhao" v-show="zhezhao" @click="close">
      <img :src="srcUrl" >
    </div>
  </div>
</template>
<script>
export default {
  props : {
    listArr : {
      type : Array,
      default : function(){return  []}
    }
  },
  data (){
    return {
      zhezhao  : false,
      srcUrl   : '',
    }
  },
  methods :{
    //关闭放大效果
    close (){
      this.zhezhao = false;
    },
    //点击图片，放大
    backFn (str){
      this.srcUrl = str;
      this.zhezhao = true;
    }
  }
}
</script>
<style lang="less" scoped>
.list-jian{
  .list-arr{
    display: flex;
    padding: 1.5rem 0;
    box-sizing: border-box;
    .left{
      width: 11.2rem;
      height: 7.16rem;
    }
    .right{
      padding: 0 0 0 1rem;
      color: #666;
      display: flex;
      flex-direction: column;
      h3{
        font-size: 1.6rem;
        flex: 1;
      }
      .huxing{
        font-size: 1.4rem;
        flex: 1;
      }
      .label{
        width: 4rem;
        height: 1.8rem;
        background: #FFE2D9;
        border-radius: 2px;
        font-size: 1.2rem;
        color: #F63;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .zhezhao{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 201;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
    }
  }
}
</style>
