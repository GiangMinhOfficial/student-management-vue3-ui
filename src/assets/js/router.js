import { createRouter, createWebHistory } from 'vue-router';
import KhoaManagement from '@/components/KhoaManagement.vue';
import StudentManagement from '@/components/StudentManagement.vue';

const routes = [
  {
    path: '/khoa',
    component: KhoaManagement,
  },
  {
    path: '/',
    component: StudentManagement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
