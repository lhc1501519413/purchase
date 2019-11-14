export default [
  {
    path: '/noticeList',
    name: 'noticeList',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/notice/noticeList'),
    meta: {
      title: '公告管理',
      permission: true
    }
  },
  // {
  //   path: '/noticeDetail',
  //   name: 'noticeDetail',
  //   component: () =>
  //     import( /*webpackChunkName:purchase*/ '@admin/views/purchase/enquiry/notice/noticeDetail'),
  //   meta: {
  //     title: '公告详情',
  //     permission: true
  //   }
  // }
]