var fs = require('fs');
var https = require('https');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var puzzles = require('./routes/puzzles');
var mongoose = require('mongoose');
var Games = require('./models/game');
var Puzzles = require('./models/puzzle');

var app = express();

https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(3000);

console.log(process.env["AGENT_DB_USER"])

mongoose.connect("mongodb://" + process.env.AGENT_DB_USER +":" + process.env.AGENT_DB_PASS + "@ds011382.mlab.com:11382/anaescape");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("db connected!");

  https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
      }, app).listen(12345);


  var getTime = function (req, res, next) {
    Games.findOne({}, function(err, data){
      console.log("timer: ", data.start)
      res.locals.timer = data.start;
    })
    next()
  }

  var checkStatus = function (req, res, next) {
    // console.log('req url', req.path )
    if(req.params.url != "/congrats") {
      Puzzles.find({}, function(err, data){
        if(err) res.send(err);
        var completed = 0;
        for( var i = 0; i < data.length; ++i ){
          if( data[i].pass )
            completed++;
        };
        if( completed > 3 ) {
          res.re('congrats');
        } else {
          next()
        } 
      });
    }
    
  }

  // local app variables
  app.locals.title = "Online Escape";

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(getTime);
  // app.use(checkStatus);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', routes );
  app.use('/puzzles', puzzles);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

});

module.exports = app;
