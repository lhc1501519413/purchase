export default [
  {
    path: '/panelJudge',
    name: 'panelJudge',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/Judge/panel/panelJudge'),
    meta: {
      title: '我的面板',
      permission: true
    }
  },
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
      },
      {
        path: '/judge/judge_match',
        name: '/judge/judge_match',
        component: () =>
        import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge/judge_match'),
        meta: {
          title: '符合性审查',
          permission: true
        },
      },
      {
        path: '/judge/judge_quality_grade',
        name: '/judge/judge_quality_grade',
        component: () =>
        import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge/judge_quality_grade'),
        meta: {
          title: '商务技术评分',
          permission: true
        },
      },
      {
        path: '/judge/judge_total_quality_grade',
        name: '/judge/judge_total_quality_grade',
        component: () =>
        import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge/judge_total_quality_grade'),
        meta: {
          title: '商务技术评分汇总',
          permission: true
        },
      },
      {
        path: '/judge/judge_report',
        name: '/judge/judge_report',
        component: () =>
        import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge/judge_report'),
        meta: {
          title: '报价评审',
          permission: true
        },
      },
      {
        path: '/judge/judge_result',
        name: '/judge/judge_result',
        component: () =>
        import( /*webpackChunkName:Judge*/ '@admin/views/Judge/judge/judge_result'),
        meta: {
          title: '得分汇总',
          permission: true
        },
      }
    ]
  },
  {
    path: '/judge/scrap',
    name: '/judge/scrap',
    component: () =>
    import( /*webpackChunkName:Judge*/ '@admin/views/Judge/scrap/scrap'),
    meta: {
      title: '废标',
      permission: true
    },
  },
]