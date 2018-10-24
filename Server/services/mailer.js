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
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
}



// For multiple recievers use this
// var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   }



// var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     html: '<h1>Welcome</h1><p>That was easy!</p>'
// }