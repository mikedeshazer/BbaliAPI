const auth = require('api/services/auth');
const User = require('api/models/user.js');
const handler = require('api/services/handler');
const mail = require('api/services/mail');
const resHandler = handler.resHandler;
const errorMsg = handler.errorMsg;

module.exports = (req, res) => {
    const decoded = req.token;
    User.findById({
        _id: decoded._id
    }, (err, user) => {
        if (err) {
            return resHandler(res, 400, true, errorMsg.db);
        }
        if (user) {
            user.hashedPassword = user.encryptPassword(req.body.password);
            user.save((err, user) => {
                if (err) {
                    return resHandler(res, 400, true, errorMsg.db);
                }
                if (user) {
                    const token = auth.generateToken(auth.serializeUser(user));

                    const mailOptions = {
                        from: process.env.MAIL_HOST,
                        to: user.email,
                        subject: 'Password changed in your account',
                        text: 'Password reset',
                        html:  `Hello, <br> You recently changed your password in your Bbali account. If it's not you, contact us immediately<br>
                        <a href='${process.env.HOST}:${process.env.PORT}/contact?token=${token}'>Contact us</a>`
                    };
                    mail(mailOptions)
                        .then(data => resHandler(res, 200, false, null, token))
                        .catch(err => resHandler(err, 400, true, errorMsg.mail));
                }
            });
        } else {
            return resHandler(res, 400, true, errorMsg.invalidUser);
        }
    });
}