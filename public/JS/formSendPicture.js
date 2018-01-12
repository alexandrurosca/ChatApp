//var express = require('express');

var fs = require("fs");

exports.form = function (req,res){

    if (req.file == null) {
        res.render('./chatTemplate.ejs', { error:'Please select a picture file to submit!'});
    } else {
        //profile Picture
        var newImg = fs.readFileSync(req.file.path);
        var encImg = newImg.toString('base64');
        console.log("Image log", encImg);
        //res.render('./chatTemplate.ejs');

    }
};
