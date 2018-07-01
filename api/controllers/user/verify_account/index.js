const handler = require('api/services/handler');
const auth = require('api/services/auth');
const mail = require('api/services/mail');
const User = require('api/models/user.js');
const resHandler = handler.resHandler;
const errorMsg = handler.errorMsg;

module.exports = (req, res) => {
    User.findById({
        _id: req.token._id
    }, (err, user) => {
        if (err) {
            return resHandler(res, 400, true, errorMsg.db);
        }
        if (user) {
            user.active = true;
            user.save((err, user) => {
                if (err) {
                    return resHandler(res, 400, true, errorMsg.db);
                }
                if (user) {
                    const token = req.headers.authorization;
                    return resHandler(res, 200, false, null, null, {
                        token: token,
                        email: user.email
                    });
                }
            });
        } else {
            return resHandler(res, 400, true, errorMsg.invalidUser);
        }
    });
}