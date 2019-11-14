import global from '@common/js/global';
import request from '@utils/request';
/* 评审项目列表 */
export function bid_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Judge', a: 'bid_list', token: global.token },params),
  })
}
/* 专家签到 */
export function sign_judge(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'sign_judge', token: global.token },
    data
  })
}
/* 获取专家签到信息 */
export function get_sign_info(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'bid_list', token: global.token,bid_code }
  })
}