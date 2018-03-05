//时间
export function Weizhi(index,obj,callback){
  let boxs = document.querySelectorAll('.public_detail'),
      zongH = 0,
      winH  = window.innerHeight;
      for(let i=0; i<boxs.length ; i++){
        if(i <= index){
          zongH += boxs[i].clientHeight;
        }
      }
      
      let total  = boxs[index+1].offsetTop;//锚点元素到窗体顶部的距离
      let boxH   = boxs[index].offsetHeight;
      let h1 = document.getElementById('header_icon').offsetHeight;
      let h2 = document.getElementById('fixedHead').offsetHeight;
      let height  = h1 + h2;
      // 获取当前滚动条与窗体顶部的距离
      let distance = document.documentElement.scrollTop  || document.body.scrollTop || window.pageYOffset;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = 0;
      if(zongH > distance ){
        step = (zongH - distance) /60 ;
        smoothDown();
      } else{
        
        step = (  distance - zongH) /60 ;
        smoothUp()
      }
    //down  下一个 页面向上滚动
    function smoothDown () {
      if(distance <= total) {
        distance += step;
        document.body.scrollTop = distance -16;
        document.documentElement.scrollTop = distance -16;
        window.pageYOffset = distance -16;
        setTimeout(smoothDown, 5);
      } else {
        var scrollTop = total- height -16;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        window.pageYOffset = scrollTop;
        if(callback !=undefined){
          callback()
        }
        
      }
    }
    // up  前一个  页面向下滚动
    function smoothUp () {
      if (distance >= total) {
        distance -= step;
        document.body.scrollTop = distance -16;
        document.documentElement.scrollTop = distance  -16;
        window.pageYOffset = distance -16;
        setTimeout(smoothUp, 5);
      } else {
        var scrollTop = total- height -16;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        window.pageYOffset = scrollTop;
        if(callback !=undefined){
          callback()
        }
      }
    }
}
export default {
  Weizhi
}