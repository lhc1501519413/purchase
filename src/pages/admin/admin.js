import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@index/store';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
Vue.use(Antd);
import {message} from 'ant-design-vue';
message.config({
  duration: 2,
  maxCount: 1,
});
Vue.use(message);
import common from '@common/js/common.js';
Vue.prototype.$common = common;
import global from '@common/js/global';
Vue.prototype.global = global;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
Vue.prototype.$moment = moment
import '@common/js/permission'; // permission control
import '@/icons'; // 图标组件
Vue.config.productionTip = false;
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
});
import Print from '@common/js/print';
Vue.use(Print) // 注册
// import Print from 'vue-print-nb';
// Vue.use(Print);  // 打印插件
var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vm;