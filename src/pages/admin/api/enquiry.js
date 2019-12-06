import request from '@utils/request'

/* 公告列表 */
export function get_notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Inquiry', a: 'get_notice_list', token: localStorage.getItem('token') },params),
  })
}
/* 询价单列表 */
export function get_inquiry_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Inquiry', a: 'get_inquiry_list', token: localStorage.getItem('token') },params),
  })
}
/* 询价单详情 */
export function get_inquiry_info(code) {
  return request({
    method: 'GET',
    params: { c: 'Inquiry', a: 'get_inquiry_info', token: localStorage.getItem('token'), code },
  })
}
/* 报价详情 */
export function get_inquiry_report_info(inquiry_code,supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Inquiry', a: 'get_inquiry_report_info', token: localStorage.getItem('token'), inquiry_code,supply_id },
  })
}
/* 有效商品列表 */
export function get_stock_by_con(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Stock', a: 'get_stock_by_con', token: localStorage.getItem('token') },params),
  })
}
/* 添加/编辑询价单 */
export function save_inquiry(data) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'save_inquiry', token: localStorage.getItem('token') },
    data
  })
}
/* 提交询价单 */
export function inquiry_submit(id) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_submit', token: localStorage.getItem('token') },
    data:{id}
  })
}
/* 驳回询价单 */
export function inquiry_refuse(id) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_refuse', token: localStorage.getItem('token') },
    data:{id}
  })
}
/* 审核询价单 */
export function inquiry_audit(id) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_audit', token: localStorage.getItem('token') },
    data:{id}
  })
}
/* 撤回询价单 */
export function inquiry_re_back(id) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_re_back', token: localStorage.getItem('token') },
    data:{id}
  })
}
/* 删除询价单 */
export function inquiry_del(id) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_del', token: localStorage.getItem('token') },
    data:{id}
  })
}
/* 放弃询价单 */
export function inquiry_give_up(data) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_give_up', token: localStorage.getItem('token') },
    data
  })
}
/* 确认询价单 */
export function inquiry_confirm(id) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'inquiry_confirm', token: localStorage.getItem('token') },
    data:{id}
  })
}
/* 终止询价单 */
export function end_contract(inquiry_code) {
  return request({
    method: 'POST',
    params: { c: 'Inquiry', a: 'end_contract', token: localStorage.getItem('token') },
    data:{inquiry_code}
  })
}
