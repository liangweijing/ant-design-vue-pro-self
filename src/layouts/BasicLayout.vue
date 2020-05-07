<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :theme="navTheme"
        v-if="navLayout === 'left'"
        v-model="collapsed"
        :trigger="null"
        collapsible
      >
        <div class="logoSelf">Ant Design Vue Pro</div>
        <SideMenu></SideMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
          <!-- 放入我们写的header -->
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>

  <!-- <div>
    <Header></Header>
    <SideMenu></SideMenu>
    <router-view />
    <Footer></Footer>
  </div> -->
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import SettingDrawer from "../components/SettingDrawer";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    Footer,
    SideMenu,
    SettingDrawer
  }
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eee;
}
.logoSelf {
  height: 64px;
  overflow: hidden;
  line-height: 64px;
  text-align: center;
}
/* 深度选择器 */
.nav-theme-dark >>> .logoSelf {
  color: #ffffff;
}
</style>
