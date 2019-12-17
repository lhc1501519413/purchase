import global from '@common/js/global';
import request from '@utils/request';
/* 合同列表 */
export function get_bid_contract_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Contract', a: 'get_bid_contract_list', token: localStorage.getItem('token') },params),
  })
}
/* 提交合同 */
export function submit_bid_contract(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'submit_bid_contract', token: localStorage.getItem('token') },
    data
  })
}
/* 导入合同 */
export function import_bid_contract(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'import_bid_contract', token: localStorage.getItem('token') },
    data
  })
}
/* 结束合同 */
export function end_bid_contract(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'end_bid_contract', token: localStorage.getItem('token') },
    data
  })
}
/* 添加 / 编辑合同 */
export function save_bid_contract_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'save_bid_contract_info', token: localStorage.getItem('token') },
    data
  })
}
/* 最终确认合同 */
export function confirm_bid_contract(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'confirm_bid_contract', token: localStorage.getItem('token') },
    data
  })
}
/* 合同详情 */
export function get_bid_base_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Contract', a: 'get_bid_base_info', token: localStorage.getItem('token') },params),
  })
}
/* 预览合同 */
export function showContract(code) {
  // open(`${global.host}?c=Pcontract&a=bid_pre_view&code=${code}`);
  open(`http://192.168.2.134/cloud.php?c=Pcontract&a=bid_pre_view&code=${code}`);
}
/* 下载合同 */
export function downloadContract(code) {
  open(`${global.host}?c=Pcontract&a=bid_download&code=${code}`);
}
