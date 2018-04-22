'use strict';

const infoRoutes = require ('./infoRoutes');
const encryptionRoutes = require('./encryptionRoutes');

module.exports = app => {
  app.use('/robots.txt', infoRoutes);
  app.use('/api/encrypt', encryptionRoutes);
};