const resHandler = require('./res-handler'),
      config = require('config'),
      errorMsg = require('./error-msg');

const emailRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*(\+[A-Za-z0-9-]+)?@[A-Za-z0-9-]+(\.[A-Za-z0-9-]{2,})*$/,
      nameRegex = /^(?=[a-zA-Z-\s]{2,}$)^[a-zA-Z\s]+(-[a-zA-Z\s]+)*$/,
      phoneRegex = /^\d+$/,
      passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

exports.signup = () => {
  return (req, res, next) => {
    console.log("form:\n", req.body);
    const email = req.body.email,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      password = req.body.password,
      phoneNumber = req.body.phoneNumber;

    if (!email || !emailRegex.test(email)) {
      return resHandler(res, config.failed, true, errorMsg.invalidEmail);
    }

    if (!firstName || !lastName || !nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return resHandler(res, config.failed, true, errorMsg.invalidName);
    }

    if (!password || !passwordRegex.test(password)) {
      return resHandler(res, config.failed, true, errorMsg.invalidPwd);
    }
    
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return resHandler(res, config.failed, true, errorMsg.invalidPhone);
    }

    next();
  };
};

exports.signin = () => {
  return (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !emailRegex.test(email)) {
      return resHandler(res, config.failed, true, errorMsg.invalidEmail);
    }

    if (!password || !passwordRegex.test(password)) {
      return resHandler(res, config.failed, true, errorMsg.invalidPwd);
    }
    next();
  }
}

exports.changePassword = () => {
  return (req, res, next) => {
    const password = req.body.password;

    if (!password || !passwordRegex.test(password)) {
      return resHandler(res, config.failed, true, errorMsg.invalidPwd);
    }
    next();
  }
}

exports.checkEmail = () => {
  return (req, res, next) => {
    const email = req.body.email;
    if (!email || !emailRegex.test(email)) {
      return resHandler(res, config.failed, true, errorMsg.invalidEmail);
    }
    next();
  }
}
