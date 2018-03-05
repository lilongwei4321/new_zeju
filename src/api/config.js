import axios from 'axios'
import qs from 'qs'
 //响应时间
// axios.defaults.timeout = 5000;                       
//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
//配置接口地址          
axios.defaults.baseURL = 'http://webapi2.zeju.com/'; 
// axios.defaults.baseURL = 'http://nwebapi.zeju.com/'; 
// axios.defaults.baseURL = 'http://192.168.3.46:2994/';
// axios.defaults.baseURL = 'http://192.168.3.184:3000/';
// axios.defaults.baseURL = 'http://192.168.3.112:2994/';  
//POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
// 	//在发送请求之前做某件事
//     if(config.method  === 'post'){
//       config.data = qs.stringify(config.data);
//     } else{
//       config.data = qs.stringify(config.data);
//     }
//     return config;
// },(error) =>{
//     return Promise.reject(error);
// });
//返回一个Promise
export function fetch(url, params,type) {
  return new Promise((resolve, reject) => {
    if(type=='post'){
      axios.post(url, params)
      .then(response => {
          resolve(response.data);
      }, err => {
          reject(err);
      })
      .catch((error) => {
          reject(error)
      })
    } else{
      axios.get(url,{params})
      .then(response => {
          resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
          reject(error)
      })
    }   
  })
}