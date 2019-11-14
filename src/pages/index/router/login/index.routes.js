export default [
  {
    path: '/login',
    name: 'login',
    component: () => import( /*webpackChunkName:login*/ '@indexViews/login/index'),
    meta: { 
      title: '请先登录', 
      permission: true 
    }
  },
  {
    path: '/forgetPass',
    name: 'forgetPass',
    component: () => import( /*webpackChunkName:login*/ '@indexViews/login/forgetPass'),
    meta: { 
      title: '忘记密码', 
      permission: true 
    }
  },
]