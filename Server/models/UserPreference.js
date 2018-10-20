let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserPreference = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    genreList: {
        type: [],
        default: null
    },
    languageList: {
        type: [],
        default: null
    },
    actorsList: {
        type: [],
        default: null
    },
});

module.exports = mongoose.model('UserPreference', UserPreference);