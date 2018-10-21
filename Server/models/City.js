let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let City = new Schema({
    id: String,
    name: String,
    slug: String,
    lat: Number,
    lon: Number,
    country: String

});

export default mongoose.model('city', City);
