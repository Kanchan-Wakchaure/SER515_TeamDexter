var express = require("express");
var router = express.Router();
var {
  getMovieList
} = require("../services/getMovieList");
var {
  getMovieDetail
} = require("../services/getMovieDetail");
var {
  getUpcomingMovies
} = require("../services/getUpcomingMovies");
var {
  getMovieSearch
} = require("../services/getMovieSearch");
var {
  getSimilarMovies
} = require("../services/getSimilarMovies");
var {
  getRecommendation
} = require("../services/getRecommendation");

// GET home page and show list of movies.
router.get("/", function (req, res, next) {
  let type = req.query.type;
  let page = req.query.page;

  if (typeof (type) === 'undefined') {
    type = 'popular'
  }
  if (typeof (page) === 'undefined') {
    page = 1
  }
  switch (type) {
    case 'popular':
      getMovieList(page)
        .then(movie => {
          res.json(movie);
        })
        .catch(err => {
          next(err);
        });
      break;
    case 'upcoming':
      getUpcomingMovies(page)
        .then(movie => {
          res.json(movie);
        })
        .catch(err => {
          next(err);
        })
      break;
    case 'search':
      let movieName = req.query.name;
      let details = req.query.details;
      getMovieSearch(movieName, details)
        .then(movie => {
          res.json(movie);
        })
        .catch(err => {
          next(err);
        })
      break;
    case 'recommended':
      let uid = req.query.userId;
      getRecommendation(uid)
        .then(movies => {
          res.json(movies);
        }).catch(err => {
          next(err);
        })
      break;
    default:
      res.send("bye")
  }
});

// GET movie details for a specific movie. 
router.get("/:id", function (req, res, next) {
  let type = req.query.type;

  if (typeof (type) === 'undefined') {
    type = 'ID'
  }
  switch (type) {
    case 'ID':
      getMovieDetail(req.params.id)
        .then(movie => {
          res.send(movie);
        })
        .catch(err => {
          next(err);
        });
      break;
    case 'similar':
      getSimilarMovies(req.params.id)
        .then(movie => {
          res.send(movie);
        })
        .catch(err => {
          next(err);
        });
      break;
    default:
      res.send("bye")
  }
});

module.exports = router;