var express = require("express");
var router = express.Router();
var { getMovieList } = require("../services/getMovieList");
var { getMovieDetail } = require("../services/getMovieDetail");

// GET home page and show list of movies.
router.get("/", function (req, res, next) {
  getMovieList()
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.log("got error from movielist service", err);
    });
});

// GET movie details for a specific movie. 
router.get("/movie/:id", function (req, res, next) {
  getMovieDetail(req.params.id)
    .then(movie => {
      res.send(movie);
    })
    .catch(err => {
      console.log("got error from movielist service", err);
    });
});

module.exports = router;
