import Vue from 'vue';
import { Button, Tree, Input, Row, Col, Message } from 'element-ui';
// import "vue-tsx-support/enable-check";
import App from '@/app.vue';
import router from '@/router';



// ---------------------------------------- 样式 ----------------------------------------
import '@/assets/styles/reset.styl';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.styl';


Vue.component(Button.name, Button);
Vue.use(Tree);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
