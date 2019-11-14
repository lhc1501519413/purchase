import global from '@common/js/global';
import request from '@utils/request';
/* 招标项目管理 */
/* 招标列表 */
export function bid_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'bid_list', token: global.token },params),
  })
}
/* 招标详情 */
export function get_bid_info(id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_info', token: global.token,id },
  })
}
/* 添加/编辑招标 */
export function save_bid(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid', token: global.token },
    data
  })
};
/* 提交招标项目 */
export function submit_bid(id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'submit_bid', token: global.token },
    data:{id}
  })
};
/* 审核招标项目 */
export function audit_bid(id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'audit_bid', token: global.token },
    data:{id}
  })
};
/* 驳回招标项目 */
export function refuse_bid(id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'refuse_bid', token: global.token },
    data:{id}
  })
};
/* 删除招标项目 */
export function del_bid(id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'del_bid', token: global.token },
    data:{id}
  })
};
/* 采购文件管理 */
/* 添加/编辑公告 */
export function save_bid_notice(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_notice', token: global.token },
    data
  })
};
/* 保存资质审核要求 */
export function save_bid_quality(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_quality', token: global.token },
    data
  })
};
/* 保存资质评分要求 */
export function save_bid_quality_grade(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_quality_grade', token: global.token },
    data
  })
};
/* 保存文件附件 */
export function save_bid_purchase_file(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_purchase_file', token: global.token },
    data
  })
};
/* 获取公告详情 */
export function get_bid_notice(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_notice', token: global.token,bid_id },
  })
}
/* 获取资质审核要求 */
export function get_bid_quality(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_quality', token: global.token,bid_id },
  })
}
/* 获取评标方法 */
export function get_bid_eval_method(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_eval_method', token: global.token,bid_id },
  })
}
/* 添加/编辑评标方法 */
export function save_bid_eval_method(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_eval_method', token: global.token },
    data
  })
}
/* 获取资格评分要求 */
export function get_bid_quality_grade(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_quality_grade', token: global.token,bid_id },
  })
}
/* 获取附件列表 */
export function get_bid_purchase_file(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_purchase_file', token: global.token,bid_id },
  })
}
/* 获取采购文件全部详情 */
export function get_bid_purchase_info(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'get_bid_purchase_info', token: global.token,bid_id },
  })
}
/* 采购文件列表 */
export function purchase_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'purchase_list', token: global.token },params),
  })
}
/* 提交采购文件 */
export function submit_bid_purchase(bid_id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'submit_bid_purchase', token: global.token },
    data:{bid_id}
  })
}
/* 审核采购文件 */
export function audit_bid_purchase(bid_id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'audit_bid_purchase', token: global.token },
    data:{bid_id}
  })
}
/* 驳回采购文件 */
export function refuse_bid_purchase(bid_id) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'refuse_bid_purchase', token: global.token },
    data:{bid_id}
  })
}
/* 获取采购文件管理 */
/* 获取采购文件列表 */
export function ask_purchase_list(params) {
  return request({
    method: 'GET',
    params: Object.assign({ c: 'Bid', a: 'ask_purchase_list', token: global.token },params),
  })
}
/* 查看采购文件获取情况 */
export function purchase_supply_list(bid_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'purchase_supply_list', token: global.token, bid_id },
  })
}
/* 审核/驳回 获取采购文件申请 */
export function audit_purchase_supply(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'audit_purchase_supply', token: global.token },
    data
  })
}
/* 获取获取采购文件信息 */
export function purchase_supply_info(bid_code,supply_id) {
  return request({
    method: 'GET',
    params: { c: 'Bid', a: 'purchase_supply_info', token: global.token,bid_code,supply_id},
  })
}
/* 发送采购文件 */
export function send_purchase_file(bid_code) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'send_purchase_file', token: global.token },
    data:{bid_code}
  })
}
/* 流标 */
export function save_bid_fail(data) {
  return request({
    method: 'POST',
    params: { c: 'Bid', a: 'save_bid_fail', token: global.token },
    data
  })
}

