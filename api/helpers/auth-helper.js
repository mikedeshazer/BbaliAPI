const _ = require('lodash'),
      jwt = require('jsonwebtoken'),
      config = require('config'),
      errorMsg = require('./error-msg'),
      resHandler = require('./res-handler');

/**
 * Auth check middleware generator
 * @param permissions permitted user roles
 * @returns Express.js middleware
 */
exports.checkAuth = permissions => {
  return (req, res, next) => {
    const token = req.query.Authorization || req.headers.authorization || req.query.token;
    if (!token) {
      return resHandler(res, config.failed, true, errorMsg.unauthorized);
    }
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return resHandler(res, config.failed, true, errorMsg.unauthorized);
      }
      req.token = decoded;

      return next();
    });
  };
};

/**
 * Remove sensitive fields from user document object
 * @param user document object
 * @returns user object serialized
 */
exports.serializeUser = user => {
  const userData = _.pick(user, ['username']);
  userData._id = String(user._id);
  return userData;
};

exports.generateToken = (user, expires) => {
  if(!expires)
    expires = config.jwt.expiresIn;

  return jwt.sign(
    user,
    config.jwt.secret,
    { expiresIn: expires }
  );
};

exports.setTokenCookie = (res, token) => {
  res.cookie(config.jwt.cookieName, token, {
    expires: new Date(Date.now() + config.jwt.expiresIn * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
  });
};
