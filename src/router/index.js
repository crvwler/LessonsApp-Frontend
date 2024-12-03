import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "lessons",
      component: () => import("../views/LessonsView.vue"),
    },
  ],
});

export default router;
