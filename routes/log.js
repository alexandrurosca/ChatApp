var express = require('express');
var router = express.Router();
var database = require('../public/databaseMongo/db.js');
router.get('/', function(req, res){
    res.render('./log.ejs');
});
router.post('/', function(req, res){


    //add validations

    var User  = {
        name : "Bianca",
        lastName : "Floriana",
        username : req.body.userName,
        CNP : 1234567891234,
        password: req.body.password };

    // database.findUsername("biancafloriana", function (found) {
    //     ((found) ? console.log("This username already exist"): console.log("This is a new username"));
    // });

    database.findUser(User.username, User.password, function (found) {
        if(found){
            res.render('./chat.ejs');
            console.log("You can go on chat page!");
        }else{
            res.render('./log.ejs');
            console.log("Your username / password is incorrect!");
        }

    } );




    });

module.exports = router;