import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
Vue.use(Antd);
import common from '@common/js/common.js';
Vue.prototype.$common = common;
import '@common/js/permission'; // permission control
import global from '@common/js/global';
Vue.prototype.global = global;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
Vue.prototype.$moment = moment
import '@/icons'; // 图标组件
Vue.config.productionTip = false;
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
