const request = require('request-promise');
const keys = require('../config/keys');
import MovieOverview from '../models/MovieOverview';

module.exports = {

    getMovieList: () => {

        var options = {
            uri: 'https://api.themoviedb.org/3/discover/movie/',
            qs: {
                api_key: keys.movieApiKey,
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: 'false',
                include_video: 'false',
                page: 1
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
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
        });
    }

}


