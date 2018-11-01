const request = require('request-promise');
const keys = require('../config/keys');
const MovieOverview = require('../models/MovieOverview');

module.exports = {
    getMovieSearch: (movieName, details) => {
        var options = {
            uri: 'https://api.themoviedb.org/3/search/movie',
            qs: {
                api_key: keys.movieApiKey,
                language: 'en-US',
                query: movieName,
                page: 1, // Increment @page to get next 20 movies
                include_adult: 'false',
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        return request(options).then(body => {
            var movieList = [];
            if (details == "full")
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
            else {
                body.results.map((item) => {
                    var overview = new MovieOverview();
                    overview.id = item.id;
                    overview.title = item.title;
                    movieList.push(overview);
                })
            }
            return movieList;
        }).catch(function (err) {
            throw err;
        });
    }
}