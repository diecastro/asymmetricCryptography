'use strict';

const infoRoutes = require ('./infoRoutes');

module.exports = app => {
  app.use('/robots.txt', infoRoutes);
};