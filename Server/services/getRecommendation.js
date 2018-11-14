const User = require('../models/User');
const MovieList = require('../models/MovieList');
const keys = require("../config/keys");

module.exports = {
    getRecommendation: user_id => {
        return fetchPreferences(user_id).then(function (userPreference) {
            var myGenreList = [];
            var myActorList = [];
            for (var j = 0; j < userPreference.genreList.length; j++) {
                myGenreList.push(userPreference.genreList[j].item_text);
            }
            for (var k = 0; k < userPreference.actorsList.length; k++) {
                myActorList.push(userPreference.actorsList[k].item_text);
            }
            return fetchMovies(myGenreList, myActorList).then(function (myMovies) {
                return myMovies;
            })
        })
    }
};

function fetchPreferences(myID) {
    var details = new User();
    var query = User.findById(myID);
    return query.exec().then(function (users) {
        details.email = users.email;
        details.genreList = users.genreList;
        details.actorsList = users.actorsList;
        details.firstname = users.firstname;
        details.lastname = users.lastname;
        details.city = users.city;
        return details;
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function fetchMovies(myGenreList, myActorList) {
    var mdetails = [];
    var query;
    var lowerRangeDate = new Date();
    lowerRangeDate.setDate(lowerRangeDate.getDate() - 45);

    var upperRangeDate = new Date();
    upperRangeDate.setDate(upperRangeDate.getDate() + 10);

    if (myGenreList.length === 0 && myActorList.length === 0) {
        query = MovieList.find({
            release_date: {
                $gt: formatDate(lowerRangeDate),
                $lt: formatDate(upperRangeDate)
            },
            original_language: "en",
        }).sort({
            release_date: -1
        });
    } else {
        query = MovieList.find({
            release_date: {
                $gt: formatDate(lowerRangeDate),
                $lt: formatDate(upperRangeDate)
            },
            original_language: "en",
            $or: [{
                    genre_list: {
                        $in: myGenreList
                    }
                },
                {
                    'cast.0.name': {
                        $in: myActorList
                    }
                }
            ]
        }).sort({
            release_date: -1
        });
    }
    return query.exec().then(function (movies) {
        for (var i = 0; i < movies.length; i++) {
            var details = {}
            details["id"] = movies[i].id;
            details["title"] = movies[i].title;
            details["_id"] = movies[i]._id;
            details["tagline"] = movies[i].tagline;
            details["poster_path"] = keys.imageBaseURL + movies[i].poster_path;
            details["release_date"] = movies[i].release_date;
            mdetails.push(details);
        }
        return mdetails;
    })
}