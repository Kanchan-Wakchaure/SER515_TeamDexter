var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes");
var cors = require('cors')

var bluebird = require("bluebird");
const keys = require("./config/keys");

//Created server at port 4241
const PORT = process.env.PORT || 4241;
app.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes handling
app.use("/", indexRouter);
app.use("/movie", indexRouter);

//Mongoose for Database operations
var mongoose = require("mongoose");
mongoose.Promise = bluebird;

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

module.exports = app;
