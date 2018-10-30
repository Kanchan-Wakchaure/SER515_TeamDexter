const request = require("request-promise");
const keys = require("../config/keys");
const MovieDetail = require("../models/MovieDetail");

module.exports = {
  getMovieDetail: id => {
    var options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      qs: {
        language: "en-US",
        api_key: keys.movieApiKey
      },
      json: true
    };

    var options_credits = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      qs: {
        language: "en-US",
        api_key: keys.movieApiKey
      },
      json: true
    };

    var options_trailer = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      qs: {
        api_key: keys.movieApiKey
      },
      json: true
    };


    var options_reviews = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/reviews`,
      qs: {
        page: 1,
        api_key: keys.movieApiKey
      },
      json: true
    };

    var details = new MovieDetail();


    return request(options).then(item => {

      details.adult = item.adult;
      details.backdrop_path = item.backdrop_path;
      details.belongs_to_collection = item.belongs_to_collection;
      details.budget = item.budget;
      details.genres = item.genres;
      details.homepage = item.homepage;
      details.id = item.id;
      details.imdb_id = item.imdb_id;
      details.original_language = item.original_language;
      details.original_title = item.original_title;
      details.overview = item.overview;
      details.popularity = item.popularity;
      details.poster_path = keys.imageBaseURL + item.poster_path;
      details.production_companies = item.production_companies;
      details.production_countries = item.production_countries;
      details.release_date = item.release_date;
      details.revenue = item.revenue;
      details.runtime = item.runtime;
      details.spoken_languages = item.spoken_languages;
      details.status = item.status;
      details.tagline = item.tagline;
      details.title = item.title;
      details.video = item.video;
      details.vote_average = item.vote_average;
      details.vote_count = item.vote_count;

      return request(options_trailer).then(res => {
        details.trailer = 'https://www.youtube.com/watch/' + res.results[0].key

        return request(options_reviews).then(res => {
          details.reviews = res.results

          return request(options_credits).then(credits => {
            details.cast = credits.cast;
            details.crew = credits.crew;
            return details;
          }).catch(function (err) {
            throw err;
          });
        }).catch(function (err) {
          throw err;
        });
      }).catch(function (err) {
        throw err;
      });
    })
  }
};