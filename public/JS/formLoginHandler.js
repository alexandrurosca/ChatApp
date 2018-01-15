//var express = require('express');
var database = require('../databaseMongo/db.js');
var cookieParser = require('cookie-parser');

exports.form = function (req,res){

    //validations
    req.checkBody('userName','Must insert a user!').notEmpty();
    req.checkBody('password','Must insert a password!').notEmpty();
    var errors = req.validationErrors();
    console.log(errors);
    //destroy cookie
    if (errors)
        res.render('./log.ejs',{error: errors});
    else {
        database.findUser(req.body.userName, req.body.password, function (found , user) {
            if(found){

                //admin
                if(req.body.userName == "admin" && req.body.password == 'admin'){
                    //res.redirect("http://localhost:3000/admin");
                    req.session.user = user;

                    res.render('./admin.ejs',{user: user});
                    //res.render('./admin.ejs');
                }else {
                    req.session.user = user;
                    //res.cookie('user', user.username);
                    console.log("User:", user);
                    console.log("wid:", req.body.wid);
                    if(req.body.wid>600)
                     res.render('./chatTemplate.ejs', {user: user});
                    else
                        res.render('./mobileChat.ejs', {user: user});
                   /// res.redirect("http://localhost:3000/chatTemplate")
                    console.log("You can go on chat page!");
                }
            }else{
                console.log("Your username / password is incorrect!");
                var error =[
                   {
                    msg: "Your username / password is incorrect!"}
                ];
                console.log(error[0].msg);
                console.log(error.length);
                //console.log("fuck meme");
                res.render('./log.ejs', {error: error});

            }

        } );
    }
};
