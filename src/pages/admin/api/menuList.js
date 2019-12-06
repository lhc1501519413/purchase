import request from '@utils/request'
/* 面板数据 */
export function menu_list() {
  return request({
    method: 'GET',
    params: { c: 'Menu', a: 'menu_list', token: localStorage.getItem('token'),refresh:'1' }
  })
}
