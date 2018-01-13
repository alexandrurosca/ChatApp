var express = require('express')
    , router = express.Router()
    , multer = require('multer')
    , upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})
var formAdminHandler = require('../public/JS/formAdminHandler');


router.get('/', function(req, res){
    res.render('./admin.ejs');
});

// Form POST action handler
router.post('/uploadPicture', upload.single('picture'), formAdminHandler.form);

module.exports = router;