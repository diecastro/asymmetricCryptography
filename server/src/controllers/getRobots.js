'use strict';

module.exports = function (request, response) {
  return response.type('text/plain')
    .send('User-agent: Googlebot' +
      '\nDisallow: /nogooglebot/' +
      '\nUser-agent: * ' +
      '\nDisallow: /');
};
