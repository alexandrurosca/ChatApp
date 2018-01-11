var express = require('express');
var router = express.Router();


router.get('/', function (req,res) {
    console.log(req.session.id + "sessionId");

    res.render('./chatTemplate.ejs');
});


module.exports = router;