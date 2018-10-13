//Mongoose for Database operations
var mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose
    .connect(
        keys.mongoURI,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log(`Succesfully Connected to the Mongodb Database`);
    })
    .catch(() => {
        console.log(`Error Connecting to the Mongodb Database`);
    });

