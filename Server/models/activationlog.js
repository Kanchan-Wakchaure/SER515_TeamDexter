let mongoose = require("mongoose");

const Schema = mongoose.Schema;

let activationSchema = new Schema({
    userid: {
        type: String,

    },
    otp: {
        type: String,

    },
    timestamp: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("activation", activationSchema);