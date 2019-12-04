import global from '@common/js/global';
import request from '@utils/request';
import requestcodemsg from '@utils/requestcodemsg';
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
/* 专家开启评审 */
export function open_judge(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'open_judge', token: global.token },
    data:{bid_code}
  })
}
/* 评审下一步操作 */
export function check_judge_next(bid_code,step) {
  return requestcodemsg({
    method: 'POST',
    params: { c: 'Judge', a: 'check_judge_next', token: global.token },
    data:{bid_code,step}
  })
}
/* 获取项目评标中的状态 */
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
/* 提交商务技术评分汇总 */
export function submit_judge_total_quality_grade(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'submit_judge_total_quality_grade', token: global.token },
    data
  })
}
/* 获取报价评审列表 */
export function get_judge_report(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_report', token: global.token,bid_code }
  })
}
/* 保存报价评审 */
export function save_judge_report(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_report', token: global.token },
    data
  })
}
/* 获取供应商报价详情 */
export function get_judge_report_detail(bid_code,supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'get_judge_report_detail', token: global.token,bid_code,supply_id }
  })
}
/* 保存供应商报价详情 */
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
/* 标记推荐供应商 */
export function save_judge_supply_elect(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_judge_supply_elect', token: global.token },
    data
  })
}

/* 废标供应商列表 */
export function scrap_supply_list(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Judge', a: 'scrap_supply_list', token: global.token,bid_code }
  })
}
/* 获取废标记录 */
export function get_scrap_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Judge', a: 'get_scrap_list', token: global.token},params)
  })
}
/* 专家组长获取废标详情 */
export function get_start_scrap_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Judge', a: 'get_start_scrap_info', token: global.token},params)
  })
}
/* 普通专家获取废标详情 */
export function get_scrap_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Judge', a: 'get_scrap_info', token: global.token},params)
  })
}
/* 发起/修改废标 */
export function save_start_scrap(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_start_scrap', token: global.token },
    data
  })
}
/* 取消废标 */
export function cancel_scrap(scrap_code) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'cancel_scrap', token: global.token },
    data:{scrap_code}
  })
}
/* 提交废标意见 */
export function submit_scrap(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'submit_scrap', token: global.token },
    data
  })
}
/* 重新计算报价得分 */
export function redo_report_score(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'redo_report_score', token: global.token },
    data
  })
}
/* 退回专家打分 */
export function back_expert_judge_score(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'back_expert_judge_score', token: global.token },
    data
  })
}
/* 流标 */
export function save_bid_fail(data) {
  return request({
    method: 'POST',
    params: { c: 'Judge', a: 'save_bid_fail', token: global.token },
    data
  })
}
/* 获取商务技术附件和价格附件 */
export function get_supply_file_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Judge', a: 'get_supply_file_list', token: global.token},params)
  })
}
/* 获取采购附件列表 */
export function get_bid_purchase_file(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Judge', a: 'get_bid_purchase_file', token: global.token},params)
  })
}







