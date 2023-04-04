import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},
  dva: {
    immer: true,
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  mode: 'site',
  resolve: {
    includes: ['src/dumi', 'src/materials'],
    excludes: ['engine-core', 'engine-lib-absolute', 'engine-lib-grid'],
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/',
          component: '../pages/homepage',
        },
        {
          path: '/inner',
          component: '../pages/home',
        },
        {
          path: '/inner/editor',
          component: '../pages/editor',
        },
        {
          path: '/inner/lowcode',
          component: '../pages/lowcode',
        },
        {
          path: '/inner/antv',
          component: '../pages/antv',
        },
        {
          path: '/inner/test',
          component: '../pages/test',
        },
      ],
    },
  ],
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  webpack5: {},
  exportStatic: {},
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var window.PropTypes',
    '@alifd/next': 'var window.Next',
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
    '@alilc/lowcode-editor-core':
      'var window.AliLowCodeEngine.common.editorCabin',
    '@alilc/lowcode-editor-skeleton':
      'var window.AliLowCodeEngine.common.skeletonCabin',
    '@alilc/lowcode-designer':
      'var window.AliLowCodeEngine.common.designerCabin',
    '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
    '@ali/lowcode-engine': 'var window.AliLowCodeEngine',
    moment: 'var window.moment',
    lodash: 'var window._',
  },
});
