//use it to login a user
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../Controllers/profile');
var ctrlAuth = require('../Controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
// router.post('/register', ctrlAuth.register);     //use this for register
router.post('/login', ctrlAuth.login);

module.exports = router;
