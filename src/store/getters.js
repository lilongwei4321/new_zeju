//工具接口为了方便构建全局state自定义方法

export const msg    = state => state.msg;
//用户id
export const customerId = state => state.customerId;
//用户级别
export const customerLevel = state => state.customerLevel;
//状态
export const cityName    = state => state.cityName;
//来源页
export const fromPath    = state => state.fromPath;
//专属顾问
export const majorAdvisor    = state => state.majorAdvisor;
//用户手机号
export const customerPhone = state => state.customerPhone;
//专属顾问
export const advisorId  = state =>state.advisorId;