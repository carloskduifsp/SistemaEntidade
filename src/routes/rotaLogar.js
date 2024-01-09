const express = require('express');
const router = express.Router();
const controller = require('../controllers/logarController')
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

// const jwt = require('jsonwebtoken');
// const key = 'Chave';
// const token = jwt.sign({ userID: 1 }, key, { expiresIn: 300 });
// router.post('/k', function (res, req, next){
//     console.log('entrou no verify');

//     jwt.verify(token, key, (err) => {
//         if (err) {
//             console.error('Erro na verificação do token:', err);
//             return res.status(401).end();
//         }
//         next();
//     });
//     console.log('final do verify');
 
// })
module.exports = router;