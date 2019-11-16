export default [
  {
    path: '/Bid/bid_list',
    name: '/Bid/bid_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/bid_list'),
    meta: {
      title: '项目管理',
      permission: true
    }
  },
  {
    path: '/addBids',
    name: 'addBids',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/addBids'),
    meta: {
      title: '招标新增项目',
      permission: true
    }
  },
  {
    path: '/auditBid',
    name: 'auditBid',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/auditBid'),
    meta: {
      title: '审核招标项目',
      permission: true
    }
  },
  {
    path: '/bidDetail',
    name: 'bidDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/bidDetail'),
    meta: {
      title: '招标项目详情',
      permission: true
    }
  },
  {
    path: '/Bid/ask_purchase_list',
    name: '/Bid/ask_purchase_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/ask_purchase_list'),
    meta: {
      title: '获取采购文件管理',
      permission: true
    }
  },
  {
    path: '/Bid/purchase_list',
    name: '/Bid/purchase_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/purchase_list'),
    meta: {
      title: '采购文件管理',
      permission: true
    }
  },
  {
    path: '/addPurchaseDoc',
    name: 'addPurchaseDoc',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/addPurchaseDoc'),
    meta: {
      title: '制作采购文件',
      permission: true
    }
  },
  {
    path: '/auditPurchaseDoc',
    name: 'auditPurchaseDoc',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/auditPurchaseDoc'),
    meta: {
      title: '审核采购文件',
      permission: true
    }
  },
  {
    path: '/docDetail',
    name: 'docDetail',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/docDetail'),
    meta: {
      title: '采购文件详情',
      permission: true
    }
  },
  {
    path: '/Expert/expert_list',
    name: '/Expert/expert_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/expert_list'),
    meta: {
      title: '专家列表',
      permission: true
    }
  },
  {
    path: '/Bid/experts_draw_list',
    name: '/Bid/experts_draw_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/experts_draw_list'),
    meta: {
      title: '专家抽取',
      permission: true
    }
  },
  {
    path: '/Bid/experts_draw',
    name: '/Bid/experts_draw',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/experts_draw'),
    meta: {
      title: '专家抽取',
      permission: true
    }
  },

]