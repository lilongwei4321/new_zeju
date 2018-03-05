<template>
  <div class="alert_part">
    <div class="alert_box_fdjs option_main" v-show="isFlag">
      <ul class="box_duo" >
        <li 
          v-for="m in totalArr" 
          :key="m.value" 
          @click="clickFenCla(m)"
          class="transverse_fen_center_ya border"
          :class="{'on':m.active}">
          <span>{{m.name}}</span>
          <i class="iconfont icon-duihao"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props :{
    totalArr : {
      type :Array,
      default :function(){
        return []
      }
    },
    isFlag : {
      type :Boolean,
      default : false
    }
  },
  data (){
    return {
    }
  },
  methods :{
    //选中
    clickFenCla (obj) {
      this.totalArr.map(function(m){
        m.active = false;
      })
      this.$nextTick(() =>{
        Vue.set(obj,'active',!obj.active);
      });
      obj.alertFalg = true;
      this.$emit('increment',obj,obj.mark);
    },
    clearData () {
      this.totalArr.map(function(m){
        m.active = false;
      })
    }
  },
}
</script>
<style lang="less" scoped>
  .alert_part{
    ul>li{
      span{
        width: auto;
      }
    }
  }
</style>
