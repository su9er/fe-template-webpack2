import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/test/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
  ],
});
