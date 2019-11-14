export default [
  {
    path: '/noticeListSupply',
    name: 'noticeListSupply',
    component: () => import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/noticeSupply/noticeListSupply'),
    meta: {
      title: '公告管理',
      permission:true
    }
  },
  // {
  //   path: '/noticeSupplyDetail',
  //   name: 'noticeSupplyDetail',
  //   component: () => import( /*webpackChunkName:supply*/ '@admin/views/supply/enquirySupply/noticeSupply/noticeSupplyDetail'),
  //   meta: {
  //     title: '公告详情',
  //     permission:true
  //   }
  // },
]