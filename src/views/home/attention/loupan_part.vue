<template>
  <div class="loupan">
    <div class="header">
      <img :src="`http://imgs.zeju.cn${srcImg.pic_file}`" alt="" @click="fangdaImg(srcImg.indexId)">
      <span class="transverse_center_center">{{srcImg.name}}</span>
    </div>
    <div class="info">
      <p><label>开盘时间</label>：<span>{{srcImg.open_date}}</span></p>
      <p><label>交房时间</label>：<span>{{srcImg.task_date}}</span></p>
      <p><label>开发商</label>：<span>{{srcImg.developer}}</span></p>
      <p><label>位置</label>：<span>{{srcImg.detail_addres}}</span></p>
      <p><label>物业类型</label>：<span>{{srcImg.property_type}}</span></p>
      <p><label>装修状况</label>：<span>{{srcImg.decoration}}</span></p>
      <p><label>占地面积</label>：<span>{{srcImg.covers_area}}</span></p>
      <p><label>电梯</label>：<span>{{srcImg.elevator}}</span></p>
      <p><label>车位数量</label>：<span>{{srcImg.parking_count}}</span></p>
      <p><label>绿化率</label>：<span>{{srcImg.green_ratio}}</span></p>
      <p><label>容积率</label>：<span>{{srcImg.volume_ratio}}</span></p>
      <p><label>物业公司</label>：<span>{{srcImg.wuye_company}}</span></p>
      <p><label>产权年限</label>：<span>{{srcImg.year}}</span></p>
      <p><label>供暖方式</label>：<span>{{srcImg.supply_heat_way}}</span></p>
      <p><label>供电方式</label>：<span>{{srcImg.supply_power_way}}</span></p>
      <p><label>供水方式</label>：<span>{{srcImg.supply_water_way}}</span></p>
      <p><label>供气方式</label>：<span>{{srcImg.supply_gas_way}}</span></p>
      <p><label>建筑类型</label>：<span>{{srcImg.build_category}}</span></p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    srcImg: {
      type: Object,
      default: function () {
        return {
          mo_img: '',
        }
      }
    }
  },
  methods :{
    fangdaImg (indexId){
      this.$emit('imgFn',indexId);
    }
  }
}
</script>
<style lang="less" scoped>
.loupan{
  .header{
    position: relative;
    img{
      width: 100%;
      display: block;
      min-height: 9rem;
    }
    span{
      position: absolute;
      height: 2.6rem;
      background: rgba(0, 0, 0, .5);
      bottom: 0;
      width: 100%;
      color: #FFF;
      font-size: 1.4rem;
    }
  }
  .info{
    padding: .7rem 0 .5rem;
    p{
      height: 2.5rem;
      display: flex;
      align-items: center;
      width: 100%;
      color: #999;
      label{
        // width: 5.5rem;
        text-align:justify;
        font-size: 1.2rem;
        line-height: 0rem;
        color: #999;
        font-size: 1.2rem;
      }
      span{
        flex: 1;
        width: 0;
        box-sizing: content-box;
        font-size: 1.2rem;
        color: #151515;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
