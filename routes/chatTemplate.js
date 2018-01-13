var express = require('express');
var formSendPicture = require("../public/JS/formSendPicture");
var multer = require("multer");
var router = express.Router();
var  upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});

router.get('/', function (req,res) {
  //  console.log(req.session.id + "sessionId");

    res.render('./chatTemplate.ejs');
});

router.post('/uploadPicture', upload.single('picture'), formSendPicture.form);
router.post('/editAccount', function (req,res) {
    user = req.session.user;
    res.render('./editAccount.ejs', {error: "", user: user});
});

module.exports = router;