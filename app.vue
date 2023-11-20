const http = require('http');
const port = 3000;

const handleRequest = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  res.end('oi to aqui\n'); //O que vai aparecer na tela
  console.log('teste');
};

const server = http.createServer(handleRequest);


server.listen(port, () => {
  console.log(`link para ver: http://localhost:${port}`); //Fornece link no terminal
});
