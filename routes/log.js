var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
    res.render('./log.ejs');
});
module.exports = router;