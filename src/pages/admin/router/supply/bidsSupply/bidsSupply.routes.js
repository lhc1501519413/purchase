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
    path: '/Scontract/contract_info',
    name: '/Scontract/contract_info',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/scontract/contract_info'),
    meta: {
      title: '合同详情',
      permission: true
    }
  },
  {
    path: '/Scontract/edit_contract',
    name: '/Scontract/edit_contract',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/bidSupply/scontract/edit_contract'),
    meta: {
      title: '合同管理',
      permission: true
    }
  },
  
]