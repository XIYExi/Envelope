import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},
  dva: {
    immer: true,
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/',
          component: '../pages/home',
        },
        {
          path: '/editor',
          component: '../pages/editor',
        },
        {
          path: './lowcode',
          component: '../pages/lowcode',
        },
      ],
    },
  ],
  fastRefresh: {},
});
