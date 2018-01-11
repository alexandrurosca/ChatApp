var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var formCreateAccHandler = require('../public/JS/formCreateAccHandler');
var multer = require("multer");
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});

router.use(expressValidator());
router.get('/', function(req, res){
    res.render('./createAccount.ejs',{error: ""});
});

router.post('/uploadPicture', upload.single('picture'), formCreateAccHandler.form);

module.exports = router;