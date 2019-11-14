import Vue from 'vue';
import Router from 'vue-router';
import common from '@common/js/common';

Vue.use(Router)
const routerList = [];
function importAll(r){
  r.keys().forEach(
    (key) => {
      if(common.isArray(r(key).default)){
        r(key).default.forEach(elem=>routerList.push(elem))
      }else{
        routerList.push(r(key).default)
      }
    }
  )
}
importAll(require.context('./',true,/\.routes\.js/));
const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import( /*webpackChunkName:admin*/ '@admin/views/index'),
      meta: {
        title: '后台管理',
        permission:true
      },
      children:[...routerList]
    },
  ]
})
router.beforeEach((to,from,next) => {
  next()
  window.scrollTo(0,0)
})
export default router;