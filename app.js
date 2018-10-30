var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var firebase = require("firebase");

var app = express();

//database setup
const MongoClient = require('mongodb').MongoClient
var db;
MongoClient.connect('mongodb://spardb1:spardb1@ds245523.mlab.com:45523/spardb', (err, spardb) => {
  // ... start the server
  if (err) return console.log(err)
  db = spardb.db('spardb') // whatever your database name is
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// app.get('/', (req, res) => {
//   var cursor = db.spardb('quotes').find();
//   // console.log(cursor)
  
// })
// db.spardb('quotes').find().toArray(function(err, results) {
//   console.log(results)
//   // send HTML file populated with quotes here
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
