let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieOverview = new Schema({
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
    }
});

module.exports = mongoose.model('MovieOverview', MovieOverview);