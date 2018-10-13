var express = require("express");
var app = express();
var moviesRoute = require("./routes/movies");
var authUserRoute = require("./routes/auth");
var usersRoute = require("./routes/users");
var preferencesRoute = require("./routes/preferences");
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
//Add routing routes here

app.use("/movies", moviesRoute);
app.use("/auth", authUserRoute);    //uncomment this on usage. Use this for handling login 
app.use("/users", usersRoute);      //uncomment this on usage. Use this for handling REGISTER,PROFILE INFO, UPDATING PROFILE INFO. Use post method to register and get for getting info under same route 
app.use("/preferences", preferencesRoute);


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
    response.json({ "message": error.name + ": " + error.message });
  }
});


module.exports = app;
