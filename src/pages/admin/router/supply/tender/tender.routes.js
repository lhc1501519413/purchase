export default [
  {
    path: '/tender',
    name: 'tender',
    component: () =>
      import( /*webpackChunkName:supply*/ '@admin/views/supply/tender/tender'),
    meta: {
      title: '投标',
      permission: true
    }
  }
]