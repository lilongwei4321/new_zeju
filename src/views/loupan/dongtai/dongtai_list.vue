<template>
	<section class="dongtai">
		<router-link :to="`/${cityName}/loupan/${obj.id}/dynamics/${k.id}`"  v-for="(k,ind) in arr" :key="ind">
			<dl class="border">
				<dt>
					<span class="title">{{ k.title }}</span><span class="text_back1 type">{{ k.category }}</span>
				</dt>
				<dd class="content text_ove2">{{ k.content }}</dd>
				<dd class="time">
					<div class="headimg">
						<img :src="backFn(k.user_portrait)" alt="">
					</div>
					<span>{{ k.user_name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ k.created_at }}</span>
				</dd>
			</dl>
		</router-link>
	</section>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
	props : {
		arr : {
			type : Array,
      default :function () {
					return []
			}
		},
		obj : {
			type : Object,
      default :function () {
					return {}
			}
		}
	},
  computed : {...mapGetters(['cityName'])},
	methods :{
		backFn (str) {
      return str!=undefined && str!='' && str!=null ?`http://imgs.zeju.cn/${str}`:'';
    }
	}
}
</script>
<style lang="less" scoped>
	.dongtai{
		padding: 1rem;
		a{
			display: block;
			&:last-child{
				dl:after{
					height: 0;
				}
			}
		}
		dl{
			padding-bottom: 1rem;
			dt{
				display: flex;
				align-items: center;
				padding: .5rem 0;
				.title{
					font-size: 1.6rem;
					color: #333;
					margin-right: 1rem;
				}
				.type{
					display: block;
					padding:.1rem .5rem;
					border-radius: .8rem;
					font-size:1rem;
					background: #FFF;
					border: 1px solid #F63;
				}
			}
			.content{
				font-size: 1.4rem;
				color:#343434;
				-webkit-line-clamp: 3;
			}
			.time{
				display: flex;
				align-items: center;
				margin-top: .5rem;
				.headimg{
					width: 1.4rem;
					display: inline-block;
					img{
						width: 100%;
						display: block;
						border-radius: 50%;
					}
				}
				span{
					padding-left: .5rem;						
					font-size: 1.2rem;
					color: #999;
				}
			}
		}
	}
</style>
