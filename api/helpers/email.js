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
      html: `Hi, ${params.firstName} <br>, 
            You have requested a password reset. Please click <a href="${config.serverUrl}activate/${params.token}">here!</a> to set a new password.`
    };
    console.log(msg.html);
    sgMail.send(msg, function(err, body) {
      if (err) {
        reject(err);
      }
      else {
        resolve(body);
      }
    });
  });
}