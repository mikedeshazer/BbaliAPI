module.exports = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return resHandler(res, config.failed, true, errorMsg.db);
        }
        if (user) {
            const token = auth.generateToken({
                _id: user._id
            }, config.jwt.resetExpires);

            const mailOptions = {
                from: process.env.MAIL_HOST,
                to: user.email,
                subject: 'Reset Password',
                template: config.email.templates.reset,
                context: {
                    name: user.firstName,
                    token: token
                }
            };
            mail(mailOptions)
                .then(data => resHandler(res, config.success, false, null, null, {}))
                .catch(err => resHandler(res, config.failed, true, errorMsg.mail));
        } else {
            return resHandler(res, config.failed, true, errorMsg.invalidUser);
        }
    });
}
