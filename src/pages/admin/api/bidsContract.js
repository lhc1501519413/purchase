import global from '@common/js/global';
import request from '@utils/request';
/* 合同列表 */
export function get_bid_contract_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Contract', a: 'get_bid_contract_list', token: global.token },params),
  })
}
/* 提交合同 */
export function get_bid_contract_list(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'submit_bid_contract', token: global.token },
    data
  })
}
/* 添加 / 编辑合同 */
export function save_bid_contract_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'save_bid_contract_info', token: global.token },
    data
  })
}
/* 最终确认合同 */
export function confirm_bid_contract(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'confirm_bid_contract', token: global.token },
    data
  })
}
/* 合同详情 */
export function get_bid_base_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Contract', a: 'get_bid_base_info', token: global.token },params),
  })
}
