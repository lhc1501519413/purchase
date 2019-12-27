/* 开放接口 */
import request from '@utils/request'
import requesttimeout from '@utils/requesttimeout';
/* GET */
export function GET(params) {
  return request({
    method: 'GET',
    params
  })
}
/* POST */
export function POST(params, data) {
  return requesttimeout({
    method: 'POST',
    params,
    data
  })
}
/* 城市列表 */
export function all_city() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_city' }
  })
}
/* 企业类型 */
export function all_biz_type() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_biz_type' }
  })
}
/* 供应商类型 */
export function all_supply_type() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_supply_type' }
  })
}
/* 所属经济行业 */
export function all_economic_industry() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_economic_industry' }
  })
}
/* 供应大类别 & 小类*/
export function all_category(type_id) {
  var type_id = type_id||'';
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_category',type_id }
  })
}
/* 企业性质 */
export function all_biz_nature() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_biz_nature' }
  })
}
/* 企业规模 */
export function all_biz_scale() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_all_biz_scale' }
  })
}
/* 资金种类 */
export function money_type() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_money_type' }
  })
}
/* 出资人类型 */
export function investor_type() {
  return request({
    method: 'GET',
    params: { 'c': 'Public', 'a': 'get_investor_type' }
  })
}
/* 人员类型 */
export function all_people_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_all_people_type' },
  })
}
/* 证件类型 */
export function all_cert_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_all_cert_type' },
  })
}
/* 信用类型列表 */
export function all_credit_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_all_credit_type' },
  })
}

/* 信用类型等级列表 */
export function credit_type_level(credit_id) {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_credit_type_level', credit_id },
  })
}
/* 获取成交规则类型列表 */
export function get_all_rule_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_all_rule_type' }
  })
}
/* 招标采购方式 */
export function get_bid_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_bid_type' }
  })
}
/* 文件上传 */
export function upload_one(file) {
  return request({
    method: 'POST',
    params: { c: 'Upload', a: 'upload_one' },
    data:{file}
  })
}
/* 抽取类型列表 */
export function get_draw_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_draw_type' }
  })
}
/* 中标执行方式 */
export function get_exec_price_type() {
  return request({
    method: 'GET',
    params: { c: 'Public', a: 'get_exec_price_type' }
  })
}
