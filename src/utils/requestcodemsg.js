import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@indexStore'
import global from '@common/js/global';
// create an axios instance
const service = axios.create({
  baseURL: global.baseUrl, // 固定 url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // config.headers['X-Token'] = getToken()
      // config.params ={
      //   funcName :'EncryptFile'
      // };
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      // vm.$message.error(res.msg);
      if (res.code === 100) {
        store.commit('SET_TOKEN',null);
        store.commit('SET_USERNAME',null);
        store.commit('SET_TYPE',null);
        localStorage.clear();
        setTimeout(()=>{
          location.href = global.host + "/index.html#/login"
        },1500)
      }
      // if (res.code === -1) {
      //   setTimeout(()=>{
      //     location.href = global.host + "/index.html#/login"
      //   },1500)
      // }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
