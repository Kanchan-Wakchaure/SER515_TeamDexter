const User = require('../models/User');

var express = require("express");
var router = express.Router();

//get with id
router.get("/:id", function (req, res, next) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            next(err);
        } else {
            var userPreference = {
                genreList: [],
                languageList: [],
                actorsList: []
            };
            userPreference.genreList = user.genreList;
            userPreference.languageList = user.languageList;
            userPreference.actorsList = user.actorsList;                        
            return res.json(userPreference);
        }
    })
});

//update user preference
router.put('/:id', function (req, res, next) {
    User.findById(req.params.id, (err, user) => {
        if (!user) {
            next(new Error("User not found"));
        } else {
            user.genreList = req.body.genreList;
            user.languageList = req.body.languageList;
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