import Vue from 'vue';
import VueRouter from 'vue-router';

import app from './app.vue';
import list from './components/list';
import detail from './components/detail';

const router = new VueRouter({
  routes: [
    {path: '/', component: list, name: 'list'},
    {path: '/detail/:id/', component: detail, name: 'detail', props: true},
  ]
});

Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(app),
  router: router,
});
