export default [
  {
    path: '/Judge/bid_list',
    name: 'Judge/bid_list',
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
    redirect:'/judge/judge_quality',
    component: () =>
      import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge'),
    meta: {
      title: '评审',
      permission: true
    },
    children:[
      {
        path: '/judge/judge_quality',
        name: '/judge/judge_quality',
        component: () =>
        import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge/judge_quality'),
        meta: {
          title: '资格审查',
          permission: true
        },
      }
    ]
  },
]