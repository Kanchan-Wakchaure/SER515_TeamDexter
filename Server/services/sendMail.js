var nodemailer = require('nodemailer');
var mailer = require('../services/mailer');
const UserPreference = require('../models/UserPreference');

module.exports.sendEmail = function (req, res) {
    var emailList = [];
    fetchID().then(function (IdList) {
        for (var i = 0; i < 1; i++) {
            fetchPreferences(IdList[i]).then(function (preferences) {
                var email = preferences.email;
                var myPreferences = preferences.genreList;
                emailList.push(email);
                var mailOptions = {
                    from: 'findmyshow1@gmail.com',
                    to: email,
                    subject: 'Find My Show - Notifications',
                    html: '<body><h1>Hello User!</h1><p>Here are your list of movies for this week</p><div>' + myPreferences + '</div></html>'
                };
                mailer.sendEmail(mailOptions);
            });
        }
    });
    res.json("Emails Sent Successfully");
}

function fetchID() {
    var listOfIDs = [];
    var query = UserPreference.find();
    return query.exec().then(function (preferences) {
        for (var x = 0; x < preferences.length; x++) {
            listOfIDs.push(preferences[x].id);
        }
        return listOfIDs;
    })
}

function fetchPreferences(myID) {
    var details = new UserPreference();
    var query = UserPreference.findById(myID);
    return query.exec().then(function (preferences) {
        details.email = preferences.email;
        details.genreList = preferences.genreList;
        return details;
    })
}