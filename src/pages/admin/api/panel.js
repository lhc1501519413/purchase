import global from '@common/js/global';
import request from '@utils/request'
/* 面板数据 */
export function panel() {
  return request({
    method: 'GET',
    params: { c: 'Message', a: 'panel', token: global.token }
  })
}
/* 标记已读 */
export function mark_status(ids) {
  return request({
    method: 'POST',
    params: { c: 'Message', a: 'mark_status', token: global.token },
    data:{ids}
  })
}
/* 消息列表 */
export function get_message_list(page,status) {
  return request({
    method: 'GET',
    params: { c: 'Message', a: 'get_message_list', token: global.token,page,status }
  })
}
/* 消息确认 */
export function confirm(ids) {
  return request({
    method: 'POST',
    params: { c: 'Message', a: 'confirm', token: global.token },
    data:{ids}
  })
}
