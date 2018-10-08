//use it to login a user
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function(request,response){

    passport.authenticate('local',function(error,user,info){
        var token;
        //if error is thrown by passport
        if(error) {
            response.status(404).json(error);
            return;
        }

        //if user exist
        if(user){
            token = user.generateJwt();
            response.status(200);
            response.json({
                'token': token
            });

        } else {
            //if user is not found
            response.status(401).json(info);
        }
    })(request,response);
};