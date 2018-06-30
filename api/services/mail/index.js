const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const handlebars = require('express-handlebars');
const path = require('path');

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
        const viewEngine = handlebars.create({});
        const viewOptions = {
            viewEngine: viewEngine,
            viewPath: path.resolve(__dirname, '../templates'),
        };

        transporter.use('compile', hbs(viewOptions));

        transporter.sendMail(options, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
}