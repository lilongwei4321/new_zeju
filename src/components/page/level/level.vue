<template>
  <p>
    <!-- 满星状态 -->
    <i 
      class="iconfont icon-pingxing1" 
      v-for="(item,ind) in 5 " 
      :key="ind"
      v-if="item <= Number(levelObj.level)"
      @click="clickFn(levelObj.name,(ind+1)*2)"
    ></i>
    <!-- 半星状态 -->
    <i 
      class="iconfont icon-pingxing2" 
      v-else-if="item > Number(levelObj.level) && item == Number(levelObj.level)+0.5" 
      @click="clickFn(levelObj.name,(ind+1)*2)"
    ></i>
    <!-- 空星状态 -->
    <i class="iconfont icon-pingxing" v-else @click="clickFn(levelObj.name,(ind+1)*2)"></i>
  </p>
</template>

<script>
export default {
  props : {
    levelObj : {
      type : Object,
      default : function(){return {}}
    }
  },
  methods : {
    clickFn (name,ind) {
      if(name !=undefined){
        this.$emit('pingXing',{name,ind})
      } else{
        return false;
      }
    }
  }
}
</script>
<style lang="less" scoped>
p>i{
  color: #FFBB2A;
  margin-right:.2rem;
  font-size:1.8rem;
}
</style>
