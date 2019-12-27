import axios from 'axios';
const service = axios.create({
  baseURL: 'https://localhost:7688/', // 固定 url
  timeout: 60000 // request timeout
});
service.interceptors.request.use(
  config => {
    // config.data ={
    //   serverName :'0DADE507-64D6-4306-956A-2ED144FF0ED1',
    //   funcName :'EncryptFile'
    // };
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject('解密超时，请在60秒内完成操作')
  }
)
export function encryption(data) {
  return service({
    url: '/TGCtrlApi',
    method: 'POST',
    data
  })
};