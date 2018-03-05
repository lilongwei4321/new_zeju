<template>
  <div class="alert_back transverse_center_center" >
    <section class="box portrait_center_ya">
      <div class="main transverse_center_center border">{{title}}</div>
      <footer class="footer">
        <span class="transverse_center_center" @click = "clickFn(false)">取消</span>
        <span class="transverse_center_center" @click = "clickFn(true)">{{alertBtn}}</span>
      </footer>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props :{
    title : {
      type : String,
      default :function(){
        return '您还未登录，请先登录'
      }
    },
    alertBtn : {
      type : String,
      default :function(){
        return '立即登录'
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
  methods : {
    clickFn (async) {
      this.$emit("showFn",async);
    }
  }
}
</script>
<style lang="less" scoped>
.alert_back{
  position: fixed;
  top:0;
  left: 0;
  bottom:0;
  right: 0;
  z-index:202;
  background: rgba(0,0,0,0.4);
  .box{
    width:26rem;
    background: #fff;
    border-radius: .4rem;
    .main{
      height: 10.5rem;
      font-size:1.6rem;
      color:#333;
    }
    .footer{
      height: 4.4rem;
      display: flex;
      align-items: center;
      span{
        width:0;
        flex:1;
        font-size:1.4rem;
        height:2rem ;
        color:#333;
        &:last-child{
          border-left:1px solid #E5E5E5;
          color:#f63;
        }
      }
    }
  }
}
</style>
