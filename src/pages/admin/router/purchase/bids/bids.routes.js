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
    path: '/Bid/check_purchase_info',
    name: '/Bid/check_purchase_info',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/check_purchase_info'),
    meta: {
      title: '查看获取信息',
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
  {
    path: '/Bid/open_bid_list',
    name: '/Bid/open_bid_list',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid_list'),
    meta: {
      title: '开标评标管理',
      permission: true
    }
  },
  {
    path: '/Bid/open_bid',
    name: '/Bid/open_bid',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/open_bid'),
    meta: {
      title: '开标评标管理',
      permission: true
    }
  },
  {
    path: '/Bid/tender_file_decode',
    name: '/Bid/tender_file_decode',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/tender_file_decode'),
    meta: {
      title: '投标文件解密',
      permission: true
    }
  },
  {
    path: '/Bid/judge_group',
    name: '/Bid/judge_group',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/judge_group'),
    meta: {
      title: '专家小组',
      permission: true
    }
  },
  {
    path: '/Bid/open_steps',
    name: '/Bid/open_steps',
    redirect:'/Bid/open_record',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/open_steps'),
    meta: {
      title: '开始评审',
      permission: true
    },
    children: [
      {
        path: '/Bid/open_record',
        name: '/Bid/open_record',
        component: () =>
          import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/components/open_record'),
        meta: {
          title: '开标记录',
          permission: true
        },
      },
      {
        path: '/Bid/judge_quality',
        name: '/Bid/judge_quality',
        component: () =>
          import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/components/judge_quality'),
        meta: {
          title: '资格审查',
          permission: true
        },
      },
      {
        path: '/Bid/judge_match',
        name: '/Bid/judge_match',
        component: () =>
          import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/components/judge_match'),
        meta: {
          title: '符合性审查',
          permission: true
        },
      },
      {
        path: '/Bid/judge_quality_grade',
        name: '/Bid/judge_quality_grade',
        component: () =>
          import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/components/judge_quality_grade'),
        meta: {
          title: '商务技术评分',
          permission: true
        },
      },
      {
        path: '/Bid/judge_total_quality_grade',
        name: '/Bid/judge_total_quality_grade',
        component: () =>
          import( /*webpackChunkName:purchase*/ '@admin/views/purchase/bids/open_bid/components/judge_total_quality_grade'),
        meta: {
          title: '商务技术评分汇总',
          permission: true
        },
      }
    ]
  }
]