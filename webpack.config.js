/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

/**
 * @babel/core依赖问题
 * https://stackoverflow.com/questions/69343038/cant-import-the-named-export-xxxx-from-non-ecmascript-module-only-default-expo
 * https://www.bookstack.cn/read/alibaba-lowcode-engine-1.0-zh/9515333ef37f0c9b.md
 * 配置貌似没用，但是放着不影响
 */

module.exports = {
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json'],
    alias: {
      '@': require('path').resolve(__dirname, 'renderer'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
};
