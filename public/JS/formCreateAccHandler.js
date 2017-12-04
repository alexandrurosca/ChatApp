//var express = require('express');
var database = require('../databaseMongo/db.js');

exports.form = function (req,res){

    //validations
    /*req.checkBody('userName','Must insert a user!').notEmpty();
    req.checkBody('userName','Incorect user name format!Use just alphanumeric characters!').isAlphanumeric();
    req.checkBody('userName','User name length minim 5!').isLength({min:5});

    req.checkBody('password','Must insert a password!').notEmpty();
    req.checkBody('password','Password length minim 8!').isLength({min:8});
    req.checkBody('userName','Incorect password format!Use just alphanumeric characters!').isAlphanumeric();

    req.checkBody('firstName','Must insert your fisrt name!').notEmpty();
    req.checkBody('firstName','Incorect first name format !').isAlpha();

    req.checkBody('lastName','Must insert your last name!').notEmpty();
    req.checkBody('firstName','Incorect last name format!').isAlpha();

    req.checkBody('CNP','Must insert a your CNP!').notEmpty();
    req.checkBody('CNP','Incorect CNP format!').isNumeric();
    req.checkBody('CNP','Password length minim 8!').isLength({min:3});*/

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
        database.findUsername(user.username, function (result) {
            if(result){
                console.log("Username already taken");
                res.render('./createAccount.ejs', {error: ""});

            } else {database.addUser(user, function () {
                res.render('./log.ejs', {error: ""});
            });}
        });


    }
};
