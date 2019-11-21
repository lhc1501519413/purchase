import global from '@common/js/global';
import request from '@utils/request';
/* 注册 */
export function register(data) {
  return request({
    method: 'POST',
    params:{ c: "Supply", a: "register" },
    data
  })
}
/* 手机发送验证码 */
export function valiYzm(data) {
  return request({
    method: 'POST',
    params:{c:'Sms',a:'send_mobile_code'},
    data
  })
}
/* 登录 */
export function login(data) {
  return request({
    method: 'POST',
    params:{c:'Login',a:'login'},
    data
  })
}
/* 手机验证码登录 */
export function login_by_mobile(data) {
  return request({
    method: 'POST',
    params:{c:'Login',a:'login_by_mobile'},
    data
  })
}
/* 登出 */
export function logout() {
  return request({
    method: 'POST',
    params:{c:'User',a:'logout',token:global.token},
  })
}
/* 重置密码 */
export function reset_password(data) {
  return request({
    method: 'POST',
    params:{c:'Login',a:'reset_password'},
    data
  })
}
/* 获取用户基本信息 */
export function base_info() {
  return request({
    method: 'GET',
    params:{c:'User',a:'base_info',token:global.token}
  })
}
/* 验证码 */
export function yzm() {
  return request({
    method: 'GET',
    params:{c:'Login',a:'verify'},
  })
}
/* 供应商完善基本信息 */
export function save_base_info(data) {
  return request({
    method: 'POST',
    params:{c:'Supply',a:'save_base_info',token:global.token},
    data
  })
}
/* 获取供应商基本信息 */
export function get_base_info() {
  return request({
    method: 'GET',
    params:{c:'Supply',a:'get_base_info',token:global.token}
  })
}
/* 获取供应商基本模块列表 */
export function get_main_base_list() {
  return request({
    method: 'GET',
    params:{c:'Supply',a:'get_main_base_list',token:global.token}
  })
}
/* 提交审核 */
export function apply() {
  return request({
    method: 'GET',
    params:{c:'Supply',a:'apply',token:global.token}
  })
}
/* 申请信息详情 */
export function apply_info() {
  return request({
    method: 'GET',
    params:{c:'Supply',a:'apply_info',token:global.token}
  })
}
/* 撤回申请 */
export function re_back() {
  return request({
    method: 'POST',
    params:{c:'Apply',a:'re_back',token:global.token}
  })
}
/* 判断供应商是否符合报价要求 */
export function judge_supply_report(inquiry_code) {
  return request({
    method: 'GET',
    params:{c:'Supplyinquiry',a:'judge_supply_report',token:global.token,inquiry_code}
  })
}
