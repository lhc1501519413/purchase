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
          title: '首页',
          permission: true
        }
      },
      {
        path: '/enquiries',
        name: 'enquiries',
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
      },
      {
        path: '/bid_notice',
        name: 'bid_notice',
        component: () => import( /*webpackChunkName:notice*/ '@indexViews/bid_notice/index'),
        meta: { 
          title: '招标公告', 
          permission: true 
        }
      },
      {
        path: '/bid_notice_detail',
        name: 'bid_notice_detail',
        component: () => import( /*webpackChunkName:notice*/ '@indexViews/bid_notice/bid_notice_detail'),
        meta: { 
          title: '采购公告详情', 
          permission: true 
        }
      },
      {
        path: '/bid_notice_detail_deal',
        name: 'bid_notice_detail_deal',
        component: () => import( /*webpackChunkName:notice*/ '@indexViews/bid_notice/bid_notice_detail_deal'),
        meta: { 
          title: '中标成交公告详情', 
          permission: true 
        }
      },
      {
        path: '/bid_notice_detail_fail',
        name: 'bid_notice_detail_fail',
        component: () => import( /*webpackChunkName:notice*/ '@indexViews/bid_notice/bid_notice_detail_fail'),
        meta: { 
          title: '废标公告详情', 
          permission: true 
        }
      },
    ]
  },
]