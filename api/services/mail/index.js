const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        sgMail.send(options)
            .then(res=>resolve(res))
            .catch(err=>reject(err));
    });
}