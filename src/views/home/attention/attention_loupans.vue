<template>
  <div class="wrap attention">
    <div class="main">
      <header :class="{'header_icon':true}" class="shadow" id="header_icon">
        <div class="box transverse_center_center border" v-if="typeNum==1">
          <span class="title">关注楼盘</span>
          <div class="transverse_fen_center_ya">
            <aside class="transverse_fen_center">
              <a href="javascript:;" onclick="window.history.back(-1)" class="iconfont icon-jiantou4 return" ></a>
            </aside>
            <aside class="zhongxin" v-show="tuijianArr.length>0">
              <span class="dianping" @click="contrast()">对比</span>
              <span class="dianping" @click="bianji()">编辑</span>
            </aside>
          </div>
        </div>
        <div class="box transverse_center_center border" v-else-if="typeNum==2">
          <div class="transverse_fen_center_ya">
            <aside class="transverse_fen_center">
              <a href="javascript:;" class="item_num">共关注{{ itemNum }}个楼盘</a>
            </aside>
            <aside class="zhongxin" v-show="tuijianArr.length>0">
              <span class="quxiao" @click="quxiao()">取消</span>
              <span class="dianping" @click="checkAll()">全选</span>
              <span class="dianping" @click="removeCheck()">删除</span>
            </aside>
          </div>
        </div>
        <div class="box transverse_center_center border" v-else-if="typeNum==3">
          <div class="transverse_fen_center_ya">
            <aside class="transverse_fen_center">
              <a href="javascript:;" class="item_num">请选择楼盘（{{ checkNum }}/2）</a>
            </aside>
            <aside class="zhongxin" v-show="tuijianArr.length>0">
              <span class="quxiao" @click="quxiao()">取消</span>
              <input class="dianping" :class="{'dianpingCur':!isDisable}" type="button" value="开始对比" :disabled="isDisable" @click="duibiBtn()">
            </aside>
          </div>
        </div>
      </header>
      <div class="list" v-show="tuijianArr.length>0">
        <div class="loupan_box">
          <div class="big_box border" v-for="(n,key) in tuijianArr" :key="key">
            <div class="dui transverse_center_center" v-show="showFlag" >
              <input type="checkbox" :value="n.id" class="transverse_center_center checkBox" :checked="duiFlag" v-model="fruitIds" @click="duibiFn(key)" ref="checkBox">
              <label></label>
            </div>
            <router-link :to="hrefFn(n.sale_status,n.id)" class="tuwenBox">
              <dl>
                <dt :style="'background-image:url('+'http://imgs.zeju.cn'+n.img_url+')'"  class="back block">
                  <logo-text :obj="{name:n.cooperate_type_name}"></logo-text>
                </dt>
                <dd class="portrait_fen_ya">
                  <h4 class="title">
                    <span class="text">{{n.name}}</span>
                  </h4>
                  <p class="dizhi text_ove1">{{n.address}}</p>
                  <p class="liyou">
                    <span 
                      class="transverse_center_center" 
                      :class="'text_back'+(ind+1)" 
                      v-for="(item,ind) in n.labels" 
                      :key="ind">{{item}}</span>
                  </p>
                  <p class="last">
                    <span class="price">{{n.price_unit == '待定'?'待定':n.price + n.price_unit}}</span>
                    <span class="size">{{n.building_area!=''?'建面'+n.building_area:''}}</span>
                  </p>
                </dd>
              </dl>
            </router-link>
          </div>
        </div>
        <!-- 加载更多 -->
        <load-more  @showFn ="moreFn" :obj ="{total_pages,page}" ref="loadMore"></load-more>
      </div>
      <no-record v-if="tuijianArr.length<=0" :obj="obj"></no-record>
    </div>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
import zhuGe from '@/assets/javascripts/zhuGe';
//引用  没有记录时 -- 布局
import noRecord     from '@/components/base/items/noRecord.vue';
//引用 -- 加载更多
import loadMore from '@/components/page/load/load_more.vue';
//引用  楼盘渲染 -- 布局
import logoText from '@/components/page/logo/logo_textOne.vue';
export default {
  data(){
    return{
      typeNum: 1,
      tuijianArr : [],
      duibiArr   : [],
      showFlag   : false,
      isDisable  : true,
      duiFlag    : false,
      checkNum   : 0,
      itemNum    : 0,
      obj : {
        str : '您暂时没有关注楼盘～',
        async : true
      },
      // 初始化全选按钮, 默认不选
      isCheckedAll: false,
      fruitIds : [],
      page  : 1 ,
      total_pages : 0,
      hrefObj : {
        '普通' : '/loupan/loupan_detail',
        '品牌' : '/loupan/brand/brand_detail',
        '精选' : '/loupan/loupan_detail',
        '特卖' : '/loupan/sale'
      },
      loupan_ids : '',//楼盘
    }
  },
  components:{
    noRecord,
    loadMore,
    logoText
  },
  computed: {...mapGetters(['customerId','cityName'])},
  methods:{
    hrefFn (str,id) {
      if(str=='在售' ||str=='待售' ||str=='售罄'){str='普通'};
      return `/${this.cityName}${this.hrefObj[str]}/${id}`;
    },
    //单选对比 
    duibiFn (index){
      if(this.typeNum == 3){
        let checkBox=this.$refs["checkBox"],
          checked=checkBox[index].checked;
        if(!checked)this.checkNum--;
        if(this.checkNum>=2 ){
          checkBox[index].checked=false;
          return false;
        }
        if(checked){
          this.checkNum++;
        }
        if(this.checkNum==2){
          this.isDisable = false;
        }else{
          this.isDisable = true;
        }
      }
    },
    duibiBtn (){
      this.$router.push(`/${this.cityName}/home/evaluate_loupan/`+this.fruitIds[0]+'/'+this.fruitIds[1]);
    },
    //对比
    contrast (){
      this.typeNum = 3;
      this.showFlag = true;
    },
    //编辑
    bianji (){
      this.typeNum = 2;
      this.showFlag = true;
      this.zhugeBury('编辑','0');
    },
    //取消
    quxiao (){
      this.checkNum = 0;
      this.typeNum  = 1;
      this.showFlag = false;
      this.isDisable = true;
      this.fruitIds = [];
    },
    //全选
    checkAll (){
      this.isCheckedAll = !this.isCheckedAll
      if (this.isCheckedAll) {
        // 全选时
        this.fruitIds = [];
        this.duiFlag = true;
        this.tuijianArr.forEach(function (fruit) {
          this.fruitIds.push(fruit.id);
        }, this)
      } else {
        this.duiFlag = false;
        this.fruitIds = []
      }
      this.zhugeBury('全选','0');
    },
    //删除
    removeCheck (){
      for(var i=0;i<this.fruitIds.length;i++){
        if(i == this.fruitIds.length-1){
          this.loupan_ids += this.fruitIds[i];
        } else{
          this.loupan_ids += this.fruitIds[i]+',';
        }
      }
      var id = this.customerId;
      var para = {
        'loupan_ids' : this.loupan_ids
      }
      api.removeAttentionJson(para,id).then((res)=>{
        if(res.status == 200){
          this.tuijianArr = [];
          this.page = 1;
          this.getAttentData();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
      this.zhugeBury('删除','1');
    },
    //加载更多 显示隐藏
    moreFn () {
      this.getAttentData();
    },
    getAttentData (){
      var para = {
        id : this.customerId,
        action_name : 'favorites',
        page : this.page,
        page_limit : '5'
      }
      api.getAttentJson(para).then((res)=>{
        if(res.status == 200){
          var obj = res.data;
          this.tuijianArr = this.tuijianArr.concat(obj.data);
          this.itemNum = obj.data.length;
          if(this.tuijianArr.length > 0){
            //当前页数
            this.total_pages = obj.page_info.total_pages;
            this.page        = obj.page_info.current_page+1;
            
            //可以再次请求
            this.$refs.loadMore.requestFn();
          }
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    // 诸葛
    zhugeBury (name,id){
      let obj = {
        '当前页面' : this.$route.name,
        '所属页面' : '个人中心'
      }
      if(id == '1'){
        obj['删除楼盘数量'] = this.fruitIds.length;
      }
      zhuge.track(`${name}关注楼盘页`,obj);
    },
  },
  watch :{
    '$route' (to){
      if(to.name == '关注楼盘页'){
        this.total_pages = 0;
        this.page        = 1;
        this.tuijianArr  = [];
        this.getAttentData();
        this.zhugeBury('打开','0');
      }
    }
  },
  mounted (){
    this.total_pages = 0;
    this.page        = 1;
    this.tuijianArr  = [];
    this.getAttentData();
    this.zhugeBury('打开','0');
  }
}
</script>
<style lang="less" scoped>
.attention{
  padding-top: 4.5rem;
  .main{
    .header_icon{
      height:4.4rem;
      width:100%;
      position: fixed;
      top:0;
      left:0;
      background: #fff;
      z-index:200;
      &.shadow{
        box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
      }
      .box{
        position: relative;
        width:100%;
        height: 100%;
        .item_num{
          color: #333;
          font-size: 1.4rem;
        }
        .title{
          font-size: 1.8rem;
          color: #333;
          display: block;
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
          .zhongxin{
            a{
              color: #666;
              font-size:2.3rem;
            }
            .quxiao{
              font-size: 1.4rem;
              color: #333;
            }
            .dianping{
              // color: #F63;
              color: #999;
              font-size: 1.4rem;
              padding-left: 1rem;
              border: none;
              background: none;
              &.dianpingCur{
                color: #F63;
              }
            }
          }
        }
      }
    }
    .loupan_box{
      padding: 0 1rem;
      .big_box{
        display: flex;
        padding:1.5rem 0;
        .dui{
          width: 2.5rem;
          height: 8.4rem;
          margin-right: 1rem;
          position: relative;
          .checkBox {
            width: 2.2rem;
            height: 2.2rem;
            opacity: 0;
            position: absolute;
            left: 2px;
            top: 37px;
            z-index: 1;
          }
          
          label {
            position: absolute;
            left: 2px;
            top: 37px;
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;
            border: 1px solid #999;
          }
        
          /*设置选中的input的样式*/
          /* + 是兄弟选择器,获取选中后的label元素*/
          .checkBox:checked+label { 
            background-color: #fe6d32;
            border: 1px solid #fe6d32;
          }
          .checkBox:checked +label::after{
            position: absolute;
            content: "";
            width: .8rem;
            height: 1.2rem;
            top: 3px;
            left: 6px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
          }
        }
        .tuwenBox{
          width:0;
          flex:1;
          &:last-child{
            dl:after{
              height: 0;
            }
          }
          dl{
            width: 100%;
            box-sizing: border-box;
            display: flex;
            position: relative;
            dt{
              width:11.2rem;
              height: 8.4rem;
              position: relative;
              img{
                position: absolute;
                left: -0.5rem;
                top:.6rem;
                &.temai,&.hezuo,&.xuan{
                  width:4.8rem;
                }
                &.brand{
                  width:3.6rem;
                }
              }
            }
          }
          dd{
            width:0;
            flex:1;
            padding-left:1rem;
            // width: 18rem;
            .title{
              display: flex;
              align-items: center;
              .text{
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
  }
}
</style>
