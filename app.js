//npm paketi
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//moji paketi
var index = require('./routes');
var angcontroler = require('./controler/angcontroler');

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });

app.use('/ang', angcontroler);
app.use('/', index);

// catch 404 and redirect to root
app.use(function(req, res, next) {
    res.redirect('/');
  });

module.exports = app;
