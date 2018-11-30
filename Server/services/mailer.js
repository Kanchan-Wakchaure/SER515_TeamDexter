var nodemailer = require('nodemailer');
var keys = require('../config/keys');

module.exports = {

    sendEmail: (mailOptions) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: keys.emailUsername,
                pass: keys.emailPassword
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw error;
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
}

