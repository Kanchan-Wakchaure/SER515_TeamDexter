var express = require("express");
var router = express.Router();
var {
    getShowTimes
} = require("../services/getShowTimes");

// GET showtime details for a specific movie. 
router.get("/:id", function (req, res, next) {
    var date = req.query.date;
    var city = req.query.city
    if (typeof (date) === 'undefined') {
        date = 1
    }
    if (typeof (city) === 'undefined') {
        city = '1901'
    }
    else {
        city = city.toString()
    }

    getShowTimes(req.params.id, date, city)
        .then(movie => {
            res.send(movie);
        })
        .catch(err => {
            next(err);
            //console.log("Error fetching movie showtimes");
        });

});

module.exports = router;