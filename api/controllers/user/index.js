const express = require('express');
const router = express.Router();

const middleware = require('api/services/middleware');
const auth = require('api/services/auth');
const mail = require('api/services/mail');

const handler = require('api/services/handler');
const resHandler = handler.resHandler;
const errorMsg = handler.errorMsg;
const setupApiRoutes = require('api/routes');

const User = require('api/models/user.js');
const signUp = require('api/controllers/user/signup');
const forgotten = require('api/controllers/user/forgotten');
const resetPassword = require('api/controllers/user/password_reset');

router.post('/signup', middleware.signup(), signUp);
router.post('/forgotten', [auth.checkAuth(), middleware.changePassword()], forgotten);
router.post('/password_reset', middleware.checkEmail(), resetPassword);

module.exports = router;    