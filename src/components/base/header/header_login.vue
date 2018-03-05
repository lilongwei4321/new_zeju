<template>
  <header class="header_icon">
    <div class="box transverse_center_center border">
      <img src="/static/assets/images/zeju-logo.png" alt="择居网">
      <div class="transverse_fen_center_ya">
        <aside class="transverse_fen_center">
          <a href="javascript:;" onclick="window.history.back(-1)" class="iconfont icon-jiantou4 return" ></a>
        </aside>
        <aside>
          <span class="user" @click="btnFn" >{{name=='注册'?'登录':'注册'}}</span>
        </aside>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Home',
  props : {
    name : {
      type : String,
      default : '注册'
    }
  },
  methods : {
    btnFn () {
      this.$emit('Login');
    }
  }
}
</script>
<style lang="less" scoped>
.header_icon{
  height:4.4rem;
  width:100%;
  position: fixed;
  top:0;
  left:0;
  background:#fff;
  z-index:200;
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
  .box{
    position: relative;
    width:100%;
    height: 100%;
    &>img{
      display: block;
      width:12.2rem;
    }
    div{
      height: 100%;
      width:100%;
      position: absolute;
      padding:0 1rem;
      left:0;
      .return{
        font-size:2.4rem;
        color:#666;
        margin-right:.2rem;
        padding-right:1rem;
        font-weight: bold;
      }
      .city{
        display: flex;
        margin-left:.2rem;
        padding:0 2rem 0 .5rem;
        align-items: center;
        height: 100%;
        position: relative;
        span{
          font-size: 1.4rem;
          color:#333;
        }
        i{
          font-size:1.6rem;
          color:#666;
          font-weight: bold;
          padding-left:.5rem;
          position: absolute;
          right: 0;
          top:.4rem;
        }
      }
      .user{
        font-size:2rem;
        color:#666;
        padding:0 .4rem 0 1rem;
      }
    }
  }
}
</style>
