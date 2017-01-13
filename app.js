const express = require('express');
const favicon = require('serve-favicon');
const config = require('./config/config.js');
const routes = require('./routes');
const battlenet = require('./routes/battlenet.js');

const app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname+'/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));


app.use('/bnet', battlenet);


// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/components/:name', routes.components);
// loads index.html for all non-api routes

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

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


module.exports = app;
