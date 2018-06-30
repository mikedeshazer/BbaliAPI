const path = require('path');

const protocol = process.env.SITE_PROTOCOL || 'http';
const port = process.env.SITE_PORT || process.env.PORT || 3000;
const host = protocol + '://' + (process.env.SITE_HOSTNAME || ('34.252.122.16:' + port));
const secret = process.env.SITE_JWT_SECRET || 'bbali_Json_Web_Token';
const cookieName = process.env.SITE_JWT_COOKIE_NAME || 'bbali';
const webConcurrency = process.env.WEB_CONCURRENCY || require('os').cpus().length;
const logLevel = process.env.NUDGG_LOG_LEVEL || 'debug'; // winston logging level

module.exports = {
  protocol: protocol,
  port: port,
  host: host,

  sendgrid: {
    key: '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',
    domain: 'sandbox27313a9b9d76439db9255698ca3ba448.mailgun.org'
  },

  jwt: { // implementing JWT security
    secret: secret,
    expiresIn: 24 * 60 * 60, // 24 hours in seconds
    cookieName: cookieName,
  },

  webConcurrency: webConcurrency,

  logLevel: logLevel // winston logging level
};
