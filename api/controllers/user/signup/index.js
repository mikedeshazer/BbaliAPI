const handler = require('api/services/handler');
const auth = require('api/services/auth');
const mail = require('api/services/mail');
const User = require('api/models/user.js');
const resHandler = handler.resHandler;
const errorMsg = handler.errorMsg;

module.exports = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, result) => {
        if (err) {
            resHandler(res, 400, true, errorMsg.db);
        } else if (result) {
            resHandler(res, 400, true, errorMsg.exist);
        } else if (!result) {
            const user = new User(req.body);
            user.save((err, user) => {
                if (err) {
                    resHandler(res, 400, true, errorMsg.db);
                } else {
                    const token = auth.generateToken(auth.serializeUser(user));

                    const mailOptions = {
                        from: process.env.MAIL_HOST,
                        to: req.body.email,
                        subject: 'Welcome!',
                        text: 'activate',
                        html: `<h1>Hi, welcome!</h1><br> Click link below to verify account.<br>
                        <a href='${process.env.HOST}:${process.env.PORT}/user/verify_account?token=${token}'>Verify account</a>`
                    };
                    mail(mailOptions)
                        .then(data => resHandler(res, 200, false, null, token))
                        .catch(err => resHandler(err, 400, true, errorMsg.mail));
                }
            });
        }
    });
};