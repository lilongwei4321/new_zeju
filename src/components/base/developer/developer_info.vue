<!-- 特价楼盘详情 -->
<template>
	<section class="developer">
		<dl>
			<dt><img src="/static/assets/images/zeju-logo.png" alt=""></dt>
			<dd><label>公司名称：</label><span>万科集团</span></dd>
			<dd><label>公司地址：</label><span>北京市通州区</span></dd>
			<dd><label>公司人员：</label><span>1000人</span></dd>
			<dd><label>发展国家：</label><span>4个</span></dd>
		</dl>
	</section>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		components: {

		},
		methods : {

		},
		created : function () {

    }
	}
</script>
<style lang="less" scoped>
	.developer{
		padding: 0 1rem 1rem;
		dl{
			dt{
				padding: 1.3rem 0;
				width: 19rem;
				margin: 0 auto;
				img{
					width: 100%;
					display: block;
				}
			}
			dd{
				font-size: 1.4rem;
				line-height: 2rem;
				label{
					color: #999;
				}
				span{
					color: #151515;
				}
			}
		}
	}
</style>