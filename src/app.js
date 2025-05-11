import { createServer } from 'node:http';

const server = createServer();

server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

global.api = 2;

api = 3;

console.log(api);

server.listen(8000);