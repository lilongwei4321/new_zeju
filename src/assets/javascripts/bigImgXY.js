let bigImgXY = {
    init (el,obj,callback) {
      let X   = el.scrollLeft,
					Y   = el.scrollTop,
					W   = el.clientWidth,
					H   = el.clientHeight ,
					x  = Number(obj.left),
					y  = Number(obj.top);
			//回调函数
      this.callback = callback!=undefined?callback:function(){};
      //判断标注是否大于盒子宽度一半
      this.scrollFn(el,x,W/2,X,'x');
			//判断标注是否大于盒子高度一半
			this.scrollFn(el,y,H/2,Y,'y');
    },
    //滚动到指定位置
		scrollFn (el,x,lef,X,str) {
			//判断左右，还是上下
			var  nameStr = 'scrollLeft';
			if(str == 'y'){nameStr = 'scrollTop'};
			//标注大于视口一半加滚动距离
			if(x > lef+X){
				let s = (x-lef) /20;
				this.smoothDown(el,X,x,s,lef,nameStr);
			} else{
				//标注小于视口一半
				if(x<=lef){
					let s= X/20;
					this.smoothUp(el,X,x,s,lef,0,nameStr);
				} 
				//标注大于视口一半，但是 视口加滚动距离大于标注
				else if(x >lef && X+lef >= x){
					let s= (X-(x-lef))/20;
					this.smoothUp(el,X,x,s,lef,x-lef,nameStr);
				}
			}
    },
    //滚动距离增大
    smoothDown (box,X,x,s,lef,nameStr) {
      if(X <= (x-lef)) {
				X += s;
				box[nameStr] =X;
        setTimeout(()=>{
					this.smoothDown(box,X,x,s,lef,nameStr)
				}, 10);
      } else {
				box[nameStr] =X;
        //动画完成，再次点击
        this.callback (nameStr)
      }
    },
    //滚动距离减小
		smoothUp (box,X,x,s,lef,num,nameStr) {
			if(X > num) {
				X -= s;
				box[nameStr] =X;
				setTimeout(()=>{
					this.smoothUp(box,X,x,s,lef,num,nameStr)
				}, 10);
			} else {
				box[nameStr] =X;
        //动画完成，再次点击
        this.callback (nameStr)
			}
		}
}


export default bigImgXY