let globalFn = {
  //取得地址栏 指定参数
  getQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    try {
      return decodeURI(r[2]); 
    } catch(e){
      try {
        return $URL.decode(r[2]); 
      }catch(e) {
        return null;
      } 
    }   
  },
  //获取 cookie 的值
  getCookieFn (name,can) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
      return decodeURI(arr[2]);
    }  else {      
      return can!=null ?can : null;
    }
  },
  //储存 cookie 的值
  setCookieFn (name,value,days){
    var Days = 1000 ;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString()+";domain = zeju.com"+";path=/";
  },
  //删除 cookie 的值
  delCookieFn (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookieFn(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";domain = zeju.com"+";path=/";
  },
  //获取地址栏参数，没有获取cookie，还没有返回''
  getCanShu (str,name) {
    let zhi  = this.getQueryString(str)!=null?this.getQueryString(str): this.getCookieFn(str);
    //地址参数不为空，储存cookie,ru
    if(this.getQueryString(str)!=null){
      this.setCookieFn(str,this.getQueryString(str));
    };

    if(zhi!=null){
      return zhi;
    } else{
      return name!=null ? name : '';
    }
  },
  //数字加零
  setNumLing (num) {
    if(Number(num) <10){
      return '0'+num;
    } else{
      return num;
    }
  },
  //获取zjfrom ，并加零
  getZjfrom () {
    let zjfrom = this.getCookieFn('zjfrom','0');
        zjfrom = this.setNumLing(zjfrom);
        return zjfrom;
  }
}
export default globalFn;