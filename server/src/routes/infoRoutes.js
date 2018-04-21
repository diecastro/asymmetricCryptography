'use strict';

const robotsRoute = require('./../controllers/getRobots');
const infoRouter = require('express').Router();

infoRouter.route('/').get(robotsRoute);

module.exports = infoRouter;
