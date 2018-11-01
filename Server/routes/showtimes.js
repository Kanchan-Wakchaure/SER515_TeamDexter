var express = require("express");
var router = express.Router();
var {
    getShowTimes
} = require("../services/getShowTimes");

// GET showtime details for a specific movie. 
router.get("/:id", function (req, res, next) {
    let type = req.query.type;
    let date = req.query.date;

    if (typeof (type) === 'undefined') {
        type = 'ID'
    }
    switch (type) {
        case 'ID':
            getShowTimes(req.params.id, date)
                .then(movie => {
                    res.send(movie);
                })
                .catch(err => {
                    next(err);
                    //console.log("Error fetching movie showtimes");
                });
            break;
        default:
            res.send("bye")
    }
});

module.exports = router;