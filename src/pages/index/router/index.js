import Vue from 'vue'
import Router from 'vue-router'
import common from '@common/js/common'

Vue.use(Router)
const routerList = [];
function importAll(r) {
  r.keys().forEach(
    (key) => {
      if (common.isArray(r(key).default)) {
        r(key).default.forEach(elem => routerList.push(elem))
      } else {
        routerList.push(r(key).default)
      }
    }
  )
}
importAll(require.context('./', true, /\.routes\.js/));
const router = new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: () => import( /*webpackChunkName:whiteList*/ '@indexViews/index/index'),
    //   meta: {
    //     title: '商城首页',
    //     permission: true
    //   }
    // },
    ...routerList,
   
    // {
    //   path: '/*',
    //   name: '404',
    //   component: () => import( /*webpackChunkName:whiteList*/ '@indexViews/404/index'),
    //   meta: { 
    //     title: '404 NOT FOUND',
    //     permission:true
    //   }
    // }
  ]
})
router.beforeEach((to,from,next) => {
  next()
  scrollTo(0,0)
})
export default router;