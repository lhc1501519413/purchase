import global from '@common/js/global';
import request from '@utils/request';
/* 合同列表 */
export function get_bid_scontract_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Scontract', a: 'get_bid_scontract_list', token: localStorage.getItem('token') },params),
  })
}
/* 合同详情 */
export function get_bid_base_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Scontract', a: 'get_bid_base_info', token: localStorage.getItem('token') },params),
  })
}
/* 编辑合同 */
export function save_bid_scontract_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Scontract', a: 'save_bid_scontract_info', token: localStorage.getItem('token') },
    data
  })
}
/* 确认合同 */
export function confirm_bid_scontract(data) {
  return request({
    method: 'POST',
    params: { c: 'Scontract', a: 'confirm_bid_scontract', token: localStorage.getItem('token') },
    data
  })
}
/* 退回合同 */
export function reback_bid_scontract(data) {
  return request({
    method: 'POST',
    params: { c: 'Scontract', a: 'reback_bid_scontract', token: localStorage.getItem('token') },
    data
  })
}
/* 预览合同 */
export function showContract(code) {
  open(`${global.baseUrl}?c=Pcontract&a=bid_pre_view&code=${code}`);
}
/* 下载合同 */
export function downloadContract(code) {
  open(`${global.baseUrl}?c=Pcontract&a=bid_download&code=${code}`);
}
