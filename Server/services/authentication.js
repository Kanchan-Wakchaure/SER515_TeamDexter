//use it to login a user
var passport = require('passport');
var mongoose = require('mongoose');
const User = require('../models/User');
const Activation = require('../models/activationlog')
const { generateOTP, encryptOTP } = require('./activation');
const { sendEmail } = require('./mailer');



module.exports.register = function (req, res) {


    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.city = req.body.location;
    console.log(user.firstname, user.email, user.city)
    user.setPassword(req.body.password);
    user.save(function (err, insertedDocument) {
        if (err) {
            res.status(500);
            res.json({
                'message': "Internal server error",
                'status': 501
            })
        }
        else {
            var token, otp;
            token = user.generateJwt();
            //console.log("id of inserted doc", insertedDocument.id)
            otp = encryptOTP(generateOTP(insertedDocument.id))
            console.log(otp)
            var activation = new Activation();
            activation.userid = insertedDocument.id
            activation.otp = otp
            activation.save(function (err) {

                if (err) {
                    res.status(500);
                    res.json({
                        'message': "Internal server error",
                        'status': 501
                    })
                }
                else {
                    var mailOptions = {
                        from: 'findmyshow1@gmail.com',
                        to: user.email,
                        subject: 'Welcome to FindMyShow',
                        html: `<h2>Welcome to FindMyShow<h2></br><h4>Please activate your account at following link <h4></br><a href = "http://localhost:4200/activate?code=${otp}">Activate</a>`
                    };
                    sendEmail(mailOptions)
                    res.status(200);
                    res.json({
                        "token": token
                    });
                }
            })
        }
    });

};


module.exports.login = function (request, response) {

    passport.authenticate('local', function (error, user, info) {
        var token;
        //if error is thrown by passport
        if (error) {
            response.status(404).json(error);
            return;
        }

        //if user exist
        if (user) {
            token = user.generateJwt();
            response.status(200);
            response.json({
                'token': token
            });

        } else {
            //if user is not found
            response.status(401).json(info);
        }
    })(request, response);
};