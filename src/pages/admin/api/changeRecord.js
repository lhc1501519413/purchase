import request from '@utils/request'
/* 注册变更记录列表 */
export function change_list(page) {
  return request({
    method: 'GET',
    params:{ c: "Supply", a: "change_list",token:localStorage.getItem('token'),page }
  })
}
/* 注册变更详情 */
export function change_log_info(code) {
  return request({
    method: 'GET',
    params:{ c: "Supply", a: "change_log_info",token:localStorage.getItem('token'),code }
  })
}
