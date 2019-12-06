import request from '@utils/request';
/* 开标评标列表 */
export function open_bid_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'open_bid_list', token: localStorage.getItem('token') }, params),
  })
}
/* 获取项目评标中的状态 */
export function get_judge_info(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_info', token: localStorage.getItem('token'), bid_code },
  })
}
/* 获取参与评审专家列表 */
export function get_bid_judge_expert(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_judge_expert', token: localStorage.getItem('token'), bid_code },
  })
}
/* 设置参与评审专家列表 */
export function set_bid_expert(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'set_bid_expert',token: localStorage.getItem('token'),  },
    data
  })
}
/* 获取待解密供应商 */
export function get_open_supply_list(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_open_supply_list', token: localStorage.getItem('token'), bid_code },
  })
}
/* 开启解密 */
export function open_decrypt(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_decrypt', token: localStorage.getItem('token') },
    data:{bid_code}
  })
}
/* 开启标书 */
export function open_bid_file(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_bid_file', token: localStorage.getItem('token') },
    data:{bid_code}
  })
}
/* 获取参与评审供应商 */
export function get_judge_supply_list(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_supply_list', token: localStorage.getItem('token'), bid_code }
  })
}
/* 开启评审（资格审查） */
export function start_judge(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'start_judge', token: localStorage.getItem('token') },
    data:{bid_code}
  })
}
/* 获取资格审查详细信息 */
export function get_judge_quality(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_quality', token: localStorage.getItem('token'), bid_code }
  })
}
/* 获取符合性审查详细信息 */
export function get_judge_match(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_match', token: localStorage.getItem('token'), bid_code }
  })
}
/* 获取商务技术评分 */
export function get_judge_quality_grade(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_quality_grade', token: localStorage.getItem('token'), bid_code }
  })
}
/* 获取商务技术评分汇总 */
export function get_judge_total_quality_grade(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_total_quality_grade', token: localStorage.getItem('token'), bid_code }
  })
}
/* 获取商务技术结果公布 */
export function get_business_result(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_business_result', token: localStorage.getItem('token'), bid_code }
  })
}
/* 获取开标记录供应商报价 */
export function get_supply_report(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_supply_report', token: localStorage.getItem('token'), bid_code }
  })
}
/* 获取报价评审 */
export function get_judge_report(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_report', token: localStorage.getItem('token'), bid_code }
  })
}
/* 开启报价文件 */
export function open_report_file(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_report_file', token: localStorage.getItem('token') },
    data
  })
}
/* 开启报价评审 */
export function open_report_judge(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_report_judge', token: localStorage.getItem('token') },
    data
  })
}
/* 获取得分汇总 */
export function get_judge_result(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_result', token: localStorage.getItem('token'), bid_code }
  })
}
/* 得分汇总下一步 */
export function confirm_bid_judge(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'confirm_bid_judge', token: localStorage.getItem('token') },
    data
  })
}
/* 获取推荐供应商 */
export function get_judge_elect_supply(bid_code) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_judge_elect_supply', token: localStorage.getItem('token'), bid_code }
  })
}
/* 商务技术评分汇总下一步 */
export function publish_business_result(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'publish_business_result', token: localStorage.getItem('token') },
    data
  })
}
/* 商务技术结果公布下一步 */
export function open_report(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'open_report', token: localStorage.getItem('token') },
    data
  })
}
/* 审核结果确认 */
export function submit_judge_result(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'submit_judge_result', token: localStorage.getItem('token') },
    data
  })
}
/* 流标详情 */
export function get_bid_fail(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'get_bid_fail', token: localStorage.getItem('token') },params)
  })
}
/* 废标供应商列表 */
export function scrap_supply_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'scrap_supply_list', token: localStorage.getItem('token') },params)
  })
}
/* 获取废标记录 */
export function get_scrap_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'get_scrap_list', token: localStorage.getItem('token') },params)
  })
}
/* 公告列表 */
export function notice_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'notice_list', token: localStorage.getItem('token') },params)
  })
}
/* 公告详情 */
export function get_notice_info(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'get_notice_info', token: localStorage.getItem('token') },params)
  })
}
/* 提交供应商关于价格意见 */
export function submit_supply_price_status(data){
  return request({
    method:'POST',
    params:{ c: 'Bid' , a: 'submit_supply_price_status',token: localStorage.getItem('token') },
    data
  })
}
/* 获取中标预执行价详情 */
export function get_bid_pre_price_info(params){
  return request({
    method:'GET',
    params: Object.assign({ c: 'Bid' , a: 'get_bid_pre_price_info', token: localStorage.getItem('token') },params)
  })
}
/* 获取片区列表 */
export function get_area_list(params){
  return request({
    method:'GET',
    params: Object.assign({ c: 'Bid' , a: 'get_area_list', token: localStorage.getItem('token') },params)
  })
}
/* 分配供应商片区 */
export function submit_supply_area(data){
  return request({
    method:'POST',
    params: { c: 'Bid' , a: 'submit_supply_area', token: localStorage.getItem('token') },
    data
  })
}