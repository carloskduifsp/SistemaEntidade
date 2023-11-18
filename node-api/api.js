const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Oi, estou funcionando, API do André")
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:3000')
});