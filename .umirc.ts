import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
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
        }
      ]
    },
  ],
  fastRefresh: {},
});
