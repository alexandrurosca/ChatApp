var express = require('express');
exports.form = function (req,res){

    //add validations
    req.checkBody('userName','Must insert a user!').notEmpty();
    req.checkBody('password','Must insert a password!').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) res.render('./log.ejs',{error: errors});
    else {
    var User  = {
        name : "Bianca",
        lastName : "Floriana",
        username : req.body.userName,
        CNP : 1234567891234,
        password: req.body.password };
    console.log(User)
    res.render('./chat.ejs');}
};
