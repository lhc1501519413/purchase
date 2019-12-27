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
Vue.directive('drag', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el) {
    let target = el; //获取当前元素
    target.onmousedown = (e) => {
      e.preventDefault();
      //算出鼠标相对元素的位置
      let disX = e.clientX - target.offsetLeft;
      let disY = e.clientY - target.offsetTop;
      document.onmousemove = (e) => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //绑定元素位置到positionX和positionY上面
        target.positionX = top;
        target.positionY = left;
        //移动当前元素
        target.style.left = left + 'px';
        target.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
// import Print from '@common/js/print';
// Vue.use(Print) // 注册
// import Print from 'vue-print-nb';
// Vue.use(Print);  // 打印插件
import functions from '@common/js/functions';
Vue.use(functions);//将全局函数当做插件来进行注册

var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vm;