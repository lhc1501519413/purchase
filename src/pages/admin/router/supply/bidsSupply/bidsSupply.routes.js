export default [
  {
    path: '/Sbid/spurchase_list',
    name: '/Sbid/spurchase_list',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/spurchase_list'),
    meta: {
      title: '获取采购文件',
      permission: true
    }
  },
  {
    path: '/sbidDetail',
    name: '/sbidDetail',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/sbidDetail'),
    meta: {
      title: '查看项目信息',
      permission: true
    }
  },
  {
    path: '/tbidDetail',
    name: '/tbidDetail',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/tbidDetail'),
    meta: {
      title: '查看项目信息',
      permission: true
    }
  },
  {
    path: '/Sbid/tender_list',
    name: '/Sbid/tender_list',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/tenderList'),
    meta: {
      title: '投标文件管理',
      permission: true
    }
  },
  {
    path: '/addSPurchaseDoc',
    name: '/addSPurchaseDoc',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/addSPurchaseDoc'),
    meta: {
      title: '制作投标文件',
      permission: true
    }
  },
  {
    path: '/tenderDoc',
    name: '/tenderDoc',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/tenderDoc'),
    meta: {
      title: '投标文件详情',
      permission: true
    }
  },
  {
    path: '/Sbid/open_bid_list',
    name: '/Sbid/open_bid_list',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/open_bid_list'),
    meta: {
      title: '开标评标管理',
      permission: true
    }
  },
  {
    path: '/Sbid/bid_result',
    name: '/Sbid/bid_result',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/bid_result'),
    meta: {
      title: '中标信息',
      permission: true
    }
  },
  {
    path: '/Scontract/get_bid_scontract_list',
    name: '/Scontract/get_bid_scontract_list',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/scontract/scontract_list'),
    meta: {
      title: '合同管理',
      permission: true
    }
  },
  {
    path: '/Scontract/contract_detail',
    name: '/Scontract/contract_detail',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/scontract/contract_detail'),
    meta: {
      title: '合同详情',
      permission: true
    }
  },
  {
    path: '/Scontract/confirm_contract',
    name: '/Scontract/confirm_contract',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/scontract/confirm_contract'),
    meta: {
      title: '确认合同',
      permission: true
    }
  },
  {
    path: '/Sbidwin/win_notice_list',
    name: '/Sbidwin/win_notice_list',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/Sbidwin/win_notice_list'),
    meta: {
      title: '中标通知书列表',
      permission: true
    }
  },
  {
    path: '/swin_confirm',
    name: '/swin_confirm',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/Sbidwin/swin_confirm'),
    meta: {
      title: '确认合同',
      permission: true
    }
  },
  {
    path: '/swin_detail',
    name: '/swin_detail',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/Sbidwin/swin_detail'),
    meta: {
      title: '确认合同',
      permission: true
    }
  },
]