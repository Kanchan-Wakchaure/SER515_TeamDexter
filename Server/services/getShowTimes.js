const request = require("request-promise");
const keys = require("../config/keys");
const ShowTime = require("../models/ShowTime");
const Cinemas = require("../models/CinemaDetail");
const CinemaDetail = require("../models/CinemaDetail");

module.exports = {
    getShowTimes: (id, dateNum,city_id) => {
        var option_movie = {
            method: "GET",
            url: `https://api.internationalshowtimes.com/v4/movies`,
            qs: {
                apikey: keys.showTimeApiKey,
                tmdb_id: id
            },
            json: true
        }
        var reqDate = Number(dateNum);
        var olddate = new Date();
        var showtime_movie_id = '0'

        var date = new Date(olddate);
        date.setDate(date.getDate() + reqDate);
        var dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
        var option_showtime = {
            method: "GET",
            url: `https://api.internationalshowtimes.com/v4/showtimes`,
            qs: {
                apikey: keys.showTimeApiKey,
                city_ids: city_id, 
                time_to: dateString + 'T00:00:00-08:00'
            },
            json: true

        }

        return request(option_movie).then(showTimeMovie_id => {
            var details = new ShowTime();
            if (showTimeMovie_id.movies === undefined || showTimeMovie_id.movies.length == 0) {
                return details
            }

            showtime_movie_id = showTimeMovie_id.movies[0].id.toString()
            return request(option_showtime).then(showtimes => {
                var showDetails = []
                if (showtimes.showtimes === undefined || showtimes.showtimes.length == 0) {
                    return details
                }
                
                const shows = showtimes.showtimes.filter(show => show["movie_id"]===showtime_movie_id);
                for (var i = 0; i < shows.length; i++) {
                    var show = {}
                    show["international_movie_id"] = shows[i].movie_id
                    show["cinema_id"] = shows[i].cinema_id
                    show["time"] = shows[i].start_at
                    show["booking_link"] = shows[i].booking_link
                    showDetails.push(show)
                }
                var cinemaIdArray = []
                showDetails.forEach(element => {
                    if (!cinemaIdArray.includes(element.cinema_id)) {
                        cinemaIdArray.push(element.cinema_id)
                    }
                });

                var query = Cinemas.find({
                    id: cinemaIdArray
                }).select('name + id');
                return query.exec().then(function (data) {
                    details.cinema_detail = data
                    details.show_detail = showDetails
                    return details;
                }).catch(function (err) {
                    throw err;
                })
            }).catch(function (err) {
                throw err;
            })
        }).catch(function (err) {
            throw err;
        });
    }
};