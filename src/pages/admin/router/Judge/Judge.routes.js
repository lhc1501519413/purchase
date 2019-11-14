export default [
  {
    path: '/Judge/bid_list',
    name: '/Judge/bid_list',
    component: () =>
      import( /*webpackChunkName:Judge*/ '@admin/views/Judge/bid_list'),
    meta: {
      title: '专家评审',
      permission: true
    }
  },
  {
    path: '/judge',
    name: '/judge',
    component: () =>
      import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge'),
    meta: {
      title: '评审',
      permission: true
    }
  },
]