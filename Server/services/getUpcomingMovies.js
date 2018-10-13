const request = require("request-promise");
const keys = require("../config/keys");
const MovieOverview = require("../models/MovieOverview");

/* 
 *This modules fetches the list of 20 upcoming movies from themoviedb api. 
 *@Author: Team Dexter.
 */
module.exports = {
    getUpcomingMovies: (pageNum) => {
        var options = {
            uri: "https://api.themoviedb.org/3/movie/upcoming/",
            qs: {
                api_key: keys.movieApiKey,
                page: pageNum,
                language: "en-US"
            },
            headers: {
                "User-Agent": "Request-Promise"
            },
            json: true
        };

        return request(options).then(body => {
            var movieList = [];
            body.results.map(item => {
                var movie = new MovieOverview();
                movie.id = item.id;
                movie.poster_path = keys.imageBaseURL + item.poster_path;
                movie.title = item.title;
                movie.overview = item.overview;
                movie.vote_average = item.vote_average;
                movieList.push(movie);
            });
            return movieList;
        });
    }
};