const sgMail = require('@sendgrid/mail');
const config = require('../../config');

sgMail.setApiKey(config.sendgrid.key);

/**
 * @description Email sender
 * @return token
 */
module.exports = (params) => {
  return new Promise((resolve, reject) => {
    const msg = {
      to: params.email,
      from: 'noreply@bblia.com',
      subject: 'Bblia API',
      text: 'Request password reset',
      html: `Hi, You have requested a password reset. Please click <a href="${config.serverUrl}authorization/change-password/${params.token}">here!</a> to set a new password.`
    };

    sgMail.send(msg)
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}