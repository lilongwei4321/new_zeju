<template>
	<div class="box">
		<div id="ageChart" v-show="echartsArr.age.contents.length > 0"></div>
		<div id="loveChart" v-show="echartsArr.favorites.contents.length > 0"></div>
		<div id="jobChart" v-show="echartsArr.trade.contents.length > 0"></div>
	</div>
</template>
<script>
import echarts from 'echarts';
export default {
	props : {
		echartsArr : {
      type :Object ,
      default :function(){
        return {}
      }
    }
	},
  data () {
		return {

		}
	},
	methods : {
		myChartFunc (objName, title, echartData) {
			// 绘制图表
			objName.setOption({
				title: { 
					text: title ,
					textStyle: {
						color: '#FFF',
						fontSize: '16px',
						fontWeight:'bold'
					}
				},
				tooltip: {},
				xAxis: {
					data: echartData.titles,
					axisLabel:{	//x轴字体样式
						textStyle:{
							color:"#A4A6A9", //刻度颜色
							fontSize:10,  //刻度大小
						}
					}
				},
				yAxis: {
					// y 轴线
					axisLine:{
						show:false,        
					},  
					// 分割线设置
					splitLine:{
						show:true,  //显示分割线         
					},
					axisLabel:{
						textStyle:{
							color:"#A4A6A9", //刻度颜色
							fontSize:10,  //刻度大小
						}
					}
				},
				series: [{
					name: '销量',
					type: 'bar',//柱状图
					data: echartData.contents,//[5, 20, 36, 10, 10, 20],
					itemStyle:{	//设置柱状图样式
						normal:{
							color:'yellow',
						}
					}
				}]
			});
		},
		echartsFn(){
			// 基于准备好的dom，初始化echarts实例
			let ageChart  = echarts.init(document.getElementById('ageChart'));
			let loveChart = echarts.init(document.getElementById('loveChart'));
			let jobChart  = echarts.init(document.getElementById('jobChart'));
			this.myChartFunc(ageChart, '年龄', this.echartsArr.age);
			this.myChartFunc(loveChart, '兴趣爱好', this.echartsArr.favorites);
			this.myChartFunc(jobChart, '职业', this.echartsArr.trade);
		}
	}
}
</script>
<style lang="less" scoped>
	.box{
		background: #4F5359;
		padding: 1.5rem 1rem;
		div{
			width: 100%;
			height: 30rem;
		}
	}
</style>
