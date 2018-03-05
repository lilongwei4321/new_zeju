//时间
let GetDate = {
  init (obj,async) {
    let now  = obj.now,
        end  = obj.end,
        date = (end - now)/1000,
        Async  = async ==undefined ? true: false;
        return this.dao_date (date,Async);
  },
  //转换 年月日-时分秒
  turn  (num,async) {
    let date = new Date(num),
        year = date.getFullYear(),
        yue  = date.getMonth()+1,
        ri   = date.getDate(),
        shi  = date.getHours(),
        fen  = date.getMinutes(),
        miao = date.getSeconds(),
        Async  = async ==undefined ? true: false,
        obj  = {};
  
        if(Async){
          year = this.jia_ling(year); 
          yue  = this.jia_ling(yue); 
          ri   = this.jia_ling(ri); 
          shi  = this.jia_ling(shi); 
          fen  = this.jia_ling(fen); 
          miao = this.jia_ling(miao); 
        }    
    return obj = {year,yue,ri,shi,fen,miao};
  },
  //加零
  jia_ling (num) {
    return num<10?'0'+num:num;
  },
  //时间差
  dao_date  (date,async)  {
    let shi  = Math.floor(date/3600),
        fen  = Math.floor((date-shi*3600)/60),
        miao = Math.floor((date-shi*3600)%60),
        obj  = {} ;
        if(async) {
          shi  = this.jia_ling(shi); 
          fen  = this.jia_ling(fen); 
          miao = this.jia_ling(miao); 
        }
        return obj = {shi,fen,miao};
  }
}

export default GetDate;