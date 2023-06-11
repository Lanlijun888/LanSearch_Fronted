import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import indexPage from "@/pages/indexPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "indexPage",
    component: indexPage,
  },
  /*动态路由*/
  {
    path: "/:category",
    component: indexPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
