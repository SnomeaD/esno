const express = require('express');
const favicon = require('serve-favicon');
const config = require('./config/config.js');
const routes = require('./routes');

const app = express();

// uncomment after placing your favicon in /public
app.use(favicon(__dirname+'/public/favicon.ico'));
app.use(express.static(__dirname + '/dist/'));

// serve index and view partials
app.get('*', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: err
  });
});


module.exports = app;
