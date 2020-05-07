import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404";
// import RenderRouterVue from "../components/RenderRouterVue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      // 最后还是决定把用户页和内容页都放在一个布局页面中显示
      component: () =>
        import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
      // template和jxs最终都是生成render函数
      // component: { render: h => h("router-view") },
      // component: RenderRouterVue,
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          // 异步加载，打包时会打入一个包user
          component: () =>
            import(/* webpackChunkName: "user" */ "../views/user/login")
        },
        {
          path: "/user/register",
          name: "register",
          // 异步加载，打包时会打入一个包user
          component: () =>
            import(/* webpackChunkName: "user" */ "../views/user/register")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
      children: [
        // dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          redirect: "/dashboard/analysis",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
                )
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") }, // 挂载之后组件的空盒子
          redirect: "/form/basic-form",
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "../views/Forms/BasicForm"
                )
            },
            {
              path: "/form/step-form",
              name: "stepform",
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "../views/Forms/StepForm" // 默认去找这个下面的index.vue,不写都默认去找index.xx
                ),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                    )
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                    )
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 仅刷新路由的时候才有进度条
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
