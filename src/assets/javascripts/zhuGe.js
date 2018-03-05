import globalFn from '@/assets/javascripts/globalFn';
let zhuGe = {
  //获客级别
  levelMode (num) {
    var val = globalFn.getZjfrom(),
        obj = {
          '01' : ['付费推广','百度搜索M'],
          '06' : ['付费推广','百度搜索PC'],
          '09' : ['付费推广','百度直通车M'],
          '03' : ['付费推广','百度信息流M'],
          '02' : ['付费推广','百度DSP_M'],
          '15': ['付费推广','百度DSP_PC'],
          '07' : ['付费推广','360搜索PC'],
          '12': ['付费推广','搜狗搜索M'],
          '13': ['付费推广','搜狗搜索PC'],
          '14': ['付费推广','神马搜索M'],
          '04' : ['付费推广','一点资讯M'],
          '05' : ['付费推广','网易新闻M'],
          '16': ['自然流量','自然流量M'],
          '00' : ['自然流量','自然流量PC'],
          '08' : ['社群营销','618'],
          '10': ['渠道合作','淘宝房产'],
          '11': ['渠道合作','国美房产'],
          '17': ['付费推广','广点通'],
          '18': ['付费推广','智慧推']
        }
    if(num==1){
      return obj[val][num];
    }  else {
      return obj[val][num];
    }
  },
  //获取所有cookie值
  getAllCookie () {
    let tgjh   = globalFn.getCanShu('tgjh'), // 推广计划
        tgdy   = globalFn.getCanShu('tgdy'), // 推广单元
        tgsb   = globalFn.getCanShu('tgsb'), // 推广设备
        tgcy   = globalFn.getCanShu('tgcy'), //推广创意
        gjc    = globalFn.getCanShu('gjc'),  //点击关键词
        gjcppms= globalFn.getCanShu('gjcppms'),//关键词匹配模式
        gjcpm  = globalFn.getCanShu('gjcpm'),//关键词排名
        ggsc   = globalFn.getCanShu('ggsc'), //广告素材
        ggw    = globalFn.getCanShu('ggw'),  //广告位
        pd     = globalFn.getCanShu('pd'),   //广告频道
        xq     = globalFn.getCanShu('xq'),   //定向人群兴趣
        xb     = globalFn.getCanShu('xb'),   //定向人群性别
        nld    = globalFn.getCanShu('nld'), //定向人群年龄段
        sourcePage = globalFn.getCookieFn('sourcePage'),
        cityHanName   = globalFn.getCookieFn('cityHanName');

        zhuge.setSuperProperty({
          '来源页面'  : sourcePage,
          '当前城市'  : cityHanName,
          '推广计划'  : tgjh,
          '推广单元'  : tgdy,
          '推广设备'  : tgsb,
          '推广创意'  : tgcy,
          '广告素材'  : ggsc,
          '广告位'    : ggw,
          '广告频道'  : pd,
          '点击关键词': gjc,
          '关键词排名': gjcpm,
          '关键词匹配模式': gjcppms,
          '定向人群 - 兴趣'  : xq,
          '定向人群 - 性别'  : xb,
          '定向人群 - 年龄段': nld,
          '一级获客方式'  : '推广',
          '二级获客方式'  : this.levelMode(0),
          '三级获客方式'  : this.levelMode(1)
        });

        
  },
  //点击筛选
  clickShaixuan (obj) {
    let style = this.getStyles(obj);
    let str   = this.getNeiRong(obj);
    if(style == '') {return false};
    zhuge.track('提交楼盘筛选', {
      '当前页面' : obj.thePage,
      '所属模块' : '楼盘',
      '筛选类型' : style,
      '筛选内容' : str,
    });
  },
  //获取筛选项
  getStyles (obj) {
    let arr = [];
    if(obj.area_ids.length    >0) {arr.push('区域')};
    if(obj.prices.length      >0) {arr.push('价格')};
    if(obj.room_counts.length >0) {arr.push('房型')};

    if(JSON.stringify(obj.moreObj) != "{}"){
      let Obj = obj.moreObj;
      if(Obj.property_types.length >0) {arr.push('类型')};
      if(Obj.labels.length >0) {arr.push('特色')};

      if(Obj.total_price[0].replace(/\s+/g,"") !='') {arr.push('最低总价')};
      if(Obj.total_price[1].replace(/\s+/g,"") !='') {arr.push('最高总价')};
      if(Obj.area[0].replace(/\s+/g,"") !='') {arr.push('最小面积')};
      if(Obj.area[1].replace(/\s+/g,"") !='') {arr.push('最大面积')};
    }
    return arr.join(',');
  },
  //获取筛选内容
  getNeiRong (obj) {
    let arr = [];
    if(obj.area_ids.length    >0) {arr.push(obj.area_ids.join(','))};
    if(obj.prices.length      >0) {arr.push(obj.prices.join(','))};
    if(obj.room_counts.length >0) {arr.push(obj.room_counts.join(','))};

    if(JSON.stringify(obj.moreObj) != "{}"){
      let Obj = obj.moreObj;
      if(Obj.property_types.length >0) {arr.push(Obj.property_types.join(','))};
      if(Obj.labels.length >0) {arr.push(Obj.labels.join(','))};

      if(Obj.total_price[0].replace(/\s+/g,"") !='') {arr.push(Obj.total_price[0]+'万元')};
      if(Obj.total_price[1].replace(/\s+/g,"") !='') {arr.push(Obj.total_price[1]+'万元')};
      if(Obj.area[0].replace(/\s+/g,"") !='') {arr.push(Obj.area[0]+'㎡')};
      if(Obj.area[1].replace(/\s+/g,"") !='') {arr.push(Obj.area[1]+'㎡')};
    }
    return arr.join('|');
  },
  //房贷计算器清空
  resetFangData (name){
    var obj = {
      '当前页面' : '房贷计算器页',
      '所属模块' : '小工具'
    }
    zhuge.track(name,obj);
  },
  //所属模块
  theModular (name) {
    let str = name!=undefined?name:globalFn.getCookieFn('sourcePage');
    switch (str) {
      case '首页' :
      case '选择城市页' :
        return '首页';
      break;
      case '顾问列表页' :
      case '顾问详情页' :
      case '买房人评价列表页' :
        return '顾问';
      break;
      case '注册页' :
      case '登录页' :
      case '专属顾问页' :
      case '关注楼盘页' :
      case '我的带看页' :
      case '我的成交页' :
      case '我的消息页' :
      case '我的足迹页' :
      case '个人中心首页' :
        return '个人中心';
      break;
      case '会员服务页' :
      case '买到宝服务页' :
      case '会员服务购买结果页' :
        return '会员服务';
      break;
      case '一房一价页' :
      case '搜索楼盘页' :
      case '楼栋信息页' :
      case '楼盘列表页' :
      case '户型列表页' :
      case '楼盘点评列表页':
      case '楼盘写点评页' :
      case '楼盘相册页' :
      case '楼盘详情页' :
      case '特卖列表页' :
      case '特卖详情页' :
      case '看房记录页' :
      case '品牌馆列表页' :
      case '品牌馆详情页' :
      case '开发商详情页' :
      case '楼盘动态列表页' :
      case '楼盘动态详情页' :
      case '相关楼盘列表页' :
      case '楼盘评测列表页' :
      case '楼盘评测详情页' :
      case '特卖楼盘列表页' :
      case '特色频道列表页' :
      case '特色频道详情页' :
      case '位置及周边地图页' :
      case '位置及周边详情页' :
      case '顾问买房人评价页' :
        return '楼盘';
      break;
      case '故事列表页' :
      case '故事详情页' :
        return '择居故事';
      break;
      case '百科首页' :
      case '百科列表页' :
      case '百科详情页' :
        return '择居百科';
      break;
      case '房贷计算器页' :
        return '小工具';
      break;
      case '活动页' :
        return '活动';
      break;
    }
  }
}
export default zhuGe;