'use strict';

const path = require('path');
require('dotenv').config({path: path.join(__dirname, './../../../.env')});

module.exports = {
  error: require('./error.json'),
  server: require('./server.json'),
  status: require('./status.json'),
};