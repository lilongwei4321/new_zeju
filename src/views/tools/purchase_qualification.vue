<template>
  <div class="purchase">
    <header-text :name = "name"></header-text>
    <div class="wenda">
      <div class="questions">{{questions}}</div>
      <div class="answer" v-show="flag">
        <ul>
          <li class="transverse_fen_center_ya border" v-for="(k,index) in totalArr" :key="index" @click="nextFn(k,index)" ref="btnChange">
            <span>{{k.content}}</span>
            <i class="iconfont icon-duihao"></i>
          </li>
        </ul>
      </div>
      <div class="answer" v-show="!flag">
        <div class="border header">您的情况</div>
        <div class="result">
          <p v-for="k in resultArr" :key="k.id">
            <span>{{k.question}}</span><br>
            <span>{{k.answer}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api';
//引用  公用头部
import headerText  from '@/components/base/header/header_text.vue';
export default {
  components : {
    headerText,
  },
  data (){
    return {
      name : '测试购房资格',
      questions : '2017年，全国多个热点城市限购再升级，实行分区限购、提高首付比例、差别化信贷政策，持币观望的你还能买房吗？',
      totalArr : [],
      active : false,
      city : '',
      parent_id : '-1',
      jieguoArr : '',//结果id
      flag : true,
      resultArr : []
    }
  },
  watch : {
    '$route' (to) {
      if(to.name == '测试购房资格页'){
        this.zhugeBury();
        this.flag = true;
        this.parent_id = '-1',
        this.jieguoArr = '';//初始化结果
        var btn = this.$refs['btnChange'];//初始化选中效果
        for(let item of btn){
          item.classList.remove('on');
        }
        this.questions = '2017年，全国多个热点城市限购再升级，实行分区限购、提高首付比例、差别化信贷政策，持币观望的你还能买房吗？'
        this.getCitysData();
      }
    }
  },
  methods :{
    nextFn(obj,index){
      if(obj.flag)this.city = obj.id;
      if(!obj.flag)this.parent_id = obj.id;
      this.jieguoArr += obj.id + ',';
      var btn = this.$refs['btnChange'];
      for(let item of btn){
        item.classList.remove('on');
      }
      btn[index].classList.add('on');
      var para = {
        'city' : this.city,
        'parent_id' : this.parent_id
      }
      this.getQuestionsData(para);//问题
      this.zhugeQueAn(this.questions, obj.content);
    },
    //问题
    getQuestionsData (para){
      api.getQuestionsData(para).then((res)=>{
        if(res.status ==200){
          //渲染数据
          var obj = res.data.content;
          var para = {
            'city' : this.city,
            'parent_id' : res.data.id
          }
          if(res.data.end_flag){
            this.questions = obj;
            this.getResultsData();
            this.zhugeResult(obj);
          } else{
            this.getAnswerData(para,obj);//答案
          }
        } else if(re.status ==422){
          this.$route.push('*');
        }
      })
    },
    //答案
    getAnswerData (para,obj){
      api.getAnswerJson(para).then((res)=>{
        if(res.status == 200){
          this.questions = obj;
          this.totalArr = res.data;
          var btn = this.$refs['btnChange'];
          for(let item of btn){
            item.classList.remove('on');
          }
        } else if(res.status == 422){
          this.$route.push('*');
        }
      })
    },
    //显示结果
    getResultsData (){
      var str = this.jieguoArr;
      str = str.substring(0,str.length-1);
      var para = {
        'ids' : str
      }
      api.getResultsJson(para).then((res)=>{
        if(res.status == 200){
          this.flag = false;
          this.resultArr = res.data;
        }
      })
    },
    //请求城市列表
    getCitysData (){
      api.getCityJson({}).then((res)=>{
        if(res.status == 200){
          this.totalArr = res.data;
        } else if(res.status == 422){
          this.$route.push('*');
        }
      })
    },
    //打开———诸葛
    zhugeBury (){
      let obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具'
      }
      zhuge.track(`打开购房资格页`,obj);
    },
    //问题/答案——诸葛
    zhugeQueAn (questions, answer){
      var obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '测试问题' : questions,
        '选择答案' : answer
      }
      zhuge.track('测试购房资格',obj);
    },
    //购房测试结果——诸葛
    zhugeResult (data){
      var obj = {
        '当前页面' : this.$route.name,
        '所属模块' : '小工具',
        '测试结果' : data
      }
      zhuge.track('测试购房资格结果',obj);
    }
  },
  mounted (){
    this.zhugeBury();
    this.questions = '2017年，全国多个热点城市限购再升级，实行分区限购、提高首付比例、差别化信贷政策，持币观望的你还能买房吗？'
    this.getCitysData();
  }
}
</script>
<style lang="less" scoped>
.purchase{
  padding-top: 4.4rem;
  .first{
    padding: 0 1.5rem;
    .write{
      font-size: 2rem;
      color: #333333;
      line-height: 3.6rem;
      padding: 3rem 0;
    }
    .next{
      height: 4.4rem;
      background: #FF6633;
      border-radius: 2px;
      font-size: 1.6rem;
      color: #FFF;
    }
  }
  .wenda{
    background: #F6F5F5;
    div{
      background: #FFF;
    }
    .questions{
      font-size: 2rem;
      color: #333;
      padding: 2rem 1.5rem;
      line-height: 3rem;
    }
    .answer{
      margin-top: 1rem;
      font-size: 1.6rem;
      color: #333;
      padding: 0 1rem;
      ul>li{
        padding: 1rem 0;
        i{
          display: none;
          color:#f63;
        }
        &.on{
          color:#f63;
          span{
            color:#f63;
          }
          i{
            display: block;
          }
        }
      }
      .header{
        line-height: 4.5rem;
        font-size: 1.6rem;
        color: #333333;
      }
      .result{
        padding-top: 1rem;
        p{
          line-height: 2.5rem;
          font-size: 1.4rem;
          span{
            &:first-child{
              color: #333;
            }
            &:last-child{
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
