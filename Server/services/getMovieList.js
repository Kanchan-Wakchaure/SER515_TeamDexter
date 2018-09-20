const request = require('request-promise');
const keys = require('../config/keys')
module.exports = {

    getMovieList: ()=> {

        var options = {
            uri: 'https://api.themoviedb.org/3/discover/movie/',
            qs: {
                api_key: keys.movieApiKey,
                language: 'en-US',
                sort_by:'popularity.desc',
                include_adult:'false',
                include_video:'false',
                page:1
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
         
        // returns a promise
        return request(options).then(body => {
            return body
        });
    }
            
}
        
  
