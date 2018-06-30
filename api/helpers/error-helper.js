const logger = require('./logger'),
  config = require('config');

const errorHelper = exports = module.exports = {};

errorHelper.handleError = (res, error, status) => {

  const response = {};

  response.status = status || (error && error.status) || config.errPort1;

  if (error && typeof error === 'string') {
    response.message = error;
  } else if (error && error.message) {
    response.message = error.message;
  } else {
    response.message = 'Unknown Error';
  }

  if (error.code && (error.code === config.errPort2 || error.code === config.errPort3)) {
    response.message = getUniqueErrorMessage(error);
  }

  if (error && error.errors) {
    response.errorList = [];
    Object.keys(error.errors).forEach((key) => {
      if (error.errors[key].message) {
        response.errorList.push(error.errors[key].message);
      }
    });
  }

  if (process.env.NODE_ENV !== 'production' && error && error.stack) {
    response.stack = error.stack;
  }

  response.status >= config.errPort1 && logger.error(error);

  return res.status(response.status).json(response);
};

