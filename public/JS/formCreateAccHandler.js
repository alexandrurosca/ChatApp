//var express = require('express');
var database = require('../databaseMongo/db.js');
var mail = require('../mail/mail.js');
var fs = require("fs");

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

    if (req.file == null) {
        res.render('./createAccount.ejs', { error:'Please select a picture file to submit!'});
    } else {
        //profile Picture
        var newImg = fs.readFileSync(req.file.path);
        console.log(req.file.name);
        var encImg = newImg.toString('base64');
        var user  = {
            name : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.userName,
            CNP : req.body.CNP,
            password: req.body.password,
            friends: ["x"],
            img: Buffer(encImg, 'base64')
        };

        database.checkCNP(user.name,user.lastName, user.CNP, function (realPerson) {
            //TODO: hard codat, nu sterge
            if(1){
                database.findUsername(user.username, function (result) {
                    if(result){
                        console.log("Username already taken");
                        res.render('./createAccount.ejs', {error: "Username already taken"});

                    } else {database.addUser(user, function () {
                        //mail.sendMail();
                        res.redirect("http://localhost:3000/");
                    });}
                });
            }else{
                console.log("No real Person");
                res.render('./createAccount.ejs', {error: "No real person"});
            }
        })




    }
};
