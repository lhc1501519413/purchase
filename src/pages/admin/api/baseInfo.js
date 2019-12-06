import request from '@utils/request'
/* 获取供应商基本模块列表 */
export function get_main_base_list() {
  return request({
    method: 'GET',
    params: { c: 'Supply', a: 'get_main_base_list', token: localStorage.getItem('token') }
  })
}
/*资料完善基本信息*/
/* 获取基本信息 */
export function get_base_info() {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_base_info', token: localStorage.getItem('token') }
  })
}
/* 保存基本信息 */
export function save_basic_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'save_basic_info', token: localStorage.getItem('token') },
    data
  })
}
/* 获取基本资质 */
export function get_basic_nature_info() {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_basic_nature_info', token: localStorage.getItem('token') }
  })
}
/* 保存基本资质 */
export function save_basic_nature(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'save_basic_nature', token: localStorage.getItem('token') },
    data
  })
}
/* 获取特殊资质列表 */
export function get_special_nature_list(page) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_special_nature_list', page, token: localStorage.getItem('token') }
  })
}
/* 获取特殊资质详情 */
export function get_special_nature_info(id) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_special_nature_info', id, token: localStorage.getItem('token') }
  })
}
/* 编辑/保存特殊资质 */
export function save_special_nature(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'save_special_nature', token: localStorage.getItem('token') },
    data
  })
}
/* 删除特殊资质 */
export function del_special_nature(id) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'del_special_nature', token: localStorage.getItem('token') },
    data: { id }
  })
}
/* 出资信息 */
/* 获取出资信息基础信息 */
export function get_investment_base_info() {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_investment_base_info', token: localStorage.getItem('token') }
  })
}
/* 设置出资信息附件 */
export function set_investment_file_list(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'set_investment_file_list', token: localStorage.getItem('token') },
    data
  })
}
/* 设置应缴总额 */
export function set_investment_fund(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'set_investment_fund', token: localStorage.getItem('token') },
    data
  })
}
/* 设置实缴总额 */
export function set_investment_actual_fund(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'set_investment_actual_fund', token: localStorage.getItem('token') },
    data
  })
}
/* 获取出资人列表 */
export function get_investment_list(page) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_investment_list', page, token: localStorage.getItem('token') }
  })
}
/* 获取出资人信息详情 */
export function get_investment_info(id) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_investment_info', id, token: localStorage.getItem('token') }
  })
}
/* 资料完善添加出资人 */
export function save_investment_list(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'save_investment_list', token: localStorage.getItem('token') },
    data
  })
}
/* 出资人列表删除 */
export function del_investment_list(id) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'del_investment_list', token: localStorage.getItem('token') },
    data: { id }
  })
}
/* 获取人员列表 */
export function get_people_list() {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_people_list', token: localStorage.getItem('token') },
  })
}
/* 获取人员信息 */
export function get_people_info(id) {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_people_info', id, token: localStorage.getItem('token') },
  })
}
/* 资料完善添加人员信息 */
export function save_people_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'save_people_info', token: localStorage.getItem('token') },
    data
  })
}
/* 人员信息删除 */
export function del_people(id) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'del_people', token: localStorage.getItem('token') },
    data: { id }
  })
}
/* 信用信息 */
/* 获取信用信息列表 */
export function get_credit_list() {
  return request({
    method: 'GET',
    params: { c: 'Supplybasic', a: 'get_credit_list', token: localStorage.getItem('token') },
  })
}
/* 获取信用信息详情 */
export function get_credit_info(id) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'get_credit_info', id, token: localStorage.getItem('token') },
  })
}
/* 完善信用信息 */
export function save_credit_info(data) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'save_credit_info', token: localStorage.getItem('token') },
    data
  })
}
/* 信用信息删除 */
export function del_credit(id) {
  return request({
    method: 'POST',
    params: { c: 'Supplybasic', a: 'del_credit', token: localStorage.getItem('token') },
    data: { id }
  })
}