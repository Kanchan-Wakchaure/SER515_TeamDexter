var passport = require('passport');
var localStrategy = require('passport').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use('local-strategy',new localStrategy({
    usernameField: 'email'
},
function(username,password, done) {
    User.findOne({email: username},function(error,user) {
        
        if(error) {
            return done(error);
        }

        //return if email doesn't exist
        if(!user) {
            return done(null,false,{
                message: 'user not found'
            });
        }

        //return if password is wrong
        if(!User.validPassword(password)) {
            return done(null,false,{
                message: 'password is wrong'
            });
        }

        //returns user object if credentials are correct
        return done(null,user);
    })
}
));