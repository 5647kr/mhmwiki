const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "../db.json")); // 경로 확인 필요
const middlewares = jsonServer.defaults();

// 1. CORS 패키지 불러오기
const cors = require("cors");

// 2. CORS 설정: 로컬 개발 주소와 실제 배포 주소를 모두 적어주세요.
const allowedOrigins = [
  "http://localhost:5173", // npm run dev 환경
  "http://localhost:4173", // npm run preview 환경
  "https://mhmwiki.vercel.app", // 실제 프론트엔드 배포 완료 후 주소
];

server.use(
  cors({
    origin: (origin, callback) => {
      // origin이 없거나(직접 호출 등) 목록에 있으면 허용
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS 정책에 의해 차단되었습니다."));
      }
    },
    credentials: true, // 필요한 경우 인증 정보 허용
  })
);

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

module.exports = server;
