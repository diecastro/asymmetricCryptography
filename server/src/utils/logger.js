const winston = require('winston'),
  fs = require('fs'),
  path = require('path');

winston.emitErrs = true;

const logDirectory = path.join(__dirname, '../../log');

const logLevel = 'info';

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: logLevel,
      filename: path.join(logDirectory, 'key-logger.log'),
      handleExceptions: true,
      json: true,
      timestamp: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: logLevel,
      handleExceptions: true,
      json: false,
      timestamp: true,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};
