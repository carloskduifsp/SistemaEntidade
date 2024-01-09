const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = 'senha'
router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.2"
    });
});
function verifyJWT(req,res, next){
    const token = req.headers['x-access-token']
    if (blacklist.includes(token)){
        return res.status(401).end();
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();

        req.userId  = decoded.userId;
        next();
    })
}
router.get('/cliente', verifyJWT, (req, res) => {
    console.log(req.userId + ' user ')
    res.json([{ id: 1, nome: 'kaio'}]);
})
router.post('/login', (req, res) => {
    if (req.body && req.body.user === 'kaio' && req.body.password === '1234') {
        const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300})
        return res.json({auth: true, token});
     }
     res.status(401).end();
})
const blacklist = [];
router.post( '/logout', function (req, res){
    blacklist.push(req.headers['x-access-token']);
    res.end();
})
module.exports = router;
