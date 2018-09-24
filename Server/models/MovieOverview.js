let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieDetail = new Schema({
    backdrop_path: {
        type: String,
        default: null
    },
    //to do - check if genre is needed in the movie overview
    // genres: [{
    //     id: Number,
    //     name: String
    // }],
    id: {
        type: Number
    },
    popularity: {
        type: Number
    },
    poster_path: {
        type: String,
        default: null
    },
    spoken_languages: [{
        iso_639_1: String,
        name: String
    }],
    tagline: {
        type: String,
        default: null
    },
    title: {
        type: String
    },
});

export default mongoose.model('MovieDetail', MovieDetail);