export default [
  {
    path: '/panel',
    name: 'panel',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/panel'),
    meta: {
      title: '我的面板',
      permission: true
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () =>
      import( /*webpackChunkName:purchase*/ '@admin/views/purchase/message'),
    meta: {
      title: '我的消息',
      permission: true
    }
  }
]