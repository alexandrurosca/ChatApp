var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var formLoginHandler = require('../public/JS/formLoginHandler');

router.use(expressValidator());
router.get('/', function (req, res) {
    req.session.destroy();
    res.render('./log.ejs',{error: ""});
});

router.post('/', formLoginHandler.form);

module.exports = router;