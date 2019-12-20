import axios from 'axios'
import store from '@indexStore'
import global from '@common/js/global';
const service = axios.create({
  baseURL: global.baseUrl, // 固定 url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // config.headers['X-Token'] = getToken()
      // config.params ={
      //   funcName :'EncryptFile'
      // };
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 100) {
        store.commit('SET_TOKEN',null);
        store.commit('SET_USERNAME',null);
        store.commit('SET_TYPE',null);
        store.commit('SET_LOGINED',false);
        localStorage.clear();
        setTimeout(()=>{
          location.href = global.host + "/index.html#/login"
        },1500)
      }
      return Promise.reject(res.msg)
    } else {
      return res
    }
  },
  error => {
    return Promise.reject('网络连接错误')
  }
)

export default service
