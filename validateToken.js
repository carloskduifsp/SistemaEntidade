const jwt = require('jsonwebtoken');

// Chave secreta usada para assinar e verificar o token (pode ser qualquer string)
const secretKey = 'andre';

// Payload do token (pode ser qualquer informação que você queira incluir)
const payload = {
  userId: 123,
  username: 'andre1',
};

// Gera o token com o payload e a chave secreta
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// Imprime o token gerado
console.log('Token gerado:', token);
