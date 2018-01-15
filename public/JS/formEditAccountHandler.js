//var express = require('express');
var database = require('../databaseMongo/db.js');
var mail = require('../mail/mail.js');
var fs = require("fs");
var isImage = true;

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

    req.checkBody('firstName','Must insert  First Name!').notEmpty();
    req.checkBody('lastName','Must insert  Last Name!').notEmpty();
    req.checkBody('password','Must insert a password!').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    if (errors)  {
        user = req.session.user;
        res.render('./editAccount.ejs',{error: errors, user: user});
    }
    else {


        if (req.file == null) {
            // res.render('./editAccount.ejs', { error:'Please select a picture file to submit!'});
            isImage = false;

        } else {
            isImage = true;
        }
        if (isImage) {
            //profile Picture
            var newImg = fs.readFileSync(req.file.path);
            console.log(req.file.name);
            var encImg = newImg.toString('base64');
            var user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                img: Buffer(encImg, 'base64')
            };
        } else {
            var user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            };
        }

        console.log("User", user);

        database.updateUser(req.body.userName, user, isImage, function (modified) {
            user1 = req.session.user;
            var error;
            if (modified) {
                error =[{msg: "User data modified!"}];
            } else {
                error =[{msg: "User data not modified!"}];
            }
            res.redirect('http://localhost:3000/');
        })

    }

};
