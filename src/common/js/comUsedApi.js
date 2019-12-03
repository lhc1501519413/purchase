/* 通用接口 */
import global from '@common/js/global';
import request from '@utils/request';
/* 获取当前账户有效公司列表 */
export function get_user_com_list() {
  return request({
    method: 'GET',
    params: { c: 'Comdep', a: 'get_user_com_list', token: global.token }
  })
}
/* 获取公司价格执行区域列表 */
export function get_com_price_region(com_id) {
  var com_id = com_id||'';
  return request({
    method: 'GET',
    params: { c: 'Comdep', a: 'get_com_price_region', token: global.token,com_id }
  })
}
/* 获取公司价格配送区域列表 */
export function get_shipping_region(price_region_id) {
  var price_region_id = price_region_id||'';
  return request({
    method: 'GET',
    params: { c: 'Comdep', a: 'get_shipping_region', token: global.token,price_region_id }
  })
}
/* 获取全部公司价格配送区域列表 */
export function get_all_shipping_region(com_id) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Comdep', a: 'get_all_shipping_region', token: global.token },com_id)
  })
}
/* 公告列表 */
export function get_notice_list(params) {
  return request({
    method: 'GET',
    params:  Object.assign({ c: 'Pinquiry', a: 'get_notice_list' },params,{key:'value'})
  })
}
/* 公告详情 */
export function get_inquiry_base_info(inquiry_code) {
  return request({
    method: 'GET',
    params:  { c: 'Pinquiry', a: 'get_inquiry_base_info' ,inquiry_code}
  })
}



