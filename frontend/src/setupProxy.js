const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/auth', // '/api/auth'로 시작하는 요청을
    createProxyMiddleware({
      target: 'http://auth-api:8000', // auth-api 컨테이너로 전달
      changeOrigin: true,
      pathRewrite: { '^/api/auth': '' }, // 경로 재작성: '/api/auth'를 ''로 변경
    })
  );
  app.use(
    '/api/backend', // '/api/backend'로 시작하는 요청을
    createProxyMiddleware({
      target: 'http://backend-api:8001', // backend-api 컨테이너로 전달
      changeOrigin: true,
      pathRewrite: { '^/api/backend': '' }, // 경로 재작성: '/api/backend'를 ''로 변경
    })
  );
};