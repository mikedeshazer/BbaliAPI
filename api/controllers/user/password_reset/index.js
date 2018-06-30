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
                template: config.email.templates.reset,
                context: {
                    name: user.firstName,
                    token: token
                }
            };
            mail(mailOptions)
                .then(data => resHandler(res, 200, false, null, null, {}))
                .catch(err => resHandler(res, 400, true, errorMsg.mail));
        } else {
            return resHandler(res, 400, true, errorMsg.invalidUser);
        }
    });
}
