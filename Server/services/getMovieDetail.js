const request = require("request-promise");
const keys = require("../config/keys");
const MovieDetail = require("../models/MovieDetail");
const Cinemas = require("../models/CinemaDetail");
const CinemaDetail = require("../models/CinemaDetail");

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

    var option_movie = {
      method: "GET",
      url: `https://api.internationalshowtimes.com/v4/movies`,
      qs: {
        apikey: keys.showTimeApiKey,
        tmdb_id: id
      },
      json: true
    }

    var date = new Date();
    var datestring = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1)
    var option_showtime = {
      method: "GET",
      url: `https://api.internationalshowtimes.com/v4/showtimes`,
      qs: {
        apikey: keys.showTimeApiKey,
        city_ids: '1901, 1912',  //currently will only work for Tempe AZ. Later, pass selected city_id here
        movie_id: 0,
        time_to: datestring + 'T00:00:00-08:00'  //currently will only fetch showtime for current date.
      },
      json: true

    }

    return request(options).then(item => {
      var details = new MovieDetail();
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

      return request(options_credits).then(credits => {
        details.cast = credits.cast;
        details.crew = credits.crew;

        return request(option_movie).then(showtimemovie_id => {
          //console.log(showtimemovie_id.movies[0].id)
          if (showtimemovie_id.movies === undefined || showtimemovie_id.movies.length == 0) {
            return details
          }

          option_showtime["qs"]["movie_id"] = showtimemovie_id.movies[0].id
          // console.log(option_showtime)
          // console.log(movieidshowtime)
          return request(option_showtime).then(showtimes => {
            var showDetails = []
            if (showtimes.showtimes === undefined || showtimes.showtimes.length == 0) {
              return details
            }
            for (var i = 0; i < showtimes.showtimes.length; i++) {
              //console.log(showtimes.showtimes[i])
              //console.log("this is cinema id ", cinema)

              var show = {}
              show["international_movie_id"] = showtimes.showtimes[i].movie_id
              show["cinema_id"] = showtimes.showtimes[i].cinema_id
              show["time"] = showtimes.showtimes[i].start_at
              show["booking_link"] = showtimes.showtimes[i].booking_link
              showDetails.push(show)
            }
            var cinemaidarray = []
            showDetails.forEach(element => {
              if (!cinemaidarray.includes(element.cinema_id)) {
                cinemaidarray.push(element.cinema_id)
              }
            });
            console.log(cinemaidarray)

            var query = Cinemas.find({ id: cinemaidarray }).select('name + id');
            return query.exec().then(function (data) {
              details.cinema_detail = data
              details.show_detail = showDetails
              console.log(details)
              return details;
            })
          })
        })
      });
    });
  }
};