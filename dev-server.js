'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000;

const config = require('./webpack.dev.js');
const compiler = webpack(config);

const routes = require('./routes');

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
});

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    port: port
}));

app.use(hotMiddleware);
app.get('*', routes);
app.listen(port, function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('[%s] Listening on http://localhost:%d', app.settings.env.toUpperCase(), port);
    }
});
