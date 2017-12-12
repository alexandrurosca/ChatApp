//var express = require('express');
var database = require('../databaseMongo/db.js');
var cookieParser = require('cookie-parser');

exports.form = function (req,res){

    //validations
    req.checkBody('userName','Must insert a user!').notEmpty();
    req.checkBody('password','Must insert a password!').notEmpty();
    var errors = req.validationErrors();
    console.log(errors);
    if (errors)
        res.render('./log.ejs',{error: errors});
    else {

        database.findUser(req.body.userName, req.body.password, function (found , user) {
            if(found){
                req.session.user = user;

                res.cookie('user', user.username);
                res.render('./chatTemplate.ejs', {user: user});
                console.log("You can go on chat page!");
            }else{
                console.log("Your username / password is incorrect!");
                var error =[
                   {
                    msg: "Your username / password is incorrect!"}
                ];
                console.log(error[0].msg);
                console.log(error.length);
                res.render('./log.ejs', {error: error});

            }

        } );
    }
};