//存放vuex的核心处理函数
export const fun = ({commit}) => {
  commit({
    type: 'getMsg',     //对应mutation.js中的getMsg方法
    msg: '我是修改后的数据...'
  });
};
export const setCookieFn = ({commit},arr) => {
  commit({
    type: 'setCookie',     //对应mutation.js中的getMsg方法
    name : arr[0] ,
    num  : arr[1]
  });
};
export const delCookieFn = ({commit},arr) => {
  commit({
    type: 'delCookie',     //对应mutation.js中的getMsg方法
    name : arr[0] ,
    num  : arr[1]
  });
};