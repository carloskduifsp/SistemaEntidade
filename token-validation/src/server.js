const express = require('express');
const jwt = require('jsonwebtoken');

const PORT = 3000;

const app = express();

const senhaAutorizacacao = 'inscrevanocanal';

app.get('/gerar-token' , (req, res)=> {
    const usuario = {
        id: 1, 
        nome: 'Pedro',
        email: 'pedro123@gmail.com'
    };

    const token = jwt.sign(usuario,senhaAutorizacacao, {expiresIn: '1h'});

    res.json({token});
});

app.get('/validar-token', (req, res)=> {

    const token = req.headers.authorization?.split(' ')[1];
    const bearerToken = req.headers.authorization?.split(' '); 

    if(!token) {
        return res.status(401).json({ mensagem : 'O token nao foi gerado !! '});
    }

    try {
        const decoded = jwt.verify(token, senhaAutorizacacao );
        return res.json({mensagem : 'O token foi validado ', usuario: decoded, bearer: bearerToken});
    } catch (error) {
        return res.status(403).json({mensagem: 'O token é inválido ou expirou!!'});
    }

});

app.listen(PORT, ()=> {
    console.log(`Servidor rodando  na porta ${PORT}`);
});