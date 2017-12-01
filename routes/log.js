var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())
var formHandler = require('../public/JS/formLoginHandler');

router.get('/', function (req,res) {
    res.render('./log.ejs',{error: ""});
});

router.post('/', formHandler.form);

module.exports = router;