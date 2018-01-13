var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var formEditAccountHandler = require('../public/JS/formEditAccountHandler');
var multer = require("multer");
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});

router.use(expressValidator());
router.get('/', function(req, res){
    res.render('./editAccount.ejs',{error: ""});
});

router.post('/uploadPicture', upload.single('picture'), formEditAccountHandler.form);

module.exports = router;