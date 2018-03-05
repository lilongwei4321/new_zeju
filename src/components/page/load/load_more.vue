<template>
  <div class="load_box" v-LoadMore = "loadMoreFn" :class="{'load_box1':loadAsync}">
    <div v-show="loadAsync">
      <section  v-if="state == 1" class="transverse_center_center">
        <img src="/static/assets/images/loading.gif">
        <span>页面加载中...</span>
      </section>
      <section v-else-if="state == 2" class="transverse_center_center">
        <span>没有更多了</span>
      </section>
      <section v-else class="transverse_center_center">
        <span>加载失败，请检查网络</span>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    obj : {
      type : Object ,
      default : function(){
        return {}
      }
    }
  },
  data () {
    return {
      state : 1 ,
      duoci : false,//防止--触发多次
      loadAsync : false
    }
  },
  watch : {
    '$route' (to,from) {
      // this.loadMoreFn(false);
    }
  },
  methods : {
    //加载更多
    loadMoreFn (async) {
      if(!async) return false;
      if(!this.duoci){
        this.duoci = true;
        this.loadAsync = true;
        if(this.obj.page <= this.obj.total_pages && this.obj.total_pages !=0){
          this.$emit('showFn');
        } else{
          setTimeout(() => {
            this.state = 2;
          },2000)
          setTimeout(()=>{
            this.loadAsync = false;
          },3000)
        }
      }
    },
    requestFn (async) {
      this.duoci = false;
      this.loadAsync = false;
    }
  }
}
</script>
<style lang="less" scoped>
.load_box{
  height: 0;
  overflow: hidden;
  section{
    width: 100%;
    height: 100%;
  }
  img{
    display: black;
    margin-right:1rem;
    width:2.6rem;
  }
  span{
    display: block;
    font-size:1.4rem;
    color:#333;
  }
}
.load_box1{
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
