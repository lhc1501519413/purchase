export default [
  {
    path: '/supplyInfo',
    name: 'supplyInfo',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyInfo/supplyInfo'),
    meta: {
      title: '供应商列表',
      permission: true
    }
  },
  // {
  //   path: '/supplyDetail',
  //   name: 'supplyDetail',
  //   component: () =>
  //     import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyInfo/supplyDetail'),
  //   meta: {
  //     title: '供应商详情',
  //     permission: true
  //   }
  // }
]