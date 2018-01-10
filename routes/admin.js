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

//upload
/*
router.get('/picture/:picture', function(req, res){
    // assign the URL parameter to a variable
    var filename = req.params.picture;
// open the mongodb connection with the connection
// string stored in the variable called url.
    MongoClient.connect(url, function(err, db){
        db.collection('yourcollectionname')
        // perform a mongodb search and return only one result.
        // convert the variabvle called filename into a valid
        // objectId.
            .findOne({'_id': ObjectId(filename)}, function(err, results){
                // set the http response header so the browser knows this
// is an 'image/jpeg' or 'image/png'
                res.setHeader('content-type', results.contentType);
// send only the base64 string stored in the img object
// buffer element
                res.send(results.img.buffer);
            });
    });
});

*/

module.exports = router;