var nodemailer = require('nodemailer');
var mailer = require('../services/mailer');
const UserPreference = require('../models/UserPreference');

module.exports.sendEmail = function (req, res) {
    fetchEmails().then(function (emailList) {
        for (var i = 0; i < emailList.length; i++) {
            var mailOptions = {
                from: 'findmyshow1@gmail.com',
                to: emailList[i],
                subject: 'Find My Show - Notifications',
                html: '<body><p>Hello User,Here are your list of movies for this week</p></body>'
            };
            mailer.sendEmail(mailOptions);
        }
    });
}

function fetchEmails() {
    var listOfEmails = [];
    var query = UserPreference.find();
    return query.exec().then(function (preferences) {
        for (var x = 0; x < preferences.length; x++) {
            var str = (String)(preferences[x].email);
            listOfEmails.push(str);
        }
        return listOfEmails;
    })
}