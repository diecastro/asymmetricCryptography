'use strict';
const validateBodyMiddleware = require('./../middleware/validateBody');
const encryptionController = require('./../controllers/encryption');
const encryptionRouter = require('express').Router();

encryptionRouter.route('/encryptText').post(
  encryptionController.encryptText
);

encryptionRouter.route('/decryptText').post(
  validateBodyMiddleware,
  encryptionController.decryptText
);

module.exports = encryptionRouter;