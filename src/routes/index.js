const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'andre'

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});
router.get('/api', function (req, res, next) {
    res.status(200).send({
        title: "Primeira API",
       
    });
});



function generateToken() {
    const payload = {
        userId: 123,
        username: 'andre',
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    console.log('Token gerado:', token);

    return token;
}

function validateToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET);
        console.log('Token válido:', decoded);
    } catch (error) {
        console.error('Erro na validação do token:', error.message);
    }
}


router.get('/validateToken', function (req, res, next) {
    const token = generateToken();
    validateToken(token);
    res.send('Token validado. Verifique o console para detalhes.');
});


module.exports = router;