import global from '@common/js/global';
import request from '@utils/request'
/* 获取公告列表 */
export function get_notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pinquiry', a: 'get_notice_list' },params,{key:'value'})
  })
}
/* 公告详情 */
export function get_inquiry_base_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pinquiry', a: 'get_inquiry_base_info' },params,{key:'value'})
  })
}
/* 最新询价单列表 */
export function get_inquiry_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pinquiry', a: 'get_inquiry_list' },params,{key:'value'})
  })
}
