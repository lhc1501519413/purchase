export default [
  {
    path: '/Inquiry/get_inquiry_list',
    name: '/Inquiry/get_inquiry_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/enquiryList'),
    meta: {
      title: '询价管理',
      permission: true
    }
  },
  {
    path: '/addEnquiry',
    name: 'addEnquiry',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/add'),
    meta: {
      title: '添加询价单',
      permission: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/detail'),
    meta: {
      title: '询价单详情',
      permission: true
    }
  },
  {
    path: '/audit',
    name: 'audit',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/audit'),
    meta: {
      title: '审核询价单',
      permission: true
    }
  },
  { // 审核完成后查看有多少家报价
    path: '/auditedDetail',
    name: 'auditedDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/auditedDetail'),
    meta: {
      title: '报价信息',
      permission: true
    }
  },
  { // 撤回完成后查看该报价详情  与上面的很像很像
    path: '/rebackDetail',
    name: 'rebackDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/rebackDetail'),
    meta: {
      title: '撤回详情',
      permission: true
    }
  },
  { // 预成交信息---待确认
    path: '/beforeDeal',
    name: 'beforeDeal',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/beforeDeal'),
    meta: {
      title: '预成交信息',
      permission: true
    }
  },
  { // 待确认中包含的各个供应商的报价详情
    path: '/offerDetail',
    name: 'offerDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/offerDetail'),
    meta: {
      title: '报价详情',
      permission: true
    }
  },
  { // 成交详情
    path: '/deal',
    name: 'deal',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/deal'),
    meta: {
      title: '成交信息',
      permission: true
    }
  },
  { // 成交详情
    path: '/relevance',
    name: 'relevance',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/enquiry/relevance'),
    meta: {
      title: '关联询价单',
      permission: true
    }
  }
]