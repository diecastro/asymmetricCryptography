'use strict';

const express = require('express'),
  config = require('./../config/app'),
  router = express.Router(),
  path = require('path'),
  logger = require('./../utils/logger'),
  fs = require('fs');

const staticDir = path.resolve(__dirname, '../../../client/dist');
const index = (request, response) => {
      const siteKey = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'), 'utf8');
      let js = '/bundle.js';
      let css = '/bundle.css';
      response.status(config.status.ok).render('index', {
        siteKeyStringified: JSON.stringify(siteKey),
        js,
        css
      });
};

router.use(express.static(staticDir));

router.get('/api/*', (request, response) => {
  response
    .status(config.status.notFound)
    .send({message: config.error.notFound});
});

router.get('*', index);

module.exports = router;

