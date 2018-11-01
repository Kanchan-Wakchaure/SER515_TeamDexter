var crypto = require('crypto');
var randtoken = require('rand-token');
const Activation = require('../models/activationlog');
const User = require('../models/User');

module.exports = {

    generateOTP: (user_id) => {
        var token = randtoken.generate(16);
        console.log("inside generate token", user_id)
        return user_id + " " + token
    },
    encryptOTP: (token) => {
        var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encryptedToken = mykey.update(token, 'utf8', 'hex')
        encryptedToken += mykey.final('hex');
        return encryptedToken
    },
    decryptOTP: (encryptedToken) => {
        var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
        var decryptedToken = mykey.update(encryptedToken, 'hex', 'utf8')
        decryptedToken += mykey.final('utf8');
        return decryptedToken
    },
    activateAccount: (code) => {
        console.log("control is here")
        //const activation = new Activation();
        //activation.user_id = code
        //console.log(activation)
        var query = Activation.findOne({
            'userid': code
        });
        //query.select('name occupation');

        return query.exec().then(function (activation) {
            console.log("user found", activation);
            if (activation === null) {
                throw new Error()
            }
            var query1 = User.findById(code)
            return query1.exec().then(function (user) {
                console.log(user)
                user.verified = true;
                var query3 = user.save()
                return query3.then(function (updatedUser) {
                    console.log("hurray", updatedUser)
                    return true
                }).catch(function (err) {
                    throw err
                });
            }).catch(function (err) {
                throw err
            });
        }).catch(function (err) {
            //console.log(err)
            throw err
        });
    }
}