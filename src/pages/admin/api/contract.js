import request from '@utils/request'
/* 获取合同列表 */
export function get_contract_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Contract', a: 'get_contract_list', token: localStorage.getItem('token') },params)
  })
}
/* 合同详情 */
export function get_base_info(code) {
  return request({
    method: 'GET',
    params: { c: 'Contract', a: 'get_base_info', token: localStorage.getItem('token'),code }
  })
}
/* 添加/编辑合同 */
export function save_contract_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'save_contract_info', token: localStorage.getItem('token') },
    data
  })
}
/* 提交合同 */
export function submit_contract(code) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'submit_contract', token: localStorage.getItem('token') },
    data:{code}
  })
}
/* 最终确认合同 */
export function confirm_contract(code) {
  return request({
    method: 'POST',
    params: { c: 'Contract', a: 'confirm_contract', token: localStorage.getItem('token') },
    data:{code}
  })
}