var express = require('express');
var router = express.Router();
var {
    decryptOTP,
    activateAccount
} = require('../services/activation')

router.get("/:id", function (req, res, next) {
    var otp = String(req.params.id)
    var code = decryptOTP(otp).split(" ", 1).toString()
    if (code === null) {
        console.log('its null')
    }
    activateAccount(code).then(function () {
        res.json({
            'status': '200',
            'message': 'Account activated successfully'
        })
    }).catch(function (err) {
        next(err);
    })
})
module.exports = router;