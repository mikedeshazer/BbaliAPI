const config = require('config'),
      express = require('express'),
      router = express.Router(),
      mailSender = require('../helpers/email'),
      User = require('../models/user'),
      auth = require('../helpers/auth-helper'),
      validation = require('../helpers/validation'),
      errorMsg = require('../helpers/error-msg'),
      resHandler = require('../helpers/res-handler');

const signUp = (req, res) => {
  User.findOne({ email: req.body.email }) // check if user exist.
    .then(result => {
      if (result)
        return resHandler(res, config.failed, true, errorMsg.duplicateUser);
      else {
        const newUser = new User(req.body);
        return newUser.save(); // store user's info to db.
      }
    })
    .then(user => {
      if (user) { // response to client-side with token included user's info
        const token = auth.generateToken(auth.serializeUser(user));
        
        return resHandler(res, config.success, false, null, null, {token});
      }
    })
    .catch(err => {
      return resHandler(res, config.failed, true, errorMsg.db);
    })
};

const signIn = (req, res) => {
  const payload = {
    email: req.body.email
  }

  User.findOne(payload)
    .then(result => {
      if (result.checkPassword(req.body.password)) {
        const token = auth.generateToken({_id: result._id});

        return resHandler(res, config.success, false, null, null, { token: token });
      } else {
        return resHandler(res, config.failed, true, errorMsg.dismatch);
      }
    })
    .catch(err => {
      resHandler(res, config.failed, true, errorMsg.dismatch);
    })
}

const changePassword = (req, res) => {
  const decoded = req.token;
  
  User.findById({ _id: decoded._id })
    .then(user => {
      if (user) {
        user.hashedPassword = user.encryptPassword(req.body.password);
        return user.save();
      }
    })
    .then(user => {
      if (user) {
        return resHandler(res, config.success, false, null, null, {});
      } else {
        return resHandler(res, config.failed, true, errorMsg.unauthorized);
      }
    })
    .catch(err => {
      return resHandler(res, config.failed, true, errorMsg.invalidUser);
    })
}

const resetPassword = (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        const token = auth.generateToken({_id: user._id}, config.jwt.resetExpires);

        const params = {
          email: user.email,
          token: token
        }

        mailSender(params)
          .then(data => resHandler(res, config.success, false, null, null, {}))
          .catch(err => resHandler(res, config.failed, true, errorMsg.mail));
      }
    })
    .catch(err => {
      return resHandler(res, config.failed, true, errorMsg.invalidUser);
    })
}

const getProfile = (req, res) => {
  const decoded = req.token;

  User.findById({_id: decoded._id}).select('email phoneNumber created -_id')
    .then(user => {
      if (user)
        return resHandler(res, config.success, false, null, null, user);
        
      return resHandler(res, config.failed, true, errorMsg.NoExist);
    })
    .catch(err=> resHandler(res, config.failed, true, errorMsg.db))
}

const updateProfile = (req, res) => {
  const decoded = req.token;
  const { email, phoneNumber, password } = req.body;
  
  User.findOneAndUpdate({_id: decoded._id}, {$set: {}})
}

const deleteProfile = (req, res) => {
  const decoded = req.token;

  User.find({_id: decoded._id}).remove().exec()
    .then(data => resHandler(res, config.success, false, null, null, {}))
    .catch(err => resHandler(res, config.failed, true, errorMsg.db))
}

// routes
router.post('/signup', validation.signup(), signUp);
router.post('/login', validation.signin(), signIn);
router.post('/forgotten', validation.checkEmail(), resetPassword);
router.post('/change-password', [auth.checkAuth(), validation.changePassword()], changePassword);
router.get('/profile', auth.checkAuth(), getProfile);
router.put('/profile', [auth.checkAuth(), validation.updateProfile()], updateProfile);
router.post('/profile', auth.checkAuth(), deleteProfile);

module.exports = router;
