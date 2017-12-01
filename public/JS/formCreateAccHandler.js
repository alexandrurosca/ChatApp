var express = require('express');
var database = require('../databaseMongo/db.js');

exports.form = function (req,res){

    //add validations
    req.checkBody('userName','Must insert a user!').notEmpty();
    req.checkBody('password','Must insert a password!').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    if (errors)  res.render('./createAccount.ejs',{error: errors});
    else {
        var user  = {
            name : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.userName,
            CNP : req.body.CNP,
            password: req.body.password
        };
        var result1 ;
        database.findUsername(user.username, function (result) {
            result1 = result;
            if(result){
                console.log("Username already taken");
                res.render('./createAccount.ejs', {error: ""});
            }
        });
        if(!result1) {
            database.addUser(user, function () {
                res.render('./log.ejs', {error: ""});
            });
        }

        //res.render('./chat.ejs');

    }
};
