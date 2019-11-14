export default [
  {
    path: '/contractSupply',
    name: 'contractSupply',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/contractSupply/index'),
    meta: {
      title: '合同管理',
      permission: true
    }
  },
  // {
  //   path: '/supplyConfirmContract',
  //   name: 'supplyConfirmContract',
  //   component: () =>
  //     import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/contractSupply/confirmContract'),
  //   meta: {
  //     title: '确认合同',
  //     permission: true
  //   }
  // },
  // {
  //   path: '/supplyContractDetail',
  //   name: 'supplyContractDetail',
  //   component: () =>
  //     import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/contractSupply/contractDetail'),
  //   meta: {
  //     title: '合同详情',
  //     permission: true
  //   }
  // }
]