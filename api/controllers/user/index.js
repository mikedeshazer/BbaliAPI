const express = require('express');
const router = express.Router();

const middleware = require('api/services/middleware');
const auth = require('api/services/auth');

const signUp = require('api/controllers/user/signup');
const forgotten = require('api/controllers/user/forgotten');
const resetPassword = require('api/controllers/user/password_reset');
const verifyAccount = require('api/controllers/user/verify_account');

router.post('/signup', middleware.signup(), signUp);
router.post('/password_reset', [auth.checkAuth(), middleware.changePassword()], resetPassword);
router.post('/forgotten', middleware.checkEmail(), forgotten);
router.post('/verify_account', auth.checkAuth(), verifyAccount);

module.exports = router;    