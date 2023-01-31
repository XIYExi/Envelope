import { defineConfig } from 'umi';

export default defineConfig({

  dva:{
    immer: true
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
      ]
    },
  ],
  fastRefresh: {},
});
