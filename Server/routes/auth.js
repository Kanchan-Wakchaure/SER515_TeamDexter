//use it to login a user
var express = require('express');
var router = express.Router();


var ctrlAuth = require('../services/authentication');

router.post('/', ctrlAuth.login);

module.exports = router;
