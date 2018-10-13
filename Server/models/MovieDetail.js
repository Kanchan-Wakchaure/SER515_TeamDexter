let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MovieDetail = new Schema({
  adult: {
    type: Boolean
  },
  backdrop_path: {
    type: String,
    default: null
  },
  belongs_to_collection: {
    type: Object,
    default: null
  },
  budget: {
    type: Number
  },
  genres: [
    {
      id: Number,
      name: String
    }
  ],
  homepage: {
    type: String,
    default: null
  },
  id: {
    type: Number
  },
  imdb_id: {
    type: String,
    default: null
    /*required:[{
            minlength:9,
            maxlength:9,
            validate:'^tt[0-9]{7}'}] */
  },
  original_language: {
    type: String
  },
  original_title: {
    type: String
  },
  overview: {
    type: String,
    default: null
  },
  popularity: {
    type: Number
  },
  poster_path: {
    type: String,
    default: null
  },
  production_companies: [
    {
      name: String,
      id: Number,
      logo_path: { type: String, default: null },
      origin_country: String
    }
  ],
  production_countries: [
    {
      iso_3166_1: Number,
      name: String
    }
  ],
  release_date: {
    type: Date
  },
  revenue: {
    type: Number
  },
  runtime: {
    type: Number,
    default: null
  },
  spoken_languages: [
    {
      iso_639_1: String,
      name: String
    }
  ],
  status: {
    type: String,
    enum: [
      "Rumored",
      "Planned",
      "In Production",
      "Post Production",
      "Released",
      "Canceled"
    ]
  },
  tagline: {
    type: String,
    default: null
  },
  title: {
    type: String
  },
  video: {
    type: Boolean
  },
  vote_average: {
    type: Number
  },
  vote_count: {
    type: Number
  },
  cast: [
    {
      cast_id: Number,
      character: String,
      credit_id: String,
      gender: Number,
      id: Number,
      name: String,
      order: Number,
      profile_path: String
    }
  ],
  show_detail: [
    {
      international_movie_id: String,
      cinema_id: String,
      time: String,
      booking_link: String
    }
  ],
  cinema_detail: [{
    id: String,
    name: String
  }]
});

module.exports = mongoose.model("MovieDetail", MovieDetail);
