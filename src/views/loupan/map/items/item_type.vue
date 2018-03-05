<template>
  <div class="list">
    <dl v-for="(m,key) in typeArr" :key="key" >
      <dt>{{ m.keyword }}</dt>
      <dd>
        <ul>
          <li v-for="(k,index) in m.yr" :key="index" v-if="index <3">
            <p><span>{{ k.title }}</span><span>{{ k.mi }}米</span></p>
            <!-- 地铁，公交渲染  路线-->
            <p v-if="m.keyword == '地铁' || m.keyword == '公交'">
              <span v-for="(i,s) in splitArr(k.address)" :key="s">{{ i }}</span>
            </p>
            <!-- 医院渲染类型 -->
            <p v-else-if="m.keyword == '医院'">
              <span class="red" v-for="(n,ind) in k.tags" v-html="n" :key="ind"></span>
            </p>
          </li>
          <li v-else v-show="btnTextFn(m.keyword)">
            <p><span>{{ k.title }}</span><span>{{ k.mi }}米</span></p>
            <!-- 地铁，公交渲染  路线-->
            <p v-if="m.keyword == '地铁' || m.keyword == '公交'">
              <span v-for="(i,s) in splitArr(k.address)" :key="s">{{ i }}</span>
            </p>
            <!-- 医院渲染类型 -->
            <p v-else-if="m.keyword == '医院'">
              <span class="red" v-for="(n,ind) in k.tags" v-html="n" :key="ind"></span>
            </p>
          </li>
          <!-- 点击项，控制显示条数 -->
          <li class="btn transverse_center_center" @click="shouzhan(m.keyword)" v-show="m.yr.length>3">
            <p><i class="iconfont fontsize" :class="[btnTextFn(m.keyword)?'icon-jiantou3':'icon-jiantou1']" ></i></p>
          </li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props : {
    typeArr : {
      type :Array,
      default :function(){
        return []
      }
    }
  },
  data () {
    return {
      busText: '',//公交
      subwayText: '',//地铁
      schoolText: '',//学校
      hospitalText: '',//医院
      bankText: '',//银行
      shopText: '',//购物
      houseText: '',//房屋
      xianeText: '',//嫌恶
      obj : {
        '公交' : 'busText',
        '地铁' : 'subwayText',
        '学校' : 'schoolText',
        '医院' : 'hospitalText',		
        '银行' : 'bankText',
        '购物' : 'shopText',
        '房屋' : 'houseText',
        '嫌恶' : 'xianeText'
      }
    }
  },
  methods : {
    //分割成数组
    splitArr (str) {
      return str.split(';')
    },
    //判断是否显示多条
    btnTextFn (str) {
      return this[this.obj[str]]== str;
    },
    //点击显示隐藏
    shouzhan(str){
      if(str!=this[this.obj[str]]){
        this[this.obj[str]] =str ;
      } else{
        this[this.obj[str]] ='' ;
      }
		}
  }
}
</script>
<style lang="less" scoped>
.list{
  padding:0 1rem;
  dl{
    dt{
      color: #83868f;
      font-size: 1.5rem;
      height: 4.5rem;
      display: flex;
      align-items: center;
    }
    dd{
      background: #FFF;
      padding: 1rem 1rem;
      border-radius: 4px;
      ul{
        li{
          p{
            &:first-child{
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 3rem;
              span{
                &:first-child{
                  color: #0c0d0e;
                  font-size: 1.3rem;
                }
                &:last-child{
                  color: #565c67;
                  font-size: 1.2rem;
                }
              }
            }
            &:last-child{
              color: #83868f;
              font-size: 1.2rem;
              span{
                margin-right: 1.2rem;
              }
              .red{
                padding:0 .5rem;
                border: 1px solid #ff6666;
                color: #ff6666;
                font-size: 1rem;
                text-align: center;
                line-height:1.6rem;
                height:1.rem;
                display: inline-block;
                border-radius: .3rem;
              }
            }
          }
        }
      }
      .fontsize{
        font-size: 1.4rem;
        &.icon-jiantou3{
          font-size:1.6rem;
        }
      }
    }
  }
}
</style>
