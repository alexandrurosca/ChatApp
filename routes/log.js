var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
    res.render('./log.ejs');
});
router.post('/', function(req, res){
    res.render('./chat.ejs');

    //add validations

    var User  = {
        name : "Bianca",
        lastName : "Floriana",
        username : req.body.userName,
        CNP : 1234567891234,
        password: req.body.password };
    console.log(User);
    });

module.exports = router;