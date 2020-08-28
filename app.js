const express = require('express');
const app = express();
//const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let passport = require('passport');

require('./models/horse');
require('./models/user');
require('./config/passport');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const horseRoutes = require('./routes/horse');

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
//app.use(express.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(bodyParser.json());


app.use('/API/users', usersRoutes);
app.use('/API/horses', horseRoutes);


mongoose.connect('mongodb://localhost/Horses');
//var router = express.Router();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found');
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
  res.send('error');
});

module.exports = app;
