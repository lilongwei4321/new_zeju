import Vue from 'Vue';
const obj = 
      { //触发焦点
        'Focus' : {
          //当绑定元素插入到 Dom中
          inserted : (el) =>{
            //焦距元素
            el.focus()
            // el.addEventListener('focus',() =>{
            //   console.log(Vue)
            //   // Vue.$router.push('/city')
            // })
          }
        },
        //滚动 吸顶 显示隐藏
        'SrcollsShow' : {
          bind: function(el,binding){
            window.addEventListener('scroll',moveFn1);
            window.addEventListener("touchmove",moveFn1);
            // move 方法
            function moveFn1(){
              var scrollTop    = window.scrollY;  
              var offsetTop    = el.offsetTop;
              //显示 header
              if(scrollTop > 50 && scrollTop!=0){
                binding.value.headerFn(true);
              } else {
                binding.value.headerFn(false);
              }

              //显示 导航
              if(scrollTop > offsetTop - 110  && scrollTop!=0){
                binding.value.navigationFn(true);
              } else{
                binding.value.navigationFn(false);
              }
            }         
          }
        },
        //滚动 吸顶 固定定位
        'Srcolls' : {
          inserted: function(el,binding){
            window.addEventListener('scroll',scrollFn);
            window.addEventListener("touchmove",scrollFn);
            //滚动
            function scrollFn (){
              var scrollTop    = window.pageYOffset;  
              var offsetTop    = el.offsetTop  ;
              if(scrollTop>offsetTop){
                el.className = binding.value.cls + ' ' + binding.value.cls1;
              } else{
                el.className = binding.value.cls
              }
              var scrollTop    = window.pageYOffset;  
              var offsetTop    = el.offsetTop  ;
              if(scrollTop>offsetTop){
                el.className = binding.value.cls + ' ' + binding.value.cls1;
              } else{
                el.className = binding.value.cls
              }
            }
          }
        },
        //滚动底部  加载更多
        'LoadMore' : {
          inserted: function(el,binding){
            window.addEventListener('scroll',scrollFn);
            window.addEventListener("touchmove",scrollFn);
            //滚动
            function scrollFn () {
              var scrollTop = window.pageYOffset; 
              var boxH      = document.body.clientHeight  || document.documentElement.offsetHeight;
              var screenH   = window.screen.availHeight ;
              if(scrollTop+screenH>= boxH-10  && scrollTop!= 0){
                binding.value(true);
              } else{
                binding.value(false);
              }
            }
          }
        },
        //滚动 事件
        'ScrollMove' : {
          inserted: function(el,binding){
            var startY = 0,endY =0,scrollTop = 0;
            el.addEventListener("touchstart",function(event){
              var touch = event.targetTouches[0];
                  startY = touch.pageY;
                  scrollTop =  el.scrollTop;
            });
            el.addEventListener("touchmove",function(){
              var touch = event.targetTouches[0];
                  //手势滑动时，手势坐标不断变化，取最后一点的坐标为最终的终点坐标
                  endY = touch.pageY;
                  el.scrollTop = scrollTop - (endY - startY) ;
            });
          }
        },
        //楼盘详情页 scroll 
        'ScrollDetail' : {
          inserted: function(el,binding){
            var startY = 0,async= true,startMove = 0;
            var scrollY = 0,clickAsync = true;
            var scrollTop = 0;
            
            window.addEventListener("touchstart",function(event){
              var touch     = event.targetTouches[0];
                  startY    = touch.pageY;
                  scrollY   =  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            });

            window.addEventListener('scroll',function(){
              scrollTop    =document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset; 
              if(scrollY <=scrollTop ){
                async = true;
              } else{
                async = false
              }
              // 下滑页面  导航滚动
              navScroll(scrollTop,async,binding)
            });

            window.addEventListener("touchmove",function(){
              var touch = event.targetTouches[0];
                  startMove = touch.pageY;
                  scrollTop    = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset; 
              if(startY >= startMove){
                async = true;
              } else{
                async = false;
              }
              // 下滑页面  导航滚动
              navScroll(scrollTop,async,binding)
            });

            // 下滑页面  导航滚动
            function navScroll (scrollTop,async,binding) {
              let boxs = document.querySelectorAll('.public_detail'),
                  headerBox= document.getElementById('header_icon'),
                  fixedBox = document.getElementById('fixedHead');

              if(boxs!=undefined && headerBox!=undefined && fixedBox!=undefined){
                  let h1 = headerBox.offsetHeight;
                  let h2 = fixedBox.offsetHeight;
                  let height  = h1 + h2;
                  for(let i=0 ; i<boxs.length ; i++){
                    if( scrollTop + height  <=  boxs[i].offsetTop-20 ){
                      hengScroll(i-1,async,false);
                      binding.value(i-2); 
                      return false;
                    } else if(scrollTop + height <= boxs[i].offsetTop + boxs[i].offsetHeight && i == boxs.length-1){
                      hengScroll(i-1,async,true);
                      binding.value(i-1); 
                    }
                  }	 
              }
            }

            //导航 横向滚动
            function hengScroll (ind,async,lastAsync) {
              if(ind <=0 ){return false;}
              var left = 0;
              var zuo  = document.getElementById('nav');
              let winW  = window.innerWidth-30;
              let zuoban = zuo.scrollLeft;

              if(async){
                left =document.querySelectorAll('#nav a')[ind].offsetLeft;
                if(!lastAsync){
                  if(  left > winW+zuoban){
                    zuo.scrollLeft = left - winW;
                  }
                } else{
                  zuo.scrollLeft = left + document.querySelectorAll('#nav a')[ind].offsetWidth;
                }
              } else {
                left =document.querySelectorAll('#nav a')[ind-1].offsetLeft;
                if(left - zuoban  < 30 ){
                  zuo.scrollLeft = zuoban -(zuoban - left  )
                }
              }
            }
          }
        }
      }

export default obj;