const { createProxyMiddleware } = require("http-proxy-middleware");
const defaultProxy = process.env.REACT_APP_DEFAULT_PROXY;

const createProxy = (url = "", target = "") =>
  createProxyMiddleware(url, {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${url}`]: ""
    }
  });

module.exports = function (app) {
  app.use(createProxy("/proxy", defaultProxy));
};
