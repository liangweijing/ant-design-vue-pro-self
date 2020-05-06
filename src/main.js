import Vue from "vue";
import { Button, Input } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
import "ant-design-vue/lib/button/style";

Vue.config.productionTip = false;

Vue.use(Button, Input);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
