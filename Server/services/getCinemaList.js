const keys = require('../config/keys')
const request = require('request-promise')
import Cinema from '../models/CinemaDetail'

module.exports = {

    getCinemaList: () => {
        var options = {
            uri: 'https://api.internationalshowtimes.com/v4/cinemas',
            qs: {
                apikey: keys.showTimeApiKey,
                //city_ids: '1689,1901,1912,1906,1898,1899,1904,1907,1895,2015,1916,1918,1893,1892,1921,1889,1887,1897,1888,1709,1571,1707,1568,4606,1726,1725,1631,1632,1628,4886'

            },
            json: true // Automatically parses the JSON string in the response
        };

        request(options).then(body => {
            //console.log(body.cinemas)
            for (var i = 0; i < body.cinemas.length; i++) {
                const cinema = new Cinema(body.cinemas[i])
                cinema.save(function (err) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('saved');
                    }

                })
            }
        });
    }

}