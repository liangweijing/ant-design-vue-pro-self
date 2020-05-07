import Vue from "vue";
import { Button, Input, Layout, Icon, Drawer, Radio } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
import "ant-design-vue/lib/button/style";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
