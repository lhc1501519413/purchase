export default [
  {
    path: '/',
    name: 'home',
    redirect:'/index',
    component: () => import( /*webpackChunkName:enquiry*/ '@indexViews/header/header'),
    meta: { 
      title: '首页', 
      permission: true 
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import( /*webpackChunkName:whiteList*/ '@indexViews/index/index'),
        meta: {
          title: '在线询价',
          permission: true
        }
      },
      {
        path: '/enquiry',
        name: 'enquiry',
        component: () => import( /*webpackChunkName:enquiry*/ '@indexViews/enquiry/index'),
        meta: { 
          title: '在线询价', 
          permission: true 
        }
      },
      {
        path: '/enquiryDetail',
        name: 'enquiryDetail',
        component: () => import( /*webpackChunkName:enquiry*/ '@indexViews/enquiry/enquiryDetail'),
        meta: { 
          title: '询价详情', 
          permission: true 
        }
      },
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
  },
]