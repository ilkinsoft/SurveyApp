

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
const creditional= require('./routes/Credentials');

var authMiddleware = require('./middlewares/AuthMiddleware');

const mangoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const url = "mongodb+srv://" +creditional.userName + ":"+creditional.password+"@cluster0-4k3cn.gcp.mongodb.net/test?retryWrites=true&w=majority"


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var survaysRouter = require('./routes/survey');


var app = express();

app.use(cors());

//todo app.use(authMiddleware.authenticate())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


let DB = null;


app.use(async (req, res, next) => {
  try {
    if (DB) {
      req.DB = DB;
    } else {
     client =  await mangoClient.connect(url , { useNewUrlParser: true });
      DB = client.db('mwa');
      req.DB = DB;
    }
    next()
  } catch (error) {
    console.log(error)
  }

})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/survay', survaysRouter);

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listening...`))