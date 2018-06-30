const handler = require('api/services/handler');
const resHandler = handler.resHandler;
const errorMsg = handler.errorMsg;

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*(\+[A-Za-z0-9-]+)?@[A-Za-z0-9-]+(\.[A-Za-z0-9-]{2,})*$/;
const phoneRegex = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s)\d+)?)$/;

exports.signup = () => {
    return (req, res, next) => {
        const email = req.body.email,
          password = req.body.password,
          phoneNumber = req.body.phoneNumber;
    
        if (!email || !emailRegex.test(email)) {
          return resHandler(res, 400, true, errorMsg.invalidEmail);
        }
    
        if (!password || !pwdRegex.test(password)) {
          return resHandler(res, 400, true, errorMsg.invalidPwd);
        }
        
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
          return resHandler(res, 400, true, errorMsg.invalidPhone);
        }
    
        next();
    }
}

exports.changePassword = () => {
    return (req, res, next) => {
        if (!password || !pwdRegex.test(password)) {
            return resHandler(res, 400, true, errorMsg.invalidPwd);
        }
        next();
    }
}

exports.checkEmail = () => {
    return (req, res, next) => {
        if (!email || !emailRegex.test(email)) {
            return resHandler(res, 400, true, errorMsg.invalidEmail);
        }
      
        next();
    }
}