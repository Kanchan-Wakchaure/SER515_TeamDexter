
var express = require("express");
var jwt = require('express-jwt');
var app = express();
require('./services/db');
var cookieParser = require("cookie-parser");
var moviesRoute = require("./routes/movies");
var authUserRoute = require("./routes/auth");
var usersRoute = require("./routes/users");
var path = require('path');
//var favicon = require('serve-fevicon');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
// var {
//   getCinemaList
// } = require('./services/getCinemaList');


require('./config/passport');

//Created server at port 4241
const PORT = process.env.PORT || 4241;
app.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});
//initialize passport
app.use(passport.initialize());
//getCinemaList()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Add routing routes here
app.use("/movies", moviesRoute);
app.use("/auth", authUserRoute);    //uncomment this on usage. Use this for handling login 
//app.use("/users", usersRoute);      //uncomment this on usage. Use this for handling REGISTER,PROFILE INFO, UPDATING PROFILE INFO. Use post method to register and get for getting info under same route 

//error handlers
// catch 404 and forward to error handler
app.use(function(request, response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Catch unauthorised errors
app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401);
    response.json({"message" : error.name + ": " + error.message});
  }
});


module.exports = app;
