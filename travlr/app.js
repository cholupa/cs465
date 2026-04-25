require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');
var handlebars = require('hbs');
var passport = require('passport');
require('./app_api/config/passport');
require('./app_api/models/db');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
// register partials for header and footer
handlebars.registerPartial('header', fs.readFileSync(path.join(__dirname,'app_server/views/partials/header.hbs'),'utf8'));
handlebars.registerPartial('footer', fs.readFileSync(path.join(__dirname, 'app_server/views/partials/footer.hbs'), 'utf8'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//CORS
app.use('/api', (req,res,next) =>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  if(req.method === 'OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});

// app.use('/api', (req, res, next) => {
//   console.log("=== RAW API HIT ===");
//   console.log("Method:", req.method);
//   console.log("URL:", req.url);
//   console.log("Headers:", req.headers);
//   next();
// });

//router wiring
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel',travelRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch unauthorized error
app.use((err, req, res, next)=>{
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({"message":err.name + err.message});
  }
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
