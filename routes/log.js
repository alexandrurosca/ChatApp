var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())
var formLoginHandler = require('../public/JS/formLoginHandler');

router.get('/', function (req,res) {
    res.render('./log.ejs',{error: ""});
});

router.post('/', formLoginHandler.form);

module.exports = router;