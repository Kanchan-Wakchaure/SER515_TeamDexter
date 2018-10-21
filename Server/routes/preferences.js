
const UserPreference = require('../models/UserPreference');

var express = require("express");
var router = express.Router();

//save a new preference
// router.post("/", function (req, res, next) {
//     let preference = new UserPreference(req.body);
//     preference.save()
//         .then(response => {
//             res.status(200).json({ 'preference': 'saved successfully' });
//         })
//         .catch(err => {
//             res.status(400).send('Failed to create new record');
//         });
// });

router.post("/", function (req, res, next) {
    UserPreference.findById(req.params.id, (err, preferences) => {
        if (!preferences) {
            let preference = new UserPreference(req.body);
            preference.save()
                .then(response => {
                    res.status(200).json({ 'preference': 'saved successfully' });
                })
                .catch(err => {
                    res.status(400).send('Failed to create new record');
                });
        } else {
            preferences = (UserPreference)(req.body);
            preferences.save().then(respose => {
                res.status(200).json({ 'preference': 'update successfully' });
            })
                .catch(err => {
                    console.log(err);
                    return next((err));
                });
        }
    });

});


//get with email
router.get("/", function (req, res, next) {
    UserPreference.find({ email: req.query.email }, (err, preferences) => {
        if (err)
            return next(err);
        else
            return res.json(preferences);
    })
});

//get with id
router.get("/:id", function (req, res, next) {
    UserPreference.findById(req.params.id, (err, preferences) => {
        if (err) {
            return next(err);
        }
        else
            return res.json(preferences);
    })
});

//update user preference
router.put('/:id', function (req, res, next) {
    UserPreference.findById(req.params.id, (err, preferences) => {
        if (!preferences) {
            return next(new Error("No user Preference found"));
        } else {
            preferences = (UserPreference)(req.body);
            preferences.save().then(respose => {
                res.status(200).json({ 'preference': 'update successfully' });
            })
                .catch(err => {
                    console.log(err);
                    return next((err));
                });
        }
    });
});
module.exports = router;