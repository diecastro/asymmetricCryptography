'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  helmet = require('helmet'),
  config = require('./config/app'),
  morgan = require('morgan'),
  compression = require('compression'),
  logger = require('./utils/logger'),
  errorHandler = require('errorhandler'),
  apiRoutes = require('./routes'),
  clientRoutes = require('./routes/clientRoutes');

module.exports = () => {

  app.use(morgan('combined', {stream: logger.stream}));

  let env = app.get('env');

  app.use(helmet());

  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  app.use(compression());
  app.use(bodyParser.json({limit: config.server.payloadLimit}));
  app.use(bodyParser.urlencoded({limit: config.server.payloadLimit, extended: true}));

  apiRoutes(app);
  app.use('', clientRoutes);

  if (env === 'development' || env === 'test') {

    app.use(errorHandler());
  }

  return app;

};
