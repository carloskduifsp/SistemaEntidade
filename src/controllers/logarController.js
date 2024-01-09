const jwt = require('jsonwebtoken');
const key = 'senha';
// function verifyJWT(req, res, next) {
//     console.log('entrou no verify');

//     jwt.verify(token, key, (err, decoded) => {
//         if (err) {
//             console.error('Erro na verificação do token:', err);
//             return res.status(401).end();
//         }
//         req.userId = decoded.userId;
//         next();
//     });
//     console.log('final do verify');
    
// }

exports.post = (req, res)  => {
    // console.log('ENTRANDO NO NEXT');
    const Authorization = req.headers['xx']; // define o cabeçalho que será vigiado
    if (Authorization === '1') {
        // const token = jwt.sign({ userID: 1 }, key, { expiresIn: 300 });
        // res.status(201).send('Requisição recebida com sucesso! ' + token);
        // console.log('Token verificado com sucesso. userId:', req.userId);
    } else {
        res.status(401).send('Não autorizado');
    }
};



exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso! login${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;

    res.status(200).send(`Requisição recebida com sucesso!login ${id}`);
};