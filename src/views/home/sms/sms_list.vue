<template>
  <div class="unread_wrap">
    <ul>
      <li v-for="(m,key) in arr" :key ="key">
        <router-link :to="m.src">
          <dl class="transverse_fen_center">
            <dt class="iconfont icon-weixin" v-if="m.url ==''"></dt>
            <dt class="back" v-else :style="{'backgroundImage':'url('+m.url+')'}"></dt>
            <dd class="border portrait_center_ya">
              <h4 class="transverse_fen_center"><span>{{m.title}}</span><time>{{m.time}}</time></h4>
              <p class="text_ove1">{{m.text}}</p>
            </dd>
          </dl>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props : {
    arr : {
      type : Array,
      default : function (){
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped >

</style>