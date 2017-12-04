var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var formCreateAccHandler = require('../public/JS/formCreateAccHandler');

router.use(expressValidator());
router.get('/', function(req, res){
    res.render('./createAccount.ejs',{error: ""});
});

router.post('/', formCreateAccHandler.form);
module.exports = router;