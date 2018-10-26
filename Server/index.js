var express = require("express");
var app = express();
var moviesRoute = require("./routes/movies");
var citiesRoute = require("./routes/cities");
var authUserRoute = require("./routes/auth");
var usersRoute = require("./routes/users");
var preferencesRoute = require("./routes/preferences");
var activationRoute = require("./routes/activation");
var emailRoute = require("./routes/email");
var showtimesRoute = require("./routes/showtimes");
var passport = require('passport');
var cors = require('cors');
var cookieParser = require("cookie-parser");

require('./config/passport');
require('./services/db');


//Created server at port 4241
const PORT = process.env.PORT || 4241;
app.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(passport.initialize());

//Add routing routes here
app.use("/movies", moviesRoute);
app.use("/cities", citiesRoute);
app.use("/auth", authUserRoute);
app.use("/users", usersRoute);
app.use("/preferences", preferencesRoute);
app.use("/activate", activationRoute);
app.use("/email", emailRoute);
app.use("/showtimes", showtimesRoute);

//error handlers

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Catch unauthorised errors
app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401);
    response.json({
      "message": error.name + ": " + error.message
    });
  }
});

module.exports = app;