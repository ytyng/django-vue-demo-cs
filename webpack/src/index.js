import Vue from 'vue';
import router from './router.js';
import app from './app.vue';

new Vue({
  el: '#app',
  render: h => h(app),
  router,
});
