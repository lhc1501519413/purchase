export default [
  {
    path: '/Supplyinquiry/supply_inquiry_list',
    name: '/Supplyinquiry/supply_inquiry_list',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/enquirySupply/enquiryList'),
    meta: {
      title: '询价管理',
      permission: true
    }
  },
  {
    path: '/offer',
    name: 'offer',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/enquirySupply/offer'),
    meta: {
      title: '报价',
      permission: true
    }
  },
  {
    path: '/offerInfo',
    name: 'offerInfo',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/enquirySupply/offerInfo'),
    meta: {
      title: '报价信息',
      permission: true
    }
  },
  {
    path: '/offerInfoConfirm',
    name: 'offerInfoConfirm',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/enquirySupply/offerInfoConfirm'),
    meta: {
      title: '报价信息',
      permission: true
    }
  },
  {
    path: '/offerInfoReback',
    name: 'offerInfoReback',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/enquirySupply/offerInfoReback'),
    meta: {
      title: '报价信息',
      permission: true
    }
  },
  {
    path: '/dealSupply',
    name: 'dealSupply',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/enquirySupply/dealSupply'),
    meta: {
      title: '成交信息',
      permission: true
    }
  }
]