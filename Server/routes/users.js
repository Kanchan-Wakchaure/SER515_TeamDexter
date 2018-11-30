//Write routes for getting user profile info and registration 

// use method 
// get ---> get user info
// post---> register
// put ---->update profile


var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    requestProperty: 'payload'
});

var ctrlProfile = require('../services/profile');
var ctrlAuth = require('../services/authentication');
const User = require('../models/User');

const {
    verifyToken
} = require('../middlewares/verifyToken')


router.route('/')
    .post(ctrlAuth.register)

router.get("/", verifyToken, function (req, res, next) {

    User.findById(req.userid, (err, user) => {
        if (err) {
            next(err);
        } else if (!user.verified) {
            return res.status(401).json("User not verified");
        }
        else {
            return res.json(user);
        }
    })
});

//update user preference
router.put('/', verifyToken, function (req, res, next) {
    User.findById(req.userid, (err, user) => {
        if (!user) {
            next(new Error("User not found"));
        }
        else {
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.city = req.body.location;
            user.genreList = req.body.genreList;
            user.actorsList = req.body.actorsList;
            user.save().then(respose => {
                res.status(200).json({
                    'preference': 'updated successfully'
                });
            })
                .catch(err => {
                    next(err);
                });
        }
    });
});
module.exports = router;