var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const bucketListRouter = require('./routes/bucketlists');
const mongodbUrl = 'mongodb://localhost/bucketListApi';
mongoose.connect(mongodbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("YOu are now connected to mongodb");
});

var app = express();

const apiVersion = 'api/v1';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt({secret: 'UNIVERSAL'}).unless({path: ['/api/v1/auth/login']}));
app.use('/', indexRouter);
app.use(`/${apiVersion}/auth`, authRouter);
app.use(`/${apiVersion}/bucketlists`, bucketListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
