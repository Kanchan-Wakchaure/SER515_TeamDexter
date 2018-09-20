var express = require('express');
var router = express.Router();
var {getMovieList} = require('../services/getMovieList')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  getMovieList().then(movie=>{
    res.json(movie)
  }).catch(err=>{
    console.log('got error from movielist service',err)
  })
  
});

module.exports = router;
