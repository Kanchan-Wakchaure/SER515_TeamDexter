//use it to login a user
var passport = require('passport');
var mongoose = require('mongoose');
const User = require('../models/User');



module.exports.register= function (req, res) {


    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.city = req.body.location;
    console.log(user.firstname, user.email, user.city)
    user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) {
            res.status(500);
            res.json({
                'message': "Internal server error",
                'status': 501
            })
        }
        else {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
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