const { createProxyMiddleware: proxy } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        process.env.REACT_APP_BASE_API,
        proxy({
            // 此处的端口号要与后期数据请求的数据端一致
            target: "http://118.178.238.19:3001/",
            changeOrigin: true,
        })
    );
};
