import request from '@utils/request';
/* 中标通知书 */
/* 中标通知书列表 */
export function win_notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Sbidwin', a: 'win_notice_list', token: localStorage.getItem('token') },params),
  })
}
/* 中标通知书详情 */
export function get_win_notice_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Sbidwin', a: 'get_win_notice_info', token: localStorage.getItem('token') },params),
  })
}
/* 编辑中标通知书 */
export function save_win_notice(data) {
  return request({
    method: 'POST',
    params: { c: 'Sbidwin', a: 'save_win_notice', token: localStorage.getItem('token') },
    data
  })
}
/* 提交中标通知书 */
export function submit_win_notice(data) {
  return request({
    method: 'POST',
    params: { c: 'Sbidwin', a: 'submit_win_notice', token: localStorage.getItem('token') },
    data
  })
}
