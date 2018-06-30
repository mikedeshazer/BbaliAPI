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
                        template: config.email.templates.activate,
                        context: {
                            name: 'there!',
                            token: token
                        }
                    };
                    mail(mailOptions)
                        .then(data => resHandler(res, 200, false, null, token))
                        .catch(err => resHandler(res, 400, true, errorMsg.mail));
                }
            });
        }
    });
};