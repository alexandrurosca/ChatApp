var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logIn = require('./routes/log');
var chat = require('./routes/chat');
var createAcc = require('./routes/createAcc');
var chatTemplate = require('./routes/chatTemplate');
var admin = require('./routes/admin');
var session = require('client-sessions');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//cookies
app.use(session({
    cookieName: 'session',
    secret: 'wtfisthatshit',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', logIn);
app.use('/chat',chat);
app.use('/chatTemplate',chatTemplate);
app.use('/createAccount',createAcc);
app.use('/admin', admin);




// app.use(function (req, res, next) {
//     if(!req.session.user){
//         req.session.user = {}
//     }
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;

