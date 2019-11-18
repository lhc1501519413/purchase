import global from '@common/js/global';
import request from '@utils/request';
/* 开标评标列表 */
export function open_bid_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'open_bid_list', token: global.token }, params),
  })
}
/* 获取项目评审中的状态 */
export function get_judge_info(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'open_bid_list', token: global.token, bid_code },
  })
}
/* 获取参与评审专家列表 */
export function get_bid_judge_expert(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_judge_expert', token: global.token, bid_code },
  })
}
/* 设置参与评审专家列表 */
export function set_bid_expert(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'set_bid_expert',token: global.token,  },
    data
  })
}
/* 获取待解密供应商 */
export function get_open_supply_list(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_open_supply_list', token: global.token, bid_code },
  })
}
/* 开启解密 */
export function open_decrypt(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_decrypt', token: global.token },
    data:{bid_code}
  })
}
/* 开启标书 */
export function open_bid_file(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_bid_file', token: global.token },
    data:{bid_code}
  })
}
/* 获取参与评审供应商 */
export function get_judge_supply_list(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_supply_list', token: global.token, bid_code }
  })
}
/* 开启评审（资格审查） */
export function start_judge(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'start_judge', token: global.token },
    data:{bid_code}
  })
}
/* 获取资格审查详细信息 */
export function get_judge_quality(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_quality', token: global.token, bid_code }
  })
}
/* 获取符合性审查详细信息 */
export function get_judge_match(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_match', token: global.token, bid_code }
  })
}
/* 获取商务技术评分 */
export function get_judge_quality_grade(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_quality_grade', token: global.token, bid_code }
  })
}



