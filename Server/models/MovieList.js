let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieList = new Schema({
    id: {
        type: Number
    },
    poster_path: {
        type: String,
        default: null
    },
    tagline: {
        type: String,
        default: null
    },
    title: {
        type: String
    },
    overview: {
        type: String,
        default: null
    },
    vote_average: {
        type: Number
    },
    vote_count: Number,
    popularity: Number,
    original_language: String,
    genre_ids: [],
    release_date: String,

    cast: [{

    }],
    genre_list: []

});

module.exports = mongoose.model('movielist', MovieList);


