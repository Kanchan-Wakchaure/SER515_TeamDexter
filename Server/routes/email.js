var express = require("express");
var router = express.Router();
var mailService = require('../services/sendMail');

router.get('/', mailService.sendEmail)
// console.log("In router");
//sendEmail();
//});

module.exports = router;