<template>
  <div class="eval">
    <!-- 楼盘吸顶1 -->
		<header-text :name="name" :wordFlag="false"></header-text>
    <div class="pulic">
      <div class="header border">您的顾问</div>
      <adviser-list :arr="guwenArr"></adviser-list>
    </div>
    <div class="pulic">
      <div class="header border">您所查看的楼盘</div>
      <item-list :arr="tuijianArr"></item-list>
    </div>
    <div class="pulic">
      <div class="header border">您的评价</div>
      <div class="write">
        <label>满意度</label>
        <i v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="iconfont" track-by="index" @click="stars(index)"></i>
      </div>
      <div class="dec">
        <textarea placeholder="您对顾问周翔满意吗？写下您对这次带看的评价吧～" v-model="pingjiaText"></textarea>
      </div>
      <div class="pingjia">
        <span class="transverse_center_center" @click="tijiao">提交</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api';
import {mapGetters} from 'vuex';
import headerText  from '@/components/base/header/header_text.vue';//头部吸顶
import adviserList from '@/views/adviser/items/adviser_list.vue';	//三个以下 -- 顾问
import itemList    from '@/components/base/items/loupan_list.vue';//楼盘列表
export default {
  data (){
    return{
      name: '',
      Url : '',
      score : '5',
      guwenArr : [],
      tuijianArr : [],
      pingjiaText: '',
    }
  },
  components:{
    headerText,
    adviserList,
    itemList
  },
  computed : {
    ...mapGetters(['customerId','customerPhone','cityName']),
    itemClasses (){
      let result = [];
      let score = Math.floor(this.score * 2 ) / 2;
      // let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for(let i=0;i<integer;i++){
          result.push("icon-pingxing1");
      }
      // if(hasDecimal){
      //     result.push("icon-pingxing2");
      // }
      while(result.length < 5){
         result.push("icon-pingxing");
      }
      return result;
    }
  },
  methods :{
    stars (inx){
      this.score = inx + 1;
    },
    //数据渲染
    getEvaluateData (){
      var id = this.customerId;
      var para = {
        'appointment_id' : this.$route.params.id
      }
      api.daikanEvaluateJson(para,id).then((res)=>{
        if(res.status == 200){
          this.name = res.data.appoint_at + ' 带看评价';
          this.guwenArr = res.data.advisor;
          this.tuijianArr = res.data.appoint_items;
          this.zhugeBury();
        } else if(res.status==422){
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //提交
    tijiao(){
      var para = {
        'appointment_id' : this.$route.params.id,
        'advisor_id' : this.guwenArr[0].id,
        'remark' : this.pingjiaText,
        'score' : this.score*2,
        'customer_id' : this.customerId
      }
      api.tijiaoEvaluateJson(para).then((res)=>{
        if(res.status == 200){
          this.zhugeTijiao('成功');
          this.$router.push({ path: '/home/my_appointments'});
        } else if(res.status==422){
          this.zhugeTijiao('失败');
          this.$router.push(`/${this.cityName}/404`);
        }	
      })
    },
    //提交评价——诸葛
    zhugeTijiao (successFlag){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心',
        '带看ID'   : this.$route.params.id,
        '带看时间' : this.name,
        '带看楼盘' : this.loupanId(),
        '满意度'   : this.score*2,
        '评价内容' : this.pingjiaText,
        '评价结果' : successFlag
      }
      zhuge.track(`提交带看评价`,obj);
    },
    //带看楼盘Id
    loupanId (){
      var id = '';
      for(var i=0; i<this.tuijianArr.length; i++){
        if(i == this.tuijianArr.length-1){
          id += this.tuijianArr[i].id;
        } else{
          id += this.tuijianArr[i].id + ',';
        }
      }
      return id;
    },
    //打开评价页——诸葛
    zhugeBury (data){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '个人中心',
        '带看ID'   : this.$route.params.id,
        '带看时间' : this.name,
        '带看楼盘' : this.loupanId()
      }
      zhuge.track('打开带看评价页',obj);
    },
  },
  watch :{
    '$route' (to){
      if(to.name == '带看评价页'){
        this.getEvaluateData();
      }
    }
  },
  mounted (){
    this.getEvaluateData();
  }
}
</script>
<style lang="less" scoped>
  .eval{
    background: #F6F5F5;
    padding-top: 4.4rem;
    .pulic{
      background: #FFF;
      margin-bottom: 1.2rem;
      .header{
        line-height: 4.5rem;
        font-size: 1.8rem;
        color: #333;
        padding: 0 1rem;
      }
      .write{
        padding: 0 1rem;
        line-height: 4.8rem;
        label{
          font-size: 1.4rem;
          color: #333;
          padding-right: .8rem;
        }
        i{
          color: #FFBB2A;
          padding-right: .5rem;
          font-size: 1.8rem;
        }
      }
      .dec{
        padding: 0 1rem;
        textarea{
          background: #F6F5F5;
          border: none;
          width: 100%;
          height: 10rem;
          padding: 1rem;
          resize:none;
        }
        ::-webkit-textarea-placeholder{
					color: red;
				}
      }
      .pingjia{
        margin: 1.5rem 1rem;
        border-radius: 2px;
        span{
          height: 3.6rem;
          color: #FFF;
          font-size: 1.4rem;
          background: #F63;
        }
      }
    }
  }
</style>
