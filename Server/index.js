var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var moviesRoute = require("./routes/movies");
var cors = require('cors')
require('./services/db')


//Created server at port 4241
const PORT = process.env.PORT || 4241;
app.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Add routing routes here
app.use("/movies", moviesRoute);





module.exports = app;
