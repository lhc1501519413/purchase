export default [
  {
    path: '/supply/get_apply_list',
    name: '/supply/get_apply_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyManage/supplyManage'),
    meta: {
      title: '供应商管理',
      permission: true
    }
  },
  {
    path: '/aduitManage',
    name: 'aduitManage',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyManage/aduitManage'),
    meta: {
      title: '审核供应商',
      permission: true
    }
  },
  {
    path: '/manageDetail',
    name: 'manageDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyManage/manageDetail'),
    meta: {
      title: '供应商详情',
      permission: true
    }
  },
  {
    path: '/aduitManageChange',
    name: 'aduitManageChange',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyManage/aduitManageChange'),
    meta: {
      title: '审核供应商',
      permission: true
    }
  },
  {
    path: '/manageChangeDetail',
    name: 'manageChangeDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/supplyManage/manageChangeDetail'),
    meta: {
      title: '供应商详情',
      permission: true
    }
  }
]