export default [
  {
    path: '/notice',
    name: 'notice',
    component: () => import( /*webpackChunkName:notice*/ '@indexViews/notice/index'),
    meta: { 
      title: '公告', 
      permission: true 
    }
  },
  {
    path: '/noticeDetail',
    name: 'noticeDetail',
    component: () => import( /*webpackChunkName:notice*/ '@indexViews/notice/noticeDetail'),
    meta: { 
      title: '公告详情', 
      permission: true 
    }
  }
]