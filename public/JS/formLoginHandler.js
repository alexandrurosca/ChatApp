var express = require('express');
var database = require('../databaseMongo/db.js');


exports.form = function (req,res){

    //add validations
    req.checkBody('userName','Must insert a user!').notEmpty();
    req.checkBody('password','Must insert a password!').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    if (errors)
        res.render('./log.ejs',{error: errors});
    else {
        var User  = {
            name : "Bianca",
            lastName : "Floriana",
            username : req.body.userName,
            CNP : 1234567891234,
            password: req.body.password };
        database.findUser(User.username, User.password, function (found) {
            if(found){
                res.render('./chat.ejs');
                console.log("You can go on chat page!");
            }else{
                res.render('./log.ejs', {error: ""});
                console.log("Your username / password is incorrect!");
            }

        } );
    }
};
