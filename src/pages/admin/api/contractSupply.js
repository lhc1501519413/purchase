import global from '@common/js/global';
import request from '@utils/request'
/* 获取合同列表 */
export function get_scontract_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Scontract', a: 'get_scontract_list', token: global.token },params)
  })
}
/* 合同详情 */
export function get_base_info(code) {
  return request({
    method: 'GET',
    params: { c: 'Contract', a: 'get_base_info', token: global.token,code }
  })
}
/* 编辑合同 */
export function save_scontract_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Scontract', a: 'save_scontract_info', token: global.token },
    data
  })
}
/* 退回合同 */
export function reback_scontract(code,remark) {
  return request({
    method: 'POST',
    params: { c: 'Scontract', a: 'reback_scontract', token: global.token },
    data:{code,remark}
  })
}
/* 确认合同 */
export function confirm_scontract(code) {
  return request({
    method: 'POST',
    params: { c: 'Scontract', a: 'confirm_scontract', token: global.token },
    data:{code}
  })
}