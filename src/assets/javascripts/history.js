import globalFn from '@/assets/javascripts/globalFn';
//历史足迹
let HistoryData = {
  init (objId){
    //存储历史楼盘
    if(globalFn.getCookieFn('browse_items')!=null){
      let historyArr = globalFn.getCookieFn('browse_items').split(','),isflag = true;
      for(var i=0;i<historyArr.length;i++){
        if(historyArr[i] == objId){
          isflag = false;
        }
      }
      if(isflag){
        var historyId ='';
        if(historyArr.length > 9){
          historyArr.splice(0,1);
        }
        for(var i=0;i<historyArr.length;i++){
          if(i == historyArr.length-1){
            historyId += historyArr[i];
          } else{
            historyId += historyArr[i]+',';
          }
        }
        var loupanId = historyId +','+ objId;
        globalFn.setCookieFn('browse_items',loupanId);
      }
    } else{
      globalFn.setCookieFn('browse_items',objId);
    }
  }
}
export default HistoryData;