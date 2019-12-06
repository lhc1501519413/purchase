import request from '@utils/request'

/* 公告列表 */
export function get_notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Supplyinquiry', a: 'get_notice_list', token: localStorage.getItem('token') },params),
  })
}
/* 询价单列表 */
export function supply_inquiry_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Supplyinquiry', a: 'supply_inquiry_list', token: localStorage.getItem('token') },params),
  })
}
/* 询价单详情 */
export function get_supply_inquiry_info(inquiry_code) {
  return request({
    method: 'GET',
    params: { c: 'Supplyinquiry', a: 'get_supply_inquiry_info', token: localStorage.getItem('token'), inquiry_code },
  })
}
/* 报价保存 */
export function save_supply_stock_list(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplyinquiry', a: 'save_supply_stock_list', token: localStorage.getItem('token') },
    data,
  })
}
/* 报价询价单删除 */
export function del_supply_inquiry(inquiry_code) {
  return request({
    method: 'POST',
    params: { c: 'Supplyinquiry', a: 'del_supply_inquiry', token: localStorage.getItem('token') },
    data:{inquiry_code},
  })
}
/* 报价询价单取消报价 */
export function cancel_supply_report(inquiry_code) {
  return request({
    method: 'POST',
    params: { c: 'Supplyinquiry', a: 'cancel_supply_report', token: localStorage.getItem('token') },
    data:{inquiry_code},
  })
}



