const { createProxyMiddleware } = require("http-proxy-middleware");
const defaultProxyPrefix = process.env.REACT_APP_DEFAULT_PROXY_PREFIX;
const customProxyRegx = new RegExp(process.env.REACT_APP_CUSTOM_PROXY_REGEXP || "");
const defaultProxy = process.env.REACT_APP_DEFAULT_PROXY;

const createProxy = (url = "", target = "") => {
  if (url !== defaultProxy && !customProxyRegx.test(url)) {
    console.error("自定义代理前缀不符合格式");
  }

  return createProxyMiddleware(url, {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${url}`]: ""
    }
  });
};
module.exports = function (app) {
  app.use(createProxy(defaultProxyPrefix, defaultProxy));
};
