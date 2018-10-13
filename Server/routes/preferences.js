const UserPreference = require('../models/UserPreference');

var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
    let preference = new UserPreference(req.body);
    preference.save()
        .then(response => {
            res.status(200).json({ 'preference': 'saved successfully' });
        })
        .catch(err => {
            //res.status(400).send('Failed to create new record');
            return next(err);
        });
});

router.get("/", function (req, res, next) {
    UserPreference.find({ email: req.query.email }, (err, preferences) => {
        if (err)
            return next(err);
        else
            return res.json(preferences);
    })
});

router.put('/', function (req, res, next) {
    UserPreference.findOneAndUpdate({ email: req.query.email }, (err, preference) => {
        if (err)
            return next(err);
        else
            return res.json(preference);
    });
});
module.exports = router;