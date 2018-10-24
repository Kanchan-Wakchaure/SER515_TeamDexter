var nodemailer = require('nodemailer');
const UserPreference = require('../models/UserPreference');
var mailer = require('../services/mailer')

module.exports.sendEmail = function (req, res) {
    var emailList = fecthEmails();
    console.log(emailList);
    for (var i = 0; i < emailList.length; i++) {
        var mailOptions = {
            from: 'findmyshow1@gmail.com',
            to: emailList[i],
            subject: 'Find My Show - Notifications',
            html: '<body><h1>Hello User</h1><p>Here are your list of movies for this week</p></body>'
        };
        mailer.sendEmail(mailOptions);
    }
}

function fecthEmails() {
    var listOfEmails = [];
    UserPreference.find((err, preferences) => {
        if (err)
            return next(err);
        else
            for (var x = 0; x < preferences.length; x++) {
                console.log(preferences[x].email);
                //var str = (String)(preferences[x].email);
                //str.trim();
                //listOfEmails.push(str);
            }
    })
    return listOfEmails;
}