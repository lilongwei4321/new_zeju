import globalFn from '@/assets/javascripts/globalFn';
//改版store中各种状态的地方
export const getMsg = (state, payload) => {
  state.msg = payload.msg;
}
//储存一些cookie值
export const setCookie = (state, payload) => {
  globalFn.setCookieFn(payload.name, payload.num );
  state[payload.name] = payload.num;
}

//储存一些cookie值
export const delCookie = (state, payload) => {
  globalFn.delCookieFn(payload.name);
  state[payload.name] = payload.num;
}