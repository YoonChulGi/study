const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const port = 4000;

server.use(middlewares);
server.use((req,res)=>{
    res.status(500).jsonp({
        errorMessage: '문제가 발생했습니다',
    });
});
server.listen(port); // 4000번 포트로 작성된 가상 데이터 서버를 구동합니다. 