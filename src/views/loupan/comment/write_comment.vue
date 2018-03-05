<template>
  <div class="write_wrap">
    <!-- 楼盘吸顶1 -->
		<header-text  :name="$route.query.name" :headFlag="true"></header-text>
		<section class="main">
			<div class="portrait_fen star">
				<div class="list">
          <span>周边配套：</span>
          <!-- 星状态 -->
          <level-box :levelObj= "{level:mating/2,name:'mating'}" class="xing" @pingXing="pingXing"></level-box>
        </div>
        <div class="list">
          <span>交通便利：</span>
          <!-- 星状态 -->
          <level-box :levelObj= "{level:traffic/2,name:'traffic'}" class="xing" @pingXing="pingXing"></level-box>
        </div>
        <div class="list">
          <span>绿化环境：</span>
          <!-- 星状态 -->
          <level-box :levelObj= "{level:living_condition/2,name:'living_condition'}" class="xing" @pingXing="pingXing"></level-box>
        </div>
			</div>
			<p class="border title">请留下您对&nbsp;{{ $route.query.name }}&nbsp;的评价吧</p>
			<div class="write_comment">
				<textarea  rows="8" placeholder="楼盘位置如何？环境怎么样？您对周边配套规划满意吗？" v-model="remark"></textarea>
			</div>
			<!-- 上传form -->
			<form ref= "uploadForm" enctype="multipart/form-data">  
				<div class="upload box_duo">
					<!-- 图片展示 -->
					<div class="jia transverse_center_center box" v-for="(m,ind) in urlArr" :key="ind">
						<img :src="m" alt="">
					</div>
					<!-- 上传图片 -->
					<div class="jia transverse_center_center" v-if="urlArr.length < 5">
						<i class="iconfont icon-shangchuan"></i>
						<input type="file" class="form-control" @change="doUpload" ref="inputer" name="file">
					</div>
				</div>
			</form>
		</section>
		<footer class="footer">
			<input type="button" value="提交" @click="writeComment" :disabled="message !=''" :class="{'on':message !=''}">
		</footer>
		<!-- 成功提醒 -->
		<div class="message_box" v-if="message !=''">{{message}}</div>
  </div>
</template>
<script>
import api  from '@/api/api';
import {mapGetters} from 'vuex';
//楼盘吸顶
import headerText from '@/components/base/header/header_text.vue';
//评星
import levelBox  from '@/components/page/level/level.vue';
export default {
	data (){
		return {
			dataUrl : '',
			urlArr : [],//上传图片路径
			mating : 10,//周边配置分数
			traffic: 10,//交通方便分数
			living_condition:10,//绿化环境分数
			remark : '',//点评备注
			message : '',
			timer : null
		}
	},
  components: {
		headerText,//楼盘吸顶
		levelBox
	},
	computed : {...mapGetters(['customerId','cityName'])},
	methods: {
		onFileChange(e) {
			let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            let file    = inputDOM.files[0];
						let size = Math.floor(file.size / 1024);
						
						
						this.imgPreview(file);
            // if (size > ...) {
            //     // 这里可以加个文件大小控制
            //     return false
						// }
						
            // 这里就可以获取到文件的名字了
            // this.fileName = this.file.name;
            
            // 这里加个回调也是可以的
						// this.onChange && this.onChange(this.file, inputDOM.value);
		},
		imgPreview (file) {
			 // 看支持不支持FileReader
				if (!file || !window.FileReader) return;
				if (/^image/.test(file.type)) {
						// 创建一个reader
						var reader = new FileReader();
						// 将图片将转成 base64 格式
						reader.readAsDataURL(file);
						// 读取成功后的回调
						reader.onloadend =  (e) =>{
								this.dataUrl = e.target.result;
								this.urlArr.push(e.target.result);
								
						}
				}
		},
		//上传图片事件
		doUpload () {
			var formData = new FormData(this.$refs.uploadForm);
			let dataInfo={
					style:'logo',
					path:2,
					city:1
				}
			for( let key in dataInfo){
				formData.append(key, dataInfo[key]);
			}
			this.uploadImage(formData);
		},
		//上传图片接口
		uploadImage (formData) {
			api.uploadImage(formData).then((res) =>{
				this.urlArr.push(`http://imgs.zeju.cn${res}`);
			});
		},
		//写点评接口
		writeComment () {
			//如果没有登录，返回登录页
			if(this.customerId == null){
				this.$router.push(`/${this.cityName}/login`);
				return false;
			};
			//诸葛IO
			this.zhugeTijiao();
			//提交
			let obj = {
				mating : this.mating,
				traffic : this.traffic,
				living_condition : this.living_condition,
				remark : this.remark,
				loupan_id : this.$route.params.id,//楼盘id
				customer_id : this.customerId,
				img_url : this.urlArr.join('|')
			}
			api.writeComment(obj).then((res) =>{
				if(res.status == 200){
					//提醒倒计时
					this.tiXingDate(res.message);
					//成功后重置
					this.mating  = 10;
					this.traffic = 10;
					this.living_condition = 10;
					this.remark ='';
					this.urlArr = [];
				} else if(res.status == 422){
					this.$router.push(`/${this.cityName}/404`);
				}
			});
		},
		//诸葛
		zhugeTijiao (){
			let obj = {
				'当前页面' : '楼盘写点评页',
				'所属模块' : '楼盘',
				'楼盘ID'   : this.$route.query.id,
				'楼盘名称' : this.$route.query.name,
				'点评内容' : this.remark
			}
			zhuge.track('提交楼盘点评',obj);
		},
		//评星点击
		pingXing (obj) {
			this[obj.name] = obj.ind;
		},
		//提醒倒计时
		tiXingDate (str) {
			let num =3;
			this.message = str;
			this.timer = 	setInterval( () => {
				num --;
				if(num == 0){
					num = 3;
					this.message = '';
					clearInterval(this.timer);
				}
			},1000)
		}
	}
}
</script>
<style lang="less" scoped>
.write_wrap{
	padding-top: 4.4rem;
	background: #F6F5F5;
	.main{
		margin-bottom:1rem;
		.star{
			padding: 1rem 2rem .5rem;
			margin-bottom: 1rem;
			background: #FFF;
			.list{
				display: flex;
				height: 2.5rem;
				span{
					font-size: 1.4rem;
					color: #333;
				}
			}
		}
		.title{
			background: #FFF;
			padding: 0 1rem;
			height: 4.4rem;
			display: flex;
			align-items: center;
			color: #666;
			font-size: 1.4rem;
		}
		.write_comment{
			background: #FFF;
			padding: 1rem 1.5rem;
			textarea{
				width: 100%;
				resize:none;
				border: none;
				font-size: 1.4rem;
				overflow: none;
			}
			::-webkit-textarea-placeholder{
				color: #999;
			}
		}
		.upload{
			background: #FFF;
			justify-content: flex-start;
			.box{
				overflow: hidden;
				img{
					display: block;
					max-width:80%;
				}
			}
			.jia{
				width: 8.8rem;
				height: 8.8rem;
				border: 1px solid #D5D5D5;
				position: relative;
				margin:0 1.8rem;
				margin-bottom:2rem;
				input {
					font-size: 0; /* 为了去掉‘未选择任何文件’这几个字，也可以随便弄到哪里*/
					position: absolute;
					width:100%;
					height: 100%;
					opacity: 0;
				}
				/* 注意不是直接input > input[type=button] 哦*/
				input::-webkit-file-upload-button {
					border: none;
				}
			}
		}
	}
	.footer{
		padding:2rem 1rem;
		box-sizing: border-box;
		background: #fff;
		input{
			display: block;
			width:100%;
			border:none;
			background:#f63;
			color:#fff;
			height: 4rem;
			border-radius: .4rem;
			&.on{
				opacity: .8;
			}
		}
	}
	.message_box{
		position: fixed;
		width:auto;
		padding:0 1rem;
		height: 3.6rem;
		background: rgba(0,0,0,0.8);
		top:50%;
		left:50%;
		border-radius: .6rem;
		color:#fff;
		font-size: 1.5rem;
		text-align: center;
		line-height: 3.6rem;
		transform: translate(-50%,-50%);
	}
}
</style>
