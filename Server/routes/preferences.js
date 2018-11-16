const User = require('../models/User');
const {verifyToken} = require('../middlewares/verifyToken')
var express = require("express");
var router = express.Router();

//get with id
router.get("/",verifyToken, function (req, res, next) {
    User.findById(req.userid, (err, user) => {
        if (err) {
            next(err);
        } else {
            var userPreference = {
                genreList: [],
                actorsList: []
            };
            userPreference.genreList = user.genreList;
            userPreference.actorsList = user.actorsList;
            return res.json(userPreference);
        }
    })
});

//update user preference
router.put('/',verifyToken, function (req, res, next) {
    User.findById(req.userid, (err, user) => {
        if (!user) {
            next(new Error("User not found"));
        } else {
            user.genreList = req.body.genreList;
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