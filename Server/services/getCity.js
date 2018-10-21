const keys = require('../config/keys')
const request = require('request-promise')
import City from '../models/City'

module.exports = {

    getCityList: () => {
        var options = {
            uri: 'https://api.internationalshowtimes.com/v4/cities',
            qs: {
                apikey: keys.showTimeApiKey,
            },
            json: true // Automatically parses the JSON string in the response
        };

        request(options).then(body => {
            console.log(body.cities)
            for (var i = 0; i < body.cities.length; i++) {
                const city = new City(body.cities[i])
                city.save(function (err) {
                    if (err) {
                        console.log("error in db operation");
                    }
                    else {
                        console.log('saved');
                    }

                })
            }
        });
    }

}

