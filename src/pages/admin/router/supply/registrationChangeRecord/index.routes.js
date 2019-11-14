export default [
  {
    path: '/registerChange',
    name: 'registerChange',
    component: () =>
        import ( /*webpackChunkName:supply*/ '@admin/views/supply/registrationChangeRecord/registrationChangeRecord'),
    meta: {
        title: '注册变更记录',
        permission: true
    }
  },
  {
    path: '/changeDetail',
    name: 'changeDetail',
    component: () =>
        import ( /*webpackChunkName:supply*/ '@admin/views/supply/registrationChangeRecord/changeDetail'),
    meta: {
        title: '变更详情',
        permission: true
    }
  },
  {
    path: '/changeRecord',
    name: 'changeRecord',
    component: () =>
        import ( /*webpackChunkName:supply*/ '@admin/views/supply/registrationChangeRecord/changeRecord'),
    meta: {
        title: '变更详情',
        permission: true
    }
  }
]