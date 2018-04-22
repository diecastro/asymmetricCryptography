'use strict';

const serverConfig = require('./config/app').server,
  logger = require('./utils/logger'),
  app = require('./app.js'),
  serverApp = app();

global.logger = logger;
global.log = logger.log;

serverApp.listen(serverConfig.port, () => {
  logger.info(
    serverConfig.name + ' 🌎  is listening at http://%s:%s',
    serverConfig.host,
    serverConfig.port,
  );

});

process.on('uncaughtException', err => {
  let exceptionMessage = err instanceof Error ? err.stack : err.toString();
  exceptionMessage =
    '!!!!!!!!!!!!!! Uncaught Exception !!!!!!!!!!!!!! - ERROR: ' +
    exceptionMessage;
  logger.error(exceptionMessage);
});
