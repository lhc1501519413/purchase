import global from '@common/js/global';
import request from '@utils/request';
/* 开标列表 */
export function open_bid_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Sbid', a: 'open_bid_list', token: global.token },params),
  })
}
/* 获取待解密文件列表 */
export function get_decrypt_file(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Sbid', a: 'get_decrypt_file', token: global.token, bid_code},
  })
}
/* 解密文件 */
export function decrypt_bid(data) {
  return request({
    method: 'POST',
    params: { c: 'Sbid', a: 'decrypt_bid', token: global.token },
    data
  })
}