<template>
  <div class="item_wrap">
    <section class="item_main" @click.self="clickClose">
      <div class="item_box">
        <router-link :to="`/${cityName}/loupan/loupan_detail/${obj.id}`">
          <dl>
            <dt :style="{'backgroundImage':`url(http://imgs.zeju.cn/${obj.img_url})`}" class="back">
            </dt>
            <dd>
              <h6><span>{{obj.name}}</span><span>{{obj.sale_status}}</span></h6>
              <p>地址：{{obj.address}}</p>
              <p>{{obj.price_name}}:{{obj.price}}{{obj.price_unit}}</p>
              <p class="liyou">
                <span 
                  class="transverse_center_center"
                  v-for="(item,ind) in obj.labels" 
                  :key="ind">{{item}}</span>
              </p>
            </dd>
          </dl>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  props : {
    obj : {
      type : Object,
      default : function(){
        return {}
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
  methods : {
    clickClose () {
      this.$emit('showFn')
    }
  }
}
</script>
<style lang="less" scoped>
.item_wrap{
  height: 100%;
  width:100%;
  position: fixed;
  z-index: 1000;
  top:0;
  left:0;
  .item_main{
    height: 100%;
    width:100%;
    display: flex;
    align-items: flex-end;
    background:rgba(0,0,0,0.2);
    .item_box{
      height: 40%;
      width:100%;
      background:#fff;
      box-shadow:0px -2px 4px 0px rgba(0,0,0,0.3);
      padding:1.5rem 1rem;
      box-sizing: border-box;
      a{
        display: block;
        width:100%;
        height: 100%;
      }
      dl{
        width:100%;
        height: 100%;
        position: relative;
        dt{
          height: 100%;
        }
        dd{
          position: absolute;
          left: 0;
          bottom:0;
          background: rgba(0,0,0,0.8);
          width:100%;
          color:#fff;
          padding:1rem;
          box-sizing: border-box;
          h6{
            font-size: 1.6rem;
            display: flex;
            align-items: center;
            height: 2rem;
            span{
              &:last-child{
                font-size: 1rem;
                margin-left:1rem;
                border:1px solid #fff;
                padding:.1rem .6rem;
                border-radius:2rem;
              }
            }
          }
          p{
            padding-top:.6rem;
            font-size: 1.2rem;
          }
          .liyou{
            display: flex;
            span{
              width:auto;
              padding:.2rem .6rem;
              font-size: 1rem;
              margin-right:.8rem;
              box-sizing: border-box;
              border:1px solid #fff;
            }
          }
        }
      }
    }
  } 
}
</style>
