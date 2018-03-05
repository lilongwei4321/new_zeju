<template>
  <section class="wrap404 ">
    <header-text name = "404页面" :headFlag ="true" :async="false"></header-text>
    <section class="main transverse_center_center">
       <img src="/static/assets/images/404.png">
       <router-link :to="`/${cityName}`">找不到您要的页面，<span>{{num}}</span>s后跳入首页</router-link>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
//引用头部
import headerText from '@/components/base/header/header_text.vue';
export default {
  components: {
    headerText
  },
  data () {
    return {
     num:3,
     time : null
    }
  },
  computed : {...mapGetters(['cityName'])},
  watch : {
    '$route' (to,from) {
      if(to.name == '404页'){
        this.daoDate()
      }
    }
  },
  methods : {
    daoDate () {
      this.time = setInterval (() =>{
        this.num = this.num-1;
        if(this.num == 0){
          this.num = 3;
          clearInterval(this.time);
          this.$router.push(`/${this.cityName}`);
        }
      },1000)
    }
  },
  mounted () {
    this.daoDate()
  }
}
</script>
<style lang="less" scoped>
.wrap404{
  .main{
    flex-direction: column;
  }
  img{
    width: 32.5rem;
    display: block;
    padding-top:8.4rem;
  }
  a{
    padding-top:2rem;
    font-size:1.6rem;
    color:#666;
    span{
      color:#f63;
      font-size:2rem;
      margin-right: .4rem;
    }
  }
}
</style>
