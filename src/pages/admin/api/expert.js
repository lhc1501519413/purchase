import request from '@utils/request';
/* 专家列表接口 */
/* 专家列表 */
export function expert_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Expert', a: 'expert_list', token: localStorage.getItem('token') },params),
  })
}
/* 添加/保存专家 */
export function save_expert(data) {
  return request({
    method: 'POST',
    params: { c: 'Expert', a: 'save_expert', token: localStorage.getItem('token') },
    data
  })
}
/* 删除专家 */
export function del_expert(user_id) {
  return request({
    method: 'POST',
    params: { c: 'Expert', a: 'del_expert', token: localStorage.getItem('token') },
    data:{user_id}
  })
}
/* 专家抽取接口 */
/* 专家抽取项目列表 */
export function experts_draw_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'experts_draw_list', token: localStorage.getItem('token') },params),
  })
}
/* 保存抽取专家 */
export function save_bid_expert(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_expert', token: localStorage.getItem('token') },
    data
  })
}
/* 获取抽取详情 */
export function get_expert_draw_info(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_expert_draw_info', token: localStorage.getItem('token'), bid_code}
  })
}




