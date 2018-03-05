<template>
  <div class="loupan_box">
    <nav>
      <router-link :to="hrefFn(m.sale_status,m.id,key+1)" v-for="(m,key) in arr" :key="key">
        <dl class="border">
          <dt :style="{'backgroundImage':`url(http://imgs.zeju.cn/${m.img_url})`}"  class="back block">
            <logo-text :obj="{name:m.sale_status}"></logo-text>
          </dt>
          <dd class="portrait_fen_ya">
            <h4 class="title">
              <span class="text text_ove1">{{m.name}}</span>
              <!-- <span class="status transverse_center_center">{{m.sale_status}}</span> -->
            </h4>
            <p class="dizhi text_ove1">{{m.address}}</p>
            <p class="liyou">
              <span 
                class="transverse_center_center" 
                :class="'text_back'+(ind+1)" 
                v-for="(item,ind) in m.labels" 
                :key="ind">{{item}}</span>
            </p>
            <p class="last">
              <span class="price" >{{m.price_unit != '待定'? `${m.price}${m.price_unit}`:m.price_unit}}</span>
              <span class="size" v-if="m.building_area !=''">建面{{m.building_area}}</span>
            </p>
          </dd>
        </dl>
      </router-link>
    </nav>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
//引用  楼盘渲染 -- 布局
import logoText from '@/components/page/logo/logo_textOne.vue';
export default {
  name: 'list',
  props : {
    arr : {
      type : Array,
      default : function(){
        return [];
      }
    }
  },
  computed : {...mapGetters(['cityName'])},
  components : {
    logoText
  },
  computed: {...mapGetters(['cityName'])},
  data () {
    return {
      hrefObj : {
        '普通' : `/loupan/loupan_detail`,
        '品牌' : `/loupan/brand/brand_detail`,
        '精选' : `/loupan/loupan_detail`,
        '特卖' : `/loupan/sale`
      }
    }
  },
  methods : {
    hrefFn (str,id,num) {
      if(str=='在售' ||str=='待售' ||str=='售罄'){str='普通'};
      return {path:`/${this.cityName}${this.hrefObj[str]}/${id}`,query:{num}};
    }
  }
}
</script>
<style lang="less" scoped>
.loupan_box{
  a{
    width:100%;
    &:last-child{
      dl:after{
        height: 0;
      }
    }
    dl{
      width:100%;
      display: flex;
      position: relative;
      padding:1.5rem 1rem;
      box-sizing: border-box;
      &:after{
        transform:translate(0%,0) scale(.94,1);
      }
      dt{
        width:11.2rem;
        height: 8.4rem;
        position: relative;
        img{
          position: absolute;
          left: -0.5rem;
          top:.6rem;
        }
      } 
      dd{
        flex:1;
        padding-left:1rem;
        width:0;
        .title{
          display: flex;
          align-items: center;
          .text{
            width:0;
            flex:1;
            font-size:1.6rem;
            color:#333;
            padding-right:1rem;
          }
          .status{
            font-size:1rem;
            border:1px solid #F37021;
            color: #F37021;
            border-radius: 1rem;
            width:3.6rem;
            height: 1.6rem;
          }
        }
        .dizhi{
          font-size:1.2rem;
          color:#999;
          width:100%;
        }
        .liyou{
          display: flex;
          height: 1.4rem;
          span{
            height: 100%;
            width:auto;
            padding:0 .4rem;
            font-size: .8rem;
            margin-right:.8rem;
            border-radius:1.4rem;
            box-sizing: border-box;
          }
        }
        .last{
          .price{
            font-size: 1.4rem;;
            color: #FF3B30;
            padding-right:.5rem;
          }
          .size{
            font-size:1.2rem;
            color:#999;
          }
        }
      }
    }
  }
}
</style>
