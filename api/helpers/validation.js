const resHandler = require('./res-handler'),
      config = require('config'),
      errorMsg = require('./error-msg');

const emailRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*(\+[A-Za-z0-9-]+)?@[A-Za-z0-9-]+(\.[A-Za-z0-9-]{2,})*$/,
      phoneRegex = /^\d+$/,
      passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

exports.signup = () => {
  return (req, res, next) => {
    console.log("form:\n", req.body);
    const email = req.body.email,
      password = req.body.password,
      phoneNumber = req.body.phoneNumber;

    if (!email || !emailRegex.test(email)) {
      return resHandler(res, config.failed, true, errorMsg.invalidEmail);
    }

    if (!password || !passwordRegex.test(password)) {
      return resHandler(res, config.failed, true, errorMsg.invalidPwd);
    }
    
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
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

exports.updateProfile = () => {
  return (req, res, nex) => {
    const { email, phoneNumber, password } = req.body;
    
    if (email && !emailRegex.test(email))
      return resHandler(res, config.failed, true, errorMsg.invalidEmail);
    
    if (phoneNumber && !phoneRegex.test(phoneNumber))
      return resHandler(res, config.failed, true, errorMsg.invalidPhone);

    if (password && !passwordRegex.test(password))
      return resHandler(res, config.failed, true, errorMsg.invalidPwd);
    
    next();
  }
}
