'use strict';

const processResponseWith = require('./helpers/processResponse');
const encryptionService = require('../services/encryptionService');
module.exports.encryptText = (req, res) => {
  processResponseWith(res, encryptionService.encrypText, req.body);
};

module.exports.decryptText = (req, res) => {
  const params = req.body.payload;
  processResponseWith(res, encryptionService.encrypText, params);
};