import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { routeBase } from '@/utils';

export const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(routeBase()),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
