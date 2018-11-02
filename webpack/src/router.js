import VueRouter from 'vue-router';
import Vue from 'vue';
import list from './components/list';
import detail from './components/detail';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: '/', component: list, name: 'list'},
    {path: '/detail/:id/', component: detail, name: 'detail', props: true},
  ]
});

export default router;
