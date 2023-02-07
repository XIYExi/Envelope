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
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var window.PropTypes',
    '@alifd/next': 'var window.Next',
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
    '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
    moment: 'var window.moment',
    lodash: 'var window._',
  },
});
