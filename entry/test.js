import Vue from 'vue';
import App from 'views/test/App';
import router from 'router/test';
import 'services';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
