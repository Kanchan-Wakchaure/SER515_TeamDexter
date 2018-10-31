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

// router.get('/', auth, ctrlProfile.profileRead);
// router.post('/', ctrlAuth.register);     //use this for register

router.route('/')
    .get(auth, ctrlProfile.profileRead)
    .post(ctrlAuth.register)
    .put(ctrlAuth.updateUser);

module.exports = router;