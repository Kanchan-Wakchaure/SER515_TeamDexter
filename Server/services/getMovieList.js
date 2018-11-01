const request = require('request-promise');
const keys = require('../config/keys');
const MovieOverview = require('../models/MovieOverview');

/* 
 *This modules fetches the list of top 20 recent movies from themoviedb api. 
 *@Author: Team Dexter.
 */
module.exports = {

    getMovieList: (pageNumber) => {

        var options = {
            uri: 'https://api.themoviedb.org/3/discover/movie/',
            qs: {
                api_key: keys.movieApiKey,
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: 'false',
                include_video: 'false',
                page: pageNumber // Increment @page to get next 20 movies
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        return request(options).then(body => {
            var movieList = [];
            body.results.map((item) => {
                var overview = new MovieOverview();
                overview.id = item.id;
                overview.title = item.title;
                overview.tagline = item.tagline;
                overview.poster_path = keys.imageBaseURL + item.poster_path;
                overview.overview = item.overview;
                overview.vote_average = item.vote_average;
                movieList.push(overview);
            })
            return movieList;
        }).catch(function (err) {
            throw err;
        });
    }
}