var database = require('../databaseMongo/db.js')
    , fs = require('fs-extra')


exports.form = function (req,res){
    if (req.file == null) {
        // If Submit was accidentally clicked with no file selected...
        res.render('./admin.ejs', { title:'Please select a picture file to submit!'});

        //res.redirect("http://localhost:3000/");
    }
    else {
        // read the img file from tmp in-memory location
        var newImg = fs.readFileSync(req.file.path);

        // encode the file as a base64 string.
        var encImg = newImg.toString('base64');
        // define your new document
       // console.log(encImg);
        var newItem = {
            description: req.body.description,
            contentType: req.file.mimetype,
            size: req.file.size,
            img: Buffer(encImg, 'base64')
        };

        database.uploadPhoto(newItem, function (modified) {
            if(modified){
                console.log("Image inserted");
                fs.remove(req.file.path, function(err) {
                    if (err) { console.log(err) };
                    res.render('./admin.ejs', {title:'Thanks for the Picture!'});
                });

            }else{
                console.log("Image not inserted");
            }
        })

    };
}