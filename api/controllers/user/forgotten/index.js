const auth = require('api/services/auth');
const User = require('api/models/user.js');
const handler = require('api/services/handler');
const mail = require('api/services/mail');
const resHandler = handler.resHandler;
const errorMsg = handler.errorMsg;

module.exports = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return resHandler(res, 400, true, errorMsg.db);
        }
        if (user) {
            const resetExpires = 0.5 * 60 * 60;
            const token = auth.generateToken({
                _id: user._id
            }, resetExpires);

            const mailOptions = {
                from: process.env.MAIL_HOST,
                to: user.email,
                subject: 'Reset Password',
                text: 'forgotten',
                html: `Hello, <br> We recently received your request to reset the password. Click link below to reset password<br>
                <a href='${process.env.HOST}:${process.env.PORT}/user/password_reset?token=${token}'>Reset password</a>`
            };
            mail(mailOptions)
                .then(data => resHandler(res, 200, false, null, token))
                .catch(err => resHandler(err, 400, true, errorMsg.mail));
        } else {
            return resHandler(res, 400, true, errorMsg.invalidUser);
        }
    });
}
