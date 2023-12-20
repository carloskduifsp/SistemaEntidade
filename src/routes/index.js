const express = require('express');
const router = express.Router();
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

module.exports = router;