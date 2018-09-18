var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');
// var orderRouter = require('./routes/order');
var orderHistoryRouter = require('./routes/orderHistory');
var manageOrdersRouter = require('./routes/manageOrders');
// var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');

var app = express();

//DECLARING PROJECT-WIDE VARIABLES
// global.isRegisteredUser = false; // Declaring project-wide variable is not advisable
/*NOTE: app.locals.variable makes variable accessible from the views but
global.variable makes variable accessible project-wide*/;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/menu', menuRouter);
// app.use('/order', orderRouter);
app.use('/orderHistory', orderHistoryRouter);
app.use('/manageOrders', manageOrdersRouter);
// app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
