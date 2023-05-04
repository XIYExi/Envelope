/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'renderer'),
    },
  },
};

/*const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(createProxyMiddleware('/api',
    {
      target: "http://localhost:8012",
      changeOrigin:true,
      pathRewrite: {
        "^/api": "/"
      },
      "secure":false 	//如果访问的是https类的链接，就需要设置为true
    },))
}*/
