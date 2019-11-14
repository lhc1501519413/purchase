import global from '@common/js/global';
import request from '@utils/request';
/* 项目管理 */
/* 获取采购文件列表 */
export function spurchase_list(params){
  return request({
    method:'GET',
    params:Object.assign({c:'Sbid',a:'spurchase_list',token:global.token},params)
  })
}
/* 保存 获取采购文件信息 */
export function save_supply_purchase(data){
  return request({
    method:'POST',
    params:{c:'Sbid',a:'save_supply_purchase',token:global.token},
    data
  })
}
/* 获取获取采购文件信息 */
export function get_supply_purchase_info(bid_code){
  return request({
    method:'GET',
    params:{c:'Sbid',a:'get_supply_purchase_info',token:global.token,bid_code}
  })
}
/* 投标列表 */
export function tender_list(params){
  return request({
    method:'GET',
    params:Object.assign({c:'Sbid',a:'tender_list',token:global.token},params)
  })
}
/* 获取招标全部详情 */
export function get_tender_info(bid_code){
  return request({
    method:'GET',
    params:{c:'Sbid',a:'get_tender_info',token:global.token,bid_code},
  })
}
/* 报价保存 */
export function save_supply_stock_list(data){
  return request({
    method:'POST',
    params:{c:'Sbid',a:'save_supply_stock_list',token:global.token},
    data
  })
}
/* 保存资质审核要求附件 */
export function save_bid_quality_file(data){
  return request({
    method:'POST',
    params:{c:'Sbid',a:'save_bid_quality_file',token:global.token},
    data
  })
}
/* 保存资质评分要求附件 */
export function save_bid_quality_grade_file(data){
  return request({
    method:'POST',
    params:{c:'Sbid',a:'save_bid_quality_grade_file',token:global.token},
    data
  })
}
/* 保存文件附件 */
export function save_bid_tender_file(data){
  return request({
    method:'POST',
    params:{c:'Sbid',a:'save_bid_tender_file',token:global.token},
    data
  })
}
/* 提交投标文件 */
export function submit_tender(bid_code){
  return request({
    method:'POST',
    params:{c:'Sbid',a:'submit_tender',token:global.token},
    data:{bid_code}
  })
}

