export default [
  {
    path: '/panelSupply',
    name: 'panelSupply',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/panelSupply/index'),
    meta: {
      title: '我的面板',
      permission: true
    }
  },
  {
    path: '/messageSupply',
    name: 'messageSupply',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/message'),
    meta: {
      title: '我的消息',
      permission: true
    }
  }
]