import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    ENV: 'dev',
  },
  dynamicImport: {},
  dva: {
    immer: true,
  },
  // 默认路由模式是“browser”，打包后会出现首页或其他页面找不到继而加载不出来的情况，所以需要改成hash模式。
  history: {
    type: 'hash',
  },
  // 配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，
  // 当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。
  // 如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 publicPath 设置成 ./ 相对路径
  publicPath: './',
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
