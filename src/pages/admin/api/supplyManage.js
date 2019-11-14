import global from '@common/js/global';
import request from '@utils/request'

/* 供应商列表 */
export function get_supply_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Apply', a: 'get_supply_list', token: global.token },params),
  })
}
/* 供应商申请审核列表 */
export function get_apply_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Apply', a: 'get_apply_list', token: global.token },params),
  })
}
/* 审核通过 */
export function audit(supply_id) {
  return request({
    method: 'POST',
    params: { c: 'Apply', a: 'audit', token: global.token },
    data:{supply_id}
  })
}
/* 审核驳回 */
export function refuse(supply_id,remark) {
  return request({
    method: 'POST',
    params: { c: 'Apply', a: 'refuse', token: global.token },
    data:{supply_id,remark}
  })
}
/* 获取基本信息 */
export function get_base_info(supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_base_info', token: global.token,supply_id }
  })
}
/* 获取基本资质 */
export function get_basic_nature_info(supply_id,page_size) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_basic_nature_info', token: global.token,supply_id,page_size }
  })
}
/* 获取特殊资质列表 */
export function get_special_nature_list(supply_id,page_size) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_special_nature_list',token: global.token,supply_id,page_size }
  })
}
/* 获取出资信息基础信息 */
export function get_investment_base_info(supply_id,page_size) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_investment_base_info', token: global.token,supply_id,page_size }
  })
}
/* 获取出资人列表 */
export function get_investment_list(supply_id,page_size) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_investment_list',token: global.token,supply_id,page_size }
  })
}
/* 获取信用信息列表 */
export function get_credit_list(supply_id,page_size) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_credit_list', token: global.token,supply_id,page_size },
  })
}
/* 获取人员列表 */
export function get_people_list(supply_id,page_size) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_people_list', token: global.token,supply_id,page_size },
  })
}
