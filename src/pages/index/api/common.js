import global from '@common/js/global';
import request from '@utils/request'
/* 获取公告列表 */
export function get_notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pinquiry', a: 'get_notice_list' },params)
  })
}
/* 公告详情 */
export function get_inquiry_base_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pinquiry', a: 'get_inquiry_base_info' },params)
  })
}
/* 最新询价单列表 */
export function get_inquiry_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pinquiry', a: 'get_inquiry_list' },params)
  })
}
/* 公告列表 */
export function get_Pbid_notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pbid', a: 'notice_list' },params)
  })
}
/* 公告详情 */
export function get_Pbid_notice_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Pbid', a: 'notice_info' },params)
  })
}


