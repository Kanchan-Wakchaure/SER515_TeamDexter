let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CinemaDetail = new Schema({
    id: String,
    slug: String,
    name: String,
    chain_id: String,
    telephone: String,
    website: String,
    location:
    {
        lat: Number,
        lon: Number,
        address:
        {
            display_text: String,
            street: String,
            house: String,
            zipcode: String,
            city: String,
            state: String,
            state_abbr: String,
            country: String,
            country_code: String,
        }
    },
    booking_type: String
});

module.exports = mongoose.model('cinemas', CinemaDetail);
