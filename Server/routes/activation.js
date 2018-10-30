var express = require('express');
var router = express.Router();
var {
    decryptOTP,
    activateAccount
} = require('../services/activation')

router.get("/:id", function (req, res, next) {
    console.log("this is param", req.params.id)
    var otp = String(req.params.id)
    console.log(otp)
    var code = decryptOTP(otp).split(" ", 1).toString()
    if (code === null) {
        console.log('its null')
    }
    console.log("final", code)
    activateAccount(code).then(function () {
        console.log('successful')
        res.json({
            'status': '200',
            'message': 'Account activated successfully'
        })
    }).catch(function (err) {
        console.log('Error')
        //res.json({ 'error': 'error' })
        next(err);
    })
    //     res.send("done")
    // }
})
module.exports = router;