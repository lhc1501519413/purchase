export default [
  {
    path: '/Contract/get_contract_list',
    name: '/Contract/get_contract_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/contract'),
    meta: {
      title: '合同管理',
      permission: true
    }
  },
  {
    path: '/addContract',
    name: 'addContract',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/contract/addContract'),
    meta: {
      title: '起草合同',
      permission: true
    }
  },
  {
    path: '/contractDetail',
    name: 'contractDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/contract/contractDetail'),
    meta: {
      title: '合同详情',
      permission: true
    }
  },
  {
    path: '/confirmContract',
    name: 'confirmContract',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/contract/confirmContract'),
    meta: {
      title: '合同详情',
      permission: true
    }
  }
]