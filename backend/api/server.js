const jsonServer = require('json-server');
const path = require('path'); // 경로 설정을 위해 추가
const server = jsonServer.create();

// 1. 절대 경로로 db.json을 지정해야 Vercel이 인식합니다.
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));

const middlewares = jsonServer.defaults();

server.use(middlewares);

// 2. 리라이터는 필요한 경우에만 쓰세요. 
// 일단 404 해결을 위해 기본값으로 두거나 주석 처리하는 것이 안전합니다.
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

server.use(router);

// 3. [중요] server.listen은 삭제해야 합니다. 
// Vercel은 module.exports된 서버를 직접 실행합니다.

module.exports = server;
