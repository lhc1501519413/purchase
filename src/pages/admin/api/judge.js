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
    params: { c: 'Judge', a: 'get_sign_info', token: global.token,bid_code }
  })
}
/* 获取项目评审中的状态 */
export function get_judge_info(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_info', token: global.token,bid_code }
  })
}
/* 获取资格审查列表数据 */
export function get_judge_quality(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_quality', token: global.token,bid_code }
  })
}
/* 获取专家签到信息 */
export function get_judge_quality_detail(bid_code,supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_quality_detail', token: global.token, bid_code, supply_id }
  })
}
/* 保存资格审查列表数据 */
export function save_judge_quality(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_quality', token: global.token },
    data
  })
}
/* 保存资格审查供应商明细数据 */
export function save_judge_quality_detail(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_quality_detail', token: global.token },
    data
  })
}
/* 获取符合性审查列表数据 */
export function get_judge_match(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_match', token: global.token,bid_code }
  })
}
/* 保存符合性审查列表数据 */
export function save_judge_match(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_match', token: global.token },
    data
  })
}
/* 获取商务技术评分 */
export function get_judge_quality_grade(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_quality_grade', token: global.token,bid_code }
  })
}
/* 保存商务技术评分 */
export function save_judge_quality_grade(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_quality_grade', token: global.token },
    data
  })
}
/* 获取商务技术评分明细 */
export function get_judge_quality_grade_detail(bid_code,supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_quality_grade_detail', token: global.token,bid_code,supply_id }
  })
}
/* 保存商务技术评分明细 */
export function save_judge_quality_grade_detail(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_quality_grade_detail', token: global.token },
    data
  })
}
/* 获取商务技术评分汇总 */
export function get_judge_total_quality_grade(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_total_quality_grade', token: global.token,bid_code }
  })
}
/* 获取报价评审列表 */
export function get_judge_report(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_report', token: global.token,bid_code }
  })
}
/* 获取供应商报价详情 */
export function get_judge_report_detail(bid_code,supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_report_detail', token: global.token,bid_code,supply_id }
  })
}
/* 保存报价详情 */
export function save_judge_report_detail(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_report_detail', token: global.token },
    data
  })
}
/* 获取得分汇总 */
export function get_judge_result(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_result', token: global.token,bid_code }
  })
}












