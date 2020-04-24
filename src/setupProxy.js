const { createProxyMiddleware } = require("http-proxy-middleware");

const createProxy = (url = "", target = "") =>
  createProxyMiddleware(url, {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${url}`]: ""
    }
  });

module.exports = function (app) {
  app.use(createProxy("/proxy", "https://cnodejs.org/api/v1"));
};
