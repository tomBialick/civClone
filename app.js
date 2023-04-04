var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

const sessionSecret = require('./auth/sessionSecret.json')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev')); //combined
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(session({
  key: 'user_sid',
  secret: sessionSecret.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));

app.use(function(req, res, next) {
  res.set('credentials', 'include')
  res.set('Access-Control-Allow-Credentials', true)
  res.set('Access-Control-Allow-Origin', req.headers.origin)
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.set('Access-Control-Allow-Headers', "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept")
  next();
});

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  }
  else if (req.url === '/' || req.url === "/users/auth" || req.url === "/users/createUser") {
    next();
  }
  else {
    res.status(401).send("Unauthorized Access")
  }
}

app.use('/', sessionChecker, indexRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
