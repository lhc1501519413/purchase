export default [
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
  }
]