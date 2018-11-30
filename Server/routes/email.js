var express = require("express");
var router = express.Router();
var mailService = require('../services/sendMail');

router.get('/', mailService.sendEmail)

module.exports = router;