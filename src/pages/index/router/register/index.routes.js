export default [
  {
    path: '/register',
    name: 'register',
    redirect:'/register/reg',
    component: () => import( /*webpackChunkName:register*/ '@indexViews/register/index'),
    meta: { title: '注册采购云平台账号',permission:true},
    children:[
      {
        path:'/register/reg',
        name:'reg',
        component:()=>import(/*webpackChunkName:register*/ '@indexViews/register/components/reg'),
        meta: { title: '注册采购云平台账号',permission:true},
      },
      {
        path:'/register/baseInfo',
        name:'baseInfo',
        component:()=>import(/*webpackChunkName:register*/ '@indexViews/register/components/baseInfo'),
        meta: { title: '基本信息完善',permission:true}
      },
      {
        path:'/register/dataComplete',
        name:'dataComplete',
        component:()=>import(/*webpackChunkName:register*/ '@indexViews/register/components/dataComplete'),
        meta: { title: '资料完善',permission:true}
      },
      {
        path:'/register/dataAudit',
        name:'dataAudit',
        component:()=>import(/*webpackChunkName:register*/ '@indexViews/register/components/dataAudit'),
        meta: { title: '资料审核',permission:true}
      }
    ]
  }
]