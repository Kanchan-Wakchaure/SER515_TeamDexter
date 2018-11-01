let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShowTime = new Schema({
    show_detail: [{
        international_movie_id: String,
        cinema_id: String,
        time: String,
        booking_link: String
    }],
    cinema_detail: [{
        id: String,
        name: String
    }]
});

module.exports = mongoose.model("ShowTime", ShowTime);