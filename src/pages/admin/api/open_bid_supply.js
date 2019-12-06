import request from '@utils/request';
/* 开标列表 */
export function open_bid_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Sbid', a: 'open_bid_list', token: localStorage.getItem('token') },params),
  })
}
/* 获取待解密文件列表 */
export function get_decrypt_file(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Sbid', a: 'get_decrypt_file', token: localStorage.getItem('token'), bid_code},
  })
}
/* 解密文件 */
export function decrypt_bid(data) {
  return request({
    method: 'POST',
    params: { c: 'Sbid', a: 'decrypt_bid', token: localStorage.getItem('token') },
    data
  })
}
/* 获取解密详情 */
export function get_decrypt_info(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Sbid', a: 'get_decrypt_info', token: localStorage.getItem('token'), bid_code},
  })
}