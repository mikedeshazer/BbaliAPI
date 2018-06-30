module.exports = (req, res) => {
    const decoded = req.token;
    User.findById({
        _id: decoded._id
    }, (err, user) => {
        if (err) {
            return resHandler(res, config.failed, true, errorMsg.db);
        }
        if (user) {
            user.hashedPassword = user.encryptPassword(req.body.password);
            user.save((err, user) => {
                if (err) {
                    return resHandler(res, config.failed, true, errorMsg.db);
                }
                if (user) {
                    const token = auth.generateToken(auth.serializeUser(user));

                    const mailOptions = {
                        from: process.env.MAIL_HOST,
                        to: user.email,
                        subject: 'Forgotten Password',
                        template: config.email.templates.reset_success,
                        context: {
                            name: user.email,
                            token: token
                        }
                    };
                    mail(mailOptions)
                        .then(data => resHandler(res, config.success, false, null, null, {}))
                        .catch(err => resHandler(res, config.failed, true, errorMsg.mail));
                }
            });
        } else {
            return resHandler(res, config.failed, true, errorMsg.invalidUser);
        }
    });
}