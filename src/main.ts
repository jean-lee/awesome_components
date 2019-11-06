import Vue from 'vue';
import { Button, Tree, Input, Row, Col } from 'element-ui';
// import "vue-tsx-support/enable-check";
import App from './app.vue';
import router from './router';



// ---------------------------------------- 样式 ----------------------------------------
import '@/assets/styles/reset.styl';
import '@/assets/styles/_common.styl';
import 'element-ui/lib/theme-chalk/index.css';



Vue.component(Button.name, Button);
Vue.use(Tree);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
